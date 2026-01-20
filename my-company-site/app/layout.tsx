import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// ▼▼▼ [이 부분이 검색엔진이 읽어가는 핵심 명찰입니다] ▼▼▼
export const metadata: Metadata = {
  title: "크레오디교육연구소 | 꿈을 설계하고 성장을 디자인합니다", // 검색 결과 제목
  description: "진로교육, 취업캠프, 강사양성, 띵쌤과 함께하는 크레오디교육연구소 공식 홈페이지입니다. 전국 출강 가능.", // 검색 결과 설명글
  keywords: ["크레오디", "크레오디교육연구소", "띵쌤", "진로교육", "진로강사", "취업캠프", "강사섭외"], // 검색 키워드
  icons: {
    icon: "/company-intro/logo.png", // 브라우저 탭에 뜨는 작은 아이콘 (파비콘)
  },
  openGraph: {
    title: "크레오디교육연구소",
    description: "꿈을 설계하고 성장을 디자인합니다. (대표: 띵쌤)",
    url: "https://ttingssam.github.io/company-intro", // 실제 배포된 주소로 변경 필요!
    siteName: "크레오디교육연구소",
    images: [
      {
        url: "/company-intro/intro-bg.jpg", // 카톡 공유시 뜰 이미지
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
  verification: {
    google: "구글_서치콘솔_인증코드", // 나중에 채워넣을 곳
    other: {
      "naver-site-verification": "네이버_웹마스터도구_인증코드", // 나중에 채워넣을 곳
    },
  },
};
// ▲▲▲ [여기까지] ▲▲▲

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}