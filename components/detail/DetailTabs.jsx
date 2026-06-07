'use client';
import { useEffect, useState } from 'react';

// 상세 탭바 — 섹션으로 부드럽게 스크롤 + 현재 위치 하이라이트
export function DetailTabs({ tabs }) {
  const [active, setActive] = useState(tabs[0]?.id);

  useEffect(() => {
    const els = tabs.map((t) => document.getElementById(t.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-140px 0px -60% 0px', threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [tabs]);

  const go = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: 'smooth' });
  };

  return (
    <div className="sd-tabs">
      {tabs.map((t) => (
        <a key={t.id} href={`#${t.id}`} onClick={(e) => go(e, t.id)}
          className={'sd-tab' + (active === t.id ? ' on' : '')}>{t.label}</a>
      ))}
    </div>
  );
}
