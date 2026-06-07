'use client';
// 상세페이지 상단 갤러리 — 메인 + 썸네일 + 라이트박스(크게보기·좌우 넘기기·스와이프)
import { useState, useEffect, useCallback } from 'react';
import { Icon } from './icons';

export function Gallery({ photos = [], badge = null, name = '', ph = '사진 준비 중이에요' }) {
  const imgs = photos.filter(Boolean);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [touch, setTouch] = useState(null);

  const total = imgs.length;
  const safe = (i) => (total ? (i + total) % total : 0);
  const next = useCallback(() => setActive((i) => safe(i + 1)), [total]);
  const prev = useCallback(() => setActive((i) => safe(i - 1)), [total]);

  // 라이트박스: 키보드 조작 + 바디 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, next, prev]);

  // 사진이 하나도 없을 때 placeholder
  if (total === 0) {
    return (
      <div className="sd-shot" style={{ aspectRatio: '1/1', position: 'relative' }}>
        <div className="imgph" style={{ background: 'var(--cream)' }}>
          <span className="imgph__label">{ph}</span>
        </div>
        {badge && <span className="gal-badge">{badge}</span>}
      </div>
    );
  }

  const onTouchStart = (e) => setTouch(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touch == null) return;
    const dx = e.changedTouches[0].clientX - touch;
    if (Math.abs(dx) > 45) (dx < 0 ? next : prev)();
    setTouch(null);
  };

  return (
    <div>
      {/* 메인 이미지 — 클릭 시 크게보기 */}
      <button
        type="button"
        className="sd-shot gal-main"
        style={{ aspectRatio: '1/1', boxShadow: 'var(--sh-md)', borderColor: 'transparent', position: 'relative', padding: 0, cursor: 'zoom-in', width: '100%' }}
        onClick={() => setOpen(true)}
        aria-label="사진 크게 보기"
      >
        <img src={imgs[active]} alt={`${name} 사진 ${active + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        {badge && <span className="gal-badge">{badge}</span>}
        <span className="gal-zoom"><Icon name="search" size={15} /> 크게 보기</span>
        {total > 1 && <span className="gal-count">{active + 1} / {total}</span>}
      </button>

      {/* 썸네일 스트립 */}
      {total > 1 && (
        <div className="gal-thumbs">
          {imgs.map((src, i) => (
            <button
              key={i}
              type="button"
              className={'gal-thumb' + (i === active ? ' on' : '')}
              onClick={() => setActive(i)}
              aria-label={`${i + 1}번 사진 보기`}
              aria-current={i === active}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}

      {/* 라이트박스 */}
      {open && (
        <div className="gal-lb" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label="사진 크게 보기">
          <button className="gal-lb-x" onClick={() => setOpen(false)} aria-label="닫기"><Icon name="close" size={22} sw={2.2} /></button>
          {total > 1 && (
            <button className="gal-lb-nav prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="이전 사진"><Icon name="chevL" size={26} sw={2.2} /></button>
          )}
          <figure className="gal-lb-stage" onClick={(e) => e.stopPropagation()} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <img src={imgs[active]} alt={`${name} 사진 ${active + 1}`} />
            {total > 1 && <figcaption className="gal-lb-count">{active + 1} / {total}</figcaption>}
          </figure>
          {total > 1 && (
            <button className="gal-lb-nav next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="다음 사진"><Icon name="chevR" size={26} sw={2.2} /></button>
          )}
        </div>
      )}
    </div>
  );
}
