import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories, GB } from '@/lib/data';
import { Listing } from '@/components/Listing';
import { Icon } from '@/components/icons';

// 'all'을 제외한 카테고리별 정적 페이지 생성
export function generateStaticParams() {
  return categories.filter((c) => c.id !== 'all').map((c) => ({ cat: c.id }));
}

export function generateMetadata({ params }) {
  const c = categories.find((x) => x.id === params.cat);
  if (!c) return {};
  return {
    title: `${c.label} 검증`,
    description: `골라본이 직접 검증한 ${c.label} 카테고리의 추천·비추천 목록.`,
    alternates: { canonical: `/category/${c.id}/` },
  };
}

export default function CategoryPage({ params }) {
  const c = categories.find((x) => x.id === params.cat);
  if (!c) notFound();
  const items = GB.byCat(c.id);

  return (
    <div className="wrap section">
      <div className="section__head">
        <div>
          <h1 className="section__title"><Icon name={c.icon} size={22} style={{ color: 'var(--green-deep)' }} /> {c.label}</h1>
          <div className="section__sub">직접 써보고 가본 {c.label} {items.length}건</div>
        </div>
      </div>

      <div className="no-sb" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 18 }}>
        {categories.map((x) => (
          <Link key={x.id} href={x.id === 'all' ? '/category' : `/category/${x.id}`}
            className={'chip' + (x.id === c.id ? ' on' : '')}>
            <Icon name={x.icon} size={15} style={{ color: x.id === c.id ? '#fff' : 'var(--green-deep)' }} /> {x.label}
          </Link>
        ))}
      </div>

      {items.length === 0 ? (
        <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--gray)' }}>
          아직 이 카테고리에 검증된 항목이 없습니다.
        </div>
      ) : (
        <Listing items={items} />
      )}
    </div>
  );
}
