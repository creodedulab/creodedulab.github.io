import Image from "next/image";

export default function AboutPage() {
  // 8가지 D 키워드
  const dKeywords = [
    { word: "Develop", mean: "개발" },
    { word: "Discover", mean: "발견" },
    { word: "Direction", mean: "방향" },
    { word: "Do", mean: "실행" },
    { word: "Date", mean: "만남" },
    { word: "Dialogue", mean: "대화" },
    { word: "Drama", mean: "스토리" },
    { word: "Data", mean: "데이터" },
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      
      {/* 1. 페이지 헤더 (문구 수정 완료!) */}
      <section className="px-4 text-center mb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-6 leading-tight">
            즐거운 배움, 깊은 울림<br className="hidden md:block" /> 
            꿈을 현실로 만드는 특별한 경험
          </h1>
          {/* ▼▼▼ 여기 수정했습니다! ▼▼▼ */}
          <p className="text-xl text-slate-600 leading-relaxed">
            배움이 설렘이 되고 경험이 놀이가 될 때,<br className="md:hidden"/> 
            마음 속 깊은 곳의 <strong>진짜 꿈</strong>이 피어납니다.
          </p>
        </div>
      </section>

      {/* 2. 브랜드 아이덴티티 (8D 시각화) */}
      <section className="max-w-6xl mx-auto px-4 mb-24">
        <div className="bg-indigo-50 rounded-3xl p-8 md:p-16 text-center">
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">What is CREO.D?</h2>
          <p className="text-lg text-slate-700 mb-12 max-w-3xl mx-auto">
            <strong>'Creo(창조하다)'</strong>의 설렘을 담아,<br/>
            당신의 꿈(Dream)이 다채롭게 디자인될 수 있도록 <strong>8가지 즐거운 요소(8D)</strong>를 선물합니다.
          </p>

          <div className="relative max-w-5xl mx-auto py-10">
            {/* 연결선 (PC) */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[1px] bg-indigo-200 -z-0"></div>
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[350px] bg-indigo-200 -z-0"></div>
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[70%] border border-indigo-200 rounded-[3rem] -z-0"></div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative z-10">
              {/* 왼쪽 그룹 */}
              <div className="grid grid-cols-2 gap-4 md:gap-8 w-full md:w-auto justify-items-center">
                 {dKeywords.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="bg-white border-2 border-indigo-100 w-24 h-24 md:w-28 md:h-28 rounded-full flex flex-col items-center justify-center shadow-sm hover:scale-110 transition duration-300">
                    <span className="text-indigo-600 font-bold text-sm md:text-base">{item.word}</span>
                    <span className="text-slate-400 text-xs">{item.mean}</span>
                  </div>
                ))}
              </div>

              {/* 중앙 핵심 (DREAM) */}
              <div className="relative my-6 md:my-0">
                <div className="w-44 h-44 md:w-60 md:h-60 bg-indigo-600 rounded-full flex flex-col items-center justify-center shadow-xl text-white z-20 animate-pulse-slow">
                  <span className="text-lg md:text-xl font-medium opacity-80 mb-1">Design Your</span>
                  <span className="text-3xl md:text-5xl font-extrabold tracking-wider">DREAM</span>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-indigo-400 rounded-full opacity-20 animate-ping"></div>
              </div>

              {/* 오른쪽 그룹 */}
              <div className="grid grid-cols-2 gap-4 md:gap-8 w-full md:w-auto justify-items-center">
                 {dKeywords.slice(4, 8).map((item, idx) => (
                  <div key={idx} className="bg-white border-2 border-indigo-100 w-24 h-24 md:w-28 md:h-28 rounded-full flex flex-col items-center justify-center shadow-sm hover:scale-110 transition duration-300">
                    <span className="text-indigo-600 font-bold text-sm md:text-base">{item.word}</span>
                    <span className="text-slate-400 text-xs">{item.mean}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CEO 인사말 */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            
{/* 사진 영역 (일반 img 태그로 교체) */}
<div className="w-full md:w-1/3">
  <div className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-lg">
    {/* Next.js Image 대신 기본 img 태그 사용 */}
    <img 
      src="ceo.jpg"
      alt="심명보 대표"
      className="w-full h-full object-cover"
    />
  </div>
</div>

            {/* 텍스트 영역 */}
            <div className="w-full md:w-2/3 text-left">
              <h2 className="text-indigo-600 font-bold mb-2 tracking-wide">CEO MESSAGE</h2>
              <h3 className="text-3xl font-bold text-slate-900 mb-8 leading-snug">
                "배움이 즐거움이 될 때,<br/>
                삶은 놀라운 무대가 됩니다."
              </h3>
              <div className="text-slate-700 space-y-6 leading-relaxed text-lg">
                <p>
                  반갑습니다. <strong>크레오디교육연구소 대표 심명보</strong>입니다.
                </p>
                <p>
                  우리는 흔히 배움을 '무거운 과제'로 생각하곤 합니다. 
                  하지만 제가 현장에서 만난 가장 빛나는 순간들은, 누군가 스스로 질문을 던지고 
                  <strong> '아하!' 하며 무릎을 치는 즐거운 발견의 순간</strong>들이었습니다.
                </p>
                <p>
                  크레오디(CREO.D)는 단순한 지식 전달을 넘어, 
                  <strong> '설레는 경험'</strong>과 <strong>'가슴 뛰는 울림'</strong>을 선물하고 싶습니다.
                  아동부터 성인까지, 누구나 자신의 가능성을 발견하고 
                  서로의 꿈을 응원하는 따뜻한 축제 같은 교육을 지향합니다.
                </p>
                <p>
                  여러분의 삶이 <strong>한 변의 멋진 드라마가 되도록</strong>,<br/>
                  크레오디가 <strong>즐거운 에너지</strong>로 함께하겠습니다.
                </p>
              </div>
              
              <div className="mt-10 pt-8 border-t border-slate-200 flex justify-end items-end gap-4">
                <span className="text-slate-500">크레오디교육연구소 대표</span>
                <span className="text-2xl font-bold text-slate-900 font-serif">심 명 보</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}