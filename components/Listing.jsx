'use client';
import { useEffect, useMemo, useState } from 'react';
import { ProductCard } from './ProductCard';

// 목록 그리드. allowSearch면 URL ?q= 로 클라이언트 필터 (정적 export 호환)
export function Listing({ items, allowSearch }) {
  const [q, setQ] = useState('');

  useEffect(() => {
    if (!allowSearch) return;
    const params = new URLSearchParams(window.location.search);
    setQ(params.get('q') || '');
  }, [allowSearch]);

  const filtered = useMemo(() => {
    if (!q) return items;
    const k = q.toLowerCase();
    return items.filter((p) =>
      [p.name, p.oneLiner, p.catLabel, p.area].filter(Boolean).some((s) => s.toLowerCase().includes(k))
    );
  }, [items, q]);

  return (
    <>
      {allowSearch && q && (
        <p style={{ fontSize: 14, color: 'var(--gray)', marginBottom: 18 }}>
          <b style={{ color: 'var(--ink)' }}>&quot;{q}&quot;</b> 검색 결과 {filtered.length}건
        </p>
      )}
      {filtered.length === 0 ? (
        <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--gray)' }}>
          검색 결과가 없습니다. 다른 키워드로 찾아보세요.
        </div>
      ) : (
        <div className="grid-cards">
          {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </>
  );
}
