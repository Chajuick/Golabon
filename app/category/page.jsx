import Link from 'next/link';
import { products, categories } from '@/lib/data';
import { Listing } from '@/components/Listing';
import { Icon } from '@/components/icons';

export const metadata = {
  title: '전체 검증 — 카테고리',
  description: '골라본이 직접 써보고 가본 제품·장소 전체 검증 목록.',
};

export default function CategoryAll() {
  return (
    <div className="wrap section">
      <div className="section__head">
        <div>
          <h1 className="section__title">전체 검증</h1>
          <div className="section__sub">직접 써보고 가본 {products.length}건 — 추천부터 비추천(탈락)까지</div>
        </div>
      </div>

      <div className="no-sb" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 18 }}>
        {categories.map((c) => (
          <Link key={c.id} href={c.id === 'all' ? '/category' : `/category/${c.id}`} className="chip">
            <Icon name={c.icon} size={15} style={{ color: 'var(--green-deep)' }} /> {c.label}
          </Link>
        ))}
      </div>

      <Listing items={products} allowSearch />
    </div>
  );
}
