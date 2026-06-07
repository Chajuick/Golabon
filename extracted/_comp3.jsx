/* ============================================================
   상세 페이지 (제품 · 장소 공용)
   ============================================================ */
const { useState, useEffect, useRef } = React;
const DATA = window.GOLABON_DATA, GB = window.GB, BRAND = window.GOLABON_DATA.brands, fmt = window.GB.fmt;

function AffiliateNote({ compact }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: 'var(--cream)',
      border: '1px dashed var(--line)', borderRadius: 'var(--r-md)', padding: compact ? '11px 13px' : '13px 15px' }}>
      <Icon name="shield" size={17} fill style={{ color: 'var(--green)', flex: '0 0 auto', marginTop: 1 }} />
      <p style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--gray)' }}>
        이 페이지에는 <b style={{ color: 'var(--ink-soft)' }}>제휴 링크</b>가 포함되어 있으며, 링크를 통해 구매·예약 시 일정 수수료를 제공받을 수 있습니다.
        단, 추천 여부는 실제 사용·방문 경험과 자체 검증 기준에 따라 작성됩니다.
      </p>
    </div>
  );
}

function ChannelCompare({ p }) {
  const isPlace = p.type === 'place';
  let rows;
  if (isPlace) {
    rows = p.channels.map((c, i) => ({ brand: c.brand, note: c.note, cta: c.cta, price: null, primary: i === 0 }));
  } else {
    const lo = Math.min(...p.prices.map(x => x.price));
    rows = p.prices.map(pr => ({ brand: pr.brand, note: pr.note, tag: pr.tag, price: pr.price, primary: pr.price === lo,
      cta: BRAND[pr.brand].name + (pr.brand === 'ali' ? ' 가격 확인' : '에서 보기') }));
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {rows.map((r, i) => {
        const s = BRAND[r.brand];
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 13,
            background: '#fff', border: '1.5px solid ' + (r.primary ? 'var(--green)' : 'var(--line)'),
            borderRadius: 'var(--r-md)', padding: '13px 14px' }}>
            <BrandDot brand={r.brand} size={38} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 15, fontWeight: 800 }}>{s.name}</span>
                {!isPlace && r.primary && <span className="badge badge-value" style={{ fontSize: 11 }}><span className="dot"></span>최저가</span>}
                {!isPlace && r.tag === 'fast' && <span className="badge badge-fast" style={{ fontSize: 11 }}><span className="dot"></span>빠른배송</span>}
                {isPlace && r.primary && <span className="badge badge-rec" style={{ fontSize: 11 }}><span className="dot"></span>추천 채널</span>}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--gray)', marginTop: 3 }}>{r.note}</div>
            </div>
            <div style={{ textAlign: 'right', flex: '0 0 auto' }}>
              {r.price != null && (
                <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-0.03em', color: r.primary ? 'var(--green-deep)' : 'var(--ink)' }}>
                  {fmt(r.price)}<span style={{ fontSize: 13 }}>원</span>
                </div>
              )}
              <button className={'btn ' + (r.primary ? 'btn-green' : 'btn-ghost') + ' btn-sm'} style={{ marginTop: r.price != null ? 6 : 0 }}
                onClick={() => alert(`외부 ${isPlace ? '채널' : '구매처'}(${s.name})로 이동합니다.\n\n· 골라본은 직접 ${isPlace ? '예약' : '결제'}을 제공하지 않습니다.\n· 이 링크는 제휴 링크입니다.`)}>
                {r.cta} <Icon name="upRight" size={14} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- image slot helper ---------- */
function Slot({ id, ph, radius = 12 }) {
  return React.createElement('image-slot', {
    key: id, id, placeholder: ph, shape: 'rounded', radius: String(radius),
    style: { width: '100%', height: '100%', display: 'block' },
  });
}

/* ============================================================
   상세페이지 (쇼핑몰 상세컷 · 인플루언서 제공 사진 기반)
   ============================================================ */
function ShopDetail({ p, isPlace, infoRef }) {
  const sid = (k) => `gb-${p.id}-${k}`;
  const points = p.pros.slice(0, 2);
  const specRows = Object.entries(p.summary);
  return (
    <div ref={infoRef} className="sd" style={{ marginTop: 8 }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <span className="sd-eyebrow"><Icon name="spark" size={14} fill /> 골라본 × 인플루언서 검증컷</span>
        <h2 style={{ fontSize: 26, marginTop: 14, letterSpacing: '-0.03em' }}>
          {isPlace ? '직접 가서 담은 현장 상세' : '직접 써보고 담은 상세컷'}
        </h2>
        <p style={{ color: 'var(--gray)', marginTop: 8, fontSize: 14.5, lineHeight: 1.6 }}>
          인플루언서·블로거가 제공한 실제 사진을 골라본이 검증 포인트와 함께 정리했습니다.
        </p>
        <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12.5, fontWeight: 700,
          color: 'var(--green-deep)', background: 'var(--green-tint)', border: '1px dashed var(--green-soft)',
          padding: '8px 14px', borderRadius: 'var(--r-pill)' }}>
          <Icon name="upRight" size={14} /> 아래 빈 칸에 사진을 끌어다 놓으면 상세페이지가 완성됩니다
        </div>
      </div>

      {/* lead band */}
      <div className="sd-shot sd-lead" style={{ aspectRatio: '16/10' }}>
        <Slot id={sid('lead')} ph="대표 상세컷 — 인플루언서 제공 사진을 끌어다 놓으세요" />
        <div className="sd-overlay">
          <h3>{p.name}</h3>
          <p>"{p.oneLiner}"</p>
        </div>
      </div>
      <div className="sd-cap">
        <Icon name="search" size={14} style={{ color: 'var(--gray-light)' }} />
        <span className="src">PHOTO · 인플루언서/블로거 제공 또는 골라본 직접 촬영</span>
      </div>

      {/* detail points */}
      <h3 style={{ fontSize: 19, marginTop: 40, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 4, height: 18, borderRadius: 2, background: 'var(--green)' }}></span> 이 점을 보세요
      </h3>
      <div className="sd-grid2">
        {points.map((pt, i) => (
          <div key={i}>
            <div className="sd-shot" style={{ aspectRatio: '4/3' }}>
              <Slot id={sid('p' + i)} ph={`디테일 컷 ${i + 1}`} />
            </div>
            <div className="sd-point" style={{ display: 'flex', gap: 11, alignItems: 'center', marginTop: 12 }}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <span className="ptxt">{pt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* usage full-bleed */}
      <h3 style={{ fontSize: 19, marginTop: 40, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 4, height: 18, borderRadius: 2, background: 'var(--green)' }}></span>
        {isPlace ? '실제로 가보면' : '실제로 써보면'}
      </h3>
      <div className="sd-shot" style={{ aspectRatio: '16/9' }}>
        <Slot id={sid('use')} ph={isPlace ? '현장·사용 컷' : '사용 컷'} />
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--ink-soft)', marginTop: 16, textWrap: 'pretty' }}>{p.body.exp}</p>

      {/* honest note */}
      <div className="sd-honest" style={{ marginTop: 24 }}>
        <Icon name="thumbDn" size={19} fill style={{ color: 'var(--b-no)', flex: '0 0 auto', marginTop: 1 }} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--b-no)', marginBottom: 3 }}>솔직 검증 · 이 부분은 아쉬워요</div>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6 }}>{p.cons[0]}</p>
        </div>
      </div>

      {/* spec table */}
      <h3 style={{ fontSize: 19, marginTop: 40, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 4, height: 18, borderRadius: 2, background: 'var(--green)' }}></span>
        {isPlace ? '장소 정보' : '제품 정보'}
      </h3>
      <div className="sd-spec">
        {isPlace ? (
          <>
            <div className="row"><div className="k">위치</div><div className="v">{p.area}</div></div>
            <div className="row"><div className="k">가격대</div><div className="v">{p.priceRange}</div></div>
          </>
        ) : (
          <div className="row"><div className="k">카테고리</div><div className="v">{p.catLabel}</div></div>
        )}
        {specRows.map(([k, v], i) => (
          <div className="row" key={i}><div className="k">{k}</div><div className="v">{v}</div></div>
        ))}
      </div>

      {/* credit bar */}
      <div className="sd-credit" style={{ marginTop: 24 }}>
        <Icon name="shield" size={20} fill style={{ color: 'var(--green)', flex: '0 0 auto', marginTop: 1 }} />
        <div>
          <div style={{ color: '#fff', fontWeight: 800, fontSize: 13.5, marginBottom: 4 }}>사진 출처 안내</div>
          <p style={{ fontSize: 13, lineHeight: 1.6 }}>
            이 상세페이지의 사진은 인플루언서·블로거가 제공했거나 골라본이 직접 촬영한 검증 자료입니다.
            골라본은 사진 출처를 함께 표기하며, 제공 사진의 무단 도용·재배포를 금지합니다.
          </p>
        </div>
      </div>
    </div>
  );
}

function DetailPage({ p, go, liked, onLike }) {
  const compareRef = useRef(null);
  const infoRef = useRef(null);
  const reviewRef = useRef(null);
  const [tab, setTab] = useState('info');
  const isLiked = liked.includes(p.id);
  const isPlace = p.type === 'place';
  useEffect(() => { window.scrollTo(0, 0); setTab('info'); }, [p.id]);

  const related = DATA.products.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  const alt = p.altId ? GB.get(p.altId) : null;
  const lowest = isPlace ? null : Math.min(...p.prices.map(x => x.price));

  const blockTitles = isPlace
    ? ['왜 이곳을 골랐는가', '위치 · 접근성 · 첫인상', '실제 방문 후기', '좋았던 점', '아쉬웠던 점']
    : ['왜 이 제품을 골랐는가', '배송 및 포장 상태', '실제 사용 후기', '좋았던 점', '아쉬웠던 점'];
  const bodyBlocks = [
    { t: blockTitles[0], d: p.body.why },
    { t: blockTitles[1], d: p.body.ctx },
    { t: blockTitles[2], d: p.body.exp },
    { t: blockTitles[3], d: p.body.good, good: true },
    { t: blockTitles[4], d: p.body.bad, bad: true },
  ];
  const facts = isPlace
    ? [['직접 방문', p.visit], ['재방문 의향', p.revisit], ['가격대', p.priceRange]]
    : [['직접 사용', p.usedDays + '일'], ['재구매 의향', p.reBuy], ['최저가', fmt(p.priceFrom) + '원~']];

  const galleryLabel = isPlace ? '현장 사진' : '상품 이미지';
  const ctaLabel = isPlace ? '예약 · 방문 채널 보기' : '구매처 가격 비교 보기';
  const compareTitle = isPlace ? '예약 · 방문 채널' : '구매처 비교';
  const noPayNote = isPlace ? '골라본은 직접 예약을 제공하지 않습니다' : '골라본은 직접 결제를 제공하지 않습니다';
  const scrollTo = (ref) => { const el = ref.current; if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 150, behavior: 'smooth' }); };
  const scrollCompare = () => scrollTo(compareRef);
  const tabs = [
    { id: 'info', label: '상세 정보', ref: infoRef },
    { id: 'review', label: '검증 리뷰', ref: reviewRef },
    { id: 'buy', label: isPlace ? '예약·방문' : '구매처', ref: compareRef },
  ];
  const onTab = (t) => { setTab(t.id); scrollTo(t.ref); };

  return (
    <div className="fade-in">
      <div className="wrap" style={{ paddingTop: 22, paddingBottom: 60 }}>
        {/* breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--gray)', marginBottom: 18 }}>
          <button onClick={() => go('home')} style={{ color: 'var(--gray)' }}>홈</button>
          <Icon name="chevR" size={13} />
          <button onClick={() => go('cat:' + p.cat)} style={{ color: 'var(--gray)' }}>{p.catLabel}</button>
          <Icon name="chevR" size={13} />
          <span style={{ color: 'var(--ink-soft)', fontWeight: 600 }}>{p.name}</span>
        </div>

        {/* TOP: gallery + summary */}
        <div className="gb-detail-top" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, alignItems: 'start' }}>
          <div>
            <div className="sd-shot" style={{ aspectRatio: '1/1', boxShadow: 'var(--sh-md)', borderColor: 'transparent', position: 'relative' }}>
              <Slot id={`gb-${p.id}-g0`} ph={(isPlace ? '대표 현장 사진' : '대표 상품 이미지') + ' — 인플루언서 제공컷을 끌어다 놓으세요'} />
              <span style={{ position: 'absolute', top: 14, left: 14, zIndex: 3, pointerEvents: 'none' }}><Verdict v={p.verdict} /></span>
            </div>
            <div style={{ display: 'flex', gap: 9, marginTop: 12 }}>
              {[1,2,3,4].map(i => (
                <div key={i} className="sd-shot" style={{ width: 64, height: 64, flex: '0 0 auto', borderRadius: 10 }}>
                  <Slot id={`gb-${p.id}-g${i}`} ph="사진" radius={9} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 12, alignItems: 'center' }}>
              <span className="pcard__cat" style={{ fontSize: 13 }}>{p.catLabel}</span>
              {isPlace && <span style={{ fontSize: 12.5, color: 'var(--gray)', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                <Icon name="pin" size={13} style={{ color: 'var(--gray-light)' }} />{p.area}</span>}
              {p.badges.map(b => <MiniBadge key={b} type={b} />)}
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3vw,32px)', letterSpacing: '-0.035em', lineHeight: 1.22 }}>{p.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 12 }}>
              <Stars r={p.rating} size={15} />
              <span style={{ fontSize: 13, color: 'var(--gray-light)' }}>·</span>
              <span style={{ fontSize: 13, color: 'var(--gray)' }}>조회 {fmt(p.views)}</span>
              <button onClick={() => onLike(p.id)} style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: 13, fontWeight: 700, color: isLiked ? 'var(--coral)' : 'var(--gray)', padding: '7px 12px',
                border: '1px solid var(--line)', borderRadius: 999, background: '#fff' }}>
                <Icon name={isLiked ? 'heart' : 'heartLine'} size={16} fill={isLiked} /> 찜
              </button>
            </div>

            {/* one-line verdict */}
            <div style={{ background: 'var(--green-tint)', border: '1px solid var(--green-soft)', borderRadius: 'var(--r-lg)',
              padding: '16px 18px', marginTop: 18, display: 'flex', gap: 12 }}>
              <span style={{ flex: '0 0 auto', color: 'var(--green)' }}><Icon name="check" size={20} sw={2.4} /></span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green-deep)', marginBottom: 4 }}>한 줄 판정</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-soft)', fontWeight: 500 }}>"{p.verdictLine}"</p>
              </div>
            </div>

            {/* quick facts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 14 }}>
              {facts.map(([k, v], i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r-md)', padding: '13px 14px' }}>
                  <div style={{ fontSize: 11.5, color: 'var(--gray)', fontWeight: 600 }}>{k}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, marginTop: 4, letterSpacing: '-0.02em',
                    color: i === 2 ? 'var(--coral-deep)' : 'var(--ink)' }}>{v}</div>
                </div>
              ))}
            </div>

            <button className="btn btn-ink btn-block btn-lg" style={{ marginTop: 16 }} onClick={scrollCompare}>
              {ctaLabel} <Icon name="chevD" size={18} />
            </button>
            <p style={{ fontSize: 12, color: 'var(--gray-light)', textAlign: 'center', marginTop: 9 }}>
              {noPayNote} · 검증 내용을 먼저 확인하세요
            </p>
          </div>
        </div>

        {/* ===== PDP 탭 ===== */}
        <div className="sd-tabs">
          {tabs.map(t => (
            <button key={t.id} className={'sd-tab' + (tab === t.id ? ' on' : '')} onClick={() => onTab(t)}>{t.label}</button>
          ))}
        </div>

        {/* ===== 상세 정보 (쇼핑몰 상세컷) ===== */}
        <ShopDetail p={p} isPlace={isPlace} infoRef={infoRef} />

        {/* 검증 요약 카드 */}
        <div ref={reviewRef} style={{ marginTop: 56 }}>
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
                <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-soft)', textWrap: 'pretty' }}>{b.d}</p>
              </div>
            ))}

            {alt && (
              <div style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: 18, marginTop: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green-deep)', marginBottom: 12 }}>
                  {isPlace ? '여기 대신, 골라본이 추천하는 대안' : '이 제품 대신, 골라본이 추천하는 대체템'}
                </div>
                <button onClick={() => go('detail', alt.id)} style={{ display: 'flex', gap: 14, alignItems: 'center', width: '100%', textAlign: 'left' }}>
                  <div style={{ width: 70, height: 70, borderRadius: 10, overflow: 'hidden', flex: '0 0 auto' }}><ProductImg p={alt} label="" /></div>
                  <div style={{ flex: 1 }}>
                    <Verdict v={alt.verdict} sm />
                    <div style={{ fontSize: 15.5, fontWeight: 800, marginTop: 6 }}>{alt.name}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--gray)', marginTop: 2 }}>{alt.oneLiner}</div>
                  </div>
                  <Icon name="chevR" size={20} style={{ color: 'var(--gray-light)' }} />
                </button>
              </div>
            )}
          </div>

          {/* sticky side: compare */}
          <aside className="gb-detail-aside" ref={compareRef} style={{ position: 'sticky', top: 92 }}>
            <div className="card" style={{ padding: 18, boxShadow: 'var(--sh-md)', borderColor: 'transparent' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4, gap: 10 }}>
                <h3 style={{ fontSize: 17, whiteSpace: 'nowrap' }}>{compareTitle}</h3>
                {!isPlace && <span style={{ fontSize: 12, color: 'var(--gray)', whiteSpace: 'nowrap' }}>최저 {fmt(lowest)}원</span>}
                {isPlace && <span style={{ fontSize: 12, color: 'var(--gray)', whiteSpace: 'nowrap' }}>{p.priceRange}</span>}
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
              {related.map(rp => <ProductCard key={rp.id} p={rp} onOpen={(id) => go('detail', id)} liked={liked.includes(rp.id)} onLike={onLike} />)}
            </div>
          </div>
        )}
      </div>

      {/* mobile sticky CTA */}
      <div className="gb-mcta" style={{ display: 'none' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: 'var(--gray)' }}>{isPlace ? p.area : '최저 · ' + BRAND[p.prices.find(x=>x.price===lowest).brand].name}</div>
          <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.03em' }}>
            {isPlace ? p.priceRange : <>{fmt(lowest)}<span style={{ fontSize: 13 }}>원~</span></>}
          </div>
        </div>
        <button className="btn btn-ink" onClick={scrollCompare} style={{ flex: '0 0 auto' }}>
          {isPlace ? '예약 채널 보기' : '구매처 보기'} <Icon name="chevD" size={17} />
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { DetailPage });
