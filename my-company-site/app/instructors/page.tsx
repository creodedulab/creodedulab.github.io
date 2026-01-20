"use client";

import React, { useState } from "react"; // useState 추가

export default function InstructorsPage() {
  const prefix = "/company-intro";

  // 1. 클릭된 이미지의 경로를 저장하는 상태 변수
  // null이면 아무것도 클릭 안 된 상태, 값이 있으면 그 이미지가 확대된 상태
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const instructors = [
    { img: "gangsa01.png" }, 
    { img: "https://via.placeholder.com/400x500" },
    { img: "gangsa02.png" },
    { img: "https://via.placeholder.com/400x500" },
    { img: "gangsa03.png" },
    { img: "https://via.placeholder.com/400x500" },
    { img: "gangsa04.png" },
    { img: "https://via.placeholder.com/400x500" },
    { img: "gangsa05.png" },
    { img: "https://via.placeholder.com/400x500" },
    { img: "gangsa06.png" },
    { img: "https://via.placeholder.com/400x500" },
    { img: "gangsa07.png" },
    { img: "https://via.placeholder.com/400x500" },
    { img: "gangsa08.png" },
    { img: "https://via.placeholder.com/400x500" },
  ];

  const allInstructors = [...instructors, ...instructors];

  const getImagePath = (src: string) => {
    return src.startsWith("http") ? src : `${prefix}/${src}`;
  };

  // 2. 이미지 클릭 시 호출되는 함수 (확대)
  const openModal = (imgSrc: string) => {
    setSelectedImage(imgSrc);
  };

  // 3. 모달 닫기 함수 (원상 복귀)
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 md:pt-32 md:pb-20 overflow-x-hidden select-none relative">
      {/* 제목 섹션 */}
      <div className="max-w-6xl mx-auto px-6 mb-10 md:mb-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4 md:mb-6 font-display">
          전문 강사진
        </h1>
        <p className="text-base md:text-xl text-slate-500 break-keep">
          크레오디와 함께하는 검증된 교육 파트너들입니다.
        </p>
      </div>

      {/* 슬라이드 영역 */}
      <div className="w-full overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing group touch-pan-x">
        <div className="py-4 md:py-8 px-4 md:px-[5vw]">
          
          <div className="!grid grid-rows-2 grid-flow-col gap-4 animate-scroll w-max group-hover:[animation-play-state:paused]">
            
            {allInstructors.map((ins, idx) => (
              // 4. 클릭 이벤트 추가 및 커서 모양 변경
              <div 
                key={idx} 
                className="w-[150px] sm:w-[180px] md:w-[240px] shrink-0 cursor-pointer"
                onClick={() => openModal(ins.img)}
              >
                <div className="aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-md md:shadow-lg transition-all duration-500 hover:shadow-2xl md:hover:scale-105 border border-slate-100 bg-slate-50 relative">
                  <img 
                    src={getImagePath(ins.img)} 
                    alt="Instructor Profile" 
                    // 5. 기존의 pointer-events-none 제거 (클릭이 되도록!)
                    className="w-full h-full object-cover" 
                    loading="eager"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 안내 문구 */}
      <div className="text-center mt-8 md:mt-12 px-6">
        <p className="text-xs md:text-sm text-slate-400 animate-pulse">
          ← 사진을 클릭하면 확대됩니다 →
        </p>
      </div>

      {/* ▼▼▼ [신규 추가] 이미지 확대 모달 창 ▼▼▼ */}
      {/* selectedImage에 값이 있을 때만 화면에 나타납니다. */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
          onClick={closeModal} // 배경 아무 곳이나 클릭하면 닫힘
        >
          <div className="relative max-w-5xl w-full max-h-full flex items-center justify-center">
            <img 
              src={getImagePath(selectedImage)} 
              alt="Enlarged Profile" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-scaleIn"
              // 이미지를 클릭해도 닫히게 하려면 아래 줄 제거, 아니면 유지
              // onClick={(e) => e.stopPropagation()} 
            />
            {/* 닫기 버튼 (우측 상단 X) */}
            <button 
              className="absolute -top-10 right-0 md:top-4 md:right-4 text-white bg-black/40 rounded-full p-2 hover:bg-black/60 transition"
              onClick={closeModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      {/* ▲▲▲ [모달 끝] ▲▲▲ */}
    </div>
  );
}