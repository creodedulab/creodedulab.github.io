import type { NextConfig } from "next";

// 현재 환경이 '개발 모드'인지 '배포 모드(production)'인지 자동으로 확인합니다.
const isProd = process.env.NODE_ENV === "production";

// ⚠️ 중요: 아래 'my-company-site' 부분을 대표님의 실제 '깃허브 저장소 이름'으로 꼭 바꿔주세요!
// 예: 저장소 이름이 'creod-site'라면 -> "/creod-site"
const repoName = "/company-intro"; 

const nextConfig: NextConfig = {
  output: "export",
  
  // [핵심] 배포(Prod)일 때만 경로를 붙이고, 개발(Dev)일 땐 경로를 비웁니다. (자동 스위치)
  basePath: isProd ? repoName : "",
  
  // 깃허브 페이지에서 이미지가 깨지지 않도록 강제 설정
  images: {
    unoptimized: true,
  },
};

export default nextConfig;