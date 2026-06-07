import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const SITE = '골라본';
const TAGLINE = '직접 써보고 가본 것만';

export const metadata = {
  metadataBase: new URL('https://golabon.example'), // 배포 도메인으로 교체
  title: {
    default: `${SITE} — ${TAGLINE}`,
    template: `%s | ${SITE}`,
  },
  description:
    '협찬·광고가 아닌, 직접 써보고 가본 것만 검증해 추천하는 큐레이션. 생활용품·패션·맛집·카페·숙소·뷰티까지 — 비추천(탈락)도 솔직하게.',
  keywords: ['실사용 후기', '검증 리뷰', '솔직 후기', '맛집 검증', '자취템', '가성비'],
  applicationName: SITE,
  manifest: '/favicon/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: SITE,
    title: `${SITE} — ${TAGLINE}`,
    description: '직접 써보고 가본 것만 골라본. 검증된 리뷰 큐레이션.',
    locale: 'ko_KR',
  },
  twitter: { card: 'summary_large_image', title: `${SITE} — ${TAGLINE}` },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1F9E78',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div className="app">
          <Header />
          <main className="main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
