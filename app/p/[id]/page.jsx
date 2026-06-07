import { notFound } from 'next/navigation';
import { products, GB } from '@/lib/data';
import { DetailView } from '@/components/detail/DetailView';

// 모든 상세 페이지를 정적 생성 (SSG)
export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

const verdictText = { rec: '추천', cond: '조건부 추천', no: '비추천' };

export function generateMetadata({ params }) {
  const p = GB.get(params.id);
  if (!p) return {};
  const v = verdictText[p.verdict];
  const title = `${p.name} 후기 — ${v} | 골라본 검증`;
  const description = p.verdictLine;
  return {
    title,
    description,
    openGraph: { title, description, type: 'article' },
    alternates: { canonical: `/p/${p.id}/` },
  };
}

function JsonLd({ p }) {
  const isPlace = p.type === 'place';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': isPlace ? 'LocalBusiness' : 'Product',
      name: p.name,
      ...(isPlace ? { address: p.area } : {}),
    },
    author: { '@type': 'Organization', name: '골라본' },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: p.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: p.verdictLine,
    datePublished: p.verifyDate?.replace(/\./g, '-'),
    positiveNotes: { '@type': 'ItemList', itemListElement: p.pros },
    negativeNotes: { '@type': 'ItemList', itemListElement: p.cons },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function Page({ params }) {
  const p = GB.get(params.id);
  if (!p) notFound();
  return (
    <>
      <JsonLd p={p} />
      <DetailView p={p} photos={p.photos} />
    </>
  );
}
