/* ============================================================
   골라본 공통 컴포넌트  →  window
   ============================================================ */
const { useState, useEffect, useRef } = React;
const fmt = window.GB.fmt;
const BRAND = window.GOLABON_DATA.brands;

/* ---------- Icon ---------- */
const ICONS = {
  search: 'M11 4a7 7 0 1 0 4.9 12l4.6 4.6 1.4-1.4-4.6-4.6A7 7 0 0 0 11 4Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z',
  heart: 'M12 21s-7.5-4.6-10-9.2C.4 8.6 2 5 5.5 5c2 0 3.4 1.2 4.2 2.3l.8 1 .8-1C12.1 6.2 13.5 5 15.5 5 19 5 20.6 8.6 19 11.8 16.5 16.4 9 21 9 21h3Z',
  heartLine: 'M12 20.3 10.6 19C6 14.9 3 12.2 3 8.9 3 6.5 4.9 5 7 5c1.6 0 3.1.9 4 2.3C11.9 5.9 13.4 5 15 5c2.1 0 4 1.5 4 3.9 0 3.3-3 6-7.6 10.1L12 20.3Z',
  menu: 'M3 6h18M3 12h18M3 18h18',
  close: 'M5 5l14 14M19 5L5 19',
  chevR: 'M9 5l7 7-7 7',
  chevL: 'M15 5l-7 7 7 7',
  chevD: 'M5 9l7 7 7-7',
  star: 'M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 2.5Z',
  check: 'M4 12l5 5L20 6',
  truck: 'M3 6h11v9H3zM14 9h4l3 3v3h-7zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  shield: 'M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Zm-1 11 5-5-1.4-1.4L11 11.2 9.4 9.6 8 11l3 3Z',
  xcirc: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm3.5 12.1L14 16.5 12 14.5l-2 2-1.5-1.4 2-2-2-2L10 9.5l2 2 2-2 1.5 1.4-2 2 2 2Z',
  upRight: 'M7 17 17 7M8 7h9v9',
  arrowR: 'M5 12h14M13 6l6 6-6 6',
  spark: 'M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2Z',
  thumbUp: 'M7 22V10l5-8 1.2.6c.5.3.8.9.8 1.5V8h5a2 2 0 0 1 2 2.3l-1.3 8A2 2 0 0 1 17.7 20H7Zm-2 0H2V10h3v12Z',
  thumbDn: 'M17 2v12l-5 8-1.2-.6a1.8 1.8 0 0 1-.8-1.5V16H5a2 2 0 0 1-2-2.3l1.3-8A2 2 0 0 1 6.3 4H17Zm2 0h3v12h-3V2Z',
  // categories
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  pot: 'M5 9h14l-1 9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 9Zm-2 0h18M9 9V6m6 3V6',
  box: 'M3 7l9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7M12 11v10',
  spray: 'M9 8h5v13H9zM9 8V5h3M14 10h3M14 13h3M16 5h2M16 2h2',
  drop: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z',
  plug: 'M9 2v6m6-6v6M6 8h12v3a6 6 0 0 1-12 0V8Zm6 9v5',
  phone: 'M7 2h10v20H7zM10 5h4M10 19h4',
  lamp: 'M8 3h8l3 7H5l3-7Zm4 7v8m-4 3h8',
  shirt: 'M8 3 5 5 3 8l2.5 2L7 9v12h10V9l1.5 1L21 8l-2-3-3-2c0 1.5-1.5 2.5-4 2.5S8 4.5 8 3Z',
  fork: 'M7 2v7a2 2 0 0 0 2 2v11M7 2v5M11 2v5M11 2v7a2 2 0 0 1-2 2M17 2c-1.4 1-2 3-2 6 0 2 1 3 2 3v11',
  cup: 'M4 8h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Zm12 1h2.5a2 2 0 0 1 0 4H16M7 2v2.5M11 2v2.5',
  play: 'M5 4l14 8-14 8V4Z',
  bed: 'M3 8v11M3 13h18v6M21 13v6M3 13V9.5A1.5 1.5 0 0 1 4.5 8h6A1.5 1.5 0 0 1 12 9.5V13',
  scissors: 'M7 6.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm0 6a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM9 10l11-4M9 14l11 4M9.2 9.2 20 18',
  pin: 'M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z',
  cal: 'M4 6h16v15H4zM4 9h16M8 3v4M16 3v4',
};
function Icon({ name, size = 20, sw = 1.7, fill, style, className }) {
  const filled = ['heart','star','spark','shield','truck','thumbUp','thumbDn','xcirc'].includes(name) && fill;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
      fill={filled ? 'currentColor' : 'none'} stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

/* ---------- Verdict / Badge helpers ---------- */
const VERDICT = {
  rec:  { label: '추천',     cls: 'verdict-rec',  icon: 'check' },
  cond: { label: '조건부 추천', cls: 'verdict-cond', icon: 'spark' },
  no:   { label: '비추천',    cls: 'verdict-no',   icon: 'xcirc' },
};
function Verdict({ v, sm }) {
  const d = VERDICT[v]; if (!d) return null;
  return <span className={'verdict ' + d.cls} style={sm ? { fontSize: 12, padding: '4px 10px 4px 8px' } : null}>
    <Icon name={d.icon} size={sm ? 13 : 15} fill /> {d.label}
  </span>;
}
const BADGE_DEF = {
  used:    { cls: 'badge-used',  label: '직접 써봄' },
  visited: { cls: 'badge-used',  label: '직접 가봄' },
  fast:    { cls: 'badge-fast',  label: '빠른배송' },
  value:   { cls: 'badge-value', label: '가성비' },
};
function MiniBadge({ type }) {
  const d = BADGE_DEF[type]; if (!d) return null;
  return <span className={'badge ' + d.cls}><span className="dot"></span>{d.label}</span>;
}

/* ---------- Image placeholder ---------- */
function ProductImg({ p, label = '상품 이미지' }) {
  return (
    <div className="imgph" style={{ background: p.img }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: .5 }} aria-hidden="true">
        <defs>
          <pattern id={'st-' + p.id} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="14" stroke="rgba(34,37,42,.06)" strokeWidth="7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={'url(#st-' + p.id + ')'} />
      </svg>
      <span className="imgph__label">{label}</span>
    </div>
  );
}

/* ---------- Stars ---------- */
function Stars({ r, size = 13 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
      <span style={{ display: 'inline-flex', position: 'relative' }}>
        {[0,1,2,3,4].map(i => <Icon key={i} name="star" size={size} fill style={{ color: '#DCDFE4' }} />)}
        <span style={{ position: 'absolute', inset: 0, overflow: 'hidden', width: (r/5*100)+'%', display: 'inline-flex' }}>
          {[0,1,2,3,4].map(i => <Icon key={i} name="star" size={size} fill style={{ color: '#F4B740', flex: '0 0 auto' }} />)}
        </span>
      </span>
      <span style={{ fontSize: size, fontWeight: 700, color: 'var(--ink-soft)', marginLeft: 1 }}>{r.toFixed(1)}</span>
    </span>
  );
}

/* ---------- Brand chip ---------- */
function BrandDot({ brand, size = 22 }) {
  const s = BRAND[brand]; if (!s) return null;
  return <span style={{ width: size, height: size, borderRadius: 6, background: s.color, color: '#fff',
    display: 'grid', placeItems: 'center', fontSize: size*0.46, fontWeight: 800, flex: '0 0 auto' }}>{s.short}</span>;
}

/* ============================================================
   Product / Place Card
   ============================================================ */
function ProductCard({ p, onOpen, liked, onLike }) {
  const isPlace = p.type === 'place';
  // product: cheapest price + store dots ; place: price range + channel dots
  let priceNode;
  if (isPlace) {
    priceNode = (
      <div className="pcard__price">
        <div style={{ minWidth: 0 }}>
          <div className="pcard__pricefrom" style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Icon name="pin" size={12} style={{ color: 'var(--gray-light)' }} />{p.area}
          </div>
          <div className="pcard__priceval" style={{ fontSize: 15 }}>{p.priceRange}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {p.channels.map(c => <BrandDot key={c.brand} brand={c.brand} size={20} />)}
        </div>
      </div>
    );
  } else {
    const lowest = Math.min(...p.prices.map(x => x.price));
    const lowestBrand = p.prices.find(x => x.price === lowest).brand;
    priceNode = (
      <div className="pcard__price">
        <div>
          <div className="pcard__pricefrom">최저 · {BRAND[lowestBrand].name}</div>
          <div className="pcard__priceval">{fmt(lowest)}<span className="won">원~</span></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {p.prices.map(pr => <BrandDot key={pr.brand} brand={pr.brand} size={20} />)}
        </div>
      </div>
    );
  }
  return (
    <button className="pcard fade-in" onClick={() => onOpen(p.id)}>
      <div className="pcard__imgwrap">
        <ProductImg p={p} label={isPlace ? '대표 사진' : '상품 이미지'} />
        <div className="pcard__toprow">
          <Verdict v={p.verdict} sm />
          <span className={'pcard__like' + (liked ? ' on' : '')}
            onClick={(e) => { e.stopPropagation(); onLike(p.id); }} role="button" aria-label="찜">
            <Icon name={liked ? 'heart' : 'heartLine'} size={17} fill={liked} />
          </span>
        </div>
      </div>
      <div className="pcard__body">
        <div className="pcard__cat">{p.catLabel}</div>
        <div className="pcard__name">{p.name}</div>
        <div className="pcard__desc">{p.oneLiner}</div>
        <div className="pcard__meta">
          {p.badges.map(b => <MiniBadge key={b} type={b} />)}
        </div>
        <div className="pcard__verify">
          <div className="pcard__vrow"><span className="k">{isPlace ? '방문' : '사용'}</span>
            <span className="v">{isPlace ? p.visit : p.usedDays + '일 직접 써봄'}</span></div>
          <div className="pcard__vrow"><span className="k">좋음</span><span className="v">{p.pros[0]}</span></div>
          <div className="pcard__vrow"><span className="k">아쉬움</span><span className="v con">{p.cons[0]}</span></div>
        </div>
        {priceNode}
      </div>
    </button>
  );
}

/* ============================================================
   Footer  (제휴 고지 포함)
   ============================================================ */
function Footer({ go }) {
  return (
    <footer style={{ background: '#1C1F24', color: '#C9CDD3', marginTop: 40 }}>
      <div className="wrap" style={{ padding: '44px 24px 36px' }}>
        <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)',
          borderRadius: 14, padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 32 }}>
          <span style={{ color: 'var(--green)', flex: '0 0 auto', marginTop: 1 }}><Icon name="shield" size={22} fill /></span>
          <p style={{ fontSize: 13.5, lineHeight: 1.65, color: '#AEB3BB' }}>
            <b style={{ color: '#fff' }}>제휴 링크 고지 ·</b> 이 사이트에는 쿠팡·알리·테무 등의 제휴 링크가 포함되어 있으며,
            링크를 통해 구매가 발생하면 일정 수수료를 제공받을 수 있습니다.
            단, <b style={{ color: '#fff' }}>리뷰와 추천 여부는 실제 사용 경험과 자체 검증 기준에 따라</b> 작성되며 수수료에 영향을 받지 않습니다.
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between' }}>
          <div style={{ maxWidth: 280 }}>
            <Logo light />
            <p style={{ fontSize: 13, lineHeight: 1.6, color: '#8A8F97', marginTop: 12 }}>
              직접 써보고 가보고 괜찮은 것만 골라본.<br />흔어진 협찬·홍보 속 진짜 괜찮은 제품·장소를 먼저 검증합니다.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
            {[
              { h: '탐색', items: [['홈','home'],['카테고리','category'],['인기 검증템','category']] },
              { h: '신뢰', items: [['검증 기준','verify'],['탈락템·비추천','rejected'],['제휴·광고 고지','notice']] },
              { h: '골라본', items: [['소개','verify'],['문의','verify']] },
            ].map(col => (
              <div key={col.h}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{col.h}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {col.items.map((it, i) => (
                    <button key={i} onClick={() => go(it[1])} style={{ fontSize: 13, color: '#8A8F97', textAlign: 'left', transition: 'color .15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#8A8F97'}>{it[0]}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', marginTop: 32, paddingTop: 20,
          fontSize: 12, color: '#70757D', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span>© 2026 골라본 (Golabon). 실사용 검증 큐레이션.</span>
          <span>본 사이트는 직접 결제·예약을 제공하지 않으며, 구매·예약은 외부 채널에서 이루어집니다.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Logo ---------- */
function Logo({ light, size = 22, onClick }) {
  return (
    <button onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flex: '0 0 auto' }}>
      <span style={{ width: size+8, height: size+8, borderRadius: 9, background: 'var(--green)',
        display: 'grid', placeItems: 'center', boxShadow: 'var(--sh-green)', flex: '0 0 auto' }}>
        <Icon name="check" size={size*0.7} sw={2.6} style={{ color: '#fff' }} />
      </span>
      <span style={{ fontSize: size, fontWeight: 800, letterSpacing: '-0.04em', color: light ? '#fff' : 'var(--ink)', whiteSpace: 'nowrap' }}>
        골라본
      </span>
    </button>
  );
}

Object.assign(window, { Icon, Verdict, MiniBadge, ProductImg, Stars, BrandDot, ProductCard, Footer, Logo, VERDICT, BRAND, fmt });
