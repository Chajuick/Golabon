// 골라본 데이터 레이어
// 콘텐츠(리뷰)는 data/reviews.json 에서 로드 → 추후 DB seed 스크립트로 그대로 이관 가능.
// 설정(카테고리·브랜드)은 data/categories.json, data/brands.json.
// type: 'product'(물건) | 'place'(장소·서비스) · verdict: 'rec'(추천) | 'cond'(조건부) | 'no'(비추천)

import reviews from '@/data/reviews.json';
import categoriesJson from '@/data/categories.json';
import brandsJson from '@/data/brands.json';

const DEFAULT_IMG = 'linear-gradient(135deg,#EAF1EF 0%,#D7E6E1 100%)';

export const categories = categoriesJson;
export const brands = brandsJson;

// 사진(img) 미지정 시 기본 그라데이션 배경 적용
// priceShort: 카드·헤더·요약 등 좁은 자리용 대표 가격(예: '4,300원대~').
//   미지정 시 priceRange 전체로 폴백. 상세 표('한눈에 보는 장소 정보')는 priceRange(풀버전) 사용.
export const products = reviews.map((p) => ({
  img: DEFAULT_IMG,
  ...p,
  priceShort: p.priceShort || p.priceRange,
}));

// ---------- 홈 통계 (데이터에서 자동 계산) ----------
export const stats = [
  { n: String(products.length), unit: '건', label: '직접 써보고 가본 검증' },
  { n: String(new Set(products.map((p) => p.cat)).size), unit: '개', label: '검증 분야' },
  { n: String(products.filter((p) => p.verdict === 'no').length), unit: '개', label: '추천하지 않은 탈락 리스트' },
  { n: '100', unit: '%', label: '실사용·실방문 후 작성' },
];

// ---------- 홈 섹션 (데이터에서 자동 구성, 비면 자동 제외) ----------
const ids = (arr, n = 4) => arr.slice(0, n).map((p) => p.id);
export const sections = [
  { id: 'today', title: '오늘의 골라본 추천', sub: '검증 끝, 자신 있게 추천하는 제품·장소',
    ids: ids(products.filter((p) => p.verdict === 'rec')) },
  { id: 'food', title: '직접 가본 맛집·카페', sub: '협찬 후기 말고, 실제로 방문해 검증했습니다',
    ids: ids(products.filter((p) => ['food', 'cafe'].includes(p.cat))) },
  { id: 'value', title: '가성비로 검증된', sub: '가격 대비 만족도가 높았던 제품·장소',
    ids: ids(products.filter((p) => (p.badges || []).includes('value'))) },
  { id: 'play', title: '놀거리·숙소', sub: '주말에 가기 좋은 검증된 장소',
    ids: ids(products.filter((p) => ['play', 'stay'].includes(p.cat))) },
].filter((s) => s.ids.length > 0);

export const GOLABON_DATA = { categories, products, sections, brands, stats };

export const GB = {
  get: (id) => products.find((p) => p.id === id),
  byCat: (cat) => (cat === 'all' ? products : products.filter((p) => p.cat === cat)),
  // 대표 노출용: 추천 1순위 → 없으면 아무 항목 → 비어 있으면 null
  featured: () => products.find((p) => p.verdict === 'rec') || products[0] || null,
  fmt: (n) => n.toLocaleString('ko-KR'),
};
