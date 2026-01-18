"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const prefix = "/company-intro";
  const bgImage = `${prefix}/intro-bg.jpg`; 

  const lecturePhotos = [
    { src: `${prefix}/front01.jpg` }, { src: `${prefix}/front02.jpg` },
    { src: `${prefix}/front03.jpg` }, { src: `${prefix}/front04.jpg` },
    { src: `${prefix}/front05.jpg` }, { src: `${prefix}/front06.jpg` },
    { src: `${prefix}/front07.jpg` }, { src: `${prefix}/front08.jpg` },
    { src: `${prefix}/front09.jpg` }, { src: `${prefix}/front10.jpg` },
    { src: `${prefix}/front11.jpg` }, { src: `${prefix}/front12.jpg` },
    { src: `${prefix}/front13.jpg` }, { src: `${prefix}/front14.jpg` },
  ];

  const infinitePhotos = [...lecturePhotos, ...lecturePhotos];
  const [scrollY, setScrollY] = useState(0);

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.getElementById('contact');
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 10);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const googleFormUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdmgVa9GR9gHB85XImj8C1otFrYlxundey8lKKOHT1zXbOYfw/formResponse";
    const formData = new FormData(form);
    const queryString = new URLSearchParams();
    
    // ⚠️ 찾으신 ID로 교체 필수!
    queryString.append("entry.401791583", formData.get("name") as string);
    queryString.append("entry.1010261547", formData.get("email") as string);
    queryString.append("entry.604668895", formData.get("tel") as string);
    queryString.append("entry.1963127251", formData.get("area") as string);
    queryString.append("entry.1686849724", formData.get("message") as string);

    fetch(`${googleFormUrl}?${queryString.toString()}`, {
      method: "POST",
      mode: "no-cors",
    }).then(() => {
      alert("문의가 성공적으로 전달되었습니다!");
      form.reset();
    }).catch(() => {
      alert("오류가 발생했습니다.");
    });
  };

  return (
    <div className="min-h-screen select-none" onContextMenu={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()}>
      
      {/* 0. 인트로 섹션 */}
      <div className="relative h-[300vh]"> 
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center z-40 overflow-hidden bg-white">
          <img 
            src={bgImage} 
            alt="Background" 
            className="absolute inset-0 w-full h-full object-cover -z-10" 
            style={{ 
              opacity: Math.max(0, 0.2 - scrollY / 3333),
              transition: 'opacity 0.1s ease-out'
            }}
          />

          <div 
            className="flex flex-col items-center will-change-transform relative z-10"
            style={{ 
              opacity: Math.max(0, 1 - (scrollY - 1500) / 500),
              pointerEvents: scrollY > 2000 ? 'none' : 'auto' 
            }}
          >
            {/* 로고 이미지 */}
            <div 
              className="w-40 h-40 md:w-64 md:h-64 bg-transparent flex items-center justify-center mb-8"
              style={{ transform: `scale(${1 + scrollY / 1000})` }}
            >
              <img src={`${prefix}/logo.png`} alt="CREOD Logo" className="w-full h-full object-contain" />
            </div>
            
            {/* ▼▼▼ [수정된 부분] 메인 글자 투명도 조절 ▼▼▼ */}
            <h1 
              className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight text-center"
              style={{ 
                // 스크롤이 0일 때 1, 스크롤을 내릴수록 서서히 0에 수렴하도록 조정
                opacity: Math.max(0, 1 - scrollY / 600),
                transition: 'opacity 0.1s ease-out'
              }}
            >
              CREO.D Education Lab
            </h1>
          </div>

          {/* 화살표 넛지 */}
          <div className="absolute bottom-10 right-8 md:bottom-12 md:right-12 flex flex-col items-center gap-1 z-50 animate-bounce pointer-events-none"
            style={{ opacity: Math.max(0, 1 - scrollY / 1000) }}>
            <span className="text-[10px] md:text-xs font-bold text-slate-400 tracking-widest">SCROLL</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* 1. 히어로 섹션 */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white -z-10" />
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-8 border border-indigo-100">크레오디교육연구소</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.1] tracking-tight break-keep">
            꿈을 설계하고, <br className="md:hidden" />성장을 디자인합니다. <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Create & Design Your Dream</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed break-keep">
            질문하고, 탐구하고, 설계하는 배움으로 성장을 도모하고 가능성을 연결합니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contents" className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition shadow-lg text-lg">콘텐츠 보러가기</Link>
            <a href="#contact" onClick={handleScrollToContact} className="px-8 py-4 bg-white text-slate-700 font-bold border border-slate-200 rounded-2xl hover:bg-slate-50 transition text-lg cursor-pointer">문의하기</a>
          </div>
        </div>
      </section>

      {/* 2. 핵심 가치 & 3. 현장 스케치 섹션 동일 (생략) */}

      {/* 4. 문의하기 섹션 */}
      <section id="contact" className="py-20 md:py-32 bg-white animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 text-slate-900">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Ready to Start?</h2>
            <p className="text-slate-500 text-lg">현장의 변화를 위해 함께 고민합니다.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-10">
              <div className="flex items-start gap-5 font-bold">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">👤</div>
                <div><h3 className="text-slate-900 text-lg">연락처</h3><p className="text-slate-600">010-9659-5120</p></div>
              </div>
              <div className="flex items-start gap-5 font-bold">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">✉️</div>
                <div><h3 className="text-slate-900 text-lg">이메일</h3><p className="text-slate-600">ttingssam@naver.com</p></div>
              </div>
              <div className="flex items-start gap-5 font-bold">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">📍</div>
                <div><h3 className="text-slate-900 text-lg">출강지역</h3><p className="text-slate-600">전국 출강 지원</p></div>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" required placeholder="성함 또는 기업/기관/학교" className="w-full px-6 py-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500" />
                <input type="email" name="email" required placeholder="연락 받으실 이메일" className="w-full px-6 py-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500" />
                <input type="tel" name="tel" required placeholder="담당자 연락처" className="w-full px-6 py-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500" />
                <input type="text" name="area" required placeholder="지역 (예: 서울 강남구)" className="w-full px-6 py-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500" />
                <textarea name="message" required rows={4} placeholder="궁금하신 점이나 강의 의뢰 내용을 상세히 적어주세요." className="w-full px-6 py-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
                <button type="submit" className="w-full py-5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl shadow-xl text-lg transition">전송하기</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SNS 섹션 생략 (기존 유지) */}
    </div>
  );
}