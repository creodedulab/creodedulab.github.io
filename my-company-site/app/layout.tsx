import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://creodedulab.github.io/"),
  title: "크레오디교육연구소 | 꿈을 설계하고 성장을 디자인합니다",
  description: "크레오디교육연구소 공식 홈페이지 입니다. AI교육, 진로교육, 취업캠프, 강사양성, 레고시리어스, 강점탐색, 아로마테라피, 퍼스널컬러. 전국 출강 가능.",
  keywords: ["크레오디", "크레오디교육연구소", "띵쌤", "진로교육", "진로강사", "취업캠프", "강사섭외", "기업교육", 
    "전주진로업체","익산진로업체","군산진로업체","전북진로업체","전주팀빌딩","팀빌딩","청소년팀빌딩","정읍진로업체","진안진로업체",
    "진로캠프","김제진로교육","김제진로업체","AI진로교육","인공지능진로교육","AI활용교육","전북팀빌딩","전주고교학점제","전주취업교육",
    "청년취업","청년취업교육","자소서컨설팅","심명보강사","김이진강사","현원종강사","유진솔강사","안혜영강사","K전문강사협회","전북강사협회","전북퍼실리테이터협회","오성욱강사",
    "홀랜드검사결과해석강의","강점탐색","라포형성","강사양성","강사역량교육","온라인교육","AI","인공지능","고교학점제","면접","면접교육","면접스피치","오리엔테이션진행","대학오리엔테이션","대학오티",
    "청소년오리엔테이션","청소년오티교육","학교폭력교육","인성교육","인권교육","민주시민교육","고창진로강사","전주진로강사","익산진로강사","부안진로강사","무주진로강사","임실진로강사","정읍진로강사","진안진로강사",
    "전라북도진로업체","청소년진로업체","전주청년교육","익산청년교육","김제청년교육","군산청년교육","전주sns교육","AI실무교육","문서작성교육","문서작성강의"],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "크레오디교육연구소",
    description: "Create&Design Your Dream. 여러분의 꿈을 설계하고 성장을 디자인합니다.",
    url: "https://creodedulab.github.io/", 
    siteName: "크레오디교육연구소(Creo.D)",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "크레오디교육연구소 대표 이미지",        
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
      <body className="font-sans">
        <SiteHeader /> 
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
