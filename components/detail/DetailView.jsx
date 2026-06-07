// 상세 페이지 (제품·장소 공용) — 원본 DetailPage 이식.
// SPA refs/scroll → 섹션 id + 앵커, go() → next/link, 찜 → LikeButton
import Link from 'next/link';
import { Icon } from '../icons';
import { Verdict, MiniBadge, Stars, ProductImg, AffiliateNote, SponsorNote, fmt } from '../ui';
import { Gallery } from '../Gallery';
import { LikeButton } from '../LikeButton';
import { ProductCard } from '../ProductCard';
import { ChannelCompare } from './ChannelCompare';
import { DetailTabs } from './DetailTabs';
import { ShopDetail } from './ShopDetail';
import { products, brands as BRAND, GB } from '@/lib/data';

export function DetailView({ p, photos }) {
  const isPlace = p.type === 'place';
  // 갤러리에 쓸 사진(중복 제거, 대표컷이 맨 앞)
  const galleryPhotos = [...new Set(
    [photos?.g0, photos?.g1, photos?.g2, photos?.g3, photos?.g4,
     photos?.lead, photos?.p0, photos?.p1, photos?.use].filter(Boolean)
  )];
  const related = products.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  const alt = p.altId ? GB.get(p.altId) : null;
  const lowest = isPlace ? null : Math.min(...p.prices.map((x) => x.price));

  const blockTitles = isPlace
    ? ['왜 이곳을 골랐는가', '위치 · 접근성 · 첫인상']
    : ['왜 이 제품을 골랐는가', '배송 및 포장 상태'];
  const bodyBlocks = [
    { t: blockTitles[0], d: p.body.why },
    { t: blockTitles[1], d: p.body.ctx },
  ];
  const facts = isPlace
    ? [['직접 방문', p.visit], ['재방문 의향', p.revisit], ['가격대', p.priceShort]]
    : [['직접 사용', p.usedDays + '일'], ['재구매 의향', p.reBuy], ['최저가', fmt(p.priceFrom) + '원~']];

  const ctaLabel = isPlace ? '예약 · 방문 채널 보기' : '구매처 가격 비교 보기';
  const compareTitle = isPlace ? '예약 · 방문 채널' : '구매처 비교';
  const noPayNote = isPlace ? '골라본은 직접 예약을 제공하지 않습니다' : '골라본은 직접 결제를 제공하지 않습니다';
  const tabs = [
    { id: 'info', label: '상세 정보' },
    { id: 'review', label: '검증 리뷰' },
    { id: 'buy', label: isPlace ? '예약·방문' : '구매처' },
  ];

  return (
    <div className="fade-in">
      <div className="wrap" style={{ paddingTop: 22, paddingBottom: 60 }}>
        {/* breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--gray)', marginBottom: 18 }}>
          <Link href="/" style={{ color: 'var(--gray)' }}>홈</Link>
          <Icon name="chevR" size={13} />
          <Link href={`/category/${p.cat}`} style={{ color: 'var(--gray)' }}>{p.catLabel}</Link>
          <Icon name="chevR" size={13} />
          <span style={{ color: 'var(--ink-soft)', fontWeight: 600 }}>{p.name}</span>
        </div>

        {/* 협찬·체험단 고지 (해당 시) */}
        {p.sponsored && (
          <div style={{ marginBottom: 18 }}>
            <SponsorNote text={p.sponsorNote || '업체로부터 제품 또는 서비스를 제공받아 작성한 글입니다. 후기 내용은 실제 방문 기준으로 솔직하게 작성했어요.'} />
          </div>
        )}

        {/* TOP: gallery + summary */}
        <div className="gb-detail-top" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, alignItems: 'start' }}>
          <Gallery
            photos={galleryPhotos}
            badge={<Verdict v={p.verdict} />}
            name={p.name}
            ph={(isPlace ? '현장 사진' : '상품 사진') + ' 곧 올라와요 🐿️'}
          />

          <div>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 12, alignItems: 'center' }}>
              <span className="pcard__cat" style={{ fontSize: 13 }}>{p.catLabel}</span>
              {isPlace && <span style={{ fontSize: 12.5, color: 'var(--gray)', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                <Icon name="pin" size={13} style={{ color: 'var(--gray-light)' }} />{p.area}</span>}
              {p.badges.map((b) => <MiniBadge key={b} type={b} />)}
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3vw,32px)', letterSpacing: '-0.035em', lineHeight: 1.22 }}>{p.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 12 }}>
              <Stars r={p.rating} size={15} />
              <span style={{ fontSize: 13, color: 'var(--gray-light)' }}>·</span>
              <span style={{ fontSize: 13, color: 'var(--gray)' }}>조회 {fmt(p.views)}</span>
              <LikeButton id={p.id} variant="detail" />
            </div>

            {/* one-line verdict */}
            <div style={{ background: 'var(--green-tint)', border: '1px solid var(--green-soft)', borderRadius: 'var(--r-lg)',
              padding: '16px 18px', marginTop: 18, display: 'flex', gap: 12 }}>
              <span style={{ flex: '0 0 auto', color: 'var(--green)' }}><Icon name="check" size={20} sw={2.4} /></span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green-deep)', marginBottom: 4 }}>한 줄 판정</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-soft)', fontWeight: 500 }}>&quot;{p.verdictLine}&quot;</p>
              </div>
            </div>

            {/* quick facts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 14 }}>
              {facts.map(([k, v], i) => (
                <div key={i} style={{ background: 'var(--cream)', borderRadius: 'var(--r-lg)', padding: '14px 16px' }}>
                  <div style={{ fontSize: 11.5, color: 'var(--gray)', fontWeight: 600 }}>{k}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, marginTop: 5, letterSpacing: '-0.02em', color: i === 2 ? 'var(--coral-deep)' : 'var(--ink)' }}>{v}</div>
                </div>
              ))}
            </div>

            <a href="#buy" className="btn btn-ink btn-block btn-lg" style={{ marginTop: 16 }}>
              {ctaLabel} <Icon name="chevD" size={18} />
            </a>
            <p style={{ fontSize: 12, color: 'var(--gray-light)', textAlign: 'center', marginTop: 9 }}>
              {noPayNote} · 검증 내용을 먼저 확인하세요
            </p>
          </div>
        </div>

        {/* 탭 */}
        <DetailTabs tabs={tabs} />

        {/* 상세 정보 */}
        <div id="info"><ShopDetail p={p} isPlace={isPlace} photos={photos} /></div>

        {/* 검증 요약 */}
        <div id="review" style={{ marginTop: 56, scrollMarginTop: 120 }}>
          <h2 style={{ fontSize: 20, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
            <Icon name="shield" size={20} fill style={{ color: 'var(--green)' }} /> 골라본 검증 요약
          </h2>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="gb-summary" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)' }}>
              {Object.entries(p.summary).map(([k, v], i) => (
                <div key={i} style={{ padding: '16px 16px', borderRight: i < 4 ? '1px solid var(--line-soft)' : 'none' }}>
                  <div style={{ fontSize: 12, color: 'var(--gray)', fontWeight: 600 }}>{k}</div>
                  <div style={{ fontSize: 15.5, fontWeight: 700, marginTop: 5, color: 'var(--ink)' }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--line)', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div style={{ padding: '15px 18px', borderRight: '1px solid var(--line)', display: 'flex', gap: 10 }}>
                <Icon name="thumbUp" size={18} fill style={{ color: 'var(--green)', flex: '0 0 auto', marginTop: 1 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green-deep)' }}>이런 사람에게 추천</div>
                  <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 3, lineHeight: 1.5 }}>{p.recFor}</div>
                </div>
              </div>
              <div style={{ padding: '15px 18px', display: 'flex', gap: 10 }}>
                <Icon name="thumbDn" size={18} fill style={{ color: 'var(--b-no)', flex: '0 0 auto', marginTop: 1 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--b-no)' }}>이런 사람에겐 비추천</div>
                  <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 3, lineHeight: 1.5 }}>{p.noFor}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 본문 + 사이드 */}
        <div className="gb-detail-body" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 36, marginTop: 44, alignItems: 'start' }}>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 30 }}>
              <div style={{ background: 'var(--green-tint)', borderRadius: 'var(--r-lg)', padding: '18px 20px', border: '1px solid var(--green-soft)' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--green-deep)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, whiteSpace: 'nowrap' }}>
                  <Icon name="thumbUp" size={17} fill /> 좋았던 점
                </div>
                {p.pros.map((x, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.5, marginBottom: 8 }}>
                    <Icon name="check" size={17} sw={2.4} style={{ color: 'var(--green)', flex: '0 0 auto', marginTop: 1 }} /><span>{x}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#FCF1EF', borderRadius: 'var(--r-lg)', padding: '18px 20px', border: '1px solid #F6DAD5' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--b-no)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, whiteSpace: 'nowrap' }}>
                  <Icon name="thumbDn" size={17} fill /> 아쉬웠던 점
                </div>
                {p.cons.map((x, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.5, marginBottom: 8 }}>
                    <Icon name="close" size={16} sw={2.4} style={{ color: 'var(--b-no)', flex: '0 0 auto', marginTop: 2 }} /><span>{x}</span>
                  </div>
                ))}
              </div>
            </div>

            {bodyBlocks.map((b, i) => (
              <div key={i} style={{ marginBottom: 26 }}>
                <h3 style={{ fontSize: 17.5, marginBottom: 9, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 4, height: 18, borderRadius: 2, background: b.bad ? 'var(--b-no)' : 'var(--green)', flex: '0 0 auto' }}></span>
                  {b.t}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-soft)', textWrap: 'pretty', whiteSpace: 'pre-line' }}>{b.d}</p>
              </div>
            ))}

            {alt && (
              <div style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: 18, marginTop: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green-deep)', marginBottom: 12 }}>
                  {isPlace ? '여기 대신, 골라본이 추천하는 대안' : '이 제품 대신, 골라본이 추천하는 대체템'}
                </div>
                <Link href={`/p/${alt.id}`} style={{ display: 'flex', gap: 14, alignItems: 'center', width: '100%', textAlign: 'left' }}>
                  <div style={{ width: 70, height: 70, borderRadius: 10, overflow: 'hidden', flex: '0 0 auto' }}><ProductImg p={alt} label="" /></div>
                  <div style={{ flex: 1 }}>
                    <Verdict v={alt.verdict} sm />
                    <div style={{ fontSize: 15.5, fontWeight: 800, marginTop: 6 }}>{alt.name}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--gray)', marginTop: 2 }}>{alt.oneLiner}</div>
                  </div>
                  <Icon name="chevR" size={20} style={{ color: 'var(--gray-light)' }} />
                </Link>
              </div>
            )}
          </div>

          {/* sticky side: compare */}
          <aside id="buy" className="gb-detail-aside" style={{ position: 'sticky', top: 92, scrollMarginTop: 120 }}>
            <div className="card" style={{ padding: 18, boxShadow: 'var(--sh-md)', borderColor: 'transparent' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4, gap: 10 }}>
                <h3 style={{ fontSize: 17, whiteSpace: 'nowrap' }}>{compareTitle}</h3>
                {!isPlace && <span style={{ fontSize: 12, color: 'var(--gray)', whiteSpace: 'nowrap' }}>최저 {fmt(lowest)}원</span>}
                {isPlace && <span style={{ fontSize: 12, color: 'var(--gray)', whiteSpace: 'nowrap' }}>{p.priceShort}</span>}
              </div>
              <p style={{ fontSize: 12.5, color: 'var(--gray)', marginBottom: 14, lineHeight: 1.5 }}>
                {isPlace ? '예약·정보 확인은 채널별로 다를 수 있어요. 상황에 맞는 곳에서 확인하세요.'
                  : '무조건 최저가보다, 배송·품질을 고려해 상황에 맞는 곳을 고르세요.'}
              </p>
              <ChannelCompare p={p} />
              <div style={{ marginTop: 14 }}><AffiliateNote compact /></div>
            </div>
          </aside>
        </div>

        {/* related */}
        {related.length > 0 && (
          <div style={{ marginTop: 50 }}>
            <h2 className="section__title" style={{ fontSize: 21, marginBottom: 16 }}>{isPlace ? '비슷한 검증 장소' : '비슷한 검증템'}</h2>
            <div className="grid-cards">
              {related.map((rp) => <ProductCard key={rp.id} p={rp} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
