import Image from "next/image";

export default function InstructorsPage() {
  const instructors = [
    // 회사소개 페이지와 똑같이 슬래시(/)를 빼고 작성합니다.
    { img: "ceo.jpg" }, 
    { img: "https://via.placeholder.com/400x500" },
    { img: "ceo2.png" },
    { img: "https://via.placeholder.com/400x500" },
    { img: "ceo3.png" },
    { img: "https://via.placeholder.com/400x500" },
    { img: "ceo4.png" },
    { img: "https://via.placeholder.com/400x500" },
    { img: "ceo5.png" },
    { img: "https://via.placeholder.com/400x500" },
    { img: "ceo6.png" },
    { img: "https://via.placeholder.com/400x500" },
    { img: "https://via.placeholder.com/400x500" },
    { img: "https://via.placeholder.com/400x500" },
    { img: "https://via.placeholder.com/400x500" },
    { img: "https://via.placeholder.com/400x500" },
  ];

  const allInstructors = [...instructors, ...instructors];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 mb-16 text-center">
        <h1 className="text-4xl font-bold text-indigo-900 mb-6 font-display">전문 강사진</h1>
        <p className="text-xl text-slate-500">
          크레오디와 함께하는 검증된 교육 파트너들입니다.
        </p>
      </div>

      <div className="w-full overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing group">
        <div className="py-5">
          <div className="instructor-grid animate-scroll group-hover:[animation-play-state:paused]">
            {allInstructors.map((ins, idx) => (
              <div key={idx} className="w-[220px] md:w-[280px]">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-105 border border-slate-100 bg-slate-50 relative">
                  <img 
                    src={ins.img} 
                    alt="Instructor Profile" 
                    className="w-full h-full object-cover" 
                    loading="eager"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center mt-12">
        <p className="text-sm text-slate-400">← 좌우 드래그로 더 많은 파트너를 확인하세요 →</p>
      </div>
    </div>
  );
}