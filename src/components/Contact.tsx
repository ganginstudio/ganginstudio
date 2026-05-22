import { useState, FormEvent, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ArrowRight, Upload, Paperclip, Send, Sparkles } from 'lucide-react';

export default function Contact() {
  // Advanced Inquiry states
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [region, setRegion] = useState('광주 남구');
  const [projectCategory, setProjectCategory] = useState('아파트 인테리어');
  const [budgetRange, setBudgetRange] = useState('5천~1억');
  const [areaSize, setAreaSize] = useState('');
  const [desiredMood, setDesiredMood] = useState('따뜻하고 미니멀한 (Warm Minimal)');
  const [timeline, setTimeline] = useState('1개월 내외');
  const [uploads, setUploads] = useState<{ name: string; dataUrl: string }[]>([]);
  const [inquiryDetail, setInquiryDetail] = useState('');
  
  const [showInquiryToast, setShowInquiryToast] = useState(false);

  // File handler
  const handleAdvFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setUploads(prev => [
            ...prev,
            { name: file.name, dataUrl: reader.result }
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeAdvUpload = (idx: number) => {
    setUploads(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAdvSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phoneNum.trim()) {
      alert('귀하의 성함과 연락 가능한 대표 연락처를 기입해 주십시오.');
      return;
    }

    const advancedLead = {
      id: 'ADV_' + Date.now(),
      type: 'Advanced Consultation (정밀 기획 상담)',
      name,
      phone: phoneNum,
      category: projectCategory,
      region,
      area: areaSize ? `${areaSize}평` : '개별 계측 필요',
      budget: budgetRange,
      schedule: timeline,
      details: `[희망하는 스타일/무드: ${desiredMood}] \n[세부 설명] ${inquiryDetail}`,
      uploadsCount: uploads.length,
      uploads: uploads.map(u => ({ name: u.name, dataUrl: u.dataUrl })),
      timestamp: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Save logic
    const allLeads = JSON.parse(localStorage.getItem('gangin_all_leads') || '[]');
    localStorage.setItem('gangin_all_leads', JSON.stringify([advancedLead, ...allLeads]));

    // Also inject into general estimates as a pending estimation for redundancy
    const currentEsts = JSON.parse(localStorage.getItem('gangin_estimates') || '[]');
    const secondaryEst = {
      id: advancedLead.id,
      clientName: name,
      phone: phoneNum,
      category: projectCategory,
      spaceType: projectCategory,
      area: areaSize ? `${areaSize}평` : '협의 예정',
      budget: budgetRange,
      schedule: timeline,
      designPreference: desiredMood,
      details: `[종합 정밀 문의] ${inquiryDetail}`,
      consultationType: 'Face-to-Face',
      submittedAt: advancedLead.timestamp,
      status: 'Pending'
    };
    localStorage.setItem('gangin_estimates', JSON.stringify([secondaryEst, ...currentEsts]));

    // Clear
    setName('');
    setPhoneNum('');
    setAreaSize('');
    setInquiryDetail('');
    setUploads([]);
    
    setShowInquiryToast(true);
    setTimeout(() => setShowInquiryToast(false), 5000);
  };

  const categories = [
    '아파트 인테리어',
    '욕실 인테리어',
    '상가 인테리어',
    '카페 인테리어',
    '오피스 인테리어',
    '키즈풀 인테리어',
    '주거 리모델링',
    '상업공간 인테리어',
    '맞춤 프로젝트'
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      id="contact-page-container"
      className="pt-32 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen"
    >
      {/* Toast */}
      <AnimatePresence>
        {showInquiryToast && (
          <div className="fixed top-28 right-6 md:right-12 z-50 bg-[#111111] text-white text-[10px] font-light tracking-widest px-8 py-4 shadow-xl border border-brand-border/40">
            <div className="flex items-center gap-3">
              <Sparkles size={12} className="text-white animate-pulse" />
              <span>정밀 기획상담 접정 완료: 담당 설계사무관이 곧 전속 통화 배정합니다.</span>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="mb-20 space-y-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted/70 block">
          Establish Connection — 커뮤니케이션 오피스 연결
        </span>
        <h1 className="text-2xl md:text-3xl font-extralight tracking-[0.16em] text-[#111111] uppercase">
          오시는 길 & 기획 문의
        </h1>
        <p className="text-xs font-light text-brand-muted max-w-xl leading-relaxed tracking-wider mt-2">
          강인스튜디오 사옥은 광주 남구 양림동 역사문화거리에 위치해 있습니다. 설계 미팅 및 자재 큐레이션 체험은 사전 예약제로 진행되오니 출발 전 온라인 정밀 양식 또는 유선 채널로 문의 주십시오.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start pb-20 border-b border-brand-border/60">
        
        {/* Left Side: Contact details list */}
        <div className="lg:col-span-4 space-y-12">
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#111111] font-semibold">
              ● STUDIO ADdRESS
            </h3>
            <div className="space-y-3 font-light text-xs text-brand-muted leading-relaxed tracking-wide">
              <p className="text-[#111111] font-normal">광주광역시 남구 양림동 24-12 강인스튜디오 빌딩 1F</p>
              <p>지번: 남구 양림동 24-12 (기독병원 근처 복합거리)</p>
              <a 
                href="https://map.naver.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-brand-dark hover:text-brand-muted font-normal underline underline-offset-4 focus:outline-none inline-flex items-center gap-1 mt-1 text-[11px]"
              >
                <span>Naver Map으로 경로 확인</span>
                <ArrowRight size={10} />
              </a>
            </div>
          </div>

          <div className="space-y-6 border-t border-brand-border/60 pt-8">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#111111] font-semibold">
              ● CALL & CHANNEL
            </h3>
            <div className="space-y-3 font-light text-xs text-brand-muted leading-relaxed tracking-wide">
              <p>대표 유선전화: <a href="tel:0625151204" className="text-[#111111] font-normal hover:underline">062.515.1204</a></p>
              <p>상담 직통 모바일: <span className="text-[#111111] font-normal">010.5515.1204</span></p>
              <p>공식 이메일: <a href="mailto:contact@ganginstudio.com" className="text-[#111111] font-normal hover:underline">contact@ganginstudio.com</a></p>
              <p>카카오 채널: <span className="text-brand-dark font-normal">@강인스튜디오</span></p>
            </div>
          </div>

          <div className="space-y-6 border-t border-brand-border/60 pt-8">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#111111] font-semibold">
              ● WORK HOUR SCheDULE
            </h3>
            <div className="space-y-2.5 font-light text-xs text-brand-muted leading-relaxed tracking-wide">
              <p>평일: 10:00 - 18:00 (전면 예약제)</p>
              <p>주말/공휴일: 사전 약정 미팅 수렴 건 운영</p>
              <p className="text-[10px] text-brand-muted/70 italic">
                * 현장 기술 감리 중 전화 수신이 다소 늦어질 수 있어, 부재중일 경우 직통 번호로 카카오톡을 남기시면 감사하겠습니다.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Highly Aesthetic Vector Map */}
        <div className="lg:col-span-8 space-y-6">
          <div className="border border-brand-border p-3.5 bg-white/40">
            {/* Minimalist Grid and Lines Map drawing */}
            <div className="relative w-full aspect-video border border-brand-border/90 bg-[#F2F1EC] overflow-hidden flex items-center justify-center">
              
              {/* Decorative Subtle Grid Lines to express Architect blueprints */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#111 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              
              {/* Asymmetric stylized map elements */}
              <div className="absolute w-[2px] h-full bg-[#E2E1DA] left-[40%]" />
              <div className="absolute w-[2px] h-full bg-[#E2E1DA] left-[75%]" />
              <div className="absolute h-[2px] w-full bg-[#E2E1DA] top-[45%]" />
              
              {/* River/Park styled Area */}
              <div className="absolute right-4 top-4 w-28 h-20 bg-[#E7E7E1]/60 flex items-center justify-center font-serif text-[10px] text-brand-muted/40 tracking-wider">
                양림역사공원
              </div>

              {/* Gwangju Christian Hospital block */}
              <div className="absolute left-6 top-8 w-32 h-16 border border-brand-border bg-white/50 flex flex-col justify-center px-4 font-sans text-[10px] text-brand-muted/70 tracking-widest leading-relaxed">
                <span className="font-light">Gwangju Christian</span>
                <span className="text-[8px] opacity-75">광주기독병원 사거리</span>
              </div>

              {/* Yangnim Community Center block */}
              <div className="absolute left-20 bottom-8 w-28 h-12 border border-brand-border bg-white/50 flex flex-col justify-center px-4 font-sans text-[10px] text-brand-muted/70 tracking-widest leading-relaxed">
                <span className="font-light">Center BLOCK</span>
                <span className="text-[8px] opacity-75">양림동 행정센터</span>
              </div>

              {/* GANG IN STUDIO HQ mark node */}
              <div className="absolute left-[40%] top-[45%] -translate-x-[50%] -translate-y-[50%] z-20 flex flex-col items-center">
                <div className="relative">
                  {/* Slow pulsing circle */}
                  <div className="absolute -inset-2 rounded-full border border-brand-dark/45 animate-ping opacity-75" />
                  <div className="w-4 h-4 bg-brand-dark text-white rounded-none flex items-center justify-center text-[7.5px] font-mono shadow-md">
                    G
                  </div>
                </div>
                
                {/* Minimal Label box */}
                <div className="bg-[#111111] text-[#F7F6F2] py-2 px-3.5 mt-2.5 shadow-sm space-y-0.5">
                  <p className="text-[9px] font-light tracking-[0.2em] uppercase whitespace-nowrap">GANG IN STUDIO HQ</p>
                  <p className="text-[7.5px] text-brand-stone/75 font-light tracking-wide whitespace-nowrap">남구 양림동 24-12 사옥 1F</p>
                </div>
              </div>

              {/* Road names */}
              <p className="absolute bottom-[58%] left-[10%] text-[8px] tracking-[0.2em] uppercase text-brand-muted/50 font-mono">Yangnim-ro Street</p>
              <p className="absolute left-[46%] top-[12%] text-[8px] tracking-[0.2em] uppercase text-brand-muted/50 font-mono rotate-90">Heritage Main Way</p>
            </div>
          </div>
          <p className="text-[10px] font-light text-brand-muted/70 tracking-widest leading-relaxed text-right">
            * Map represents GANG IN STUDIO headquarters corner in Gwangju.
          </p>
        </div>
      </div>

      {/* Advanced Inquiry System (정밀 기획상담 통합포럼) */}
      <div className="pt-24 max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <span className="text-[9px] uppercase tracking-[0.3em] text-brand-muted block">02 — ADVANCED INQUIRY SYSTEM</span>
          <h2 className="text-xl md:text-2xl font-light tracking-[0.15em] text-[#111111] uppercase">정밀 기획 상담 통합 양식</h2>
          <p className="text-xs font-light text-brand-muted max-w-xl mx-auto leading-relaxed">
            세부 평형 정보, 예산 기준 및 고객님이 소유하신 단가 참조 자료(지상도, 자재 가구 선호도)를 모두 첨부하여 공학자처럼 신속하게 일대일 디렉터 상담 예약 명세를 구성하는 고품격 접수처입니다.
          </p>
        </div>

        <form onSubmit={handleAdvSubmit} className="space-y-8 bg-white border border-brand-border p-8 md:p-12 text-xs font-light text-brand-muted">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-[#111111] font-semibold">01 / 귀하의 성함</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 이강인"
                className="w-full text-xs font-light p-3 bg-transparent border border-brand-border focus:outline-none focus:border-brand-dark text-brand-dark"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-[#111111] font-semibold">02 / 대표 번호</label>
              <input
                type="tel"
                required
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full text-xs font-light p-3 bg-transparent border border-brand-border focus:outline-none focus:border-brand-dark text-brand-dark"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-[#111111] font-semibold">03 / 시공 예정 위치 (Region)</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full text-xs font-light p-3 bg-transparent border border-brand-border focus:outline-none text-brand-dark bg-white"
              >
                <option value="광주 남구">광주 남구</option>
                <option value="광주 동구">광주 동구</option>
                <option value="광주 서구">광주 서구</option>
                <option value="광주 북구">광주 북구</option>
                <option value="광주 광산구">광주 광산구</option>
                <option value="전남 나주/혁신도시">전남 나주/혁신도시</option>
                <option value="전남 순천/여수/광양">전남 순천/여수/광양</option>
                <option value="전남 기타지역">전남 기타지역</option>
                <option value="서울 및 타수도권">서울 및 타수도권</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-[#111111] font-semibold">04 / 프로젝트 분야 (Project Type)</label>
              <select
                value={projectCategory}
                onChange={(e) => setProjectCategory(e.target.value)}
                className="w-full text-xs font-light p-3 bg-transparent border border-brand-border focus:outline-none text-brand-dark bg-white"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-[#111111] font-semibold">05 / 규모 (Area / 평수)</label>
              <input
                type="number"
                value={areaSize}
                onChange={(e) => setAreaSize(e.target.value)}
                placeholder="단위 평수 기재 (예: 32)"
                className="w-full text-xs font-light p-3 bg-transparent border border-brand-border focus:outline-none focus:border-brand-dark text-brand-dark"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-[#111111] font-semibold">06 / 기획 예산</label>
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full text-xs font-light p-3 bg-transparent border border-brand-border focus:outline-none text-brand-dark bg-white"
              >
                <option value="3천만원 이하">3천만원 이하</option>
                <option value="3천~5천">3천~5천</option>
                <option value="5천~1억">5천~1억</option>
                <option value="1억~2억">1억~2억</option>
                <option value="2억 이상">2억 이상</option>
                <option value="상담 우선선정">상담 후 비례 환산</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-[#111111] font-semibold">07 / 지향 무드 선호</label>
              <select
                value={desiredMood}
                onChange={(e) => setDesiredMood(e.target.value)}
                className="w-full text-xs font-light p-3 bg-transparent border border-brand-border focus:outline-none text-brand-dark bg-white"
              >
                <option value="따뜻하고 미니멀한 (Warm Minimal)">따뜻하고 미니멀한 (Warm Minimal)</option>
                <option value="현대적이고 정갈한 (Sleek Modern)">현대적이고 정갈한 (Sleek Modern)</option>
                <option value="돌과 나무 중심 내출럴 오가닉 (Natural Stone & Wood)">돌과 나무 중심 내출럴 오가닉 (Natural Stone & Wood)</option>
                <option value="가구 맞춤 지향 하이엔드 (Premium Custom Crafted)">가구 맞춤 지향 하이엔드 (Premium Custom Crafted)</option>
                <option value="프렌치 클래식 & 프랑스 빈티지">프렌치 클래식 & 프랑스 빈티지</option>
                <option value="수평 수밀 완전 하방 설계">수평 수밀 완전 하방 설계</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-[#111111] font-semibold">08 / 희망 공정 일정</label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full text-xs font-light p-3 bg-transparent border border-brand-border focus:outline-none text-brand-dark bg-white"
              >
                <option value="1개월 내외">1개월 내외</option>
                <option value="2-3개월 뒤">2-3개월 뒤</option>
                <option value="6개월 뒤">6개월 뒤</option>
                <option value="일정 자유 조율 회의 필요">일정 자유 조율 회의 필요</option>
              </select>
            </div>
          </div>

          {/* Reference files */}
          <div className="space-y-3 pt-4 border-t border-brand-border/40">
            <label className="text-[9px] uppercase tracking-widest text-[#111111] font-semibold block">
              09 / 참조 도면 혹은 자재 영감 무드보드 첨부 (Reference Upload)
            </label>
            <div className="border border-dashed border-brand-border p-6 text-center space-y-2 bg-brand-bg/5">
              <Paperclip size={16} className="mx-auto text-brand-muted/70" />
              <p className="text-[10px] text-brand-muted font-light">
                자재 및 희망 평면 구조 사진을 드래그하거나 아래 버튼으로 기재하십시오. (Base64 변환 저장형)
              </p>
              <input
                type="file"
                multiple
                id="adv-contact-file-pick"
                accept="image/*"
                onChange={handleAdvFileUpload}
                className="hidden"
              />
              <label
                htmlFor="adv-contact-file-pick"
                className="inline-block px-4 py-1.5 border border-brand-dark text-brand-dark text-[9px] tracking-widest uppercase hover:bg-brand-dark hover:text-white cursor-pointer transition-colors mt-2"
              >
                설계 참고 자료 선택
              </label>
            </div>

            {/* List entries uploads */}
            {uploads.length > 0 && (
              <div className="p-4 border border-brand-border bg-brand-bg/10 divide-y divide-brand-border/60">
                {uploads.map((file, idx) => (
                  <div key={idx} className="py-2 flex justify-between items-center text-[10px]">
                    <span className="font-light tracking-wide">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeAdvUpload(idx)}
                      className="text-red-500 font-bold hover:underline"
                    >
                      제거
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1 pt-4 border-t border-brand-border/40">
            <label className="text-[9px] uppercase tracking-widest text-[#111111] font-semibold block">10 / 공간 기획 세부 문의 사항</label>
            <textarea
              rows={5}
              value={inquiryDetail}
              onChange={(e) => setInquiryDetail(e.target.value)}
              placeholder="아파트 연식이나 기존 하수 배관 지장물의 의심 상태, 혹은 가벽 제거 가능 여부 등 원하시는 구체적인 디테일을 한글로 적어 주십시오."
              className="w-full text-xs font-light p-3 bg-transparent border border-brand-border focus:outline-none focus:border-brand-dark text-brand-dark leading-relaxed"
            />
          </div>

          <div className="pt-6 text-right">
            <button
              type="submit"
              className="px-10 py-4 bg-brand-dark hover:bg-black text-white text-[10px] tracking-[0.2em] font-bold uppercase transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Send size={11} />
              <span>정밀 종합 큐레이션 신청 제출</span>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
