"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleDragStart = (e: DragEvent) => e.preventDefault();
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      e.preventDefault();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12" || (e.ctrlKey && (e.key === "u" || e.key === "c"))) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMenuOpen(false);
    const section = document.getElementById("contact");
    if (section) {
      e.preventDefault();
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-md shadow-sm z-[100] flex items-center justify-between px-6 md:px-10 border-b border-slate-100 select-none">
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
            <div className="w-10 h-10">
              <img src="/logo.png" alt="로고" className="w-full h-full object-contain" />
            </div>
            <span className="text-lg md:text-xl font-extrabold tracking-tight text-slate-900">
              크레오디교육연구소
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6 ml-4">
          <Link href="/" className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition">
            홈
          </Link>
          <Link href="/about" className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition">
            회사소개
          </Link>

          <Link href="/contents" className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition">
            콘텐츠
          </Link>

          <Link href="/instructors" className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition">
            강사진
          </Link>
          <Link href="/satisfaction" className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition">
            만족도조사
          </Link>
          <a href="https://padlet.com/ttingssam/padlet-jy6ojlig5uax46ly" target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition cursor-pointer">
            무료서비스
          </a>
          <a href="https://creodedulab.github.io/creod_promptbox/" target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition cursor-pointer">
            프롬프트박스
          </a>
          <Link href="/#contact" onClick={handleScrollToContact} className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-indigo-600 transition shadow-md ml-2">
            문의하기
          </Link>
        </div>

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

      {isMenuOpen && (
        <>
          <div className="fixed inset-0 top-20 z-[98] bg-black/0 cursor-pointer" onClick={closeMenu}></div>
          <div className="fixed top-20 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xl md:hidden z-[99] animate-slideDown select-none">
            <div className="flex flex-col p-4 space-y-1">
              <Link href="/" onClick={closeMenu} className="block px-4 py-3 text-lg font-bold text-slate-800 hover:bg-white/50 rounded-xl border-b border-slate-100/50">
                홈
              </Link>
              <Link href="/about" onClick={closeMenu} className="block px-4 py-3 text-lg font-bold text-slate-800 hover:bg-white/50 rounded-xl border-b border-slate-100/50">
                회사소개
              </Link>
              <Link href="/contents" onClick={closeMenu} className="block px-4 py-3 text-lg font-bold text-slate-800 hover:bg-white/50 rounded-xl border-b border-slate-100/50">
                콘텐츠
              </Link>
              <Link href="/instructors" onClick={closeMenu} className="block px-4 py-3 text-lg font-bold text-slate-800 hover:bg-white/50 rounded-xl border-b border-slate-100/50">
                강사진
              </Link>
              <Link href="/satisfaction" onClick={closeMenu} className="block px-4 py-3 text-lg font-bold text-slate-800 hover:bg-white/50 rounded-xl border-b border-slate-100/50">
                만족도조사
              </Link>
              <a href="https://padlet.com/ttingssam/padlet-jy6ojlig5uax46ly" target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="block px-4 py-3 text-lg font-bold text-slate-800 hover:bg-white/50 rounded-xl border-b border-slate-100/50">
                무료서비스
              </a>
              <a href="https://creodedulab.github.io/creod_promptbox/" target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="block px-4 py-3 text-lg font-bold text-slate-800 hover:bg-white/50 rounded-xl border-b border-slate-100/50">
                프롬프트박스
              </a>
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
