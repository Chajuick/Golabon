// 네이버 블로그 글 1개 수집기 (개인용 · 본인/동의된 블로그 대상)
//
// 사용법:
//   node scripts/fetch-naver-post.mjs <네이버 블로그 글 URL> [추가 URL ...]
//   npm run fetch:naver -- <URL>
//
// 동작:
//   - blog.naver.com / m.blog.naver.com / PostView.naver / naver.me 단축링크 모두 허용
//   - 모바일 페이지(m.blog.naver.com)에서 제목·날짜·본문 텍스트·이미지 추출
//   - 이미지는 원본으로 로컬 다운로드
//   - 결과: material/naver/<blogId>__<logNo>/ 에 post.json + post.md + images/
//
// 주의: 과도한 크롤링 금지. 요청 간 간격을 둡니다. 본인 또는 동의된 콘텐츠만.

import * as cheerio from 'cheerio';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const UA_MOBILE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- URL 정규화: blogId / logNo 추출 ----------
async function resolveIds(rawUrl) {
  let url = rawUrl.trim();
  // naver.me 단축링크 → 실제 URL 따라가기
  if (/naver\.me/i.test(url)) {
    const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': UA_MOBILE } });
    url = res.url;
  }
  const u = new URL(url);
  // 1) 쿼리 파라미터 형태 (PostView.naver?blogId=..&logNo=..)
  let blogId = u.searchParams.get('blogId');
  let logNo = u.searchParams.get('logNo');
  // 2) 경로 형태 (/{blogId}/{logNo})
  if (!blogId || !logNo) {
    const m = u.pathname.replace(/^\/+/, '').match(/^([^/]+)\/(\d+)/);
    if (m) {
      blogId = blogId || m[1];
      logNo = logNo || m[2];
    }
  }
  if (!blogId || !logNo) {
    throw new Error(`URL에서 blogId/logNo를 못 찾았습니다: ${rawUrl}`);
  }
  return { blogId, logNo };
}

// ---------- 본문 페이지 가져오기 ----------
async function fetchHtml(blogId, logNo) {
  const url = `https://m.blog.naver.com/${blogId}/${logNo}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': UA_MOBILE, Referer: 'https://m.blog.naver.com/' },
  });
  if (!res.ok) throw new Error(`본문 요청 실패 ${res.status}: ${url}`);
  return { html: await res.text(), pageUrl: url };
}

// ---------- 이미지 원본 URL 보정 ----------
function normalizeImg(src) {
  if (!src) return null;
  let s = src.trim();
  if (s.startsWith('//')) s = 'https:' + s;
  try {
    const u = new URL(s);
    if (/pstatic\.net|naver\.net/.test(u.hostname)) {
      // 썸네일 호스트 → 원본 호스트, 원본 화질(type=w3840)로 요청
      // (썸네일 호스트는 ?type 쿼리가 필수라 제거하면 404. w3840은 원본보다 크면 원본 크기로 캡)
      u.hostname = u.hostname.replace(/^mblogthumb-phinf/, 'postfiles');
      if (/postfiles|blogfiles/.test(u.hostname)) u.search = '?type=w3840';
    }
    return u.toString();
  } catch {
    return s;
  }
}

// ---------- 파싱 ----------
function parse($, pageUrl) {
  const title =
    $('.se-title-text').first().text().trim() ||
    $('.se_title').first().text().trim() ||
    $('meta[property="og:title"]').attr('content')?.trim() ||
    $('title').first().text().trim() ||
    '(제목 없음)';

  const date =
    $('.se_publishDate').first().text().trim() ||
    $('.blog_date').first().text().trim() ||
    $('.se_date').first().text().trim() ||
    '';

  // SmartEditor ONE: .se-main-container 안의 컴포넌트를 순서대로 순회
  const blocks = []; // { type:'text'|'image', text?, src?, alt? }
  let container = $('.se-main-container');
  if (container.length) {
    container.find('.se-component').each((_, el) => {
      const $el = $(el);
      const $img = $el.find('img.se-image-resource, img.se-sticker-image, img');
      if ($img.length && ($el.hasClass('se-image') || $el.hasClass('se-imageStrip') || $img.attr('data-lazy-src'))) {
        $img.each((__, im) => {
          const $im = $(im);
          const src = normalizeImg($im.attr('data-lazy-src') || $im.attr('data-src') || $im.attr('src'));
          if (src) blocks.push({ type: 'image', src, alt: $im.attr('alt') || '' });
        });
      } else {
        // 텍스트 컴포넌트: 문단(.se-text-paragraph) 단위로 줄바꿈 보존
        const paras = $el.find('.se-text-paragraph');
        const t = (paras.length
          ? paras.map((__, p) => $(p).text().replace(/​/g, '').trim()).get().join('\n')
          : $el.text().replace(/​/g, '')
        ).replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
        if (t) blocks.push({ type: 'text', text: t });
      }
    });
  }

  // 폴백: 구버전 에디터 / 컨테이너 못 찾은 경우 — 텍스트+이미지 통째로
  if (!blocks.length) {
    const root = $('#postViewArea, .post_ct, .se_component_wrap, #viewTypeSelector').first();
    const scope = root.length ? root : $('body');
    const t = scope.text().replace(/​/g, '').replace(/\n{3,}/g, '\n\n').trim();
    if (t) blocks.push({ type: 'text', text: t });
    scope.find('img').each((_, im) => {
      const src = normalizeImg($(im).attr('data-lazy-src') || $(im).attr('data-src') || $(im).attr('src'));
      if (src && /pstatic\.net|naver\.net/.test(src)) blocks.push({ type: 'image', src, alt: $(im).attr('alt') || '' });
    });
  }

  return { title, date, blocks };
}

// ---------- 이미지 다운로드 ----------
async function downloadImages(blocks, outDir) {
  const images = [];
  let i = 0;
  for (const b of blocks) {
    if (b.type !== 'image') continue;
    i += 1;
    const idx = String(i).padStart(2, '0');
    let ext = (b.src.split('?')[0].match(/\.([a-zA-Z0-9]{3,4})$/)?.[1] || 'jpg').toLowerCase();
    if (ext === 'jpeg') ext = 'jpg';
    const file = `images/${idx}.${ext}`;
    try {
      const res = await fetch(b.src, {
        headers: { 'User-Agent': UA_MOBILE, Referer: 'https://m.blog.naver.com/' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(join(outDir, file), buf);
      b.file = file;
      images.push({ file, src: b.src, alt: b.alt, bytes: buf.length });
      console.log(`  📷 ${file}  (${(buf.length / 1024).toFixed(0)}KB)`);
    } catch (e) {
      b.file = null;
      images.push({ file: null, src: b.src, alt: b.alt, error: String(e.message || e) });
      console.warn(`  ⚠️  이미지 실패: ${b.src} — ${e.message || e}`);
    }
    await sleep(250); // 점잖게
  }
  return images;
}

// ---------- 마크다운 직렬화 (내가 읽기 좋게) ----------
function toMarkdown({ title, date, pageUrl, blocks }) {
  const lines = [`# ${title}`, '', `- 출처: ${pageUrl}`, date ? `- 작성일: ${date}` : '', '', '---', ''];
  for (const b of blocks) {
    if (b.type === 'text') lines.push(b.text, '');
    else if (b.type === 'image') lines.push(b.file ? `![${b.alt || ''}](${b.file})` : `<!-- 이미지 다운로드 실패: ${b.src} -->`, '');
  }
  return lines.filter((l) => l !== undefined).join('\n');
}

// ---------- 한 글 처리 ----------
async function processOne(rawUrl) {
  console.log(`\n▶ ${rawUrl}`);
  const { blogId, logNo } = await resolveIds(rawUrl);
  const { html, pageUrl } = await fetchHtml(blogId, logNo);
  const $ = cheerio.load(html);
  const { title, date, blocks } = parse($, pageUrl);
  console.log(`  제목: ${title}`);
  console.log(`  블록: 텍스트 ${blocks.filter((b) => b.type === 'text').length} · 이미지 ${blocks.filter((b) => b.type === 'image').length}`);

  const outDir = join('material', 'naver', `${blogId}__${logNo}`);
  await mkdir(join(outDir, 'images'), { recursive: true });
  const images = await downloadImages(blocks, outDir);

  const post = { url: pageUrl, blogId, logNo, title, date, text: blocks.filter((b) => b.type === 'text').map((b) => b.text).join('\n\n'), blocks, images };
  await writeFile(join(outDir, 'post.json'), JSON.stringify(post, null, 2), 'utf8');
  await writeFile(join(outDir, 'post.md'), toMarkdown({ title, date, pageUrl, blocks }), 'utf8');
  console.log(`  ✅ 저장: ${outDir}/  (post.json · post.md · images/)`);
  return outDir;
}

// ---------- 엔트리 ----------
const urls = process.argv.slice(2).filter(Boolean);
if (!urls.length) {
  console.error('사용법: node scripts/fetch-naver-post.mjs <네이버 블로그 글 URL> [URL ...]');
  process.exit(1);
}
let ok = 0;
for (const url of urls) {
  try {
    await processOne(url);
    ok += 1;
  } catch (e) {
    console.error(`  ❌ 실패: ${e.message || e}`);
  }
  await sleep(500);
}
console.log(`\n완료: ${ok}/${urls.length}`);
