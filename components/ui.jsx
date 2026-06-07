// 공용 UI 프리미티브 — 원본 프로토타입에서 이식 (순수 컴포넌트 → 서버 렌더링)
import Link from 'next/link';
import { Icon } from './icons';
import { brands as BRAND } from '@/lib/data';

export const fmt = (n) => n.toLocaleString('ko-KR');

/* ---------- Verdict (판정) ---------- */
export const VERDICT = {
  rec: { label: '추천', cls: 'verdict-rec', icon: 'check' },
  cond: { label: '조건부 추천', cls: 'verdict-cond', icon: 'spark' },
  no: { label: '비추천', cls: 'verdict-no', icon: 'xcirc' },
};
export function Verdict({ v, sm }) {
  const d = VERDICT[v];
  if (!d) return null;
  return (
    <span className={'verdict ' + d.cls} style={sm ? { fontSize: 12, padding: '4px 10px 4px 8px' } : null}>
      <Icon name={d.icon} size={sm ? 13 : 15} fill /> {d.label}
    </span>
  );
}

/* ---------- Badge ---------- */
const BADGE_DEF = {
  used: { cls: 'badge-used', label: '직접 써봄' },
  visited: { cls: 'badge-used', label: '직접 가봄' },
  fast: { cls: 'badge-fast', label: '빠른배송' },
  value: { cls: 'badge-value', label: '가성비' },
};
export function MiniBadge({ type }) {
  const d = BADGE_DEF[type];
  if (!d) return null;
  return <span className={'badge ' + d.cls}><span className="dot"></span>{d.label}</span>;
}

/* ---------- 카드용 이미지 (실제 대표 사진 → 없으면 그라데이션 placeholder) ---------- */
export function ProductImg({ p, label = '상품 이미지' }) {
  const src = p.photos?.g0 || p.photos?.lead || null;
  if (src) {
    return <img src={src} alt={p.name || label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />;
  }
  return (
    <div className="imgph" style={{ background: p.img }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5 }} aria-hidden="true">
        <defs>
          <pattern id={'st-' + p.id} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="14" stroke="rgba(34,37,42,.06)" strokeWidth="7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={'url(#st-' + p.id + ')'} />
      </svg>
      {label ? <span className="imgph__label">{label}</span> : null}
    </div>
  );
}

/* ---------- 상세페이지 사진 슬롯 ---------- */
/* src가 있으면 실제 사진, 없으면 안내 placeholder (콘텐츠 입력 단계에서 src 주입) */
export function Slot({ src, alt = '', ph = '사진', radius = 12 }) {
  if (src) {
    return <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: radius }} />;
  }
  return (
    <div className="imgph" style={{ background: 'var(--cream)', borderRadius: radius }}>
      <span className="imgph__label" style={{ maxWidth: '80%', textAlign: 'center', lineHeight: 1.4 }}>{ph}</span>
    </div>
  );
}

/* ---------- 별점 ---------- */
export function Stars({ r, size = 13 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
      <span style={{ display: 'inline-flex', position: 'relative' }}>
        {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" size={size} fill style={{ color: '#DCDFE4' }} />)}
        <span style={{ position: 'absolute', inset: 0, overflow: 'hidden', width: (r / 5 * 100) + '%', display: 'inline-flex' }}>
          {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" size={size} fill style={{ color: '#F4B740', flex: '0 0 auto' }} />)}
        </span>
      </span>
      <span style={{ fontSize: size, fontWeight: 700, color: 'var(--ink-soft)', marginLeft: 1 }}>{r.toFixed(1)}</span>
    </span>
  );
}

/* ---------- 브랜드/채널 칩 ---------- */
export function BrandDot({ brand, size = 22 }) {
  const s = BRAND[brand];
  if (!s) return null;
  // 심볼 이미지가 등록된 채널은 실제 로고 타일, 없으면 브랜드 색상 + 약자 칩
  if (s.symbol) {
    return (
      <span style={{ width: size, height: size, borderRadius: 6, overflow: 'hidden', background: s.color,
        display: 'block', flex: '0 0 auto' }}>
        <img src={s.symbol} alt={s.name} width={size} height={size}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </span>
    );
  }
  return (
    <span style={{ width: size, height: size, borderRadius: 6, background: s.color, color: '#fff',
      display: 'grid', placeItems: 'center', fontSize: size * 0.46, fontWeight: 800, flex: '0 0 auto' }}>{s.short}</span>
  );
}

/* ---------- 로고 ---------- */
export function Logo({ light, size = 22 }) {
  const box = size + 8;
  return (
    <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flex: '0 0 auto' }}>
      <img src="/favicon/favicon-96x96.png" alt="골라본 로고" width={box} height={box}
        style={{ width: box, height: box, borderRadius: 9, objectFit: 'cover', display: 'block',
          boxShadow: 'var(--sh-green)', flex: '0 0 auto' }} />
      <span style={{ fontFamily: 'var(--font-display)', fontSize: size, fontWeight: 700, letterSpacing: '-0.04em', color: light ? '#fff' : 'var(--ink)', whiteSpace: 'nowrap' }}>
        골라본
      </span>
    </Link>
  );
}

/* ---------- 협찬·체험단 고지 ---------- */
export function SponsorNote({ text, compact }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: '#FFF7E6',
      border: '1px solid #F0CE7A', borderRadius: 'var(--r-md)', padding: compact ? '11px 13px' : '13px 16px' }}>
      <Icon name="shield" size={17} fill style={{ color: '#C98A12', flex: '0 0 auto', marginTop: 1 }} />
      <p style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--gray)' }}>
        <b style={{ color: 'var(--ink-soft)' }}>협찬·체험단 고지</b> · {text}
      </p>
    </div>
  );
}

/* ---------- 제휴 고지 ---------- */
export function AffiliateNote({ compact }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: 'var(--cream)',
      border: '1px dashed var(--line)', borderRadius: 'var(--r-md)', padding: compact ? '11px 13px' : '13px 15px' }}>
      <Icon name="shield" size={17} fill style={{ color: 'var(--green)', flex: '0 0 auto', marginTop: 1 }} />
      <p style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--gray)' }}>
        <b style={{ color: 'var(--ink-soft)' }}>제휴 링크 포함</b> · 구매·예약 시 일정 수수료를 받을 수 있지만, 추천은 실사용·방문 검증 기준으로만 작성돼요.
      </p>
    </div>
  );
}
