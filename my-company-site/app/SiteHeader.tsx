"use client";

import React, { useState, useEffect } from "react"; // useEffect 추가됨
import Link from "next/link";

export default function SiteHeader() {
  const prefix = "/company-intro";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ▼▼▼ [보안 기능 추가] 사이트 전체 보호 스크립트 ▼▼▼
  useEffect(() => {
    // 1. 우클릭 방지
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. 드래그 방지 (이미지 불펌 방지)
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // 3. 텍스트 선택 방지 (단, 입력창은 제외)
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      // 입력창(input, textarea)에서는 글씨 선택/입력이 되어야 함
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      e.preventDefault();
    };

    // 4. 단축키 방지 (F12, Ctrl+U 등)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && (e.key === "u" || e.key === "c" || e.key === "a")) ||
        (e.ctrlKey && e.shiftKey && e.key === "I")
      ) {
        e.preventDefault();
      }
    };

    // 이벤트 리스너 등록 (사이트 전체 적용)
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("keydown", handleKeyDown);

    // 청소 (컴포넌트 사라질 때 리스너 제거)
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  // ▲▲▲ [보안 기능 끝] ▲▲▲

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMenuOpen(false);
    const section = document.getElementById('contact');
    if (section) {
      e.preventDefault();
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* 상단 네비게이션 바 */}
      {/* select-none 클래스를 추가하여 기본적인 드래그도 방지 */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-md shadow-sm z-[100] flex items-center justify-between px-6 md:px-10 border-b border-slate-100 select-none">
        
        {/* 로고 */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
            <div className="w-10 h-10">
              <img src={`${prefix}/logo.png`} alt="로고" className="w-full h-full object-contain"/>
            </div>
            <span className="text-lg md:text-xl font-extrabold tracking-tight text-slate-900">
              CREO.D
            </span>
          </Link>
        </div>

        {/* PC 메뉴 */}
        <div className="hidden md:flex items-center gap-6 ml-4">
          <Link href="/" className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition">홈</Link>
          <Link href="/about" className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition">회사소개</Link>
          <Link href="/contents" className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition">콘텐츠</Link>
          <Link href="/instructors" className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition">강사진</Link>
          <Link href="/satisfaction" className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition">만족도조사</Link>
          <a href="https://padlet.com/ttingssam/archive" target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition cursor-pointer">무료서비스</a>
          <Link href="/#contact" onClick={handleScrollToContact} className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-indigo-600 transition shadow-md ml-2">문의하기</Link>
        </div>

        {/* 모바일 햄버거 버튼 */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition z-[110]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="메뉴 열기"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {/* 모바일 메뉴 영역 */}
      {isMenuOpen && (
        <>
          {/* 1. 투명 배경막 (클릭 시 닫힘) */}
          <div 
            className="fixed inset-0 top-20 z-[98] bg-black/0 cursor-pointer"
            onClick={closeMenu}
          ></div>

          {/* 2. 실제 메뉴판 (반투명 효과) */}
          <div className="fixed top-20 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xl md:hidden z-[99] animate-slideDown select-none">
            <div className="flex flex-col p-4 space-y-1">
              <Link href="/" onClick={closeMenu} className="block px-4 py-3 text-lg font-bold text-slate-800 hover:bg-white/50 rounded-xl border-b border-slate-100/50">홈</Link>
              <Link href="/about" onClick={closeMenu} className="block px-4 py-3 text-lg font-bold text-slate-800 hover:bg-white/50 rounded-xl border-b border-slate-100/50">회사소개</Link>
              <Link href="/contents" onClick={closeMenu} className="block px-4 py-3 text-lg font-bold text-slate-800 hover:bg-white/50 rounded-xl border-b border-slate-100/50">콘텐츠</Link>
              <Link href="/instructors" onClick={closeMenu} className="block px-4 py-3 text-lg font-bold text-slate-800 hover:bg-white/50 rounded-xl border-b border-slate-100/50">강사진</Link>
              <Link href="/satisfaction" onClick={closeMenu} className="block px-4 py-3 text-lg font-bold text-slate-800 hover:bg-white/50 rounded-xl border-b border-slate-100/50">만족도조사</Link>
              <a href="https://padlet.com/ttingssam/archive" target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="block px-4 py-3 text-lg font-bold text-slate-800 hover:bg-white/50 rounded-xl border-b border-slate-100/50">무료서비스</a>
              
              <div className="pt-3 pb-2">
                <Link href="/#contact" onClick={handleScrollToContact} className="block w-full px-4 py-3 text-center bg-slate-900 text-white text-lg font-bold rounded-xl hover:bg-indigo-600 transition shadow-lg">
                  문의하기
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}