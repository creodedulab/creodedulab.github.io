"use client";

import Link from "next/link";

export default function Home() {
  const lecturePhotos = [
    { src: "scene1.jpg" }, 
    { src: "https://via.placeholder.com/600x400?text=Lecture+Scene+1" },
    { src: "https://via.placeholder.com/600x400?text=Lecture+Scene+2" },
    { src: "https://via.placeholder.com/600x400?text=Lecture+Scene+3" },
    { src: "https://via.placeholder.com/600x400?text=Lecture+Scene+4" },
    { src: "https://via.placeholder.com/600x400?text=Lecture+Scene+5" },
  ];

  const infinitePhotos = [...lecturePhotos, ...lecturePhotos];

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.getElementById('contact');
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 10);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* 1. 히어로 섹션 */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-[1.2] md:leading-tight break-keep">
            꿈을 설계하고, <br className="md:hidden" />성장을 디자인합니다. <br/>
            <span className="text-indigo-600">Create&Design <br className="md:hidden" />Your Dream</span>
          </h1>
          <p className="text-base md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto break-keep">
            질문하고, 탐구하고, 설계하는 배움으로<br className="hidden md:block" />
            성장을 도모하고 개인과 조직의 가능성을 연결합니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="contents" className="px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg inline-block text-lg">
              콘텐츠 보러가기
            </Link>
            <a 
              href="#contact"
              onClick={handleScrollToContact}
              className="px-8 py-3.5 bg-white text-indigo-600 font-bold border border-indigo-200 rounded-xl hover:bg-slate-50 transition inline-block text-lg cursor-pointer"
            >
              문의하기
            </a>
          </div>
        </div>
      </section>

      {/* 2. 핵심 가치 (모바일 가로 3열 정렬 수정됨) */}
      <section className="py-10 md:py-12 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-row justify-between md:justify-around items-start md:items-center gap-2 md:gap-4 text-center">
            
            <div className="flex flex-col items-center gap-2 group w-1/3">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-300">🚀</div>
              <h3 className="text-sm md:text-lg font-bold text-slate-800 break-keep">즐거운 소통</h3>
            </div>

            <div className="hidden md:block w-px h-12 bg-slate-100"></div>

            <div className="flex flex-col items-center gap-2 group w-1/3">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-300">💡</div>
              <h3 className="text-sm md:text-lg font-bold text-slate-800 break-keep">혁신적 아이디어</h3>
            </div>

            <div className="hidden md:block w-px h-12 bg-slate-100"></div>

            <div className="flex flex-col items-center gap-2 group w-1/3">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-300">🤝</div>
              <h3 className="text-sm md:text-lg font-bold text-slate-800 break-keep">함께하는 동료</h3>
            </div>

          </div>
        </div>
      </section>

      {/* 3. 강의 현장 스케치 */}
      <section className="py-20 bg-slate-50 overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">뜨거운 강의 현장</h2>
          <p className="text-slate-500 mt-2">크레오디의 열정 가득한 순간들을 만나보세요.</p>
        </div>
        <div className="relative w-full">
          <div className="flex gap-6 animate-scroll w-max hover:[animation-play-state:paused]">
            {infinitePhotos.map((photo, index) => (
              <div key={index} className="w-[280px] md:w-[400px] h-[200px] md:h-[280px] rounded-2xl overflow-hidden shadow-md shrink-0 bg-gray-200">
                <img 
                  src={photo.src} 
                  alt="강의 현장" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 문의하기 섹션 */}
      <section id="contact" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-slate-900 break-keep">
            함께 성장할 준비가 되셨나요?
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-10 md:mb-12 max-w-2xl mx-auto break-keep">
            강의,교육,캠프,자격증과정,강연,강사양성 등<br/>
            궁금한 점이 있다면 아래 연락처로 문의해주세요.
          </p>
          
          <div className="bg-slate-50 p-6 md:p-10 rounded-[2rem] shadow-sm border border-slate-100 max-w-2xl mx-auto mb-10">
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">대표 전화</p>
                    <p className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">010-9659-5120</p>
                  </div>
                </div>
                <a href="tel:010-9659-5120" className="w-full md:w-auto px-6 py-3 bg-white border-2 border-slate-200 hover:border-indigo-600 text-slate-700 font-bold rounded-xl transition duration-300 text-center text-sm">
                  통화 연결하기
                </a>
              </div>
              <div className="w-full h-px bg-slate-200"></div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">이메일 문의</p>
                    <p className="text-lg md:text-xl font-bold text-slate-800 tracking-tight break-all">ttingssam@naver.com</p>
                  </div>
                </div>
                <a href="mailto:ttingssam@naver.com" className="w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition duration-300 text-center text-sm shadow-md">
                  메일 보내기
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SNS 링크 섹션 */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-[0.2em] mb-8">
            Connect with CREOD
          </h3>
          <div className="flex justify-center items-center gap-6 md:gap-12">
            <a href="https://blog.naver.com/ttingssam" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-[#03C75A] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/>
                </svg>
              </div>
              <span className="text-[10px] md:text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">블로그</span>
            </a>
            <a href="https://www.instagram.com/creod_edu_lab/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-gradient-to-tr group-hover:from-[#f9ce34] group-hover:via-[#ee2a7b] group-hover:to-[#6228d7] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <span className="text-[10px] md:text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">회사 인스타</span>
            </a>
            <a href="https://www.instagram.com/tting_ssam/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span className="text-[10px] md:text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">띵쌤 인스타</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}