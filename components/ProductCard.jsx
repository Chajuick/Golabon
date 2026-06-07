// 제품·장소 카드 — 원본 ProductCard 이식. SPA onClick → next/link 네비게이션
import Link from 'next/link';
import { Icon } from './icons';
import { Verdict, ProductImg, BrandDot, Stars, fmt } from './ui';
import { LikeButton } from './LikeButton';
import { brands as BRAND } from '@/lib/data';

export function ProductCard({ p }) {
  const isPlace = p.type === 'place';

  let priceNode;
  if (isPlace) {
    priceNode = (
      <div className="pcard__placefoot">
        {/* 장소 — 강조 */}
        <div className="pcard__place">
          <Icon name="pin" size={14} style={{ color: 'var(--green)', flex: '0 0 auto' }} />
          <span className="pcard__place-txt">{p.area}</span>
        </div>
        {/* 가격대 · 채널 */}
        <div className="pcard__placerow">
          <div className="pcard__priceval" style={{ fontSize: 15 }}>{p.priceShort}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {p.channels.map((c) => <BrandDot key={c.brand} brand={c.brand} size={20} />)}
          </div>
        </div>
      </div>
    );
  } else {
    const lowest = Math.min(...p.prices.map((x) => x.price));
    const lowestBrand = p.prices.find((x) => x.price === lowest).brand;
    priceNode = (
      <div className="pcard__price">
        <div>
          <div className="pcard__pricefrom">최저 · {BRAND[lowestBrand].name}</div>
          <div className="pcard__priceval">{fmt(lowest)}<span className="won">원~</span></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {p.prices.map((pr) => <BrandDot key={pr.brand} brand={pr.brand} size={20} />)}
        </div>
      </div>
    );
  }

  return (
    <Link href={`/p/${p.id}`} className="pcard fade-in">
      <div className="pcard__imgwrap">
        <ProductImg p={p} label={isPlace ? '대표 사진' : '상품 이미지'} />
        <div className="pcard__toprow">
          <Verdict v={p.verdict} sm />
          <LikeButton id={p.id} variant="card" />
        </div>
      </div>
      <div className="pcard__body">
        <div className="pcard__cat">{p.catLabel}</div>
        <div className="pcard__name">{p.name}</div>
        <div className="pcard__rrow">
          <Stars r={p.rating} size={13} />
          <span className="pcard__dot">·</span>
          <span className="pcard__used">{isPlace ? '직접 가봄' : p.usedDays + '일 써봄'}</span>
        </div>
        <div className="pcard__desc">{p.oneLiner}</div>
        {priceNode}
      </div>
    </Link>
  );
}
