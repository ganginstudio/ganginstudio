import { useState, useEffect, FormEvent, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EstimateSubmit, NavView } from '../types';
import { Check, Send, Sparkles, ClipboardList, Clock, Phone, Trash2, ChevronRight, Upload, Paperclip } from 'lucide-react';

interface EstimateProps {
  prefillCategory: string;
  prefillSpace: string;
  clearPrefill: () => void;
  setView: (view: NavView) => void;
}

export default function Estimate({ prefillCategory, prefillSpace, clearPrefill, setView }: EstimateProps) {
  // 7-Step Progressive flow state
  const [step, setStep] = useState(1);

  // Field states
  const [projectType, setProjectType] = useState('아파트 인테리어');
  const [region, setRegion] = useState('광주 남구');
  const [areaInPyeong, setAreaInPyeong] = useState('32');
  const [areaInSqm, setAreaInSqm] = useState('105');
  const [budget, setBudget] = useState('5천~1억');
  const [desiredStyle, setDesiredStyle] = useState('따뜻하고 미니멀한 (Warm Minimal)');
  const [constructionSchedule, setConstructionSchedule] = useState('1개월 내외');
  
  // Advanced uploads with multiple types
  const [uploads, setUploads] = useState<{ name: string; type: string; dataUrl: string }[]>([]);
  
  // Contact details
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [preferredContactTime, setPreferredContactTime] = useState('오후 12시 ~ 3시');

  // Interactive logs from local storage
  const [savedEstimates, setSavedEstimates] = useState<EstimateSubmit[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Dual conversions
  const handlePyeongChange = (value: string) => {
    setAreaInPyeong(value);
    const num = Number(value);
    if (!isNaN(num) && num > 0) {
      setAreaInSqm(Math.round(num * 3.3057).toString());
    } else {
      setAreaInSqm('');
    }
  };

  const handleSqmChange = (value: string) => {
    setAreaInSqm(value);
    const num = Number(value);
    if (!isNaN(num) && num > 0) {
      setAreaInPyeong(Math.round(num / 3.3057).toString());
    } else {
      setAreaInPyeong('');
    }
  };

  // Base64 file loaders
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // File handler connected directly to Supabase Storage
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>, uploadType: string) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (const file of Array.from(files) as File[]) {
      try {
        const { uploadPortfolioImage } = await import('../lib/supabase');
        const storageUrl = await uploadPortfolioImage(file);
        setUploads(prev => [
          ...prev,
          { name: file.name, type: uploadType, dataUrl: storageUrl }
        ]);
      } catch (err: any) {
        alert(`인테리어 시공 참고자료 업로드 실패: ${err.message || err}`);
      }
    }
  };

  const removeUpload = (index: number) => {
    setUploads(prev => prev.filter((_, idx) => idx !== index));
  };

  // Categories & styles lists match ON:SAEMI & 1204
  const categoriesList = [
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

  const regionsList = [
    '광주 남구',
    '광주 동구',
    '광주 서구',
    '광주 북구',
    '광주 광산구',
    '전남 나주/혁신도시',
    '전남 순천/여수/광양',
    '전남 기타지역',
    '서울 및 타수도권'
  ];

  const budgetsList = [
    '3천만원 이하',
    '3천~5천',
    '5천~1억',
    '1억~2억',
    '2억 이상',
    '세부 상담 필요'
  ];

  const stylesList = [
    '따뜻하고 미니멀한 (Warm Minimal)',
    '현대적이고 정갈한 (Sleek Modern)',
    '돌과 나무 중심 내출럴 오가닉 (Natural Stone & Wood)',
    '가구 맞춤 지향 하이엔드 (Premium Custom Crafted)',
    '프렌치 클래식 & 오브제 (Artistic Vintage)',
    '시방서 기준 가변 제안 (Consultative)'
  ];

  const schedulesList = [
    '1개월 내외',
    '2-3개월 뒤',
    '6개월 뒤',
    '일정 매우 유연함'
  ];

  // Prefilling mechanism
  useEffect(() => {
    if (prefillCategory) {
      setProjectType(prefillCategory === 'Apartment' || prefillCategory === 'Residential' ? '아파트 인테리어' : prefillCategory);
    }
    if (prefillSpace) {
      setDetails(`[포트폴리오 참조 문의] ${prefillSpace} 프로젝트와 동일 자재의 음영 및 수평 정렬 디테일을 적용한 평면 개축 설계를 검토하고 있습니다.`);
    }
    return () => {
      clearPrefill();
    };
  }, [prefillCategory, prefillSpace]);

  // Load estimates log directly from Supabase Database (No localStorage fallback)
  useEffect(() => {
    async function load() {
      const { getEstimates } = await import('../lib/leads');
      const data = await getEstimates();
      setSavedEstimates(data);
    }
    load();
  }, []);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      alert('귀하의 성함을 기재해주십시오.');
      return;
    }
    if (!phone.trim()) {
      alert('연락 가능하신 대표 번호를 알려주십시오.');
      return;
    }

    const designPreferenceStr = `${desiredStyle} | 시공일정: ${constructionSchedule}`;

    const newEstimate: EstimateSubmit = {
      id: 'EST_' + Date.now(),
      clientName,
      phone,
      category: projectType,
      spaceType: projectType,
      area: `${areaInPyeong}평 / ${areaInSqm}㎡`,
      budget,
      schedule: constructionSchedule,
      designPreference: designPreferenceStr,
      details: `[지역: ${region}] ${details} ${uploads.length > 0 ? `[첨부파일: ${uploads.length}개 업로드됨]` : ''} [희망연락시간: ${preferredContactTime}]`,
      consultationType: 'Call',
      submittedAt: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Pending'
    };

    const updated = [newEstimate, ...savedEstimates];
    setSavedEstimates(updated);

    // Save lead submission directly to Supabase Database
    const newLead = {
      id: newEstimate.id,
      type: 'Detailed Estimate (정밀 공간 견적)',
      name: clientName,
      phone,
      category: projectType,
      region,
      area: `${areaInPyeong}평 (${areaInSqm}㎡)`,
      budget,
      schedule: constructionSchedule,
      details: `${details} (희망연락시간: ${preferredContactTime})`,
      uploadsCount: uploads.length,
      uploads: uploads.map(u => ({ name: u.name, type: u.type, dataUrl: u.dataUrl })),
      timestamp: newEstimate.submittedAt
    };

    import('../lib/leads').then(({ addLeadSubmission }) => {
      addLeadSubmission({
        lead: newLead,
        estimate: newEstimate
      });
    });

    // Clear state
    setClientName('');
    setPhone('');
    setDetails('');
    setUploads([]);
    setStep(1);

    setToastMessage(`견적 회의 배정 완료: ${newEstimate.clientName} 선배치안 심의 대기`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const deleteEstimate = async (id: string) => {
    const updated = savedEstimates.filter(e => e.id !== id);
    setSavedEstimates(updated);
    
    try {
      const { saveEstimates, getLeads, saveLeads } = await import('../lib/leads');
      await saveEstimates(updated);
      const allLeads = await getLeads();
      await saveLeads(allLeads.filter((l: any) => l.id !== id));
    } catch (err) {
      console.error('[Supabase] Failed to delete estimate:', err);
    }
  };

  return (
    <div id="estimate-view-container" className="pt-32 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-28 right-6 md:right-12 z-50 bg-[#111111] text-white text-[10px] font-light tracking-widest px-8 py-4 shadow-xl border border-brand-border/40"
          >
            <div className="flex items-center gap-3">
              <Sparkles size={12} className="text-white animate-pulse" />
              <span>{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Editorial Information Column */}
        <div className="lg:col-span-4 space-y-12 lg:sticky lg:top-32">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted/70 block">
              01 — Multi-Step Custom Estimate
            </span>
            <h1 className="text-xl md:text-2xl font-extralight tracking-[0.18em] text-[#111111] uppercase leading-relaxed">
              우리집 / 나의가게 <br/>예상견적 받아보기
            </h1>
            <p className="text-xs font-light text-brand-muted leading-relaxed tracking-wider mt-2">
              정량화된 시공 원가와 디테일한 도면 큐레이션을 제공하기 위해 운영되는 다단계 간편 가산출 시스템입니다. 각 항목을 성실히 이행해 주시면, 시공 원가 오차율 5% 이내의 정밀한 명세를 검수해 드립니다.
            </p>
          </div>

          <div className="border-t border-brand-border/60 pt-8 space-y-4 text-xs font-light text-brand-muted">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#111111] font-normal">● 프리미엄 기술 규정</h4>
            <ul className="space-y-3.5 leading-relaxed tracking-wide">
              <li>• 라이선스 정규 면허 기술진 본사 고정 배치</li>
              <li>• 중간 수수료 소거 원가 명세 정찰제</li>
              <li>• 하자 보완을 극대화한 건조 및 방수 4회 레이징 보증</li>
              <li>• 하자 이행 초과 3개년 오피스 무료 복구권 제공</li>
            </ul>
          </div>

          {/* User History logger */}
          {savedEstimates.length > 0 && (
            <div className="space-y-6 border-t border-brand-border/60 pt-8">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#111111] font-normal flex items-center gap-2">
                <ClipboardList size={13} />
                <span>나의 견적 접수 현황 ({savedEstimates.length})</span>
              </h3>
              
              <div className="max-h-[250px] overflow-y-auto pr-2 space-y-4">
                {savedEstimates.map((est) => (
                  <div key={est.id} className="border border-brand-border p-5 bg-white space-y-3 relative">
                    <button 
                      onClick={() => deleteEstimate(est.id)}
                      className="absolute top-4 right-4 text-brand-muted/40 hover:text-black transition-colors focus:outline-none cursor-pointer"
                    >
                      <Trash2 size={12} />
                    </button>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[8px] font-mono tracking-wider text-brand-muted">
                        {est.submittedAt}
                      </span>
                      <span className="text-[8px] border border-brand-dark px-2 py-0.5 tracking-widest text-[#111111]">
                        사전심의중
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-normal text-brand-dark tracking-wide">{est.clientName} 귀하</h4>
                      <p className="text-[10px] text-brand-muted">{est.category} / {est.area} / {est.budget}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Dynamic Form Workspace Card */}
        <div className="lg:col-span-8 bg-white border border-brand-border p-8 md:p-12">
          {/* Progress Tracker Block */}
          <div className="mb-10">
            <div className="flex justify-between text-[9px] font-mono uppercase tracking-[0.25em] text-brand-muted pb-3">
              <span>Progress Tracker</span>
              <span className="text-brand-dark font-medium">Step {step} of 7</span>
            </div>
            
            {/* Elegant thin bar indicating progress */}
            <div className="h-[2px] w-full bg-brand-border relative">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-brand-dark"
                initial={{ width: '14.28%' }}
                animate={{ width: `${(step / 7) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Steps text descriptors */}
            <div className="hidden sm:flex justify-between text-[8px] tracking-widest text-brand-muted/70 pt-3 uppercase">
              <span className={step === 1 ? 'text-brand-dark font-normal' : ''}>01. 공간선정</span>
              <span className={step === 2 ? 'text-brand-dark font-normal' : ''}>02. 시공지역</span>
              <span className={step === 3 ? 'text-brand-dark font-normal' : ''}>03. 면적환산</span>
              <span className={step === 4 ? 'text-brand-dark font-normal' : ''}>04. 예산규모</span>
              <span className={step === 5 ? 'text-brand-dark font-normal' : ''}>05. 스타일링</span>
              <span className={step === 6 ? 'text-brand-dark font-normal' : ''}>06. 자료첨부</span>
              <span className={step === 7 ? 'text-brand-dark font-normal' : ''}>07. 예약안내</span>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-8 text-xs text-brand-dark">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Project Type */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="text-sm font-normal tracking-widest">어떤 공간을 예술화할지 선택해 주십시오.</h3>
                    <p className="text-[10px] text-brand-muted tracking-wide font-light">
                      주거 리모델링 및 프리미엄 조적 욕실, 고품격 상가 라운지 등 분야에 맞는 최적의 전문가를 배정합니다.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {categoriesList.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setProjectType(cat)}
                        className={`text-center py-3.5 border font-light tracking-wider transition-all duration-300 cursor-pointer ${
                          projectType === cat
                            ? 'border-brand-dark bg-brand-dark text-white'
                            : 'border-brand-border hover:border-brand-dark text-brand-dark bg-transparent'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="pt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-8 py-3 bg-[#111111] text-white text-[10px] tracking-widest uppercase hover:bg-black transition-colors"
                    >
                      시공 지역 설정하기
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Region */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="text-sm font-normal tracking-widest">시공 예정 위치를 선택하십시오.</h3>
                    <p className="text-[10px] text-brand-muted tracking-wide font-light">
                      강인스튜디오는 양림동 사옥을 기반으로 광주 전남 전역 직영 기술 감리망을 수렴하고 있으며, 서울 수도권 출장 미팅도 접수합니다.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {regionsList.map((reg) => (
                      <button
                        key={reg}
                        type="button"
                        onClick={() => setRegion(reg)}
                        className={`text-center py-3.5 border font-light tracking-wider transition-all duration-300 cursor-pointer ${
                          region === reg
                            ? 'border-brand-dark bg-brand-dark text-white'
                            : 'border-brand-border hover:border-brand-dark text-brand-dark bg-transparent'
                        }`}
                      >
                        {reg}
                      </button>
                    ))}
                  </div>

                  <div className="pt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 border border-brand-border text-brand-muted hover:text-brand-dark hover:border-brand-dark transition-all text-[10px] tracking-widest uppercase"
                    >
                      이전 단계
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-8 py-3 bg-[#111111] text-white text-[10px] tracking-widest uppercase hover:bg-black transition-all"
                    >
                      면적 입력하기
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Area/Size (Dual Tracker) */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="text-sm font-normal tracking-widest">공간의 규모를 수치화해 주십시오.</h3>
                    <p className="text-[10px] text-brand-muted tracking-wide font-light">
                      평수(Pyeong)와 제곱미터(㎡) 간의 자동 기하학 비례 환산 모델을 가동하고 있습니다. 편하신 단위를 적으시면 상호 자동 연동 환산 기입됩니다.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-widest text-brand-muted block">평수 입력 (Pyeong)</span>
                      <div className="flex items-center gap-2 border border-brand-border bg-white p-3">
                        <input
                          type="text"
                          value={areaInPyeong}
                          onChange={(e) => handlePyeongChange(e.target.value)}
                          placeholder="예: 32"
                          className="bg-transparent w-full font-light focus:outline-none"
                        />
                        <span className="text-brand-muted font-sans text-[11px]">평</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-widest text-brand-muted block">제곱미터 자동환산 (㎡)</span>
                      <div className="flex items-center gap-2 border border-brand-border bg-white p-3">
                        <input
                          type="text"
                          value={areaInSqm}
                          onChange={(e) => handleSqmChange(e.target.value)}
                          placeholder="예: 105"
                          className="bg-transparent w-full font-light focus:outline-none"
                        />
                        <span className="text-brand-muted font-sans text-[11px]">㎡</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-brand-bg text-[10px] text-brand-muted/70 italic tracking-wider leading-relaxed">
                    * 1평 기준 3.3057㎡ 시방 표준 연계 공식을 기본 탑재하고 있습니다.
                  </div>

                  <div className="pt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 border border-brand-border text-brand-muted hover:text-brand-dark hover:border-brand-dark transition-all text-[10px] tracking-widest uppercase"
                    >
                      이전 단계
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="px-8 py-3 bg-[#111111] text-white text-[10px] tracking-widest uppercase hover:bg-black transition-all"
                    >
                      예상 예산 설정
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Budget */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="text-sm font-normal tracking-widest">기획 중이신 예상 예산 규모는 어떠합니까?</h3>
                    <p className="text-[10px] text-brand-muted tracking-wide font-light">
                      강인스튜디오는 예산안에 최적화된 마감 스펙과 가구 라인을 대조 검토하여 투명 명세서를 미리 세분화합니다.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {budgetsList.map((bud) => (
                      <button
                        key={bud}
                        type="button"
                        onClick={() => setBudget(bud)}
                        className={`text-start px-4 py-3.5 border font-light tracking-wide transition-all duration-300 cursor-pointer ${
                          budget === bud
                            ? 'border-brand-dark bg-brand-dark/10 text-brand-dark font-normal'
                            : 'border-brand-border hover:border-brand-dark text-brand-muted bg-transparent'
                        }`}
                      >
                        {bud}
                      </button>
                    ))}
                  </div>

                  <div className="pt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3 border border-brand-border text-brand-muted hover:text-brand-dark hover:border-brand-dark transition-all text-[10px] tracking-widest uppercase"
                    >
                      이전 단계
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(5)}
                      className="px-8 py-3 bg-[#111111] text-white text-[10px] tracking-widest uppercase hover:bg-black transition-all"
                    >
                      지향 스타일 선택
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Style & Schedule */}
              {step === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="text-sm font-normal tracking-widest">선호하는 주거/미학적 무드를 정의해 주십시오.</h3>
                    <p className="text-[10px] text-brand-muted tracking-wide font-light">
                      장식이 절제된 정갈함이나 석재와 나무 질감 중심 등 지향하시는 톤앤매너에 어울리는 공간 자재 견본을 선별합니다.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="text-[9px] uppercase tracking-widest text-[#111111]/70 block font-normal">지향 톤앤매너 스타일</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {stylesList.map((style) => (
                        <button
                          key={style}
                          type="button"
                          onClick={() => setDesiredStyle(style)}
                          className={`text-start p-3.5 border font-light tracking-wide transition-all duration-300 cursor-pointer ${
                            desiredStyle === style
                              ? 'border-brand-dark bg-brand-dark/10 text-brand-dark font-normal'
                              : 'border-brand-border hover:border-brand-dark text-brand-muted'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-brand-border/40">
                    <span className="text-[9px] uppercase tracking-widest text-[#111111]/70 block font-normal">착공 희망 시기</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {schedulesList.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setConstructionSchedule(item)}
                          className={`text-center py-2.5 border text-[10px] font-light tracking-wider transition-all duration-300 cursor-pointer ${
                            constructionSchedule === item
                              ? 'border-brand-dark bg-brand-dark text-white'
                              : 'border-brand-border hover:border-brand-dark text-brand-muted'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="px-6 py-3 border border-brand-border text-brand-muted hover:text-brand-dark hover:border-brand-dark transition-all text-[10px] tracking-widest uppercase"
                    >
                      이전 단계
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(6)}
                      className="px-8 py-3 bg-[#111111] text-white text-[10px] tracking-widest uppercase hover:bg-black transition-all"
                    >
                      참고자료 첨부
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 6: Reference Upload */}
              {step === 6 && (
                <motion.div
                  key="step-6"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="text-sm font-normal tracking-widest">설계에 참조될 파일을 등록해 주십시오.</h3>
                    <p className="text-[10px] text-brand-muted tracking-wide font-light">
                      평면도(Floorplan), 손그림 메모, 자재 사진 또는 벤치마킹하고 싶은 실내 텍러 이미지를 카테고리별로 첨부하시면 더욱 명민하게 분석합니다. (Base64 변환 저장형)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="border border-dashed border-brand-border p-6 text-center space-y-3 bg-brand-bg/10 hover:bg-brand-bg/30 transition-all">
                      <Upload size={18} className="mx-auto text-brand-muted" />
                      <div>
                        <span className="text-[10px] tracking-wider text-brand-dark block font-normal">도면 / 레이아웃 업로드</span>
                        <span className="text-[9px] text-brand-muted text-gray-400 font-light block mt-0.5">Floorplan or Layout Files</span>
                      </div>
                      <input
                        type="file"
                        multiple
                        id="floorplan-upload-btn"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'Floorplan')}
                        className="hidden"
                      />
                      <label 
                        htmlFor="floorplan-upload-btn"
                        className="inline-block px-4 py-1.5 border border-brand-dark/20 text-brand-dark text-[10px] tracking-widest font-normal hover:bg-brand-dark hover:text-white cursor-pointer transition-colors"
                      >
                        우선도면 선택
                      </label>
                    </div>

                    <div className="border border-dashed border-brand-border p-6 text-center space-y-3 bg-brand-bg/10 hover:bg-brand-bg/30 transition-all">
                      <Paperclip size={18} className="mx-auto text-brand-muted" />
                      <div>
                        <span className="text-[10px] tracking-wider text-brand-dark block font-normal">참고 사진 / 무드 보드 업로드</span>
                        <span className="text-[9px] text-brand-muted text-gray-400 font-light block mt-0.5">References & Moodboards</span>
                      </div>
                      <input
                        type="file"
                        multiple
                        id="reference-upload-btn"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'Reference & Material')}
                        className="hidden"
                      />
                      <label 
                        htmlFor="reference-upload-btn"
                        className="inline-block px-4 py-1.5 border border-brand-dark/20 text-brand-dark text-[10px] tracking-widest font-normal hover:bg-brand-dark hover:text-white cursor-pointer transition-colors"
                      >
                        희망사진 선택
                      </label>
                    </div>
                  </div>

                  {/* Upload logs listed with uploader previews */}
                  {uploads.length > 0 && (
                    <div className="space-y-2 border border-brand-border p-4 bg-white">
                      <span className="text-[9px] tracking-widest text-[#111111]/70 block font-normal">대기열 업로드 파일 목록 ({uploads.length})</span>
                      <div className="divide-y divide-brand-border/60 max-h-[150px] overflow-y-auto">
                        {uploads.map((up, idx) => (
                          <div key={idx} className="py-2.5 flex justify-between items-center text-[10px]">
                            <div className="flex items-center gap-2">
                              {up.dataUrl && (
                                <img src={up.dataUrl} className="w-6 h-6 object-cover border" alt="preview" referrerPolicy="no-referrer" />
                              )}
                              <span className="font-light truncate max-w-[200px]">{up.name}</span>
                              <span className="text-[8px] bg-brand-dark/10 text-brand-dark px-1.5 py-0.2">{up.type}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeUpload(idx)}
                              className="text-red-500 hover:text-red-700 font-mono font-bold cursor-pointer"
                            >
                              DELETE
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(5)}
                      className="px-6 py-3 border border-brand-border text-brand-muted hover:text-brand-dark hover:border-brand-dark transition-all text-[10px] tracking-widest uppercase"
                    >
                      이전 단계
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(7)}
                      className="px-8 py-3 bg-[#111111] text-white text-[10px] tracking-widest uppercase hover:bg-black transition-all"
                    >
                      개인정보 및 최종제출
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 7: Contact Info & Submission */}
              {step === 7 && (
                <motion.div
                  key="step-7"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="text-sm font-normal tracking-widest">분석 회신을 위한 연락 수치를 확보해주십시오.</h3>
                    <p className="text-[10px] text-brand-muted tracking-wide font-light">
                      강인스튜디오는 개인정보보호 수칙을 철저히 준수합니다. 기재하신 정보는 미팅을 위한 자재 리서치 사전 준비 외의 어떠한 목적에도 보전 사용하지 않습니다.
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-widest text-[#111111]/70 block font-normal">고객 성함 귀하</span>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="실명을 기재하십시오."
                        className="w-full p-3 border border-brand-border bg-white focus:outline-none focus:border-brand-dark"
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-widest text-[#111111]/70 block font-normal">휴대전화 번호</span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="예: 010-0000-0000"
                        className="w-full p-3 border border-brand-border bg-white focus:outline-none focus:border-brand-dark"
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-widest text-[#111111]/70 block font-normal font-sans">선호 연락 시간대</span>
                      <select
                        value={preferredContactTime}
                        onChange={(e) => setPreferredContactTime(e.target.value)}
                        className="w-full p-3 border border-brand-border bg-white focus:outline-none"
                      >
                        <option value="오전 10시 ~ 12시">오전 10시 ~ 12시 (이른 오전)</option>
                        <option value="오후 12시 ~ 3시">오후 12시 ~ 3시 (정오/오후)</option>
                        <option value="오후 3시 ~ 6시">오후 3시 ~ 6시 (늦은 오후)</option>
                        <option value="상관 없음">아무 때나 상관 없음</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-widest text-[#111111]/70 block font-normal">기타 상세 요구 메모</span>
                      <textarea
                        rows={4}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="아파트 명수 및 노후 건축 지장물 유무, 또는 선호 색 조합 등을 자유롭게 남겨 주십시오."
                        className="w-full p-3 border border-brand-border bg-white focus:outline-none focus:border-brand-dark text-[11px] leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="pt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(6)}
                      className="px-6 py-3 border border-brand-border text-brand-muted hover:text-brand-dark hover:border-brand-dark transition-all text-[10px] tracking-widest uppercase"
                    >
                      이전 단계
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-[#111111] hover:bg-black text-white text-[10px] tracking-[0.2em] uppercase font-bold duration-300 flex items-center gap-2 cursor-pointer"
                    >
                      <Send size={11} />
                      <span>견적 산출 신청 제출</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
}
