'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from './icons';
import { Logo } from './ui';
import { categories as CATS } from '@/lib/data';

const KEY = 'golabon_liked';

function SearchBar({ big }) {
  const router = useRouter();
  const phrases = ['연남 맛집', '성수 카페', '자취템', '방탈출', '감성 숙소', '동네 미용실'];
  const [ph, setPh] = useState(0);
  const [value, setValue] = useState('');
  useEffect(() => {
    const t = setInterval(() => setPh((p) => (p + 1) % phrases.length), 2400);
    return () => clearInterval(t);
  }, []);
  const submit = (e) => {
    e.preventDefault();
    router.push(value.trim() ? `/category/?q=${encodeURIComponent(value.trim())}` : '/category');
  };
  return (
    <form className="gb-search" onSubmit={submit}
      style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff',
        border: '2px solid var(--ink)', borderRadius: 'var(--r-pill)',
        padding: big ? '4px 6px 4px 20px' : '3px 4px 3px 16px', boxShadow: 'var(--sh-md)' }}>
      <Icon name="search" size={big ? 22 : 19} style={{ color: 'var(--gray)', flex: '0 0 auto' }} />
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder={`${phrases[ph]} 검색`}
        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent',
          fontSize: big ? 16 : 14.5, fontWeight: 500, color: 'var(--ink)', minWidth: 0 }} />
      <button type="submit" className="btn btn-green" style={{ padding: big ? '11px 22px' : '8px 16px', fontSize: big ? 15 : 13.5 }}>
        검색
      </button>
    </form>
  );
}

const NAV = [
  { label: '카테고리', href: '/category' },
  { label: '검증 기준', href: '/verify' },
  { label: '탈락템', href: '/rejected' },
  { label: '제휴·광고 고지', href: '/notice' },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [likedCount, setLikedCount] = useState(0);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h);
    try { setLikedCount(JSON.parse(localStorage.getItem(KEY) || '[]').length); } catch {}
    return () => window.removeEventListener('scroll', h);
  }, [pathname]);

  return (
    <>
      <div style={{ background: 'var(--green-deep)', color: '#fff' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32, fontSize: 12 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
            <Icon name="shield" size={13} fill /> 안 써보고 안 가본 건 추천하지 않습니다
          </span>
          <div style={{ display: 'flex', gap: 16 }} className="gb-util-links">
            <Link href="/notice" style={{ opacity: 0.9 }}>제휴·광고 고지</Link>
            <Link href="/verify" style={{ opacity: 0.9 }}>검증 기준</Link>
          </div>
        </div>
      </div>

      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,.94)',
        backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--line)',
        transition: 'box-shadow .2s', boxShadow: scrolled ? 'var(--sh-sm)' : 'none' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, height: 68 }}>
            <Logo />
            <div style={{ flex: 1, maxWidth: 520, minWidth: 0 }} className="gb-head-search">
              <SearchBar />
            </div>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 2, flex: '0 0 auto' }} className="gb-nav">
              {NAV.map((n) => (
                <Link key={n.label} href={n.href}
                  style={{ padding: '9px 11px', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap',
                    color: pathname === n.href ? 'var(--green-deep)' : 'var(--ink-soft)', borderRadius: 8 }}>
                  {n.label}
                </Link>
              ))}
              <Link href="/category" style={{ position: 'relative', padding: 9, marginLeft: 4, color: 'var(--ink-soft)' }} aria-label="찜">
                <Icon name="heartLine" size={22} />
                {likedCount > 0 && <span style={{ position: 'absolute', top: 2, right: 2, minWidth: 16, height: 16,
                  background: 'var(--coral)', color: '#fff', fontSize: 10, fontWeight: 800, borderRadius: 8,
                  display: 'grid', placeItems: 'center', padding: '0 4px' }}>{likedCount}</span>}
              </Link>
            </nav>
            <button className="gb-burger" onClick={() => setMobileOpen(true)}
              style={{ display: 'none', padding: 8, color: 'var(--ink)' }} aria-label="메뉴">
              <Icon name="menu" size={24} />
            </button>
          </div>

          <div className="gb-catstrip no-sb" style={{ display: 'flex', gap: 4, overflowX: 'auto', padding: '0 0 10px', marginTop: -2 }}>
            {CATS.map((c) => {
              const href = c.id === 'all' ? '/category' : `/category/${c.id}`;
              const on = pathname === href;
              return (
                <Link key={c.id} href={href}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 13px',
                    borderRadius: 'var(--r-pill)', fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap',
                    background: on ? 'var(--ink)' : 'transparent', color: on ? '#fff' : 'var(--ink-soft)',
                    border: '1px solid ' + (on ? 'var(--ink)' : 'transparent') }}>
                  <Icon name={c.icon} size={16} sw={1.6} style={{ color: on ? '#fff' : 'var(--green-deep)' }} />
                  {c.label}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(34,37,42,.4)', backdropFilter: 'blur(2px)' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', top: 0, right: 0, bottom: 0,
            width: 'min(82vw, 320px)', background: 'var(--cream)', boxShadow: 'var(--sh-lg)', padding: '18px 18px 30px',
            display: 'flex', flexDirection: 'column', gap: 6, animation: 'slideIn .25s var(--ease)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Logo />
              <button onClick={() => setMobileOpen(false)} style={{ padding: 6 }}><Icon name="close" size={24} /></button>
            </div>
            {NAV.map((n) => (
              <Link key={n.label} href={n.href} onClick={() => setMobileOpen(false)}
                style={{ textAlign: 'left', padding: '14px 12px', fontSize: 16, fontWeight: 600, borderRadius: 10, color: 'var(--ink)' }}>
                {n.label}
              </Link>
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
