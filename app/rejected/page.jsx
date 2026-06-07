import { products } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { Icon } from '@/components/icons';

export const metadata = {
  title: '탈락 리스트 — 골라본이 추천하지 않는 것',
  description: '좋은 걸 고르는 것만큼, 사지 않아도·가지 않아도 되는 제품·장소를 알려드립니다. 골라본의 비추천(탈락) 목록.',
};

export default function RejectedPage() {
  const no = products.filter((p) => p.verdict === 'no');
  const cond = products.filter((p) => p.verdict === 'cond');

  return (
    <div>
      <section style={{ background: '#22252A', color: '#fff' }}>
        <div className="wrap" style={{ padding: '48px 24px 40px' }}>
          <span className="eyebrow" style={{ color: '#FF9C82' }}><Icon name="thumbDn" size={15} fill /> 거르는 것도 추천입니다</span>
          <h1 className="section__title" style={{ color: '#fff', marginTop: 10, fontSize: 30 }}>골라본 탈락 리스트</h1>
          <p style={{ color: '#9AA0A8', marginTop: 10, fontSize: 15, lineHeight: 1.6, maxWidth: 620 }}>
            협찬·광고는 단점을 말하지 않습니다. 골라본은 직접 써보고 가본 뒤, 추천할 수 없다면 그 이유를 솔직하게 남깁니다.
            돈을 아끼고 시간을 아끼는 것도 좋은 선택입니다.
          </p>
        </div>
      </section>

      <div className="wrap section">
        <h2 className="section__title" style={{ marginBottom: 6 }}><Icon name="xcirc" size={20} fill style={{ color: 'var(--b-no)' }} /> 비추천</h2>
        <div className="section__sub" style={{ marginBottom: 22 }}>이건 사지·가지 않아도 됩니다 ({no.length}건)</div>
        <div className="grid-cards">
          {no.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>

        {cond.length > 0 && (
          <>
            <h2 className="section__title" style={{ marginTop: 48, marginBottom: 6 }}>
              <Icon name="spark" size={20} fill style={{ color: 'var(--b-cond)' }} /> 조건부 추천
            </h2>
            <div className="section__sub" style={{ marginBottom: 22 }}>용도가 맞을 때만 추천합니다 ({cond.length}건)</div>
            <div className="grid-cards">
              {cond.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
