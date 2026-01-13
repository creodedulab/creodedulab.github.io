import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  
  // ⚠️ [중요] 깃허브 저장소 이름이 'company-intro'가 맞다면 아래 줄을 절대 건드리지 마세요.
  basePath: "/company-intro",
  
  images: {
    unoptimized: true,
  },
};

export default nextConfig;