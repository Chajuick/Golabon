'use client';
import { Icon } from '../icons';
import { BrandDot, fmt } from '../ui';
import { brands as BRAND } from '@/lib/data';

// 구매처/예약 채널 비교. 실제 제휴 URL(pr.url/c.url)이 있으면 rel="sponsored nofollow"로 연결,
// 없으면 안내 alert (콘텐츠 입력 단계에서 url 주입)
export function ChannelCompare({ p }) {
  const isPlace = p.type === 'place';
  let rows;
  if (isPlace) {
    rows = p.channels.map((c, i) => ({ brand: c.brand, note: c.note, cta: c.cta, url: c.url, price: null, primary: i === 0 }));
  } else {
    const lo = Math.min(...p.prices.map((x) => x.price));
    rows = p.prices.map((pr) => ({ brand: pr.brand, note: pr.note, tag: pr.tag, price: pr.price, url: pr.url, primary: pr.price === lo,
      cta: BRAND[pr.brand].name + (pr.brand === 'ali' ? ' 가격 확인' : '에서 보기') }));
  }

  const handleClick = (e, r, name) => {
    if (r.url) return; // 실제 링크면 그대로 이동
    e.preventDefault();
    alert(`외부 ${isPlace ? '채널' : '구매처'}(${name})로 이동합니다.\n\n· 골라본은 직접 ${isPlace ? '예약' : '결제'}을 제공하지 않습니다.\n· 이 링크는 제휴 링크입니다.\n\n(실제 제휴 링크는 콘텐츠 입력 단계에서 연결됩니다)`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {rows.map((r, i) => {
        const s = BRAND[r.brand];
        return (
          <div key={i} style={{ background: '#fff', borderRadius: 'var(--r-lg)', padding: 14,
            border: '1px solid ' + (r.primary ? 'var(--green)' : 'var(--line-soft)'),
            boxShadow: r.primary ? '0 0 0 3px rgba(47,174,138,.10)' : 'none' }}>
            {/* 상단: 브랜드 · 정보 · 가격 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <BrandDot brand={r.brand} size={40} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 15, fontWeight: 800 }}>{s.name}</span>
                  {!isPlace && r.primary && <span className="badge badge-value" style={{ fontSize: 11 }}><span className="dot"></span>최저가</span>}
                  {!isPlace && r.tag === 'fast' && <span className="badge badge-fast" style={{ fontSize: 11 }}><span className="dot"></span>빠른배송</span>}
                  {isPlace && r.primary && <span className="badge badge-rec" style={{ fontSize: 11 }}><span className="dot"></span>추천 채널</span>}
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--gray)', marginTop: 3, lineHeight: 1.4 }}>{r.note}</div>
              </div>
              {r.price != null && (
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em', flex: '0 0 auto',
                  color: r.primary ? 'var(--green-deep)' : 'var(--ink)' }}>
                  {fmt(r.price)}<span style={{ fontSize: 13, fontWeight: 700 }}>원</span>
                </div>
              )}
            </div>
            {/* 하단: 풀폭 CTA */}
            <a href={r.url || '#'} target={r.url ? '_blank' : undefined} rel="sponsored nofollow noopener"
              onClick={(e) => handleClick(e, r, s.name)}
              className={'btn btn-block ' + (r.primary ? 'btn-green' : 'btn-soft')}
              style={{ marginTop: 12 }}>
              {r.cta} <Icon name="upRight" size={15} />
            </a>
          </div>
        );
      })}
    </div>
  );
}
