"use client";

import React, { useState } from "react";
import Link from "next/link";

// 콘텐츠 데이터 타입 정의
interface ContentItem {
  title: string;
  desc: string;
  img: string; // 이미지 파일명
  curriculum: string[]; // 상세 커리큘럼 (차시별 내용)
}

export default function ContentsPage() {
  const prefix = "/company-intro";
  
  // 팝업 상태 관리
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);

  // ✅ 1. 성인 교육 콘텐츠 데이터 (6차시로 확장)
  const adultContents: ContentItem[] = [
    {
      title: "팀빌딩",
      desc: "조직 구성원 간의 소통과 신뢰를 쌓고, 긍정적인 에너지를 통해 하나 된 팀워크와 시너지를 창출합니다.",
      img: "c_adult_01.jpg",
      curriculum: [
        "[Ice Breaking] 마음 열기 및 라포 형성",
        "[Team Mission] 협력 미션 해결 및 역할 분담",
        "[Deep Communication] 갈등 관리와 공감 대화법",
        "[Vision Sharing] 우리 팀의 핵심 가치 내재화",
        "[Feedback] 성찰 및 액션 플랜 수립",
        "[Closing] 변화된 우리 모습 공유 및 다짐"
      ]
    },
    {
      title: "AI 기초 및 활용",
      desc: "ChatGPT 등 생성형 AI의 원리를 이해하고, 기획·마케팅·보고서 작성 등 실무에 즉시 적용하여 업무 생산성을 극대화합니다.",
      img: "c_adult_02.jpg",
      curriculum: [
        "생성형 AI의 이해와 최신 트렌드",
        "효과적인 프롬프트 엔지니어링 기법",
        "업무 자동화를 위한 AI 도구 실습 (엑셀, PPT)",
        "마케팅 카피라이팅 및 기획안 작성 실습",
        "AI 윤리와 보안 유의사항",
        "[Project] 나만의 AI 업무 비서 만들기 실습"
      ]
    },
    {
      title: "신입 사원 교육",
      desc: "조직의 비전과 핵심 가치를 내재화하고, 비즈니스 매너와 워크스마트 역량을 함양하여 핵심 인재로 도약합니다.",
      img: "c_adult_03.jpg",
      curriculum: [
        "조직의 이해와 프로의식 함양",
        "비즈니스 매너와 직장 예절 (인사, 전화, 이메일)",
        "효율적인 시간 관리와 업무 보고 스킬",
        "선배 세대와의 소통과 팔로워십",
        "나만의 커리어 로드맵 설계",
        "[Networking] 선배와의 대화 및 수료식"
      ]
    },
    {
      title: "오리엔테이션",
      desc: "낯선 환경에서의 긴장을 해소하고, 아이스브레이킹과 네트워킹을 통해 소속감과 유대감을 빠르게 형성합니다.",
      img: "c_adult_04.jpg",
      curriculum: [
        "웰컴 세레모니 및 오프닝",
        "관계 형성을 위한 게이미피케이션 활동",
        "팀별 미션 수행을 통한 유대감 강화",
        "조직 문화 체험 및 퀴즈 대결",
        "소감 공유 및 네트워크 파티",
        "[Vision] 우리 조직의 미래 그리기"
      ]
    },
    {
      title: "문서 작성",
      desc: "논리적인 기획력과 설득력 있는 글쓰기를 통해, 상사를 설득하고 성과를 만드는 비즈니스 문서 작성법을 익힙니다.",
      img: "c_adult_05.jpg",
      curriculum: [
        "비즈니스 문서의 종류와 특징 이해",
        "상대방을 설득하는 논리적 구조 잡기 (기획)",
        "한눈에 들어오는 가독성 높은 레이아웃",
        "실전! 기획서 및 보고서 작성 실습",
        "1:1 첨삭 및 피드백",
        "[Final] 실전 보고서 프레젠테이션"
      ]
    },
    {
      title: "레고(LEGO)시리어스",
      desc: "손으로 생각하며 잠재된 통찰을 끌어내는 'Hard Fun' 워크숍입니다. 은유와 스토리텔링을 통해 복잡한 문제를 시각화하고, 조직의 비전을 구체적으로 설계합니다.",
      img: "c_adult_lego.jpg",
      curriculum: [
        "[Skill Building] 손으로 생각하기: 레고 브릭과 친해지기 & 뇌 깨우기",
        "[Identity] 나의 직무 정체성(My Identity) 시각화 및 스토리텔링",
        "[Shared Model] 우리가 바라는 조직의 미래: 공통 비전 모델링",
        "[Landscape] 연결과 관계: 구성원과 조직 간의 유기적 시스템 구축",
        "[Strategy] 문제 해결 시뮬레이션: 장애물 요인 분석 및 극복 방안",
        "[Closing] 핵심 원칙(Simple Guiding Principles) 도출 및 회고"
      ]
    },
  ];

  // ✅ 2. 청소년 교육 콘텐츠 데이터 (6차시로 확장)
  const youthContents: ContentItem[] = [
    {
      title: "진로 탐색",
      desc: "자기 이해(검사·해석)를 바탕으로 적성을 발견하고, 급변하는 미래 직업 트렌드를 분석하여 나만의 진로 로드맵을 설계합니다.",
      img: "c_youth_01.jpg",
      curriculum: [
        "진로적성검사 실시 및 해석 (홀랜드/MBTI 등)",
        "나만의 강점 찾기와 자존감 향상",
        "미래 직업 세계의 변화와 트렌드 읽기",
        "관심 직업 심층 탐구 및 직업 카드 활동",
        "드림 로드맵(Dream Road-map) 그리기",
        "[Presentation] 나의 꿈 발표회 및 응원하기"
      ]
    },
    {
      title: "고교학점제/탐구보고서/대입",
      desc: "고교학점제에 맞춘 과목 선택 전략부터 심화 탐구 보고서 작성, 대입 면접까지 체계적인 진학 솔루션을 제공합니다.",
      img: "c_youth_02.jpg",
      curriculum: [
        "고교학점제 이해와 나에게 맞는 과목 선택",
        "생활기록부 관리 전략 및 로드맵",
        "주제 선정부터 결론까지, 탐구보고서 작성법",
        "대학 입시 전형 분석 및 지원 전략",
        "실전 모의 면접 및 피드백",
        "[Q&A] 선배 멘토링 및 진학 질의응답"
      ]
    },
    {
      title: "중소기업의 이해",
      desc: "지역 강소기업과 중소기업에 대한 편견을 해소하고, 알짜 기업 분석을 통해 실질적인 취업 기회를 탐색합니다.",
      img: "c_youth_03.jpg",
      curriculum: [
        "중소기업 vs 대기업, 올바른 이해와 인식 개선",
        "우리 지역의 히든 챔피언(강소기업) 찾기",
        "기업 분석 방법 및 채용 공고 읽기",
        "청년 취업 지원 정책 및 혜택 알아보기",
        "모의 입사 지원 활동",
        "[Review] 우수 기업 탐방 보고서 작성"
      ]
    },
    {
      title: "면접 및 자소서",
      desc: "나만의 스토리를 담은 자기소개서 작성법과 모의 면접(이미지 메이킹, 스피치)을 통해 실전 취업 역량을 강화합니다.",
      img: "c_youth_04.jpg",
      curriculum: [
        "채용 트렌드와 직무 역량의 이해",
        "스토리텔링을 활용한 자기소개서 작성법",
        "면접 이미지 메이킹과 보이스 트레이닝",
        "유형별 면접 질문 공략법",
        "실전 모의 면접 및 비디오 피드백",
        "[Final Check] 면접 복장 및 태도 최종 점검"
      ]
    },
    {
      title: "AI 기초 및 활용",
      desc: "디지털 리터러시 함양과 함께 AI 도구를 활용한 창작 활동을 통해 미래 사회에 필요한 AI 활용 능력을 키웁니다.",
      img: "c_youth_05.jpg",
      curriculum: [
        "인공지능(AI)의 개념과 우리 생활 속 AI",
        "생성형 AI 도구 체험 (ChatGPT, 뤼튼 등)",
        "AI를 활용한 나만의 웹툰/이미지 만들기",
        "AI와 함께하는 문제 해결 프로젝트",
        "올바른 AI 활용 윤리와 저작권",
        "[Exhibition] AI 창작물 전시회 및 발표"
      ]
    },
    {
      title: "학생회 퍼실리테이션",
      desc: "민주적인 회의 진행법과 의사결정 과정을 익히고, 리더십과 소통 능력을 갖춘 학교의 리더를 양성합니다.",
      img: "c_youth_06.jpg",
      curriculum: [
        "리더의 역할과 퍼실리테이션의 이해",
        "아이디어를 발산하고 수렴하는 회의 기법",
        "갈등을 조정하고 합의를 이끄는 소통법",
        "우리 학교 문제 해결을 위한 액션 플랜",
        "학생 자치 활동 기획 실습",
        "[Campaign] 학생회 공약 발표 및 피드백"
      ]
    },
    {
      title: "창업 캠프",
      desc: "문제 해결 중심의 기업가 정신을 배우고, 아이디어 발굴부터 사업계획서 작성(IR)까지 모의 창업 과정을 경험합니다.",
      img: "c_youth_07.jpg",
      curriculum: [
        "기업가 정신(Entrepreneurship)과 창업의 이해",
        "디자인 씽킹을 통한 문제 발견 및 정의",
        "비즈니스 모델 캔버스(BMC) 작성",
        "프로토타입 제작 및 홍보 마케팅",
        "IR 피칭(투자 유치 발표) 대회",
        "[Award] 모의 투자 대회 시상식"
      ]
    },
    {
      title: "오리엔테이션",
      desc: "새 학기, 새 친구들과의 어색함을 없애고 즐거운 활동을 통해 학교생활 적응력을 높이는 관계 형성 프로그램입니다.",
      img: "c_youth_08.jpg",
      curriculum: [
        "학급 분위기 조성을 위한 아이스브레이킹",
        "친구의 장점 찾기 및 칭찬 샤워",
        "우리 반 규칙 만들기 (학급 헌법)",
        "팀빌딩 게임 및 협동 미션",
        "타임캡슐 만들기 (1년 뒤 나에게)",
        "[Closing] 우리 반 단체사진 및 롤링페이퍼"
      ]
    },
    {
      title: "인성 및 학교폭력",
      desc: "타인에 대한 공감과 배려, 올바른 의사소통 방법을 배우며 건강하고 안전한 학교 문화를 함께 만들어갑니다.",
      img: "c_youth_09.jpg",
      curriculum: [
        "학교폭력의 유형과 심각성 인지",
        "감정 카드를 활용한 내 마음 표현하기",
        "방관자 vs 방어자, 용기 있는 선택",
        "비폭력 대화법(NVC)과 사과하는 법",
        "학교폭력 예방 캠페인 기획",
        "[Promise] 비폭력 서약식 및 다짐 나무 만들기"
      ]
    },
    {
      title: "민주시민교육",
      desc: "공동체의 일원으로서 권리와 책임을 이해하고, 사회 문제에 주체적으로 참여하는 성숙한 시민 의식을 함양합니다.",
      img: "c_youth_10.jpg",
      curriculum: [
        "민주주의와 시민의 권리/의무",
        "다양성과 인권 존중의 가치",
        "미디어 리터러시와 가짜 뉴스 판별",
        "지역 사회 문제 발견 및 정책 제안",
        "세계 시민으로서의 역할과 책임",
        "[Action] 지역 사회 참여 프로젝트 실행"
      ]
    },
  ];

  // 팝업 열기 함수
  const openModal = (item: ContentItem) => {
    setSelectedContent(item);
  };

  // 팝업 닫기 함수
  const closeModal = () => {
    setSelectedContent(null);
  };

  // 이미지 경로 처리 함수 (이미지 없으면 회색 박스)
  const getImgSrc = (imgName: string) => {
    return `${prefix}/${imgName}`;
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* 페이지 헤더 */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold text-indigo-900 mb-6">교육 콘텐츠</h1>
          <p className="text-xl text-slate-600">
            크레오디만의 전문적이고 즐거운 맞춤형 프로그램을 소개합니다.
          </p>
        </div>

        {/* 1. 성인(청년, 기업) 섹션 */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">성인 <span className="text-indigo-600 text-lg md:text-xl font-medium">(기업, 청년, 기관&센터)</span></h2>
            <div className="flex-grow h-px bg-slate-200"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adultContents.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                {/* 이미지 영역 */}
                <div className="h-52 bg-slate-100 relative overflow-hidden">
                  <img 
                    src={getImgSrc(item.img)} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.innerHTML = '<span class="text-slate-400 font-medium">No Image</span>';
                      }
                    }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs font-bold text-indigo-500 mb-2 uppercase tracking-wider">Adult & Corporate</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed break-keep flex-grow">
                    {item.desc}
                  </p>
                  
                  {/* 팝업 열기 버튼 */}
                  <button 
                    onClick={() => openModal(item)}
                    className="w-full py-3 bg-slate-50 text-indigo-600 font-bold text-sm rounded-xl hover:bg-indigo-600 hover:text-white transition flex items-center justify-center gap-1 group-hover:bg-indigo-50"
                  >
                    프로그램 안내 &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. 청소년(진로/진학/캠프) 섹션 */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">청소년 <span className="text-indigo-600 text-lg md:text-xl font-medium">(진로&진학 / 교내캠프 / 기관&센터)</span></h2>
            <div className="flex-grow h-px bg-slate-200"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {youthContents.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                {/* 이미지 영역 */}
                <div className="h-52 bg-slate-100 relative overflow-hidden">
                  <img 
                    src={getImgSrc(item.img)} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.innerHTML = '<span class="text-slate-400 font-medium">No Image</span>';
                      }
                    }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs font-bold text-indigo-500 mb-2 uppercase tracking-wider">Youth & Education</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed break-keep flex-grow">
                    {item.desc}
                  </p>

                  {/* 팝업 열기 버튼 */}
                  <button 
                    onClick={() => openModal(item)}
                    className="w-full py-3 bg-slate-50 text-indigo-600 font-bold text-sm rounded-xl hover:bg-indigo-600 hover:text-white transition flex items-center justify-center gap-1 group-hover:bg-indigo-50"
                  >
                    프로그램 안내 &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ▼▼▼ [상세 정보 팝업 모달] ▼▼▼ */}
      {selectedContent && (
        <div 
          className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeModal} // 배경 클릭 시 닫기
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative animate-scaleIn max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()} // 내용 클릭 시 닫히지 않음
          >
            {/* 팝업 헤더 (이미지 + 제목) */}
            <div className="relative h-48 sm:h-64 bg-slate-100 shrink-0">
               <img 
                src={getImgSrc(selectedContent.img)} 
                alt={selectedContent.title}
                className="w-full h-full object-cover"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 md:p-8">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedContent.title}</h3>
                  <p className="text-white/90 text-sm md:text-base line-clamp-2">{selectedContent.desc}</p>
                </div>
              </div>
              {/* 닫기 버튼 */}
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-2 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 팝업 내용 (커리큘럼) */}
            <div className="p-6 md:p-8 overflow-y-auto">
              <h4 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                {/* ✅ 수정: '세부 커리큘럼' -> '교육내용구성' */}
                교육 구성
              </h4>
              
              <div className="space-y-3">
                {selectedContent.curriculum.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-100 transition">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 font-medium pt-1 break-keep">
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                 <Link href="/#contact" className="inline-block px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition shadow-lg">
                    교육 문의하기
                 </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ▲▲▲ [모달 끝] ▲▲▲ */}

    </div>
  );
}