# CLAUDE.md — 골라본(Golabon) 작업 가이드

> 이 문서는 **AI(클로드)가 이 저장소에서 길을 잃지 않고 일관되게 작업**하도록 만든 하네스 문서다.
> 새 세션을 시작하면 이 문서를 먼저 읽고, 아래의 **프레임·규칙을 그대로 따른다.**

---

## 1. 프로젝트 한 줄 요약

**골라본** = "직접 써보고 가본 것만" 검증해 추천하는 **리뷰 큐레이션 사이트**.
협찬·광고가 아니라 실사용/실방문 기준으로, **비추천(탈락)도 솔직하게** 보여주는 게 정체성이다.

- 핵심 가치: **검증·신뢰·솔직함** (반(反)협찬 진정성)
- 콘텐츠 단위: `product`(물건) 또는 `place`(장소·서비스) 리뷰

## 2. 기술 스택 / 실행

- **Next.js 14 App Router** + React 18, **정적 export**(`output: 'export'`, `next.config.mjs`)
- **DB 없음.** 모든 콘텐츠는 `data/*.json`에 있다 (추후 DB seed로 이관 가능하게 설계됨).
- 스타일: 순수 CSS(`app/globals.css`) + 인라인 style. Tailwind 안 씀.
- 이미지: `next/image` 대신 **plain `<img>`** (정적 export + 코드 일관성).

```bash
npm run dev          # 개발 서버 (사용자가 직접 띄워 확인함)
npm run build        # 정적 빌드 → out/
npm run fetch:naver -- "<네이버 블로그 글 URL>"   # 블로그 글 수집 (아래 6장)
```

## 3. 디렉터리 맵

```
app/                  # 라우트 (page.jsx, layout.jsx, category/, p/[id], notice/, rejected/, verify/)
  globals.css         # 전역 스타일 (pcard__*, sd-*, gal-* 등 클래스 정의 위치)
components/
  Header.jsx Footer.jsx        # 공통 레이아웃 (Logo는 ui.jsx)
  ProductCard.jsx             # 카드 (홈·카테고리 목록). 장소/제품 분기
  ui.jsx                      # 공용 프리미티브: Logo, BrandDot, Verdict, Stars, ProductImg, Slot, fmt ...
  Gallery.jsx                 # 상세 상단 갤러리(메인+썸네일+라이트박스)
  home.jsx Listing.jsx        # 홈/목록 섹션
  detail/
    DetailView.jsx            # 상세 페이지 전체 조립 (갤러리·탭·본문·사이드)
    ShopDetail.jsx            # 상세 "에디토리얼" 섹션 (lead/강점/현장/스펙표)
    ChannelCompare.jsx        # 예약·구매 채널 비교 (BrandDot 사용)
    DetailTabs.jsx
lib/data.js           # 데이터 로더 (reviews.json → products). priceShort 폴백 등 정규화
data/
  reviews.json        # ★ 실제 라이브 콘텐츠 (리뷰 본문). 여기를 수정한다
  reviews.sample.json # 참고용 샘플 (라이브 아님)
  categories.json     # 카테고리 (id: shopping/fashion/food/cafe/play/stay/beauty)
  brands.json         # 채널/브랜드 (name,color,short, 일부 symbol 경로)
public/
  reviews/<id>/       # ★ 리뷰별 공개 이미지 (선별·검증된 것만)
  symbol/             # 채널 로고 (naver.svg, catchtable.png, Instagram.png)
  favicon/            # 파비콘 묶음 (layout.jsx의 metadata.icons로 연결)
scripts/
  fetch-naver-post.mjs # 네이버 블로그 글 수집 도구
docs/                 # 기획설계서·콘텐츠가이드·실행점검
material/             # ⛔ 비공개 원본 스크랩 (gitignore). 절대 커밋 금지
```

## 4. 데이터 모델 (`data/reviews.json`)

`products = reviews.map(...)` (`lib/data.js`). 한 항목 = 한 리뷰. `type: 'place' | 'product'`.
전체 필드는 `docs/01_기획설계서.md`·`docs/02_콘텐츠작성가이드.md` 참고. 핵심:

| 필드 | 설명 |
|---|---|
| `id` | URL 슬러그 (`/p/<id>`) |
| `verdict` | `rec`(추천) / `cond`(조건부) / `no`(비추천) |
| `priceRange` | **상세용 풀버전** 가격 (예: `"커트 35,000원(회원가 31,500) · 다운펌+커트 55,000"`) |
| `priceShort` | **카드·헤더·요약용 대표 가격** (예: `"커트 3만원대~"`). 생략 시 `priceRange`로 폴백 |
| `pros` / `cons` | 좋았던/아쉬웠던 **리스트**. 화면의 유일한 장단점 출처 (아래 5장) |
| `summary` | 5칸 스캔용 key:value |
| `verdictLine` | 검증 한 줄 |
| `body.why/ctx/exp` | 왜 골랐나 / 위치·접근성·첫인상 / 실제 후기 |
| `channels[]` | `{brand, note, cta, url}` 예약·구매 채널 (`brand`는 brands.json 키) |
| `photos` | 사진 슬롯 (아래 7장) |

> ⚠️ `body.good` / `body.bad`는 **더 이상 쓰지 않는다**(렌더링 제거됨). 장단점은 `pros`/`cons`로만.

## 5. 리뷰 프레임 (보이스·구조) — **반드시 이대로**

블로그 원문(보통 호의적 소개글)을 **균형 잡힌 검증 리뷰**로 재구성한다.

- **보이스**: 전문적·현대적 + 따뜻한 1인칭(`~요`/`~어요`). 이모지 남발 금지. "협찬 후기 많은 시장에서 직접 검증" 앵글을 살린다.
- **솔직함**: 좋은 점만 베끼지 말고 **실제 단점**을 `cons`에 담는다 (가격·웨이팅 등).
- **반복 금지(중요)**: 좋았던/아쉬웠던 점은 화면에서 **딱 한 번**만 나오게 설계돼 있다.
  - `pros`/`cons` 리스트 박스 = 유일한 장단점 출처
  - `body.exp` = "현장에서 본 그대로" 한 곳에만 (DetailView 본문 블록은 why/ctx만)
  - ShopDetail "짚고 넘어갈 점" 노트는 **삭제됨**
- **pros/cons 작성 스타일**: 짧은 리스트, **문장끝 `~요`로 통일**. `cons`는 핵심만(1~2개).
  - `pros[0]`,`pros[1]`은 ShopDetail 강점 사진 캡션으로도 쓰이니 **가장 강한 2개를 앞에**.
- `verdict`가 `rec`라도 가격 부담 등은 솔직히. 부담이 크면 `cond` 고려.

## 6. 네이버 블로그 → 리뷰 워크플로우

**전제: 본인/동의된 블로그만.** 과도한 크롤링 금지(요청 간 간격 있음).

1. **수집**: `npm run fetch:naver -- "<글 URL>"`
   - 결과: `material/naver/<blogId>__<logNo>/` 에 `post.md`(읽기용) · `post.json` · `images/01.. .jpg`
   - blog.naver.com / m.blog / PostView / naver.me 단축링크 모두 허용
2. **이미지 확인 (필수)**: `material/.../images/`를 **직접 Read(시각 확인)** 한다. 본문 텍스트로 추측하지 말 것.
3. **선별 → 공개 폴더 복사**: 좋은 컷만 `public/reviews/<id>/`에 의미있는 이름으로 복사.
4. **본문 작성**: 5장 프레임대로 `reviews.json`에 항목 추가/수정.

### 화질 현실
- 네이버 블로그는 업로드 이미지를 **900px로 리사이즈**해 저장 → 블로그 URL로는 **900px가 최대**.
- 페처는 `?type=w3840`(원본 요청)로 받지만, 원본이 900px라 결과도 900px. 더 선명하게는 불가(원본 파일 필요).
- 900px는 카드·갤러리엔 충분, 큰 배너(lead 16:10 등)에선 약간 소프트.

## 7. 사진 시스템 (`photos` 슬롯)

갤러리 순서 = `g0 → g1 → g2 → g3 → g4 → lead → p0 → p1 → use` (중복 경로 자동 제거).
**일부 슬롯은 갤러리 밖에서도 자리를 차지**한다:

| 슬롯 | 어디에 | 권장 내용 |
|---|---|---|
| `g0` | **카드 썸네일** + 갤러리 대표 | **mood/분위기 대표컷** (대표는 mood 우선) |
| `g1`~`g4` | 갤러리 2~5번 | 핵심 결과/메뉴·과정·입지 |
| `lead` | ShopDetail 에디토리얼 hero(텍스트 오버레이) | 가로(landscape) 분위기/시그니처 |
| `p0` `p1` | ShopDetail "강점" 사진 (pros[0]/pros[1]와 페어) | 그 강점을 보여주는 컷 |
| `use` | ShopDetail "현장에서 본 그대로" | 현장 분위기 |

**큐레이션 순서 원칙**: 분위기(mood) → 결과/시그니처 → 과정/검증 → 입지/시설.

### 🔒 프라이버시 규칙 (절대 준수)
- **얼굴이 보이는 사진 금지** (특히 운영자/지인). 뒤·옆모습, 공간, 음식/시술 결과, 디테일컷을 쓴다.
- **연락처·개인정보가 담긴 이미지 금지**(예: 전화번호 적힌 명함). 단, 공개 홍보용 핸들(인스타 등)은 채널 링크로 활용 가능.
- 흔들리거나 화질 나쁜 컷은 같은 장면의 다른 컷으로 교체.
- `material/`(원본 스크랩)는 **절대 커밋하지 않는다**(gitignore됨).

## 8. 그 외 컨벤션

- 카드 장소 영역: `장소(강조)` 위 / `가격대 · 채널` 아래 2단 (`pcard__placefoot`).
- 채널 로고: `brands.json`에 `symbol` 경로가 있으면 `BrandDot`이 이미지로 렌더, 없으면 색상+약자 칩.
- 상세 카피(ShopDetail/DetailView 헤더)는 **전문·현대 톤**(이모지 최소). 공용 컴포넌트라 모든 리뷰에 적용됨.

## 9. 하지 말 것 (요약)

- ❌ `material/` 커밋 / 얼굴·연락처 이미지 공개
- ❌ 좋았던·아쉬웠던 점을 여러 섹션에 중복 노출 (프레임 위반)
- ❌ `body.good`/`body.bad` 부활
- ❌ 이미지 내용을 보지 않고 슬롯에 배치
- ❌ 추측 가격을 검증값처럼 박기 (모르면 비우거나 명시)
