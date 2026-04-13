"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const bgImage = "/intro-bg.jpg"; 
  const programHighlights = [
    {
      title: "AI·디지털 활용 교육",
      description: "생성형 AI, 디지털 도구 활용, 미래역량 교육을 현장에 맞게 설계합니다.",
    },
    {
      title: "진로·취업·자기이해",
      description: "학생과 청년이 자신의 강점과 가능성을 발견하도록 돕는 프로그램을 진행합니다.",
    },
    {
      title: "조직 맞춤형 특강",
      description: "학교, 기관, 기업의 목적에 맞춘 특강과 워크숍으로 현장 적용도를 높입니다.",
    },
  ];
  const quickFacts = [
    {
      label: "강의 대상",
      value: "학교 · 기관 · 기업",
    },
    {
      label: "운영 형태",
      value: "특강 · 워크숍 · 캠프",
    },
    {
      label: "출강 범위",
      value: "전국 출강 지원",
    },
  ];
  const inquiryExamples = [
    "우리 기관에 맞는 AI 특강 주제를 함께 구성하고 싶어요.",
    "학생 대상 진로·취업 프로그램을 학년별로 기획하고 싶어요.",
    "행사 성격에 맞춰 강연, 워크숍, 참여형 수업을 추천받고 싶어요.",
  ];

  const lecturePhotoRows = [
    Array.from({ length: 11 }, (_, index) => ({
      src: `/front${String(index + 1).padStart(2, "0")}.jpg`,
    })),
    Array.from({ length: 11 }, (_, index) => ({
      src: `/front${String(index + 12).padStart(2, "0")}.jpg`,
    })),
  ];

  const infinitePhotoRows = lecturePhotoRows.map((row) => [...row, ...row]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const googleFormUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdmgVa9GR9gHB85XImj8C1otFrYlxundey8lKKOHT1zXbOYfw/formResponse";
    const formData = new FormData(form);
    const queryString = new URLSearchParams();
    
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
    <div className="min-h-screen select-none">
      {/* 0. 인트로 섹션 */}
      <div className="relative h-[300vh]"> 
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center z-40 overflow-hidden bg-white">
          <img 
            src={bgImage} 
            alt="Background" 
            className="absolute inset-0 w-full h-full object-cover -z-10" 
            style={{ opacity: Math.max(0, 0.2 - scrollY / 3333) }}
          />

          <div 
            className="flex flex-col items-center relative z-10"
            style={{ 
              opacity: Math.max(0, 1 - (scrollY - 1500) / 500),
              pointerEvents: scrollY > 2000 ? 'none' : 'auto' 
            }}
          >
            <div 
              className="w-40 h-40 md:w-64 md:h-64 bg-transparent flex items-center justify-center mb-8"
              style={{ transform: `scale(${Math.max(1, 1 + scrollY / 1000)})` }}
            >
              <img src="/logo.png" alt="CREOD Logo" className="w-full h-full object-contain" />
            </div>
            
            <h1 
              className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight text-center"
              style={{ opacity: Math.max(0, 1 - scrollY / 600) }}
            >
              CREO.D Education Lab
            </h1>
          </div>

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
      <section className="relative overflow-hidden bg-white px-6 pb-20 pt-24 md:pb-28 md:pt-36">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.16),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.1),_transparent_34%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div>
            <span className="mb-6 inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700">
              크레오디교육연구소
            </span>
            <h1 className="mb-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-7xl">
              현장에 필요한 교육을 설계하고,
              <br />
              성장이 남는 순간을 만듭니다.
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-2xl">
              AI 교육부터 진로·취업, 관계와 소통까지.
              크레오디는 학교와 기관, 기업의 목적에 맞는 배움을 함께 디자인합니다.
            </p>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/contents" className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition shadow-lg text-lg text-center">
                콘텐츠 보러가기
              </Link>
              <Link href="/#contact" className="px-8 py-4 bg-white text-slate-700 font-bold border border-slate-200 rounded-2xl hover:bg-slate-50 transition text-lg text-center">
                교육 문의하기
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur">
                  <p className="text-sm font-semibold text-slate-400">{fact.label}</p>
                  <p className="mt-1 text-base font-bold text-slate-900">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-indigo-100 blur-2xl" />
            <div className="absolute -right-4 bottom-10 h-28 w-28 rounded-full bg-sky-100 blur-2xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-900 p-6 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.55)]">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-200">Signature Programs</p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/80">맞춤 기획 가능</span>
              </div>
              <div className="space-y-4">
                {programHighlights.map((program) => (
                  <div key={program.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h3 className="text-lg font-bold text-white">{program.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{program.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-4 text-sm text-emerald-100">
                교육 목표, 대상, 운영 시간에 맞춘 제안이 가능해요. 문의 단계에서 함께 구성해드립니다.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 핵심 가치 */}
      <section className="border-y border-slate-100 bg-slate-50 py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-slate-400">What We Design</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              목적이 분명한 교육을 함께 만듭니다
            </h2>
            <p className="mt-3 text-base text-slate-500 md:text-lg">
              교육 현장에서 자주 요청되는 주제들을 이해하기 쉽게, 참여가 살아나는 방식으로 설계합니다.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">🚀</div>
              <h3 className="text-xl font-bold text-slate-900">몰입되는 참여형 수업</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                강연형 전달에 그치지 않고 질문, 활동, 대화를 통해 현장에서 바로 반응이 일어나는 수업을 지향합니다.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-2xl">💡</div>
              <h3 className="text-xl font-bold text-slate-900">현장 맞춤형 프로그램</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                대상 연령, 행사 목적, 운영 시간에 맞춰 내용을 조정해 실질적으로 필요한 교육 경험을 구성합니다.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">🤝</div>
              <h3 className="text-xl font-bold text-slate-900">성장으로 이어지는 설계</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                수업이 끝난 뒤에도 생각이 남고 행동으로 이어지도록, 메시지와 경험의 흐름을 촘촘하게 만듭니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 현장 스케치 */}
      <section className="py-20 bg-slate-50 overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">열정 가득 뜨거운 강의 현장</h2>
          <p className="text-slate-500 mt-2">크레오디의 열정 가득한 순간들을 만나보세요.</p>
        </div>
        <div className="relative w-full space-y-6">
          {infinitePhotoRows.map((photoRow, rowIndex) => (
            <div key={rowIndex} className="overflow-hidden">
              <div
                className="flex gap-6 animate-scroll w-max hover:[animation-play-state:paused]"
                style={{
                  animationDirection: rowIndex === 1 ? "reverse" : "normal",
                }}
              >
                {photoRow.map((photo, index) => (
                  <div
                    key={`${rowIndex}-${index}`}
                    className="w-[280px] md:w-[400px] h-[200px] md:h-[280px] rounded-2xl overflow-hidden shadow-md shrink-0 bg-gray-200 border border-slate-200"
                  >
                    <img
                      src={photo.src}
                      alt={`강의 현장 ${rowIndex * 11 + (index % 11) + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 문의하기 섹션 (레이아웃 개선: 상단 가로배치 + 하단 카드) */}
      <section id="contact" className="py-20 md:py-32 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 text-slate-900">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Ready to Start?</h2>
            <p className="text-slate-500 text-lg">현장의 변화를 위해 함께 고민합니다.</p>
          </div>
          
          <div className="flex flex-col gap-12">
            <div className="rounded-[32px] border border-slate-200 bg-white px-6 py-8 shadow-sm md:px-10">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-indigo-500">Before You Ask</p>
                  <h3 className="mt-2 text-2xl font-bold text-slate-900">이런 문의를 많이 주십니다</h3>
                </div>
                <p className="max-w-xl text-sm leading-6 text-slate-500">
                  아직 구체적인 주제가 정리되지 않았어도 괜찮아요. 아래처럼 편하게 말씀해주시면 함께 방향을 잡아드립니다.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {inquiryExamples.map((example) => (
                  <div key={example} className="rounded-2xl bg-slate-50 px-5 py-5 text-sm font-medium leading-6 text-slate-700 ring-1 ring-slate-100">
                    {example}
                  </div>
                ))}
              </div>
            </div>
            
            {/* [상단] 연락처 정보 (PC: 가로 3열 / 모바일: 세로 1열) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8">
              
              {/* 연락처 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/50 transition duration-300">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0 text-xl text-indigo-600">
                  📞
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-lg">연락처</h3>
                    <a href="tel:010-9659-5120" className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition cursor-pointer">
                      전화걸기
                    </a>
                  </div>
                  <p className="text-lg font-bold text-slate-700 tracking-tight">010-9659-5120</p>
                </div>
              </div>

              {/* 이메일 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/50 transition duration-300">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0 text-xl text-indigo-600">
                  ✉️
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-lg">이메일</h3>
                    <a href="mailto:ttingssam@naver.com" className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition cursor-pointer">
                      메일보내기
                    </a>
                  </div>
                  <p className="text-base font-bold text-slate-700 break-all">ttingssam@naver.com</p>
                </div>
              </div>

              {/* 출강지역 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/50 transition duration-300">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0 text-xl text-indigo-600">
                  📍
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-lg">출강지역</h3>
                  <p className="text-lg font-bold text-slate-700">전국 출강 지원</p>
                </div>
              </div>
            </div>

            {/* [하단] 입력 폼 (전체 너비 카드) */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 w-full max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-indigo-900 mb-8 pb-4 border-b border-slate-100 text-center">
                교육 문의하기
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="block text-sm font-bold text-slate-600 ml-1">문의자 정보</label>
                      <input type="text" name="name" required placeholder="성함 또는 기업/기관/학교명" className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition" />
                   </div>
                   <div className="space-y-2">
                      <label className="block text-sm font-bold text-slate-600 ml-1">연락처</label>
                      <input type="tel" name="tel" required placeholder="담당자 연락처" className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition" />
                   </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                   <input type="email" name="email" required placeholder="답변 받으실 이메일 주소" className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition" />
                   <input type="text" name="area" required placeholder="지역 (예: 서울 강남구)" className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2 ml-1 mt-2">문의 내용</label>
                  <textarea name="message" required rows={5} placeholder="궁금하신 점이나 강의 의뢰 내용을 상세히 적어주세요." className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white resize-none transition" />
                </div>

                <button type="submit" className="w-full py-5 bg-indigo-900 hover:bg-black text-white font-bold rounded-xl shadow-lg text-lg transition transform hover:-translate-y-1">
                  문의 내용 전송하기
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 5. SNS 섹션 */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-[0.2em] mb-8">Connect with CREO.D</h3>
          <div className="flex justify-center items-center gap-6 md:gap-12">
            <a href="https://blog.naver.com/ttingssam" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3"><div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-[#03C75A] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1"><svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/></svg></div><span className="text-[10px] md:text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">크디 블로그</span></a>
            <a href="https://www.instagram.com/creod_edu_lab/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3"><div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-gradient-to-tr group-hover:from-[#f9ce34] group-hover:via-[#ee2a7b] group-hover:to-[#6228d7] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1"><svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></div><span className="text-[10px] md:text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">크디 인스타</span></a>
            <a href="https://www.instagram.com/tting_ssam/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3"><div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1"><svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div><span className="text-[10px] md:text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">띵쌤 인스타</span></a>
          </div>
        </div>
      </section>
    </div>
  );
}
