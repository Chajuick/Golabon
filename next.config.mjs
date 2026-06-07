/** @type {import('next').NextConfig} */
const nextConfig = {
  // 정적 사이트로 빌드(SSG) → 검색 노출·로딩속도 유리, 어디든 배포 가능
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
