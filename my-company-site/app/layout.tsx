import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "./SiteHeader"; // 방금 만든 메뉴바 불러오기

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "크레오디교육연구소 | 꿈을 설계하고 성장을 디자인합니다",
  description: "진로교육, 취업캠프, 창업교육, 강사양성, 띵쌤과 함께하는 크레오디교육연구소 공식 홈페이지입니다. 전국 출강 가능.",
  keywords: ["크레오디", "크레오디교육연구소", "띵쌤", "진로교육", "진로강사", "취업캠프", "강사섭외", "기업교육", 
    "전주진로업체","익산진로업체","군산진로업체","전북진로업체","전주팀빌딩","팀빌딩","청소년팀빌딩","정읍진로업체","진안진로업체",
    "진로캠프","김제진로교육","김제진로업체","AI진로교육","인공지능진로교육","AI활용교육","전북팀빌딩","전주고교학점제","전주취업교육",
    "청년취업","청년취업교육","자소서컨설팅","심명보강사","김이진강사","현원종강사","유진솔강사","안혜영강사","K전문강사협회","전북강사협회","전북퍼실리테이터협회","오성욱강사",
    "홀랜드검사결과해석강의","강점탐색","라포형성","강사양성","강사역량교육","온라인교육","AI","인공지능","고교학점제","면접","면접교육","면접스피치","오리엔테이션진행","대학오리엔테이션","대학오티",
    "청소년오리엔테이션","청소년오티교육","학교폭력교육","인성교육","인권교육","민주시민교육","고창진로강사","전주진로강사","익산진로강사","부안진로강사","무주진로강사","임실진로강사","정읍진로강사","진안진로강사",
    "전라북도진로업체","청소년진로업체","전주청년교육","익산청년교육","김제청년교육","군산청년교육","전주sns교육","AI실무교육","문서작성교육","문서작성강의"],
  icons: {
    icon: "/company-intro/logo.png",
  },
  openGraph: {
    title: "크레오디교육연구소",
    description: "꿈을 설계하고 성장을 디자인합니다. (대표: 띵쌤)",
    url: "https://ttingssam.github.io/company-intro", 
    siteName: "크레오디교육연구소",
    images: [
      {
        url: "/company-intro/intro-bg.jpg", 
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
  verification: {
    google: "b2lI00I5M2nPKvGuHbX635JuslNuy_mwU0EQVwXlyTk",
    other: {
      "naver-site-verification": "33e2d35314fe28fe01087199efea8f9800be4986", 
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {/* ▼▼▼ 여기가 핵심! 모든 페이지의 머리 위에 메뉴바를 고정시킴 ▼▼▼ */}
        <SiteHeader /> 
        
        {/* 그 아래에 페이지 내용이 들어갑니다 */}
        {children}
      </body>
    </html>
  );
}