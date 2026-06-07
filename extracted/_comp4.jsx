/* ============================================================
   카테고리 · 탈락템 · 검증기준 · 고지 · 찜 페이지
   ============================================================ */
const { useState, useEffect, useRef } = React;
const DATA = window.GOLABON_DATA, GB = window.GB, BRAND = window.GOLABON_DATA.brands, fmt = window.GB.fmt;

const SORTS = [
  { id: 'rec', label: '추천순' },
  { id: 'recent', label: '최신검증순' },
  { id: 'value', label: '가성비순' },
  { id: 'views', label: '인기순' },
];
const VFILTERS = [
  { id: 'all', label: '전체' },
  { id: 'rec', label: '추천' },
  { id: 'cond', label: '조건부 추천' },
  { id: 'no', label: '비추천' },
];

function PageHead({ eyebrow, title, sub, dark }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <span className="eyebrow" style={dark ? { color: '#FF9C82' } : null}>{eyebrow}</span>
      <h1 style={{ fontSize: 'clamp(26px,3.4vw,38px)', letterSpacing: '-0.035em', marginTop: 10, color: dark ? '#fff' : 'var(--ink)' }}>{title}</h1>
      {sub && <p style={{ fontSize: 15.5, color: dark ? '#9AA0A8' : 'var(--gray)', marginTop: 12, maxWidth: 620, lineHeight: 1.6 }}>{sub}</p>}
    </div>
  );
}

function CategoryPage({ go, liked, onLike, activeCat, onCat, search }) {
  const [sort, setSort] = useState('rec');
  const [vf, setVf] = useState('all');

  let items = GB.byCat(activeCat);
  if (search) {
    const q = search.trim().toLowerCase();
    items = items.filter(p => (p.name + p.oneLiner + p.catLabel + (p.area || '')).toLowerCase().includes(q));
  }
  if (vf !== 'all') items = items.filter(p => p.verdict === vf);
  items = [...items].sort((a, b) => {
    if (sort === 'value') return (a.priceFrom || 999999) - (b.priceFrom || 999999);
    if (sort === 'views') return b.views - a.views;
    if (sort === 'recent') return b.verifyDate.localeCompare(a.verifyDate);
    const order = { rec: 0, cond: 1, no: 2 };
    return order[a.verdict] - order[b.verdict] || b.rating - a.rating;
  });
  const catLabel = DATA.categories.find(c => c.id === activeCat).label;

  return (
    <div className="wrap fade-in" style={{ paddingTop: 26, paddingBottom: 60 }}>
      <PageHead eyebrow={<><Icon name="grid" size={14} /> 검증 탐색</>}
        title={search ? `'${search}' 검색 결과` : (activeCat === 'all' ? '전체 검증 리스트' : catLabel)}
        sub="모든 제품·장소는 골라본이 직접 써보고 가본 뒤 추천 여부를 기록했습니다. 값싸고 유명한 게 아니라, 검증 결과로 정렬해 보세요." />

      {/* category chips */}
      <div className="no-sb" style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '18px 0 4px' }}>
        {DATA.categories.map(c => (
          <button key={c.id} className={'chip' + (activeCat === c.id ? ' on' : '')} onClick={() => onCat(c.id)}>
            <Icon name={c.icon} size={15} style={{ color: activeCat === c.id ? '#fff' : 'var(--green-deep)' }} />{c.label}
          </button>
        ))}
      </div>

      {/* toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        margin: '20px 0 22px', paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>총 {items.length}개</span>
          <div className="pill-toggle">
            {VFILTERS.map(f => <button key={f.id} className={vf === f.id ? 'on' : ''} onClick={() => setVf(f.id)}>{f.label}</button>)}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {SORTS.map(s => (
            <button key={s.id} onClick={() => setSort(s.id)}
              style={{ fontSize: 13.5, fontWeight: 700, padding: '8px 12px', borderRadius: 8,
                color: sort === s.id ? 'var(--ink)' : 'var(--gray-light)',
                background: sort === s.id ? 'var(--cream-deep)' : 'transparent' }}>{s.label}</button>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--gray)' }}>
          <Icon name="search" size={40} style={{ color: 'var(--line)' }} />
          <p style={{ marginTop: 14, fontSize: 15 }}>조건에 맞는 검증템이 없어요.</p>
        </div>
      ) : (
        <div className="grid-cards">
          {items.map(p => <ProductCard key={p.id} p={p} onOpen={(id) => go('detail', id)} liked={liked.includes(p.id)} onLike={onLike} />)}
        </div>
      )}
    </div>
  );
}

function RejectedPage({ go, liked, onLike }) {
  const items = DATA.products.filter(p => p.verdict === 'no');
  return (
    <div className="fade-in">
      <div style={{ background: '#22252A', color: '#fff' }}>
        <div className="wrap" style={{ padding: '40px 24px 36px' }}>
          <PageHead dark eyebrow={<><Icon name="thumbDn" size={14} fill /> 비추천 · 탈락 리스트</>}
            title="사거나 가지 않아도 되는 것"
            sub="좋은 걸 고르는 것만큼, 거르는 걸 알려드리는 것도 골라본의 역할입니다. 직접 써보고 가본 뒤 추천하지 않기로 한 제품·장소를 솔직하게 공개합니다." />
        </div>
      </div>
      <div className="wrap" style={{ padding: '32px 24px 60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {items.map(p => {
            const alt = p.altId ? GB.get(p.altId) : null;
            return (
              <div key={p.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="gb-rej-row" style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 0 }}>
                  <button onClick={() => go('detail', p.id)} style={{ position: 'relative', aspectRatio: '1/1', filter: 'saturate(.75)' }}>
                    <ProductImg p={p} label="" />
                    <span style={{ position: 'absolute', top: 10, left: 10 }}><Verdict v="no" sm /></span>
                  </button>
                  <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: 12, color: 'var(--gray-light)', fontWeight: 600 }}>{p.catLabel} · {p.type === 'place' ? p.visit : p.usedDays + '일 직접 써봄'}</div>
                        <button onClick={() => go('detail', p.id)} style={{ fontSize: 19, fontWeight: 800, marginTop: 3, textAlign: 'left' }}>{p.name}</button>
                      </div>
                      <Stars r={p.rating} />
                    </div>
                    <div style={{ background: '#FCF1EF', border: '1px solid #F6DAD5', borderRadius: 10, padding: '11px 13px', marginTop: 12 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--b-no)', marginBottom: 6 }}>왜 비추천인가</div>
                      {p.cons.map((c, i) => (
                        <div key={i} style={{ display: 'flex', gap: 7, fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.5, marginBottom: 4 }}>
                          <Icon name="close" size={15} sw={2.4} style={{ color: 'var(--b-no)', flex: '0 0 auto', marginTop: 2 }} /><span>{c}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 14, flexWrap: 'wrap' }}>
                      {alt && (
                        <button onClick={() => go('detail', alt.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
                          fontSize: 13.5, fontWeight: 700, color: 'var(--green-deep)', background: 'var(--green-tint)',
                          border: '1px solid var(--green-soft)', borderRadius: 999, padding: '8px 14px' }}>
                          <Icon name="check" size={15} sw={2.4} /> 대체 추천: {alt.name} <Icon name="chevR" size={14} />
                        </button>
                      )}
                      <button onClick={() => go('detail', p.id)} className="section__more" style={{ marginLeft: 'auto' }}>
                        검증 리뷰 보기 <Icon name="chevR" size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function VerifyPage({ go }) {
  const criteria = [
    { icon: 'box', t: '실제 구매·방문 여부', d: '협찬·초대가 아닌, 직접 결제하고 직접 찾아간 것만 다룹니다.' },
    { icon: 'shield', t: '직접 경험 기간', d: '제품은 평균 17일 이상 사용, 장소는 직접 방문·이용해 검증합니다.' },
    { icon: 'truck', t: '배송·포장 / 현장 상태', d: '제품은 포장·배송을, 장소는 접근성·청결·첫인상을 기록합니다.' },
    { icon: 'search', t: '사진과 실물·현장 차이', d: '광고 이미지와 실제 제품·매장이 얼마나 다른지 확인합니다.' },
    { icon: 'check', t: '마감 · 서비스 품질', d: '제품 마감, 장소의 음식·응대·서비스 품질을 직접 점검합니다.' },
    { icon: 'drop', t: '냄새 · 청결', d: '제품 냄새·오염, 매장 위생·청결 상태를 살핍니다.' },
    { icon: 'spark', t: '사용 · 이용 편의성', d: '실제로 쓰기·이용하기 편한지, 손이 다시 가는지 봅니다.' },
    { icon: 'plug', t: '내구성 · 일관성', d: '제품 고장·마모, 장소의 맛·서비스 일관성을 추적합니다.' },
    { icon: 'thumbUp', t: '가격 대비 만족도', d: '구매처·채널별 가격과 실제 만족도를 함께 비교합니다.' },
    { icon: 'heartLine', t: '재구매 · 재방문 의향', d: '다시 살지, 다시 갈지 솔직하게 답합니다.' },
  ];
  return (
    <div className="wrap fade-in" style={{ paddingTop: 26, paddingBottom: 60 }}>
      <PageHead eyebrow={<><Icon name="shield" size={14} fill /> 골라본 검증 기준</>}
        title="안 써보고 안 가본 곣은 추천하지 않습니다."
        sub="직접 써보고 가본 뒤, 장점과 단점을 함께 기록하고, 추천할 만한 이유가 있는 제품·장소만 소개합니다. 골라본이 모든 대상을 어떤 기준으로 검증하는지 공개합니다." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 30 }} className="gb-verify-grid">
        {criteria.map((c, i) => (
          <div key={i} className="card" style={{ padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 10 }}>
              <span style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--green-tint)',
                display: 'grid', placeItems: 'center', color: 'var(--green-deep)', flex: '0 0 auto' }}>
                <Icon name={c.icon} size={19} fill={['shield','check','spark','thumbUp'].includes(c.icon)} />
              </span>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--gray-light)', fontFamily: 'ui-monospace, monospace' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
            <div style={{ fontSize: 16.5, fontWeight: 800, letterSpacing: '-0.02em' }}>{c.t}</div>
            <p style={{ fontSize: 13.5, color: 'var(--gray)', marginTop: 6, lineHeight: 1.55 }}>{c.d}</p>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--ink)', color: '#fff', borderRadius: 'var(--r-xl)', padding: '32px 36px', marginTop: 30,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 18 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em' }}>이 기준을 통과한 것만 추천합니다.</div>
          <p style={{ fontSize: 14, color: '#9AA0A8', marginTop: 8 }}>통과하지 못한 제품·장소는 탈락 리스트로 솔직하게 공개합니다.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-green" onClick={() => go('category')}>검증 추천 보기</button>
          <button className="btn" style={{ background: 'rgba(255,255,255,.1)', color: '#fff' }} onClick={() => go('rejected')}>탈락 리스트 보기</button>
        </div>
      </div>
    </div>
  );
}

function NoticePage({ go }) {
  const blocks = [
    { t: '제휴 링크 포함', d: '골라본의 제품·장소 페이지에는 쿠팡 파트너스, 알리·테무, 무신사·지그재그, 네이버·캐치테이블·야놀자·여기어때·에어비앤비 등의 제휴 링크가 포함되어 있습니다. 사용자가 이 링크를 통해 외부 채널로 이동해 구매·예약할 경우, 골라본은 일정 수수료를 제공받을 수 있습니다.' },
    { t: '추천은 수수료와 무관합니다', d: '추천 / 조건부 추천 / 비추천 판정은 오직 실제 사용·방문 경험과 자체 검증 기준에 따라 결정됩니다. 수수료가 더 높은 채널·브랜드라고 해서 우선 추천하지 않으며, 단점도 동일하게 공개합니다.' },
    { t: '직접 결제·예약은 제공하지 않습니다', d: '골라본은 자체 결제·예약 기능을 제공하지 않습니다. 모든 구매·예약은 외부 채널에서 이루어지며, 결제·배송·방문·교환·환불은 해당 채널 정책을 따릅니다.' },
    { t: '가격·정보는 변동될 수 있습니다', d: '표기된 채널별 가격·웨이팅·운영 정보는 검증 시점 기준이며, 실제 내용은 시점·옵션·프로모션에 따라 달라질 수 있습니다. 최종 정보는 각 채널에서 확인해 주세요.' },
  ];
  return (
    <div className="wrap fade-in" style={{ paddingTop: 26, paddingBottom: 60, maxWidth: 820 }}>
      <PageHead eyebrow={<><Icon name="shield" size={14} fill /> 제휴 · 광고 고지</>}
        title="투명하게 알려드립니다."
        sub="골라본은 신뢰가 전부인 서비스입니다. 수익 구조를 숨기지 않고 명확히 고지합니다." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 28 }}>
        {blocks.map((b, i) => (
          <div key={i} className="card" style={{ padding: '20px 24px', display: 'flex', gap: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--green)', fontFamily: 'ui-monospace, monospace', flex: '0 0 auto', marginTop: 2 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.02em' }}>{b.t}</div>
              <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', marginTop: 7, lineHeight: 1.7, textWrap: 'pretty' }}>{b.d}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-green btn-lg" style={{ marginTop: 24 }} onClick={() => go('verify')}>
        골라본 검증 기준 보기 <Icon name="arrowR" size={17} />
      </button>
    </div>
  );
}

function LikedPage({ go, liked, onLike }) {
  const items = liked.map(id => GB.get(id)).filter(Boolean);
  return (
    <div className="wrap fade-in" style={{ paddingTop: 26, paddingBottom: 60 }}>
      <PageHead eyebrow={<><Icon name="heart" size={14} fill /> 내가 찜한 검증템</>} title={`찜한 항목 ${items.length}개`}
        sub="관심 있게 본 검증템을 모아뒀어요. 구매 전 검증 내용을 다시 확인해 보세요." />
      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '70px 20px' }}>
          <Icon name="heartLine" size={44} style={{ color: 'var(--line)' }} />
          <p style={{ marginTop: 14, fontSize: 15, color: 'var(--gray)' }}>아직 찜한 항목이 없어요.</p>
          <button className="btn btn-green" style={{ marginTop: 18 }} onClick={() => go('category')}>검증 둘러보기</button>
        </div>
      ) : (
        <div className="grid-cards" style={{ marginTop: 24 }}>
          {items.map(p => <ProductCard key={p.id} p={p} onOpen={(id) => go('detail', id)} liked onLike={onLike} />)}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { CategoryPage, RejectedPage, VerifyPage, NoticePage, LikedPage });
