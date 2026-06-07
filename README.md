# 골라본 (Golabon)

> 직접 써보고 가본 것만 골라본. — 검증된 리뷰 큐레이션 + 제휴 커머스

Next.js(App Router) 기반 **정적 사이트(SSG)**. 검색 노출·로딩속도에 유리하며 어디든 배포 가능합니다.

## 실행 방법

```bash
npm install        # 최초 1회
npm run dev        # 개발 서버 → http://localhost:3000
npm run build      # 정적 빌드 → out/ 폴더에 HTML 생성
```

빌드 결과(`out/`)는 정적 파일이라 Vercel·Netlify·GitHub Pages·S3 등 어디든 올릴 수 있습니다.

## 구조

```
app/                  # 페이지 (App Router)
  page.jsx            # 홈
  p/[id]/page.jsx     # 리뷰 상세 (= 상품상세형) · SSG + SEO 메타 + JSON-LD
  category/           # 전체 / 카테고리별 목록
  verify/             # 검증 기준
  rejected/           # 탈락 리스트(비추천·조건부)
  notice/             # 제휴·광고 고지
  globals.css         # 디자인 시스템(원본 이식)
components/           # UI 컴포넌트 (서버/클라이언트 분리)
  detail/             # 상세 페이지 전용
lib/data.js           # ★ 콘텐츠 데이터 (리뷰가 여기에 쌓임)
docs/                 # 기획·설계 문서, 콘텐츠 작성 가이드
extracted/            # 원본 번들에서 풀어둔 참고용 소스
```

## 콘텐츠 추가

리뷰 1건 = `lib/data.js`의 `products[]` 배열에 객체 1개를 추가하면 끝.
작성 양식과 규칙은 [`docs/02_콘텐츠작성가이드.md`](docs/02_콘텐츠작성가이드.md) 참고.

## SEO

- 상세페이지마다 독립 URL(`/p/슬러그/`) + 개별 `<title>`/`description`
- 리뷰 본문이 정적 HTML에 포함되어 검색엔진이 읽음
- `Review` 구조화 데이터(JSON-LD) 자동 삽입
- 배포 도메인은 `app/layout.jsx`의 `metadataBase`에서 교체
