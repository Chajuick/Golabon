/* ============================================================
   홈 화면
   ============================================================ */
const { useState, useEffect, useRef } = React;
const DATA = window.GOLABON_DATA;
const GB = window.GB;

function Hero({ go }) {
  const feat = GB.get('yeonnam-noodle');
  const facts = [
    { k: '직접 방문', v: feat.visit, c: 'var(--green-deep)', bg: 'var(--green-tint)' },
    { k: '재방문 의향', v: feat.revisit, c: 'var(--ink)', bg: 'var(--cream)' },
    { k: '가격대', v: feat.priceRange, c: 'var(--coral-deep)', bg: 'var(--cream)' },
  ];
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #fff 0%, var(--cream) 100%)', borderBottom: '1px solid var(--line)' }}>
      <div style={{ position: 'absolute', inset: 0, background:
        'radial-gradient(110% 80% at 92% 0%, rgba(31,158,120,.07), transparent 60%)' }} />
      <div className="wrap" style={{ position: 'relative', padding: '40px 24px 30px' }}>
        <div className="gb-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr .85fr', gap: 36, alignItems: 'center' }}>
          <div className="fade-in">
            <span className="badge" style={{ background: '#fff', border: '1px solid var(--line)', color: 'var(--green-deep)', fontSize: 12.5, padding: '7px 13px' }}>
              <Icon name="shield" size={14} fill /> 직접 써보고 가본 것만
            </span>
            <h1 style={{ fontSize: 'clamp(30px, 4.4vw, 50px)', lineHeight: 1.18, marginTop: 18, letterSpacing: '-0.035em', color: 'var(--ink)' }}>
              직접 써보고<br />가본 것만<br />
              <span style={{ color: 'var(--green-deep)' }}>골라봤습니다.</span>
            </h1>
            <p style={{ fontSize: 'clamp(15px,1.7vw,18px)', color: 'var(--gray)', marginTop: 22, lineHeight: 1.6, maxWidth: 460, fontWeight: 500 }}>
              생활용품·패션부터 맛집·카페·숙소·미용실까지. 흩어진 채 검증되지 않은 협찬·홍보를,
              골라본이 <b style={{ color: 'var(--ink-soft)' }}>먼저 써보고 가본 뒤 검증</b>합니다.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
              <button className="btn btn-green btn-lg" onClick={() => go('category')}>
                검증된 추천 보기 <Icon name="arrowR" size={18} />
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => go('rejected')}>
                <Icon name="thumbDn" size={17} /> 비추천·탈락 먼저 보기
              </button>
            </div>
          </div>

          {/* featured verify card */}
          <div className="gb-hero-card fade-in" style={{ animationDelay: '.08s' }}>
            <div className="card" style={{ boxShadow: 'var(--sh-lg)', borderColor: 'transparent', overflow: 'visible' }}>
              <div style={{ position: 'relative', borderRadius: 'var(--r-lg) var(--r-lg) 0 0', overflow: 'hidden', aspectRatio: '16/11' }}>
                <ProductImg p={feat} label="대표 검증 · 현장 사진" />
                <span style={{ position: 'absolute', top: 14, left: 14 }}><Verdict v="rec" /></span>
                <span style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(28,31,36,.82)', color: '#fff',
                  fontSize: 12, fontWeight: 700, padding: '6px 11px', borderRadius: 999, backdropFilter: 'blur(4px)' }}>
                  오늘의 검증
                </span>
              </div>
              <div style={{ padding: '16px 18px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.02em' }}>{feat.name}</div>
                  <Stars r={feat.rating} />
                </div>
                <div style={{ fontSize: 12, color: 'var(--gray)', marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                  <Icon name="pin" size={12} style={{ color: 'var(--gray-light)' }} />{feat.area} · {feat.catLabel}
                </div>
                <p style={{ fontSize: 13.5, color: 'var(--gray)', marginTop: 7, lineHeight: 1.5 }}>"{feat.verdictLine}"</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                  {facts.map((f, i) => (
                    <div key={i} style={{ flex: 1, background: f.bg, borderRadius: 10, padding: '9px 11px', minWidth: 0 }}>
                      <div style={{ fontSize: 11, color: 'var(--gray)', fontWeight: 600 }}>{f.k}</div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: f.c, letterSpacing: '-0.01em' }}>{f.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => go('detail', feat.id)} className="btn btn-ink btn-block" style={{ marginTop: 10 }}>
              검증 리뷰 자세히 보기 <Icon name="arrowR" size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <div className="wrap">
      <div className="gb-trust" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1,
        background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
        {DATA.stats.map((s, i) => (
          <div key={i} style={{ background: '#fff', padding: '20px 18px', textAlign: 'center' }}>
            <div style={{ fontSize: 27, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.03em' }}>
              {s.n}<span style={{ fontSize: 15, color: 'var(--green-deep)', marginLeft: 1 }}>{s.unit}</span>
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--gray)', marginTop: 4, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardSection({ s, go, liked, onLike, carousel }) {
  const items = s.ids.map(id => GB.get(id));
  return (
    <section className="section">
      <div className="wrap">
        <div className="section__head">
          <div>
            <h2 className="section__title">{s.title}</h2>
            <div className="section__sub">{s.sub}</div>
          </div>
          <button className="section__more" onClick={() => go('category')}>전체 보기 <Icon name="chevR" size={15} /></button>
        </div>
        {carousel ? (
          <div className="crow no-sb">
            {items.map(p => <ProductCard key={p.id} p={p} onOpen={(id) => go('detail', id)} liked={liked.includes(p.id)} onLike={onLike} />)}
          </div>
        ) : (
          <div className="grid-cards">
            {items.map(p => <ProductCard key={p.id} p={p} onOpen={(id) => go('detail', id)} liked={liked.includes(p.id)} onLike={onLike} />)}
          </div>
        )}
      </div>
    </section>
  );
}

function RejectedTeaser({ go, liked, onLike }) {
  const items = DATA.products.filter(p => p.verdict === 'no');
  return (
    <section style={{ background: '#22252A', color: '#fff', marginTop: 20 }}>
      <div className="wrap section">
        <div className="section__head" style={{ alignItems: 'center' }}>
          <div>
            <span className="eyebrow" style={{ color: '#FF9C82' }}><Icon name="thumbDn" size={15} fill /> 거르는 것도 추천입니다</span>
            <h2 className="section__title" style={{ color: '#fff', marginTop: 8 }}>골라본 탈락 리스트</h2>
            <div className="section__sub" style={{ color: '#9AA0A8' }}>좋은 걸 고르는 것만큼, 사지 않아도·가지 않아도 되는 제품·장소를 알려드리는 것도 골라본의 역할입니다.</div>
          </div>
          <button className="section__more" style={{ color: '#C9CDD3' }} onClick={() => go('rejected')}>전체 탈락 리스트 <Icon name="chevR" size={15} /></button>
        </div>
        <div className="gb-rej-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
          {items.map(p => (
            <button key={p.id} onClick={() => go('detail', p.id)}
              style={{ display: 'flex', gap: 16, textAlign: 'left', background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(255,255,255,.09)', borderRadius: 'var(--r-lg)', padding: 14, transition: 'background .18s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.04)'}>
              <div style={{ width: 96, height: 96, borderRadius: 12, overflow: 'hidden', flex: '0 0 auto', position: 'relative', filter: 'saturate(.7)' }}>
                <ProductImg p={p} label="" />
                <span style={{ position: 'absolute', top: 7, left: 7 }}><Verdict v="no" sm /></span>
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>{p.name}</div>
                <div style={{ fontSize: 12.5, color: '#9AA0A8', marginTop: 3 }}>{p.catLabel} · {p.type === 'place' ? p.visit : p.usedDays + '일 써봄'}</div>
                <div style={{ display: 'flex', gap: 7, marginTop: 10, fontSize: 13, color: '#E8A99E', alignItems: 'flex-start', lineHeight: 1.45 }}>
                  <Icon name="xcirc" size={16} fill style={{ flex: '0 0 auto', marginTop: 1 }} />
                  <span>{p.cons[0]}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function VerifyCTA({ go }) {
  const steps = [
    { n: '01', t: '직접 사거나 가본다', d: '협찬·초대가 아닌, 직접 구매하고 방문한 것만 다룹니다.' },
    { n: '02', t: '충분히 겪어본다', d: '제품은 평균 17일 이상, 장소는 직접 방문해 겪습니다.' },
    { n: '03', t: '장점·단점을 함께 기록', d: '추천할 만한 이유가 있을 때만 추천합니다.' },
  ];
  return (
    <section className="section">
      <div className="wrap">
        <div style={{ background: 'linear-gradient(135deg, var(--green-tint), #fff)', border: '1px solid var(--line)',
          borderRadius: 'var(--r-xl)', padding: '36px 36px 34px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 26 }}>
            <div>
              <span className="eyebrow"><Icon name="shield" size={15} fill /> 골라본이 신뢰받는 이유</span>
              <h2 style={{ fontSize: 26, marginTop: 10, letterSpacing: '-0.03em' }}>골라본은 안 써보고 안 가본 것을 추천하지 않습니다.</h2>
            </div>
            <button className="btn btn-soft" onClick={() => go('verify')}>검증 기준 전체 보기 <Icon name="chevR" size={15} /></button>
          </div>
          <div className="gb-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {steps.map(s => (
              <div key={s.n} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: '18px 20px' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--green)', fontFamily: 'ui-monospace, monospace' }}>{s.n}</div>
                <div style={{ fontSize: 17, fontWeight: 800, marginTop: 8, letterSpacing: '-0.02em' }}>{s.t}</div>
                <div style={{ fontSize: 13.5, color: 'var(--gray)', marginTop: 6, lineHeight: 1.55 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage({ go, liked, onLike }) {
  return (
    <div>
      <Hero go={go} />
      <div style={{ marginTop: 6 }}><TrustStrip /></div>
      <CardSection s={DATA.sections[0]} go={go} liked={liked} onLike={onLike} />
      <CardSection s={DATA.sections[1]} go={go} liked={liked} onLike={onLike} />
      <div className="wrap"><hr className="divider" /></div>
      <CardSection s={DATA.sections[2]} go={go} liked={liked} onLike={onLike} />
      <CardSection s={DATA.sections[3]} go={go} liked={liked} onLike={onLike} carousel />
      <RejectedTeaser go={go} liked={liked} onLike={onLike} />
      <VerifyCTA go={go} />
    </div>
  );
}

Object.assign(window, { HomePage });
