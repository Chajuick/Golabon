/* ============================================================
   골라본 헤더 (검색 · 카테고리 네비 · 모바일)
   ============================================================ */
const { useState, useEffect, useRef } = React;
const CATS = window.GOLABON_DATA.categories;

function SearchBar({ value, onChange, onSubmit, big }) {
  const phrases = ['연남 맛집', '성수 카페', '자취템', '방탈출', '감성 숙소', '동네 미용실'];
  const [ph, setPh] = useState(0);
  useEffect(() => { const t = setInterval(() => setPh(p => (p + 1) % phrases.length), 2400); return () => clearInterval(t); }, []);
  return (
    <form className="gb-search" onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(); }}
      style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff',
        border: '2px solid var(--ink)', borderRadius: 'var(--r-pill)',
        padding: big ? '4px 6px 4px 20px' : '3px 4px 3px 16px', boxShadow: 'var(--sh-md)' }}>
      <Icon name="search" size={big ? 22 : 19} style={{ color: 'var(--gray)', flex: '0 0 auto' }} />
      <input value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={`${phrases[ph]} 검색`}
        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent',
          fontSize: big ? 16 : 14.5, fontWeight: 500, color: 'var(--ink)', minWidth: 0 }} />
      <button type="submit" className="btn btn-green" style={{ padding: big ? '11px 22px' : '8px 16px', fontSize: big ? 15 : 13.5 }}>
        검색
      </button>
    </form>
  );
}

function Header({ go, route, search, setSearch, onSearch, activeCat, onCat, liked }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h);
  }, []);
  const nav = [
    { label: '카테고리', r: 'category' },
    { label: '검증 기준', r: 'verify' },
    { label: '탈락템', r: 'rejected' },
    { label: '인기 검증템', r: 'category' },
  ];
  return (
    <>
      {/* utility bar */}
      <div style={{ background: 'var(--green-deep)', color: '#fff' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32, fontSize: 12 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
            <Icon name="shield" size={13} fill /> 안 써보고 안 가본 건 추천하지 않습니다
          </span>
          <div style={{ display: 'flex', gap: 16 }} className="gb-util-links">
            <button onClick={() => go('notice')} style={{ opacity: .9 }}>제휴·광고 고지</button>
            <button onClick={() => go('verify')} style={{ opacity: .9 }}>검증 기준</button>
          </div>
        </div>
      </div>

      {/* main header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,.94)',
        backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--line)',
        transition: 'box-shadow .2s', boxShadow: scrolled ? 'var(--sh-sm)' : 'none' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, height: 68 }}>
            <Logo onClick={() => go('home')} />
            <div style={{ flex: 1, maxWidth: 520, minWidth: 0 }} className="gb-head-search">
              <SearchBar value={search} onChange={setSearch} onSubmit={onSearch} />
            </div>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 2, flex: '0 0 auto' }} className="gb-nav">
              {nav.map(n => (
                <button key={n.label} onClick={() => go(n.r)}
                  style={{ padding: '9px 11px', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap',
                    color: route === n.r ? 'var(--green-deep)' : 'var(--ink-soft)', borderRadius: 8, transition: 'color .15s' }}>
                  {n.label}
                </button>
              ))}
              <button onClick={() => go('liked')} style={{ position: 'relative', padding: 9, marginLeft: 4, color: 'var(--ink-soft)' }} aria-label="찜">
                <Icon name="heartLine" size={22} />
                {liked.length > 0 && <span style={{ position: 'absolute', top: 2, right: 2, minWidth: 16, height: 16,
                  background: 'var(--coral)', color: '#fff', fontSize: 10, fontWeight: 800, borderRadius: 8,
                  display: 'grid', placeItems: 'center', padding: '0 4px' }}>{liked.length}</span>}
              </button>
            </nav>
            <button className="gb-burger" onClick={() => setMobileOpen(true)}
              style={{ display: 'none', padding: 8, color: 'var(--ink)' }} aria-label="메뉴">
              <Icon name="menu" size={24} />
            </button>
          </div>

          {/* category strip */}
          <div className="gb-catstrip no-sb" style={{ display: 'flex', gap: 4, overflowX: 'auto',
            padding: '0 0 10px', marginTop: -2 }}>
            {CATS.map(c => {
              const on = activeCat === c.id && route === 'category';
              return (
                <button key={c.id} onClick={() => onCat(c.id)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 13px',
                    borderRadius: 'var(--r-pill)', fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap',
                    background: on ? 'var(--ink)' : 'transparent', color: on ? '#fff' : 'var(--ink-soft)',
                    border: '1px solid ' + (on ? 'var(--ink)' : 'transparent'), transition: 'all .15s' }}
                  onMouseEnter={e => { if (!on) e.currentTarget.style.background = 'rgba(34,37,42,.05)'; }}
                  onMouseLeave={e => { if (!on) e.currentTarget.style.background = 'transparent'; }}>
                  <Icon name={c.icon} size={16} sw={1.6} style={{ color: on ? '#fff' : 'var(--green-deep)' }} />
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* mobile drawer */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(34,37,42,.4)', backdropFilter: 'blur(2px)' }}>
          <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', top: 0, right: 0, bottom: 0,
            width: 'min(82vw, 320px)', background: 'var(--cream)', boxShadow: 'var(--sh-lg)', padding: '18px 18px 30px',
            display: 'flex', flexDirection: 'column', gap: 6, animation: 'slideIn .25s var(--ease)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Logo onClick={() => { go('home'); setMobileOpen(false); }} />
              <button onClick={() => setMobileOpen(false)} style={{ padding: 6 }}><Icon name="close" size={24} /></button>
            </div>
            {nav.concat([{ label: '찜한 제품', r: 'liked' }, { label: '제휴·광고 고지', r: 'notice' }]).map(n => (
              <button key={n.label} onClick={() => { go(n.r); setMobileOpen(false); }}
                style={{ textAlign: 'left', padding: '14px 12px', fontSize: 16, fontWeight: 600,
                  borderRadius: 10, color: 'var(--ink)' }}
                onMouseEnter={e => e.currentTarget.style.background = '#fff'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>{n.label}</button>
            ))}
            <div style={{ marginTop: 'auto', fontSize: 12, color: 'var(--gray)', lineHeight: 1.6,
              background: '#fff', border: '1px solid var(--line)', borderRadius: 10, padding: 12 }}>
              <b>골라본</b>은 직접 써보고 가본 것만 소개하고, 제휴 링크를 투명하게 고지합니다.
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:none}}`}</style>
    </>
  );
}

Object.assign(window, { Header, SearchBar });
