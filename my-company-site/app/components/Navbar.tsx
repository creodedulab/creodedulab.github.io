"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "홈", href: "/" },
    { name: "회사소개", href: "/about" },
    { name: "콘텐츠", href: "/contents" },
    { name: "강사진", href: "/instructors" },
    { name: "무료서비스", href: "https://padlet.com/ttingssam/padlet-jy6ojlig5uax46ly" },
    { name: "만족도", href: "/satisfaction" },
    { name: "문의하기", href: "/#contact" },
  ];

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          
          {/* ▼▼▼ 로고 위치 변경 (이미지 -> 텍스트 순서) ▼▼▼ */}
          <Link href="/" className="font-bold text-2xl text-indigo-900 flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="CREOD Logo" 
              className="h-8 w-auto object-contain" 
            />
            크레오디교육연구소
          </Link>

          {/* PC 메뉴 */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                target={item.name === "무료서비스" ? "_blank" : "_self"}
                className="text-slate-600 hover:text-indigo-600 transition font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* 모바일 버튼 */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target={item.name === "무료서비스" ? "_blank" : "_self"}
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-700"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}