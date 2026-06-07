'use client';
import { useEffect, useState } from 'react';
import { Icon } from './icons';

const KEY = 'golabon_liked';

function readLiked() {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}

/**
 * 찜 버튼. variant:
 *  - 'card'   : 카드 우상단 원형 오버레이 (Link 안에서 네비게이션 막음)
 *  - 'detail' : 상세페이지 우측 알약형 버튼
 */
export function LikeButton({ id, variant = 'card' }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => { setLiked(readLiked().includes(id)); }, [id]);

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const cur = readLiked();
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    localStorage.setItem(KEY, JSON.stringify(next));
    setLiked(next.includes(id));
  };

  if (variant === 'detail') {
    return (
      <button onClick={toggle} aria-pressed={liked} style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5,
        fontSize: 13, fontWeight: 700, color: liked ? 'var(--coral)' : 'var(--gray)', padding: '7px 12px',
        border: '1px solid var(--line)', borderRadius: 999, background: '#fff', cursor: 'pointer' }}>
        <Icon name={liked ? 'heart' : 'heartLine'} size={16} fill={liked} /> 찜
      </button>
    );
  }

  return (
    <span className={'pcard__like' + (liked ? ' on' : '')} onClick={toggle} role="button" aria-label="찜">
      <Icon name={liked ? 'heart' : 'heartLine'} size={17} fill={liked} />
    </span>
  );
}
