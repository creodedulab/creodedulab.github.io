import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 1. 히어로 섹션 */}
      <section className="pt-32 pb-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            꿈을 설계하고, <br/>성장을 디자인합니다. <br/>
            <span className="text-indigo-600">Create&Design <br/>Your Dream</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            질문하고, 탐구하고, 설계하는 배움으로<br />
            성장을 도모하고 개인과 조직의 가능성을 연결합니다.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contents" className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-lg inline-block">
              콘텐츠 보러가기
            </Link>
            <Link href="/#contact" className="px-8 py-3 bg-white text-indigo-600 font-bold border border-indigo-200 rounded-lg hover:bg-slate-50 transition inline-block">
              문의하기
            </Link>
          </div>
        </div>
      </section>

      {/* 2. 서비스 소개 */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">우리의 핵심 가치</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-slate-100 rounded-2xl hover:shadow-xl transition duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6 text-2xl">🚀</div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">빠른 성장 지원</h3>
              <p className="text-slate-600">체계적인 프로세스로 고객사의 비즈니스 속도를 높여드립니다.</p>
            </div>
            <div className="p-8 border border-slate-100 rounded-2xl hover:shadow-xl transition duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6 text-2xl">💡</div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">혁신적인 솔루션</h3>
              <p className="text-slate-600">기존의 틀을 깨는 창의적인 방법으로 문제를 해결합니다.</p>
            </div>
            <div className="p-8 border border-slate-100 rounded-2xl hover:shadow-xl transition duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6 text-2xl">🤝</div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">신뢰받는 파트너</h3>
              <p className="text-slate-600">언제나 고객의 입장에서 생각하며 끝까지 함께합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 문의하기 섹션 */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">
            함께 성장할 준비가 되셨나요?
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            진로 교육, 캠프, 강연 등 궁금한 점이 있다면<br />
            아래 연락처로 문의해주세요.<br />
          </p>
          
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 max-w-2xl mx-auto mb-10">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-slate-500 font-bold">대표 전화</p>
                    <p className="text-sm sm:text-base md:text-xl font-bold text-slate-800 tracking-tight break-all">010-9659-5120</p>
                  </div>
                </div>
                <a href="tel:010-9659-5120" className="w-full md:w-auto px-6 py-3 bg-white border-2 border-slate-200 hover:border-indigo-600 text-slate-700 font-bold rounded-lg transition duration-300 text-center flex items-center justify-center gap-2">
                  통화 연결하기
                </a>
              </div>
              <div className="w-full h-px bg-slate-100"></div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-slate-500 font-bold">이메일 문의</p>
                    <p className="text-sm sm:text-base md:text-xl font-bold text-slate-800 tracking-tight break-all">ttingssam@naver.com</p>
                  </div>
                </div>
                <a href="mailto:ttingssam@naver.com" className="w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition duration-300 text-center flex items-center justify-center gap-2 shadow-md">
                  메일 보내기
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SNS 링크 섹션 (새로 추가됨) */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">
            Connect with CREOD
          </h3>
          
          <div className="flex justify-center items-center gap-8 md:gap-12">
            {/* 1. 네이버 블로그 */}
            <a 
              href="https://blog.naver.com/ttingssam" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-[#03C75A] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/>
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">블로그</span>
            </a>

            {/* 2. 회사 인스타그램 */}
            <a 
              href="https://www.instagram.com/creod_edu_lab/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-gradient-to-tr group-hover:from-[#f9ce34] group-hover:via-[#ee2a7b] group-hover:to-[#6228d7] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">회사 인스타</span>
            </a>

            {/* 3. 대표 인스타그램 */}
            <a 
              href="https://www.instagram.com/tting_ssam/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">띵쌤 인스타</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}