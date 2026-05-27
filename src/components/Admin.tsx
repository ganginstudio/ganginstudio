import React, { useState, useRef, FormEvent, ChangeEvent } from 'react';
import { motion } from 'motion/react';
import {
  Project,
  PricingPackage,
  FAQItem,
  CustomerReview,
  BlogPost,
  SiteSettings,
  ServicePackage,
  ServiceCategory,
  NavItemConfig
} from '../types';
import { uploadPortfolioImage, isSupabaseOffline } from '../lib/supabase';
import {
  Lock,
  Plus,
  Trash2,
  Upload,
  Save,
  Grid,
  Settings,
  DollarSign,
  HelpCircle,
  Star,
  BookOpen,
  Camera,
  Layers,
  Check,
  RefreshCw,
  ClipboardList
} from 'lucide-react';

interface AdminProps {
  projects: Project[];
  packages: ServicePackage[];
  faq: FAQItem[];
  reviews: CustomerReview[];
  blog: BlogPost[];
  settings: SiteSettings;
  categories: ServiceCategory[];
  navItems?: NavItemConfig[];
  onUpdateProjects: (updated: Project[]) => void;
  onUpdatePackages: (updated: ServicePackage[]) => void;
  onUpdateFAQ: (updated: FAQItem[]) => void;
  onUpdateReviews: (updated: CustomerReview[]) => void;
  onUpdateBlog: (updated: BlogPost[]) => void;
  onUpdateSettings: (updated: SiteSettings) => void;
  onUpdateCategories: (updated: ServiceCategory[]) => void;
  onUpdateNavItems?: (updated: NavItemConfig[]) => void;
}

const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/webp';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const processAndCompressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // 1. Validation of accepted file extensions (jpg, jpeg, png, webp)
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    const extension = file.name.split('.').pop()?.toLowerCase();
    const isValidType = allowedExtensions.includes(extension || '') || file.type.startsWith('image/');

    if (!isValidType) {
      reject(new Error(`지원하지 않는 파일 형식입니다. (jpg, jpeg, png, webp 이미지만 허용)`));
      return;
    }

    // 2. Maximum upload size protection: 5MB
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      reject(new Error(`업로드 크기 제한(5MB)을 초과했습니다. (현재 크기: ${(file.size / (1024 * 1024)).toFixed(2)}MB)`));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('파일의 스트림을 임포트하는 도중 오류가 발생했습니다.'));
    reader.onload = (event) => {
      const src = event.target?.result;
      if (typeof src !== 'string') {
        reject(new Error('인코딩 데이터 읽기에 실패했습니다.'));
        return;
      }

      const img = new Image();
      img.onerror = () => reject(new Error('이미지 원형 디코딩에 실패했습니다.'));
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas API 가용성 확보에 실각했습니다.'));
            return;
          }

          let width = img.width;
          let height = img.height;
          // Auto compress images above 2MB
          const needsCompression = file.size > 2 * 1024 * 1024;

          if (needsCompression) {
            const MAX_DIM = 2048; // Preserving excellent quality, high fidelity
            if (width > MAX_DIM || height > MAX_DIM) {
              if (width > height) {
                height = Math.round((height * MAX_DIM) / width);
                width = MAX_DIM;
              } else {
                width = Math.round((width * MAX_DIM) / height);
                height = MAX_DIM;
              }
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // Auto convert uploads to WebP
          const quality = needsCompression ? 0.75 : 0.88;
          const webpDataUrl = canvas.toDataURL('image/webp', quality);
          resolve(webpDataUrl);
        } catch (err) {
          reject(err);
        }
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  });
};

let globalDraftBackup: any = null;

export default function Admin({
  projects,
  packages,
  faq,
  reviews,
  blog,
  settings,
  categories,
  navItems,
  onUpdateProjects,
  onUpdatePackages,
  onUpdateFAQ,
  onUpdateReviews,
  onUpdateBlog,
  onUpdateSettings,
  onUpdateCategories,
  onUpdateNavItems
}: AdminProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  
  // Tabs management
  const [currentTab, setCurrentTab] = useState<'settings' | 'portfolio' | 'packages' | 'categories' | 'faq' | 'reviews' | 'blog' | 'leads' | 'navigation'>('settings');

  // Unified leads logging states
  const [allLeads, setAllLeads] = useState<any[]>([]);
  const [estimatesLog, setEstimatesLog] = useState<any[]>([]);
  const [isOffline, setIsOffline] = useState<boolean>(isSupabaseOffline);

  React.useEffect(() => {
    function handleStatus(e: any) {
      if (e && e.detail) {
        setIsOffline(!!e.detail.offline);
      }
    }
    window.addEventListener('supabase-status-change', handleStatus);
    return () => {
      window.removeEventListener('supabase-status-change', handleStatus);
    };
  }, []);

  // Load leads from Supabase Database on mount and tab shifts (No localStorage usage)
  React.useEffect(() => {
    async function loadLeads() {
      try {
        const { getLeads, getEstimates } = await import('../lib/leads');
        const leadsData = await getLeads();
        const estsData = await getEstimates();
        setAllLeads(leadsData);
        setEstimatesLog(estsData);
      } catch (err) {
        console.error('[Supabase] Failed to load leads in Admin dashboard:', err);
      }
    }
    loadLeads();
  }, [isAuthenticated, currentTab]);

  // Real-time subscription for Leads & Estimates inside Admin Dashboard
  React.useEffect(() => {
    if (!isAuthenticated || currentTab !== 'leads') return;
    
    let channel: any = null;
    
    async function subscribeLeads() {
      const { supabase, isSupabaseConfigured } = await import('../lib/supabase');
      if (!isSupabaseConfigured || !supabase) return;
      
      channel = supabase
        .channel('gangin_admin_leads_updates')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'gangin_cms' },
          (payload: any) => {
            const row = payload.new;
            if (!row || !row.key) return;
            const key = row.key;
            const value = row.value;
            
            if (value === undefined || value === null) return;
            
            if (key === 'gangin_all_leads') {
              setAllLeads(value);
            } else if (key === 'gangin_estimates') {
              setEstimatesLog(value);
            }
          }
        )
        .subscribe();
    }
    
    subscribeLeads();
    
    return () => {
      if (channel) {
        import('../lib/supabase').then(({ supabase }) => {
          if (supabase) supabase.removeChannel(channel);
        });
      }
    };
  }, [isAuthenticated, currentTab]);

  // Temp local edit states
  const [localSettings, setLocalSettings] = useState<SiteSettings>({ ...settings });

  // Keep localSettings updated when the global settings finish loading or update remotely
  React.useEffect(() => {
    if (settings) {
      setLocalSettings({ ...settings });
      console.log('[BASIC SETTINGS FETCH SUCCESS]');
    }
  }, [settings]);
  
  // Project editing
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [originalProjectBackup, setOriginalProjectBackup] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState<boolean>(false);
  const [hasDraft, setHasDraft] = useState<boolean>(false);
  const primaryFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);

  // Auto-backup session edits in-memory on key alters
  React.useEffect(() => {
    if (editingProject) {
      try {
        globalDraftBackup = {
          project: editingProject,
          isNew: isNewProject,
          original: originalProjectBackup
        };
      } catch (_) {}
    }
  }, [editingProject, isNewProject, originalProjectBackup]);

  // Evaluate draft completeness
  React.useEffect(() => {
    try {
      setHasDraft(!!globalDraftBackup);
    } catch (_) {
      setHasDraft(false);
    }
  }, [currentTab, editingProject]);

  const handleRestoreDraft = () => {
    try {
      const savedDraft = globalDraftBackup;
      if (savedDraft && savedDraft.project) {
        setEditingProject(savedDraft.project);
        setIsNewProject(!!savedDraft.isNew);
        setOriginalProjectBackup(savedDraft.original || null);
        alert('작업하시던 임시 도안이 안전하게 워크스페이스로 복원되었습니다.');
      }
    } catch (_) {
      alert('임시 저장된 파일이 없거나 손상되었습니다.');
    }
  };

  const handleDismissDraft = () => {
    try {
      globalDraftBackup = null;
      setHasDraft(false);
    } catch (_) {}
  };

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === '1111') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
    }
  };

  // 1. Settings save handler
  const handleSaveSettings = async () => {
    console.log('[BASIC SETTINGS SAVE START]');
    try {
      const { saveSupabaseState } = await import('../lib/supabase');
      // Direct write to the backend
      const isSaved = await saveSupabaseState('gangin_settings', localSettings);
      
      if (isSaved) {
        console.log('[BASIC SETTINGS SUPABASE UPSERT SUCCESS]');
        onUpdateSettings(localSettings);
        alert('기본 디자인 환경 및 SEO 메타태그 설정이 완벽히 저장되었습니다.');
      } else {
        console.log('[BASIC SETTINGS SAVE FAILED]');
        alert('설정 저장에 실패했습니다. Supabase 연결 혹은 권한 설정을 확인하세요.');
      }
    } catch (saveError) {
      console.log('[BASIC SETTINGS SAVE FAILED]', saveError);
      alert('설정 동기화 도중 데이터베이스 예외가 감지되었습니다.');
    }
  };

  // Robust Async File processing with validation & WebP conversion connected to Supabase Storage
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, target: 'primary' | 'gallery') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (target === 'primary') {
      const file = files[0];
      try {
        const processedUrl = await processAndCompressImage(file);
        // Convert back to File and upload to real Supabase Storage CMS
        const compressedFile = dataURLtoFile(processedUrl, `primary_${Date.now()}.webp`);
        const storageUrl = await uploadPortfolioImage(compressedFile);

        if (editingProject) {
          setEditingProject((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              image: storageUrl
            };
          });
        }
      } catch (err: any) {
        alert(err.message || '이미지를 가공 변환 및 업로드하는 과정에서 에러가 발생했습니다.');
      }
    } else if (target === 'gallery') {
      const fileList = Array.from(files) as File[];
      for (const file of fileList) {
        try {
          const processedUrl = await processAndCompressImage(file);
          // Convert back to File and upload to real Supabase Storage CMS
          const compressedFile = dataURLtoFile(processedUrl, `gallery_${Date.now()}.webp`);
          const storageUrl = await uploadPortfolioImage(compressedFile);

          const newItem = {
            url: storageUrl,
            caption: file.name.split('.')[0] || '공간 완료 부서',
            aspect: 'landscape' as const
          };
          setEditingProject((prev) => {
            if (!prev) return null;
            const nextGallery = [...(prev.gallery || []), newItem];
            return {
              ...prev,
              gallery: nextGallery
            };
          });
        } catch (err: any) {
          alert(`[${file.name} 업로드 보류] - ${err.message || '가공 거부 및 업로드 실패'}`);
        }
      }
    }

    // Reset input target value so the same file selection can re-trigger onchange event
    e.target.value = '';
  };

  // Edit / Add portfolio details
  const triggerEditProject = (p: Project) => {
    const backupCopy = JSON.parse(JSON.stringify(p)); // Deep clone backup
    setOriginalProjectBackup(backupCopy);
    setEditingProject({
      ...p,
      title: p.title || '',
      titleEn: p.titleEn || '',
      location: p.location || '광주 (Gwangju)',
      locationDetails: p.locationDetails || '',
      category: p.category || 'Residential',
      year: p.year || '2026',
      area: p.area || '135㎡ / 41평',
      client: p.client || 'Private Client',
      image: p.image || '/src/assets/images/gangin_hero_1779412179856.png',
      concept: p.concept || '',
      materials: p.materials && Array.isArray(p.materials) ? p.materials : ['천연 보수 스펙', '매트 텍스처 패널'],
      timeline: p.timeline || '8주 (2026.05 - 2026.07)',
      constructionProcess: p.constructionProcess && Array.isArray(p.constructionProcess) 
        ? p.constructionProcess 
        : [{ title: '수치 설계 및 도안 조율', description: '골조 수평 밸런스 점검 및 설계 레이아웃 조감 구축' }],
      beforeAfter: p.beforeAfter || {
        beforeDescription: '공사와 철거가 필요한 협착된 골조 구조 상황',
        afterDescription: '라인이 완벽히 마이너스 실선으로 수평 통합된 품위 깊은 예술관',
        desc: '장식과 불필요 요소를 전부 감하여 사색적인 음영 효과를 연출했습니다.',
        imageAfter: ''
      },
      gallery: p.gallery && Array.isArray(p.gallery) ? p.gallery : []
    });
    setIsNewProject(false);
  };

  const triggerAddProject = () => {
    setOriginalProjectBackup(null);
    setEditingProject({
      id: `space_${Date.now()}_${Math.floor(Math.random() * 10000)}`, // Complete avoidance of project key collisions (Audit 1 & 8)
      title: '',
      titleEn: '',
      location: '광주 남구 (Gwangju)',
      locationDetails: '',
      category: 'Residential',
      year: '2026',
      area: '132㎡ / 40평',
      client: 'Private Client',
      image: '/src/assets/images/gangin_hero_1779412179856.png',
      concept: '',
      materials: ['천연 보수 스펙', '매트 텍스처 패널'],
      timeline: '8주 (2026.05 - 2026.07)',
      constructionProcess: [
        { title: '수치 설계 및 도안 조율', description: '골조 수평 밸런스 점검 및 설계 레이아웃 조감 구축' }
      ],
      beforeAfter: {
        beforeDescription: '공사와 철거가 필요한 협착된 골조 구조 상황',
        afterDescription: '라인이 완벽히 마이너스 실선으로 수평 통합된 품위 깊은 예술관',
        desc: '장식과 불필요 요소를 전부 감하여 사색적인 음영 효과를 연출했습니다.',
        imageAfter: ''
      },
      gallery: [],
      featured: false
    });
    setIsNewProject(true);
  };

  const handleRollbackProject = () => {
    if (isNewProject) {
      if (confirm('현재 기입하신 임시 작업안을 폐기하고 작성을 중단하여 목록 화면으로 되돌아가시겠습니까?')) {
        setEditingProject(null);
        setOriginalProjectBackup(null);
        globalDraftBackup = null;
        setHasDraft(false);
      }
    } else {
      if (confirm('현재까지 가공/기입된 모든 수정 사항을 복원 취소하고, 저장 전 원래 오리지널 아카이브 기록으로 안전 롤백 후 되돌아가시겠습니까?')) {
        setEditingProject(null);
        setOriginalProjectBackup(null);
        globalDraftBackup = null;
        setHasDraft(false);
      }
    }
  };

  const handleSaveProject = () => {
    if (!editingProject) return;
    if (!(editingProject.title || '').trim()) {
      alert('프로젝트 한글 제목은 필수로 기재하셔야 합니다.');
      return;
    }

    // Ensure all portfolio fields are normalized and robust (Audit 20)
    const normalizedProject: Project = {
      ...editingProject,
      id: editingProject.id || `space_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
      title: (editingProject.title || '').trim(),
      titleEn: (editingProject.titleEn || '').trim(),
      location: (editingProject.location || '광주 (Gwangju)').trim(),
      locationDetails: editingProject.locationDetails || '',
      category: editingProject.category || 'Residential',
      year: editingProject.year || '2026',
      area: editingProject.area || '135㎡ / 41평',
      client: editingProject.client || 'Private Client',
      image: editingProject.image || '/src/assets/images/gangin_hero_1779412179856.png',
      concept: (editingProject.concept || '').trim(),
      materials: editingProject.materials && Array.isArray(editingProject.materials) ? editingProject.materials : ['천연 보수 스펙', '매트 텍스처 패널'],
      timeline: editingProject.timeline || '8주 (2026.05 - 2026.07)',
      constructionProcess: editingProject.constructionProcess && Array.isArray(editingProject.constructionProcess) 
        ? editingProject.constructionProcess 
        : [{ title: '수치 설계 및 도안 조율', description: '골조 수평 밸런스 점검 및 설계 레이아웃 조감 구축' }],
      beforeAfter: editingProject.beforeAfter || {
        beforeDescription: '공사와 철거가 필요한 협착된 골조 구조 상황',
        afterDescription: '라인이 완벽히 마이너스 실선으로 수평 통합된 품위 깊은 예술관',
        desc: '장식과 불필요 요소를 전부 감하여 사색적인 음영 효과를 연출했습니다.',
        imageAfter: ''
      },
      gallery: editingProject.gallery && Array.isArray(editingProject.gallery) ? editingProject.gallery : []
    };

    // State update safety without race conditions
    if (isNewProject) {
      onUpdateProjects([...projects, normalizedProject]);
    } else {
      onUpdateProjects(projects.map((p) => (p.id === normalizedProject.id ? normalizedProject : p)));
    }
    
    // Success - clean draft triggers
    setEditingProject(null);
    setOriginalProjectBackup(null);
    globalDraftBackup = null;
    setHasDraft(false);
    alert('포트폴리오 아카이브 기록이 성공적으로 안정 수리되어 동기화되었습니다.');
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('이 작업을 실행하시면 기록이 완전히 유실됩니다. 선택하신 포트폴리오를 목록에서 안전 제거하시겠습니까?')) {
      onUpdateProjects(projects.filter((p) => p.id !== id));
    }
  };

  // Categories editing
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);
  
  const handleSaveCategory = () => {
    if (!editingCategory) return;
    onUpdateCategories(categories.map((c) => (c.id === editingCategory.id ? editingCategory : c)));
    setEditingCategory(null);
    alert('카테고리 홍보 명서 및 마감 공도가 안전히 실감 감리되었습니다.');
  };

  // Package edit state
  const [editingPackage, setEditingPackage] = useState<ServicePackage | null>(null);

  const handleSavePackage = () => {
    if (!editingPackage) return;
    onUpdatePackages(packages.map((p) => (p.id === editingPackage.id ? editingPackage : p)));
    setEditingPackage(null);
    alert('표준 요금 정찰제 패키지 사양이 투명하게 개편되었습니다.');
  };

  // FAQ editing
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [isNewFAQ, setIsNewFAQ] = useState<boolean>(false);

  const handleSaveFAQ = () => {
    if (!editingFAQ) return;
    if (isNewFAQ) {
      onUpdateFAQ([...faq, editingFAQ]);
    } else {
      onUpdateFAQ(faq.map((f) => (f.id === editingFAQ.id ? editingFAQ : f)));
    }
    setEditingFAQ(null);
    alert('자주 묻는 질문 명판이 업데이트 되었습니다.');
  };

  const handleDeleteFAQ = (id: string) => {
    if (confirm('이 질의목록을 지우겠습니까?')) {
      onUpdateFAQ(faq.filter((f) => f.id !== id));
    }
  };

  // Review editing
  const [editingReview, setEditingReview] = useState<CustomerReview | null>(null);
  const [isNewReview, setIsNewReview] = useState<boolean>(false);

  const handleSaveReview = () => {
    if (!editingReview) return;
    if (isNewReview) {
      onUpdateReviews([...reviews, editingReview]);
    } else {
      onUpdateReviews(reviews.map((r) => (r.id === editingReview.id ? editingReview : r)));
    }
    setEditingReview(null);
    alert('소중한 수공 상생 고객 수기가 등록되었습니다.');
  };

  const handleDeleteReview = (id: string) => {
    if (confirm('리뷰 항목을 폐기할까요?')) {
      onUpdateReviews(reviews.filter((r) => r.id !== id));
    }
  };

  // Blog editing
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isNewBlog, setIsNewBlog] = useState<boolean>(false);

  const handleSaveBlog = () => {
    if (!editingBlog) return;
    if (isNewBlog) {
      onUpdateBlog([...blog, editingBlog]);
    } else {
      onUpdateBlog(blog.map((b) => (b.id === editingBlog.id ? editingBlog : b)));
    }
    setEditingBlog(null);
    alert('건축 잡학 지식 칼럼이 공탁 완료되었습니다.');
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm('이 저널 칼럼을 영구 제거할까요?')) {
      onUpdateBlog(blog.filter((b) => b.id !== id));
    }
  };

  // Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="pt-40 pb-56 max-w-sm mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-brand-border p-8 text-center space-y-6"
        >
          <div className="w-12 h-12 rounded-full bg-brand-bg/50 border border-brand-border flex items-center justify-center mx-auto text-brand-dark/80">
            <Lock size={18} />
          </div>
          <div className="space-y-2">
            <h1 className="text-sm uppercase tracking-widest font-semibold text-brand-dark">오피스 관리자 권한 인증</h1>
            <p className="text-[10px] text-brand-muted font-light leading-relaxed">
              본 시스템은 강인스튜디오 오피스의 텍스트 정보와 사진 큐레이션, 원가 가격표를 통합 수정할 수 있는 중앙 백엔드 포털입니다. (비밀번호: 1111)
            </p>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="패스코드 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-center text-xs tracking-widest py-3 border border-brand-border focus:outline-none focus:border-brand-dark rounded-none text-brand-dark"
            />
            {errorMsg && <p className="text-[10px] text-red-500 font-normal">{errorMsg}</p>}
            <button
              type="submit"
              className="w-full py-3.5 bg-brand-dark hover:bg-black text-white text-[11px] uppercase tracking-widest cursor-pointer"
            >
              포털 접근 잠금해제
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-32 max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-8">
      
      {/* 2. Admin Sidebar Menu */}
      <aside className="lg:w-1/4 h-fit border border-brand-border/60 p-6 space-y-8 bg-white/40">
        <div>
          <span className="text-[8px] uppercase tracking-widest text-brand-muted block font-mono">GANG IN CMS</span>
          <h2 className="text-sm font-semibold text-[#111111] tracking-widest mt-1 uppercase">콘텐츠 수정 센터</h2>
          {isOffline && (
            <div className="mt-3 p-3 bg-amber-50/80 border border-amber-200/60 text-amber-800 text-[10.5px] leading-relaxed font-normal font-sans">
              <p className="font-semibold mb-1 flex items-center gap-1 text-[11px]">⚠️ Supabase가 오프라인 상태입니다</p>
              <p className="opacity-90">선언된 데이터베이스 주소(<code className="font-mono text-[9px] bg-amber-100 px-1 rounded">qbxgaypvwqvmwdlaymsf...</code>)가 정지되었거나 일시적으로 만료되었습니다. 작업물은 안전하게 인-메모리에 실시간 보호/유지됩니다.</p>
            </div>
          )}
        </div>

        <nav className="flex flex-col space-y-1.5 text-xs text-brand-dark font-light tracking-wide">
          <button
            onClick={() => { setCurrentTab('settings'); setEditingProject(null); }}
            className={`flex items-center gap-2.5 py-3.5 px-4 text-start rounded-none transition-colors cursor-pointer ${
              currentTab === 'settings' ? 'bg-brand-dark text-white font-medium' : 'hover:bg-brand-bg/60 text-brand-muted hover:text-brand-dark'
            }`}
          >
            <Settings size={13} />
            <span>기본 설정 (환경/색 테마/SEO)</span>
          </button>

          <button
            onClick={() => { setCurrentTab('portfolio'); setEditingProject(null); }}
            className={`flex items-center gap-2.5 py-3.5 px-4 text-start rounded-none transition-colors cursor-pointer ${
              currentTab === 'portfolio' ? 'bg-brand-dark text-white font-medium' : 'hover:bg-brand-bg/60 text-brand-muted hover:text-brand-dark'
            }`}
          >
            <Camera size={13} />
            <span>포트폴리오 관리 (이미지 10장+ 업로드)</span>
          </button>

          <button
            onClick={() => { setCurrentTab('categories'); setEditingProject(null); }}
            className={`flex items-center gap-2.5 py-3.5 px-4 text-start rounded-none transition-colors cursor-pointer ${
              currentTab === 'categories' ? 'bg-brand-dark text-white font-medium' : 'hover:bg-brand-bg/60 text-brand-muted hover:text-brand-dark'
            }`}
          >
            <Layers size={13} />
            <span>분야별 카테고리 상세 수정</span>
          </button>

          <button
            onClick={() => { setCurrentTab('packages'); setEditingProject(null); }}
            className={`flex items-center gap-2.5 py-3.5 px-4 text-start rounded-none transition-colors cursor-pointer ${
              currentTab === 'packages' ? 'bg-brand-dark text-white font-medium' : 'hover:bg-brand-bg/60 text-brand-muted hover:text-brand-dark'
            }`}
          >
            <DollarSign size={13} />
            <span>요금 정찰제 패키지 설계</span>
          </button>

          <button
            onClick={() => { setCurrentTab('faq'); setEditingProject(null); }}
            className={`flex items-center gap-2.5 py-3.5 px-4 text-start rounded-none transition-colors cursor-pointer ${
              currentTab === 'faq' ? 'bg-brand-dark text-white font-medium' : 'hover:bg-brand-bg/60 text-brand-muted hover:text-brand-dark'
            }`}
          >
            <HelpCircle size={13} />
            <span>자주 묻는 질문 (FAQ) 설정</span>
          </button>

          <button
            onClick={() => { setCurrentTab('reviews'); setEditingProject(null); }}
            className={`flex items-center gap-2.5 py-3.5 px-4 text-start rounded-none transition-colors cursor-pointer ${
              currentTab === 'reviews' ? 'bg-brand-dark text-white font-medium' : 'hover:bg-brand-bg/60 text-brand-muted hover:text-brand-dark'
            }`}
          >
            <Star size={13} />
            <span>상생 고객 후기 / 스토리</span>
          </button>

          <button
            onClick={() => { setCurrentTab('blog'); setEditingProject(null); }}
            className={`flex items-center gap-2.5 py-3.5 px-4 text-start rounded-none transition-colors cursor-pointer ${
              currentTab === 'blog' ? 'bg-brand-dark text-white font-medium' : 'hover:bg-brand-bg/60 text-brand-muted hover:text-brand-dark'
            }`}
          >
            <BookOpen size={13} />
            <span>시방지식 칼럼 / 저널 수필</span>
          </button>

          <button
            onClick={() => { setCurrentTab('leads'); setEditingProject(null); }}
            className={`flex items-center gap-2.5 py-3.5 px-4 text-start rounded-none transition-colors cursor-pointer ${
              currentTab === 'leads' ? 'bg-brand-dark text-white font-medium' : 'hover:bg-brand-bg/60 text-brand-muted hover:text-brand-dark'
            }`}
          >
            <ClipboardList size={13} />
            <span>통합 공간 견적 및 상담 내역 ({allLeads.length + estimatesLog.filter(e => !allLeads.some(l => l.id === e.id)).length})</span>
          </button>

          <button
            onClick={() => { setCurrentTab('navigation'); setEditingProject(null); }}
            className={`flex items-center gap-2.5 py-3.5 px-4 text-start rounded-none transition-colors cursor-pointer ${
              currentTab === 'navigation' ? 'bg-brand-dark text-white font-medium' : 'hover:bg-brand-bg/60 text-brand-muted hover:text-brand-dark'
            }`}
          >
            <ClipboardList size={13} />
            <span>상단 메뉴 관리</span>
          </button>
        </nav>
      </aside>

      {/* 3. Main Workspace Display Area */}
      <main className="lg:w-3/4 bg-white border border-brand-border/60 p-8">
        
        {/* TAB 1: SITE SYSTEM SETTINGS */}
        {currentTab === 'settings' && (
          <div className="space-y-8">
            <div className="border-b border-brand-border pb-4">
              <h3 className="text-sm font-semibold text-brand-dark uppercase tracking-widest">기본 환경 설정 및 SEO 최적화</h3>
              <p className="text-[10px] text-brand-muted font-light mt-1">
                사이트 전체의 브랜드 이름 표기, 대표 SNS 주소, 오피스 연락처 및 네이버와 크롤러에 연동되는 카테고리 태그 키워드를 일괄 제어합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] text-brand-muted font-medium">대표 사명 상칭 (Brand Name)</label>
                <input
                  type="text"
                  value={localSettings.brandName}
                  onChange={(e) => setLocalSettings({ ...localSettings, brandName: e.target.value })}
                  className="w-full text-xs font-light p-3 border border-brand-border/60 focus:outline-none focus:border-brand-dark rounded-none text-brand-dark"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-brand-muted font-medium">서브 슬로건 기획 (Sub Title)</label>
                <input
                  type="text"
                  value={localSettings.subTitle}
                  onChange={(e) => setLocalSettings({ ...localSettings, subTitle: e.target.value })}
                  className="w-full text-xs font-light p-3 border border-brand-border/60 focus:outline-none focus:border-brand-dark rounded-none text-brand-dark"
                />
              </div>

              {/* Advanced Contact */}
              <div className="space-y-1">
                <label className="text-[10px] text-brand-muted font-medium">오피스 연락 번호 (대표 유선)</label>
                <input
                  type="text"
                  value={localSettings.phone}
                  onChange={(e) => setLocalSettings({ ...localSettings, phone: e.target.value })}
                  className="w-full text-xs font-light p-3 border border-brand-border/60 focus:outline-none focus:border-brand-dark rounded-none text-brand-dark"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-brand-muted font-medium">공식 이메일 서류함</label>
                <input
                  type="text"
                  value={localSettings.email}
                  onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                  className="w-full text-xs font-light p-3 border border-brand-border/60 focus:outline-none focus:border-brand-dark rounded-none text-brand-dark"
                />
              </div>

              <div className="col-span-2 space-y-1">
                <label className="text-[10px] text-brand-muted font-medium">사옥 소재 지번 (오시는길)</label>
                <input
                  type="text"
                  value={localSettings.address}
                  onChange={(e) => setLocalSettings({ ...localSettings, address: e.target.value })}
                  className="w-full text-xs font-light p-3 border border-brand-border/60 focus:outline-none focus:border-brand-dark rounded-none text-brand-dark"
                />
              </div>

              {/* Social Channels */}
              <div className="space-y-1">
                <label className="text-[10px] text-brand-muted font-medium">인스타그램 주소</label>
                <input
                  type="text"
                  value={localSettings.instagram}
                  onChange={(e) => setLocalSettings({ ...localSettings, instagram: e.target.value })}
                  className="w-full text-xs font-light p-3 border border-brand-border/60 focus:outline-none focus:border-brand-dark rounded-none text-brand-dark"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-brand-muted font-medium">카카오톡 실시간 채팅 URL</label>
                <input
                  type="text"
                  value={localSettings.kakaotalk}
                  onChange={(e) => setLocalSettings({ ...localSettings, kakaotalk: e.target.value })}
                  className="w-full text-xs font-light p-3 border border-brand-border/60 focus:outline-none focus:border-brand-dark rounded-none text-brand-dark"
                />
              </div>

              {/* Home Visual Section Hero Management */}
              <div className="col-span-2 space-y-4 pt-6 border-t border-brand-border/40">
                <span className="text-[10px] text-brand-dark uppercase font-bold tracking-widest block">홈 비주얼섹션 배경 이미지 설정</span>
                
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {localSettings.visualHeroImage && (
                    <div className="w-full md:w-56 aspect-[16/9] border border-brand-border/80 bg-brand-bg relative overflow-hidden flex-shrink-0 shadow-xs">
                      <img
                        src={localSettings.visualHeroImage}
                        alt="Hero Background Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/5" />
                    </div>
                  )}

                  <div className="flex-grow space-y-3">
                    <p className="text-[11px] text-brand-muted font-light leading-relaxed">
                      홈페이지 최상단 비주얼 영역의 대표 배경 이미지입니다. <strong className="text-brand-dark font-medium">내컴퓨터에서 직접 고품질 와이드 이미지(16:9 비율 최적)를 선택해 즉시 교체</strong>할 수 있습니다.
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      <label className="px-5 py-3 bg-[#111111] hover:bg-black text-white text-[10px] tracking-widest font-bold uppercase transition-colors text-center cursor-pointer flex items-center gap-2">
                        <Upload size={12} />
                        <span>내컴퓨터에서 새 이미지 선택</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const files = e.target.files;
                            if (files && files.length > 0) {
                              const file = files[0];
                              try {
                                const processedUrl = await processAndCompressImage(file);
                                const compressedFile = dataURLtoFile(processedUrl, `hero_${Date.now()}.webp`);
                                const storageUrl = await uploadPortfolioImage(compressedFile);
                                setLocalSettings({
                                  ...localSettings,
                                  visualHeroImage: storageUrl
                                });
                              } catch (err: any) {
                                alert(err.message || '비주얼 배경 이미지 업로드 중 오류가 발생했습니다.');
                              }
                            }
                          }}
                        />
                      </label>
                      
                      {localSettings.visualHeroImage !== '/src/assets/images/gangin_hero_1779412179856.png' && (
                        <button
                          type="button"
                          onClick={() => {
                            setLocalSettings({
                              ...localSettings,
                              visualHeroImage: '/src/assets/images/gangin_hero_1779412179856.png'
                            });
                          }}
                          className="px-4 py-3 border border-[#111111] hover:bg-brand-bg text-[#111111] text-[10px] tracking-widest transition-all cursor-pointer font-bold uppercase"
                        >
                          기본 고정 시안 백업
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* SEO Core Block */}
              <div className="col-span-2 space-y-4 pt-4 border-t border-brand-border/40">
                <span className="text-[10px] text-brand-dark uppercase font-bold tracking-widest block">SEO 포털 검색 엔진 최적화</span>
                
                <div className="space-y-1">
                  <label className="text-[10px] text-brand-muted font-medium">검색 노출 메타 제목 (Title Tag)</label>
                  <input
                    type="text"
                    value={localSettings.seoTitle}
                    onChange={(e) => setLocalSettings({ ...localSettings, seoTitle: e.target.value })}
                    className="w-full text-xs font-light p-3 border border-brand-border/60 focus:outline-none focus:border-brand-dark rounded-none text-brand-dark"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-brand-muted font-medium">대표 설명 요지 기재 (Description)</label>
                  <textarea
                    rows={2}
                    value={localSettings.seoDescription}
                    onChange={(e) => setLocalSettings({ ...localSettings, seoDescription: e.target.value })}
                    className="w-full text-xs font-light p-3 border border-brand-border/60 focus:outline-none focus:border-brand-dark rounded-none text-brand-dark"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-brand-muted font-medium">해시 키워드 색인들 (쉼표로 구분)</label>
                  <input
                    type="text"
                    value={localSettings.seoKeywords}
                    onChange={(e) => setLocalSettings({ ...localSettings, seoKeywords: e.target.value })}
                    className="w-full text-xs font-light p-3 border border-brand-border/60 focus:outline-none focus:border-brand-dark rounded-none text-brand-dark text-justify"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-brand-border text-right">
              <button
                onClick={handleSaveSettings}
                className="px-8 py-3.5 bg-brand-dark hover:bg-black text-white text-[11px] uppercase tracking-widest cursor-pointer flex items-center gap-2 ml-auto"
              >
                <Save size={13} />
                <span>기본 환경 구성 및 SEO 보장 동기화</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: PORTFOLIO MANAGER & BASE64 UPLOADER */}
        {currentTab === 'portfolio' && (
          <div className="space-y-8">
            {!editingProject ? (
              <div className="space-y-6">
                <div className="flex justify-between items-baseline border-b border-brand-border pb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-brand-dark uppercase tracking-widest">포트폴리오 아카이브 관리</h3>
                    <p className="text-[10px] text-brand-muted font-light mt-1">
                      현재 사이트에 연결된 완공 공간들이 표기됩니다. 내컴퓨터에 저장된 사진들을 업로드 단계에서 바로 Base64 변환하여 등록할 수 있습니다.
                    </p>
                  </div>
                  <button
                    onClick={triggerAddProject}
                    className="px-4 py-2 text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white tracking-widest uppercase cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={11} /> 신규 프로젝트 생성
                  </button>
                </div>

                {/* Draft Backup & Recovery Banner */}
                {hasDraft && (
                  <div className="p-5 border border-black bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-light">
                    <div>
                      <span className="text-[9px] tracking-[0.25em] font-medium uppercase text-[#e11d48] block mb-1">● AUTOSAVED DRAFT DETECTED</span>
                      <p className="text-[11px] text-brand-dark leading-relaxed">이전 작성 세션에서 완료하지 않은 완공 프로젝트 임시 기획안이 존재합니다.</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleRestoreDraft}
                        className="px-4 py-1.5 text-[9px] bg-[#111111] hover:bg-black text-white uppercase tracking-widest cursor-pointer font-bold"
                      >
                        복원하기
                      </button>
                      <button
                        type="button"
                        onClick={handleDismissDraft}
                        className="px-4 py-1.5 text-[9px] bg-transparent border border-brand-border text-brand-muted hover:text-brand-dark uppercase tracking-widest cursor-pointer"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                )}

                {/* Grid List */}
                <div className="space-y-4">
                  {projects.map((p) => (
                    <div key={p.id} className="p-4 border border-brand-border/60 bg-white shadow-3xs flex justify-between items-center gap-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={p.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200'} 
                          className="w-12 h-12 object-cover border border-brand-border" 
                          alt={p.title || "Archive Project"} 
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200';
                          }}
                        />
                        <div>
                          <h4 className="text-xs font-semibold text-brand-dark">{p.title}</h4>
                          <span className="text-[9px] text-brand-muted uppercase tracking-widest">{p.category} | {p.year} | {p.area}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => triggerEditProject(p)}
                          className="px-3 py-1.5 text-[9px] uppercase tracking-wider bg-brand-bg text-brand-dark border border-brand-border/60 hover:border-brand-dark cursor-pointer"
                        >
                          상세 편집
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="px-3 py-1.5 text-[9px] uppercase bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 cursor-pointer"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // EDIT SINGLE PROJECT STATE WITH UP TO 10+ PHOTO UPLOAD SUPPORT
              <div className="space-y-8">
                <div className="border-b border-brand-border pb-4 flex justify-between items-baseline">
                  <div>
                    <h3 className="text-sm font-semibold text-brand-dark uppercase tracking-widest">
                      {isNewProject ? '신규 완공작 작성' : '공간 시공 스펙 수정'}
                    </h3>
                    <p className="text-[10px] text-brand-muted font-light mt-1">
                      자료 수집 전 1:1 수공 기준들을 상세 기입해 주세요.
                    </p>
                  </div>
                  <button
                    onClick={handleRollbackProject}
                    className="text-[10px] text-brand-muted font-light border-b border-brand-border cursor-pointer pb-0.5 hover:text-brand-dark transition-colors"
                  >
                    되돌리기 및 취소
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Metadata */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-brand-muted font-medium">한글 프로젝트 명칭</label>
                    <input
                      type="text"
                      value={editingProject.title || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="w-full text-xs font-light p-3 border border-brand-border/60 focus:outline-none focus:border-brand-dark rounded-none text-brand-dark"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-brand-muted font-medium">영문 프로젝트 이름</label>
                    <input
                      type="text"
                      value={editingProject.titleEn || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, titleEn: e.target.value })}
                      className="w-full text-xs font-light p-3 border border-brand-border/60 focus:outline-none focus:border-brand-dark rounded-none text-brand-dark"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-brand-muted font-medium">시공 카테고리 분야 선택</label>
                    <select
                      value={editingProject.category || 'Residential'}
                      onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                      className="w-full text-xs font-light p-3 border border-brand-border/60 focus:outline-none focus:border-brand-dark rounded-none text-brand-dark"
                    >
                      <option value="Residential">Residential (아파트/주거)</option>
                      <option value="Bathroom">Bathroom (욕실/스파)</option>
                      <option value="Commercial">Commercial (상가 일반)</option>
                      <option value="Cafe">Cafe (카페/디저트)</option>
                      <option value="Office">Office (기설 오피스)</option>
                      <option value="Kids Pool">Kids Pool (키즈 수영클럽)</option>
                      <option value="Architecture">Architecture (건축 파사드)</option>
                      <option value="Custom Project">Custom Project (맞춤 아방가르드)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-brand-muted font-medium">소요 면적 크기 (평수 표기 병행)</label>
                    <input
                      type="text"
                      value={editingProject.area || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, area: e.target.value })}
                      className="w-full text-xs font-light p-3 border border-brand-border/60 focus:outline-none focus:border-brand-dark rounded-none text-brand-dark"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-brand-muted font-medium">지반 대지 위치 (예: 광주 동구 동명동)</label>
                    <input
                      type="text"
                      value={editingProject.location || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                      className="w-full text-xs font-light p-3 border border-brand-border/60 focus:outline-none focus:border-brand-dark rounded-none text-brand-dark"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-brand-muted font-medium">종결 연도</label>
                    <input
                      type="text"
                      value={editingProject.year || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                      className="w-full text-xs font-light p-3 border border-brand-border/60 focus:outline-none focus:border-brand-dark rounded-none text-[#111111]"
                    />
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] text-brand-muted font-medium">공간 철학 및 디자인 기획 서술 (Concept Story)</label>
                    <textarea
                      rows={3}
                      value={editingProject.concept || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, concept: e.target.value })}
                      className="w-full text-xs font-light p-3 border border-brand-border/60 focus:outline-none focus:border-brand-dark rounded-none text-[#111111]"
                    />
                  </div>

                  {/* PC NATIVE IMAGE UPLOADER (Primary Image) */}
                  <div className="col-span-2 space-y-3 pt-4 border-t border-brand-border/40">
                    <span className="text-[10px] text-brand-muted font-semibold uppercase block">대표 메인 썸네일 수작 파일 등록 (컬러)</span>
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-16 bg-brand-bg border border-brand-border overflow-hidden">
                        <img 
                          src={editingProject.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200'} 
                          className="w-full h-full object-cover" 
                          alt="" 
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200';
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          ref={primaryFileRef}
                          onChange={(e) => handleFileChange(e, 'primary')}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => primaryFileRef.current?.click()}
                          className="px-4 py-2.5 bg-brand-bg border border-brand-border/60 text-[10px] tracking-widest uppercase text-brand-dark cursor-pointer hover:bg-brand-border/30 flex items-center gap-2"
                        >
                          <Upload size={12} />
                          내컴퓨터에서 메인 사진 파일 찾기
                        </button>
                        <p className="text-[9px] text-brand-muted font-light">
                          * 썸네일 파일은 흑백 보정을 걷어내고 자연 천연 원가 칼라로 노출됩니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* PC MULTIPLE GALLERY IMAGE UPLOADER (Supporting 10px / 10+ Images!) */}
                  <div className="col-span-2 space-y-4 pt-6 border-t border-brand-border/40">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] text-brand-muted font-semibold uppercase block">공간 갤러리 일람 (최대 10장~ 그 이상 등록 가능)</span>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          ref={galleryFileRef}
                          onChange={(e) => handleFileChange(e, 'gallery')}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => galleryFileRef.current?.click()}
                          className="px-3.5 py-1.5 bg-indigo-50 border border-indigo-200 text-[10px] text-indigo-600 font-semibold uppercase tracking-wider cursor-pointer hover:bg-indigo-100 flex items-center gap-1.5"
                        >
                          <Plus size={11} />
                          내컴퓨터에서 다중 이미지 파일 올리기
                        </button>
                      </div>
                    </div>

                    {/* Show current gallery with delete / caption edit options */}
                    {editingProject.gallery && editingProject.gallery.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {editingProject.gallery.map((g, idx) => (
                          <div key={idx} className="p-3 border border-brand-border/50 bg-white shadow-2xs space-y-2 relative">
                            <button
                              type="button"
                              onClick={() => {
                                const nextGal = [...editingProject.gallery];
                                nextGal.splice(idx, 1);
                                setEditingProject({ ...editingProject, gallery: nextGal });
                              }}
                              className="absolute top-2 right-2 p-1.5 bg-red-50 text-red-600 rounded-full hover:bg-red-100 cursor-pointer"
                              title="사진 소거"
                            >
                              <Trash2 size={11} />
                            </button>
                            <div className="aspect-[4/3] bg-brand-bg overflow-hidden border border-brand-border/40">
                              <img 
                                src={g?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200'} 
                                className="w-full h-full object-cover" 
                                alt={g?.caption || "Gallery Image"} 
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200';
                                }}
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] text-brand-muted">사진 부연 설명 (Caption)</label>
                              <input
                                type="text"
                                value={g?.caption || ''}
                                onChange={(e) => {
                                  const nextGal = [...editingProject.gallery];
                                  nextGal[idx].caption = e.target.value;
                                  setEditingProject({ ...editingProject, gallery: nextGal });
                                }}
                                className="w-full text-[10px] font-light p-1.5 border border-brand-border/60 focus:outline-none rounded-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 border border-dashed border-brand-border/60">
                        <p className="text-[10px] text-brand-muted font-light">등록된 갤러리 세부 사진 명판이 없습니다.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-border text-right space-x-2">
                  <button
                    onClick={handleRollbackProject}
                    className="px-5 py-3 border border-brand-border text-[10px] font-normal uppercase hover:bg-brand-bg rounded-none cursor-pointer"
                  >
                    목록 취소
                  </button>
                  <button
                    onClick={handleSaveProject}
                    className="px-8 py-3 bg-brand-dark hover:bg-black text-white text-[10px] tracking-widest uppercase rounded-none cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Save size={12} />
                    <span>프로젝트 영속 저장</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CATEGORIES DETAIL EDITOR */}
        {currentTab === 'categories' && (
          <div className="space-y-8">
            {!editingCategory ? (
              <div className="space-y-6">
                <div className="border-b border-brand-border pb-4">
                  <h3 className="text-sm font-semibold text-brand-dark uppercase tracking-widest">분야별 공간 카테고리 기획 수정</h3>
                  <p className="text-[10px] text-brand-muted font-light mt-1">
                    9개 주요 시방 디자인 카테고리(아파트, 욕실, 상가, 오피스 등)의 맞춤 기술 설명서와 표준 부재 마갑 스펙을 일깨웁니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => setEditingCategory({ ...cat })}
                      className="p-5 border border-brand-border/60 hover:border-brand-dark bg-white shadow-3xs cursor-pointer flex justify-between items-center transition-all"
                    >
                      <div>
                        <h4 className="text-xs font-semibold text-[#111111]">{cat.nameKr}</h4>
                        <span className="text-[9px] text-brand-muted uppercase font-mono">{cat.nameEn}</span>
                      </div>
                      <span className="text-[9px] text-brand-dark border border-brand-dark/40 px-2 py-0.5 font-medium">기획 편집</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border-b border-brand-border pb-4 flex justify-between items-baseline">
                  <div>
                    <h3 className="text-xs uppercase font-bold tracking-widest text-[#111111]">
                      {editingCategory.nameKr} 기술 디렉션 편집
                    </h3>
                  </div>
                  <button
                    onClick={() => setEditingCategory(null)}
                    className="text-[10px] text-brand-muted"
                  >
                    이탈
                  </button>
                </div>

                {/* Edit Scope Details */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-brand-muted font-medium">상세 서술문 (Introduction)</label>
                    <textarea
                      rows={3}
                      value={editingCategory.description}
                      onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                      className="w-full text-xs font-light p-3 border border-brand-border/60 text-[#111111]"
                    />
                  </div>

                  {/* Editable Lists */}
                  <div className="space-y-3">
                    <span className="text-[10px] text-brand-muted font-medium block">세부 기술 집행 범위 (4개 라인 권장)</span>
                    {editingCategory.scope.map((item, i) => (
                      <input
                        key={i}
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const nextScope = [...editingCategory.scope];
                          nextScope[i] = e.target.value;
                          setEditingCategory({ ...editingCategory, scope: nextScope });
                        }}
                        className="w-full text-xs font-light p-2 border border-brand-border/60"
                      />
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-border text-right">
                  <button
                    onClick={handleSaveCategory}
                    className="px-6 py-3 bg-brand-dark hover:bg-black text-white text-[10px] uppercase tracking-widest"
                  >
                    카테고리 감리 동기화
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PRICING PACKAGES */}
        {currentTab === 'packages' && (
          <div className="space-y-8">
            {!editingPackage ? (
              <div className="space-y-6">
                <div className="border-b border-brand-border pb-4">
                  <h3 className="text-sm font-semibold text-brand-dark uppercase tracking-widest">요금 정찰제 패키지 설계 소스</h3>
                  <p className="text-[10px] text-brand-muted font-light mt-1">
                    부풀림 없고 투명한 원가 계산 하에 소비자에게 청구하는 평균적인 시작 평당 요율 단가를 투명하게 갱신해 줍니다.
                  </p>
                </div>

                <div className="space-y-4">
                  {packages.map((pack) => (
                    <div
                      key={pack.id}
                      onClick={() => setEditingPackage({ ...pack })}
                      className="p-5 border border-brand-border/60 hover:border-brand-dark bg-[#FAFAF9] flex justify-between items-center cursor-pointer transition-all"
                    >
                      <div>
                        <h4 className="text-xs font-semibold text-brand-dark">{pack.name}</h4>
                        <span className="text-[10px] text-brand-dark tracking-widest block font-mono mt-1 font-semibold">시작 요율: {pack.startingPrice}</span>
                      </div>
                      <span className="text-[10px] text-brand-muted underline">패키지 설정</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border-b border-brand-border pb-4 flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-brand-dark uppercase">
                    {editingPackage.name} 설계조정
                  </h3>
                  <button onClick={() => setEditingPackage(null)} className="text-[10px] text-brand-muted">돌아가기</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-brand-muted">패키지 노출 이름 (제목)</label>
                    <input
                      type="text"
                      value={editingPackage.name}
                      onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                      className="w-full text-xs font-light p-3 border border-brand-border/60"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-brand-muted">시작 단가 (가격)</label>
                    <input
                      type="text"
                      value={editingPackage.startingPrice}
                      onChange={(e) => setEditingPackage({ ...editingPackage, startingPrice: e.target.value })}
                      className="w-full text-xs font-light p-3 border border-brand-border/60"
                    />
                  </div>

                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] text-brand-muted">시공 상세 설명 (내용)</label>
                    <textarea
                      value={editingPackage.duration}
                      onChange={(e) => setEditingPackage({ ...editingPackage, duration: e.target.value })}
                      rows={2}
                      className="w-full text-xs font-light p-3 border border-brand-border/60 resize-none font-sans"
                    />
                  </div>

                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] text-brand-muted">체크리스트 옵션 목록 (한 줄에 하나의 항목 입력)</label>
                    <textarea
                      value={editingPackage.includedScope ? editingPackage.includedScope.join('\n') : ''}
                      onChange={(e) => {
                        const lines = e.target.value.split('\n');
                        setEditingPackage({ ...editingPackage, includedScope: lines });
                      }}
                      rows={6}
                      className="w-full text-xs font-mono p-3 border border-brand-border/60 leading-relaxed min-h-[140px]"
                      placeholder="공간 구성 설계 레이아웃 2안 제안&#10;주택/상업 기본 설계 수정 2회 제공"
                    />
                    <p className="text-[9px] text-brand-muted font-light mt-1">
                      엔터(줄바꿈)를 입력하면 각각 하나의 체크 박스 옵션 항목으로 분할되어 사이트 가격표에 반영됩니다.
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-border text-right">
                  <button
                    onClick={handleSavePackage}
                    className="px-6 py-3 bg-brand-dark hover:bg-black text-white text-[10px] uppercase tracking-widest cursor-pointer"
                  >
                    단가 내역 정산 승인 / 저장
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: FAQ EDITOR */}
        {currentTab === 'faq' && (
          <div className="space-y-8">
            {!editingFAQ ? (
              <div className="space-y-6">
                <div className="flex justify-between items-baseline border-b border-brand-border pb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-brand-dark uppercase tracking-widest">자주 묻는 질문(FAQ) 라이브러리</h3>
                  </div>
                  <button
                    onClick={() => {
                      setEditingFAQ({ id: `faq_${Date.now()}`, category: 'Estimate', question: '', answer: '' });
                      setIsNewFAQ(true);
                    }}
                    className="px-4 py-2 text-[10px] bg-brand-dark hover:bg-black text-white uppercase cursor-pointer tracking-wider font-medium"
                  >
                    신규 질문 등록
                  </button>
                </div>

                <div className="space-y-3">
                  {faq.map((f) => (
                    <div key={f.id} className="p-4 border border-brand-border/40 bg-white flex justify-between items-center gap-4">
                      <div>
                        <span className="text-[9px] uppercase bg-brand-bg px-2 py-0.5 border text-brand-dark border-brand-border/60">{f.category}</span>
                        <h4 className="text-xs font-normal text-brand-dark mt-2">{f.question}</h4>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingFAQ({ ...f }); setIsNewFAQ(false); }} className="px-3 py-1 bg-brand-bg border text-[9px]">편집</button>
                        <button onClick={() => handleDeleteFAQ(f.id)} className="px-3 py-1 bg-red-50 text-red-600 text-[9px]">지우기</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-brand-muted">소분류 카테고리 기탁</label>
                  <select
                    value={editingFAQ.category}
                    onChange={(e) => setEditingFAQ({ ...editingFAQ, category: e.target.value as any })}
                    className="w-full text-xs font-light p-3 border border-brand-border/60"
                  >
                    <option value="Estimate">Estimate (견적문의)</option>
                    <option value="Pricing">Pricing (금액수치)</option>
                    <option value="Timeline">Timeline (공기일정)</option>
                    <option value="Materials">Materials (자재자원)</option>
                    <option value="Design">Design (도면기획)</option>
                    <option value="Construction">Construction (현장감리)</option>
                    <option value="Warranty_AS">Warranty_AS (자체하자AS)</option>
                    <option value="Contract_Process">Contract_Process (계약절차)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-brand-muted">질문 내용 (Q)</label>
                  <input
                    type="text"
                    value={editingFAQ.question}
                    onChange={(e) => setEditingFAQ({ ...editingFAQ, question: e.target.value })}
                    className="w-full text-xs font-light p-3 border border-brand-border/60"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-brand-muted">대여 설명 및 해답문 (A)</label>
                  <textarea
                    rows={4}
                    value={editingFAQ.answer}
                    onChange={(e) => setEditingFAQ({ ...editingFAQ, answer: e.target.value })}
                    className="w-full text-xs font-light p-3 border border-brand-border/60"
                  />
                </div>

                <div className="pt-4 text-right space-x-2">
                  <button onClick={() => setEditingFAQ(null)} className="px-4 py-2 text-[9px] border">취소</button>
                  <button onClick={handleSaveFAQ} className="px-6 py-2 bg-brand-dark text-white text-[9px]">저장</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: CUSTOMER REVIEWS */}
        {currentTab === 'reviews' && (
          <div className="space-y-8">
            {!editingReview ? (
              <div className="space-y-6">
                <div className="flex justify-between items-baseline border-b border-brand-border pb-4">
                  <h3 className="text-sm font-semibold text-brand-dark uppercase tracking-widest">고객 상생 수기록소</h3>
                  <button
                    onClick={() => {
                      setEditingReview({ id: `rev_${Date.now()}`, projectTitle: '', clientName: '익명 님', rating: 5, highlight: '', quote: '', story: '', date: '2026.05', category: '기타공간' });
                      setIsNewReview(true);
                    }}
                    className="px-4 py-2 text-[10px] bg-emerald-600 text-white font-semibold tracking-wider"
                  >
                    신규 후기 가설
                  </button>
                </div>

                <div className="space-y-4">
                  {reviews.map((r) => (
                    <div key={r.id} className="p-4 border border-brand-border/40 bg-white flex justify-between items-center">
                      <div>
                        <h4 className="text-xs font-bold text-brand-dark">{r.clientName} | {r.projectTitle}</h4>
                        <p className="text-[10px] text-brand-muted italic mt-1 font-light">"{r.highlight}"</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingReview({ ...r }); setIsNewReview(false); }} className="px-3 py-1 border text-[9px]">수정</button>
                        <button onClick={() => handleDeleteReview(r.id)} className="px-3 py-1 bg-red-50 text-red-600 text-[9px]">삭제</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-brand-muted">대상 프로젝트 명판</label>
                  <input
                    type="text"
                    value={editingReview.projectTitle}
                    onChange={(e) => setEditingReview({ ...editingReview, projectTitle: e.target.value })}
                    className="w-full text-xs font-light p-3 border border-brand-border/60"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-brand-muted">작성 고객 실명구설 (예: 김** 님 (바리스타))</label>
                  <input
                    type="text"
                    value={editingReview.clientName}
                    onChange={(e) => setEditingReview({ ...editingReview, clientName: e.target.value })}
                    className="w-full text-xs font-light p-3 border border-brand-border/60"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-brand-muted">평가 점수 (최대 5점)</label>
                    <input
                      type="number"
                      max={5}
                      min={1}
                      value={editingReview.rating}
                      onChange={(e) => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}
                      className="w-full text-xs font-light p-3 border border-brand-border/60"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-brand-muted">준공 완료일자</label>
                    <input
                      type="text"
                      value={editingReview.date}
                      onChange={(e) => setEditingReview({ ...editingReview, date: e.target.value })}
                      className="w-full text-xs font-light p-3 border border-brand-border/60"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-brand-muted">한 줄 핵심 하이라이트</label>
                  <input
                    type="text"
                    value={editingReview.highlight}
                    onChange={(e) => setEditingReview({ ...editingReview, highlight: e.target.value })}
                    className="w-full text-xs font-light p-3 border border-brand-border/60"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-brand-muted">대표 헤드 쿼트 회화문</label>
                  <input
                    type="text"
                    value={editingReview.quote}
                    onChange={(e) => setEditingReview({ ...editingReview, quote: e.target.value })}
                    className="w-full text-xs font-light p-3 border border-brand-border/60 text-justify"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-brand-muted">사세적인 수공 에피소드 스토리 단락</label>
                  <textarea
                    rows={4}
                    value={editingReview.story}
                    onChange={(e) => setEditingReview({ ...editingReview, story: e.target.value })}
                    className="w-full text-xs font-light p-3 border border-brand-border/60 text-justify"
                  />
                </div>

                <div className="pt-4 text-right space-x-2">
                  <button onClick={() => setEditingReview(null)} className="px-4 py-2 border text-[9px]">취소</button>
                  <button onClick={handleSaveReview} className="px-6 py-2 bg-brand-dark text-white text-[9px]">체결</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: EDITORIAL JOURNAL/BLOG */}
        {currentTab === 'blog' && (
          <div className="space-y-8">
            {!editingBlog ? (
              <div className="space-y-6">
                <div className="flex justify-between items-baseline border-b border-brand-border pb-4">
                  <h3 className="text-sm font-semibold text-brand-dark uppercase tracking-widest">저널 칼럼 관리</h3>
                  <button
                    onClick={() => {
                      setEditingBlog({ id: `blog_${Date.now()}`, category: 'Material Guide', title: '', summary: '', content: '', image: '/src/assets/images/gangin_hero_1779412179856.png', date: '2026.05', readTime: '5 min read' });
                      setIsNewBlog(true);
                    }}
                    className="px-4 py-2 text-[10px] bg-emerald-600 text-white font-semibold tracking-wider"
                  >
                    새 건축 칼럼 작성
                  </button>
                </div>

                <div className="space-y-4">
                  {blog.map((b) => (
                    <div key={b.id} className="p-4 border border-brand-border/40 bg-white flex justify-between items-center">
                      <div>
                        <span className="text-[8px] border px-2 py-0.5 text-brand-dark border-brand-border bg-brand-bg">{b.category}</span>
                        <h4 className="text-xs font-bold text-brand-dark mt-2">{b.title}</h4>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingBlog({ ...b }); setIsNewBlog(false); }} className="px-3 py-1 border text-[9px]">수정</button>
                        <button onClick={() => handleDeleteBlog(b.id)} className="px-3 py-1 bg-red-50 text-red-600 text-[9px]">삭제</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-brand-muted">분야 가이드 범주 선택</label>
                  <select
                    value={editingBlog.category}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value as any })}
                    className="w-full text-xs font-light p-3 border border-brand-border/60"
                  >
                    <option value="Interior Trends">Interior Trends (스타일링 동향)</option>
                    <option value="Material Guide">Material Guide (고성능 자재 기서)</option>
                    <option value="Design Guide">Design Guide (공간 조석론)</option>
                    <option value="Estimate Guide">Estimate Guide (원가 지휘서)</option>
                    <option value="Construction Knowledge">Construction Knowledge (직영 감리 기술)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-brand-muted">칼럼 대화명 제목</label>
                  <input
                    type="text"
                    value={editingBlog.title}
                    onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                    className="w-full text-xs font-light p-3 border border-brand-border/60"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-brand-muted">한 줄 핵심 요약문</label>
                  <input
                    type="text"
                    value={editingBlog.summary}
                    onChange={(e) => setEditingBlog({ ...editingBlog, summary: e.target.value })}
                    className="w-full text-xs font-light p-3 border border-brand-border/60"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-brand-muted">원문 스토리 (Markdown 식 문단 기재, 소제목은 '##' 또는 '###'으로 시작)</label>
                  <textarea
                    rows={8}
                    value={editingBlog.content}
                    onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                    className="w-full text-xs font-light p-3 border border-brand-border/60 text-justify"
                    placeholder="## 소제목 기재&#10;&#10;본문을 줄글로 소복소복 채우십시오."
                  />
                </div>

                <div className="pt-4 text-right space-x-2">
                  <button onClick={() => setEditingBlog(null)} className="px-4 py-2 border text-[9px]">취소</button>
                  <button onClick={handleSaveBlog} className="px-6 py-2 bg-brand-dark text-white text-[9px]">작성 완료</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 8: INTEGRATED LEADS / CRM SYSTEM */}
        {currentTab === 'leads' && (
          <div className="space-y-8">
            <div className="flex justify-between items-baseline border-b border-brand-border pb-4">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-brand-dark uppercase tracking-widest">통합 공간 견적 및 상담 접수 현황</h3>
                <p className="text-[10px] text-brand-muted font-light">
                  고객들이 우리집 예상견적(CTA 01) 및 간편 유선상담(CTA 02), 그리고 오시는길 페이지의 정밀 기획 상담 통합포럼을 통해 전송한 데이터베이스를 검수합니다. (브라우저 로컬 저장형)
                </p>
              </div>
              <button
                onClick={async () => {
                  if (confirm('모든 접수 내역을 일괄 안전 폐기처리 하시겠습니까?')) {
                    setAllLeads([]);
                    setEstimatesLog([]);
                    try {
                      const { saveLeads, saveEstimates, saveConsultations } = await import('../lib/leads');
                      await saveLeads([]);
                      await saveEstimates([]);
                      await saveConsultations([]);
                      alert('모든 접수 내역이 깨끗이 비워졌습니다.');
                    } catch (err) {
                      console.error('[Supabase] Failed to clear leads:', err);
                    }
                  }
                }}
                className="px-4 py-2 border text-[9px] hover:bg-red-50 hover:text-red-600 transition-colors font-semibold"
              >
                전체 내역 초기화
              </button>
            </div>

            {allLeads.length === 0 && estimatesLog.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-brand-border/60 bg-[#FBFBFB] space-y-3">
                <ClipboardList size={22} className="mx-auto text-brand-muted" />
                <div>
                  <h4 className="text-xs font-semibold text-brand-dark">대기 중인 신규 문의가 존재하지 않습니다</h4>
                  <p className="text-[10px] text-brand-muted font-light mt-1">홈페이지 하단 퀵 모듈이나 견적, 연락 페이지에서 직접 테스트 문의를 전송하십시오.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-semibold text-brand-dark tracking-widest block">● 접수된 문의 리스트 ({allLeads.length + estimatesLog.filter(e => !allLeads.some(l => l.id === e.id)).length}건)</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Render from estimatesLog first if not already inside allLeads */}
                    {estimatesLog.filter(e => !allLeads.some(l => l.id === e.id)).map((est) => (
                      <div key={est.id} className="border border-brand-border/80 bg-white p-5 space-y-4 relative hover:border-brand-dark transition-colors">
                        <span className="absolute top-4 right-4 text-[8px] bg-sky-50 text-sky-600 border border-sky-100 px-2 py-0.5 uppercase tracking-widest">
                          정밀 공간 견적 (7단계)
                        </span>
                        
                        <div className="space-y-1">
                          <span className="text-[8px] text-brand-muted block font-mono">{est.submittedAt}</span>
                          <h4 className="text-xs font-semibold text-brand-dark">{est.clientName} 귀하</h4>
                          <p className="text-[10px] text-brand-muted font-light">연락처: <span className="font-normal text-brand-dark">{est.phone}</span></p>
                        </div>

                        <div className="border-t border-brand-border/40 pt-3 space-y-1.5 text-[10px] font-light text-brand-muted">
                          <p>• <span className="text-brand-dark font-normal">공간분야:</span> {est.category}</p>
                          <p>• <span className="text-brand-dark font-normal">면적규모:</span> {est.area}</p>
                          <p>• <span className="text-brand-dark font-normal">기획예산:</span> {est.budget}</p>
                          <p>• <span className="text-brand-dark font-normal">희망스타일:</span> {est.designPreference}</p>
                          <p className="border-t border-brand-border/40 pt-2 text-[10px] leading-relaxed text-[#111111] bg-brand-bg/20 p-2 mt-1 whitespace-pre-wrap">
                            {est.details}
                          </p>
                        </div>

                        <div className="pt-2 text-right">
                          <button
                            onClick={async () => {
                              if (confirm('이 접정 견적을 지우겠습니까?')) {
                                const updated = estimatesLog.filter(e => e.id !== est.id);
                                setEstimatesLog(updated);
                                try {
                                  const { saveEstimates } = await import('../lib/leads');
                                  await saveEstimates(updated);
                                } catch (err) {
                                  console.error('[Supabase] Delete estimate failed:', err);
                                }
                              }
                            }}
                            className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 text-[8px] uppercase font-bold tracking-wider rounded-none cursor-pointer"
                          >
                            영구 안전 삭제
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Render allLeads unified database */}
                    {allLeads.map((lead) => (
                      <div key={lead.id} className="border border-brand-border/80 bg-white p-5 space-y-4 relative hover:border-brand-dark transition-colors">
                        <span className={`absolute top-4 right-4 text-[8px] border px-2 py-0.5 uppercase tracking-widest ${
                          lead.type.includes('Quick') 
                            ? 'bg-amber-50 text-amber-600 border-amber-100' 
                            : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        }`}>
                          {lead.type}
                        </span>
                        
                        <div className="space-y-1">
                          <span className="text-[8px] text-brand-muted block font-mono">{lead.timestamp || lead.submittedAt}</span>
                          <h4 className="text-xs font-semibold text-brand-dark">{lead.name} 귀하</h4>
                          <p className="text-[10px] text-brand-muted font-light">연락처: <span className="font-normal text-brand-dark">{lead.phone}</span></p>
                        </div>

                        <div className="border-t border-brand-border/40 pt-3 space-y-1.5 text-[10px] font-light text-brand-muted">
                          <p>• <span className="text-brand-dark font-normal">공간분야:</span> {lead.category}</p>
                          {lead.region && <p>• <span className="text-brand-dark font-normal">시공지역:</span> {lead.region}</p>}
                          {lead.area && <p>• <span className="text-brand-dark font-normal">면적규모:</span> {lead.area}</p>}
                          {lead.budget && <p>• <span className="text-brand-dark font-normal">기획예산:</span> {lead.budget}</p>}
                          {lead.schedule && <p>• <span className="text-brand-dark font-normal">착공시기:</span> {lead.schedule}</p>}
                          <div className="border-t border-brand-border/40 pt-2 text-[10px] leading-relaxed text-[#111111] bg-brand-bg/20 p-2 mt-1 whitespace-pre-wrap">
                            {lead.details}
                          </div>

                          {/* Reference files list base64 previews */}
                          {lead.uploads && lead.uploads.length > 0 && (
                            <div className="border-t border-brand-border/30 pt-3 space-y-2">
                              <span className="text-[8px] uppercase tracking-wider text-brand-dark block font-normal">첨부파일 ({lead.uploads.length})</span>
                              <div className="grid grid-cols-4 gap-1.5">
                                {lead.uploads.map((up: any, uIdx: number) => (
                                  <div key={uIdx} className="relative group border border-brand-border">
                                    {up.dataUrl ? (
                                      <a href={up.dataUrl} download={up.name} title="클릭해서 다운로드">
                                        <img src={up.dataUrl} className="w-full aspect-square object-cover" alt="attachment" referrerPolicy="no-referrer" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                          <span className="text-[7px] text-white">SAVE</span>
                                        </div>
                                      </a>
                                    ) : (
                                      <div className="w-full aspect-square bg-[#FBFBFB] flex items-center justify-center text-[7px] text-center font-mono">FILE</div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="pt-2 text-right">
                          <button
                            onClick={async () => {
                              if (confirm('이 접정 내역을 지우겠습니까?')) {
                                const updatedLeads = allLeads.filter(l => l.id !== lead.id);
                                setAllLeads(updatedLeads);
                                
                                // Also sync other tables if necessary
                                const updatedEsts = estimatesLog.filter(e => e.id !== lead.id);
                                setEstimatesLog(updatedEsts);
                                
                                try {
                                  const { saveLeads, saveEstimates } = await import('../lib/leads');
                                  await saveLeads(updatedLeads);
                                  await saveEstimates(updatedEsts);
                                } catch (err) {
                                  console.error('[Supabase] Delete leads failed:', err);
                                }
                              }
                            }}
                            className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 text-[8px] uppercase font-bold tracking-wider rounded-none cursor-pointer"
                          >
                            영구 안전 삭제
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 9: NAVIGATION MENU MANAGEMENT */}
        {currentTab === 'navigation' && (
          <div className="space-y-8">
            <div className="border-b border-brand-border pb-4 flex justify-between items-end">
              <div>
                <h3 className="text-sm font-semibold text-brand-dark uppercase tracking-widest">상단 메뉴 관리</h3>
                <p className="text-[10px] text-brand-muted font-light mt-1">
                  홈페이지 상단 헤더 및 모바일 내비게이션에 노출되는 메뉴의 한글명, 영문명, 연결링크(뷰) 및 노출 순서를 일괄 관리합니다.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] uppercase font-semibold text-brand-dark tracking-widest block">● 메뉴 목록 설정</span>
              
              <div className="border border-brand-border/60 divide-y divide-brand-border/40 bg-white overflow-x-auto">
                <div className="min-w-[700px]">
                  <div className="grid grid-cols-12 gap-4 p-3 bg-brand-bg/30 text-[10px] font-semibold text-brand-dark uppercase tracking-wider">
                    <div className="col-span-3">메뉴 한글명 (Label KR)</div>
                    <div className="col-span-3">메뉴 영문명 (Label EN)</div>
                    <div className="col-span-2 text-center">링크 뷰 (Link URL/View)</div>
                    <div className="col-span-2 text-center">정렬 순서 (Order)</div>
                    <div className="col-span-2 text-right">노출 여부 (Show)</div>
                  </div>

                  {navItems && navItems.map((item, idx) => (
                    <div key={item.id || item.view} className="grid grid-cols-12 gap-4 p-4 items-center">
                      <div className="col-span-3">
                        <input
                          type="text"
                          value={item.labelKr}
                          onChange={(e) => {
                            const updated = [...navItems];
                            updated[idx] = { ...item, labelKr: e.target.value };
                            if (onUpdateNavItems) onUpdateNavItems(updated);
                          }}
                          className="w-full bg-[#FFFFFF] border border-brand-border/80 px-3 py-2 text-xs focus:outline-none focus:border-brand-dark font-sans"
                          placeholder="예: 홈"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => {
                            const updated = [...navItems];
                            updated[idx] = { ...item, label: e.target.value };
                            if (onUpdateNavItems) onUpdateNavItems(updated);
                          }}
                          className="w-full bg-[#FFFFFF] border border-brand-border/80 px-3 py-2 text-xs focus:outline-none focus:border-brand-dark font-sans"
                          placeholder="예: Home"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={item.view}
                          onChange={(e) => {
                            const updated = [...navItems];
                            updated[idx] = { ...item, view: e.target.value as any };
                            if (onUpdateNavItems) onUpdateNavItems(updated);
                          }}
                          className="w-full bg-[#FFFFFF] border border-brand-border/80 px-3 py-2 text-xs font-mono text-center focus:outline-none focus:border-brand-dark"
                          placeholder="예: home"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          value={item.order}
                          onChange={(e) => {
                            const updated = [...navItems];
                            updated[idx] = { ...item, order: parseInt(e.target.value, 10) || 0 };
                            if (onUpdateNavItems) onUpdateNavItems(updated);
                          }}
                          className="w-full bg-[#FFFFFF] border border-brand-border/80 px-3 py-2 text-xs text-center focus:outline-none focus:border-brand-dark font-sans"
                        />
                      </div>
                      <div className="col-span-2 flex items-center justify-end">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.show}
                            onChange={(e) => {
                              const updated = [...navItems];
                              updated[idx] = { ...item, show: e.target.checked };
                              if (onUpdateNavItems) onUpdateNavItems(updated);
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-brand-dark after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                          <span className="ml-2 text-[10px] font-medium text-brand-dark min-w-[32px] text-right font-sans">
                            {item.show ? '노출' : '숨김'}
                          </span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-brand-bg/20 border border-brand-border/40 text-[10px] text-brand-muted leading-relaxed space-y-1">
                <p className="font-semibold text-brand-dark mb-1">💡 상단 메뉴 관리 사용 가이드</p>
                <p>• 레이블(한글명/영문명)을 입력 후 하단의 **"메뉴 설정 일괄 보존하기"**를 누르지 않아도 임시 실시간 미리보기에 배치가 바뀝니다. 클라우드에 영구 적용하려면 하단 보존 버튼을 반드시 한 번 누르십시오.</p>
                <p>• 기본적으로 설정 제공되는 메뉴 뷰는 **home, portfolio, categories, pricing, estimate, reviews, blog, faq, admin** 등 연동 코드를 가리킵니다.</p>
              </div>

              <div id="save-nav-action-wrapper" className="pt-4 flex justify-end">
                <button
                  onClick={async () => {
                    if (!navItems) return;
                    console.log('[SAVE START] gangin_nav_items');
                    try {
                      const { saveSupabaseState, isSupabaseConfigured } = await import('../lib/supabase');
                      if (isSupabaseConfigured) {
                        const success = await saveSupabaseState('gangin_nav_items', navItems);
                        if (success) {
                          console.log('[SAVE SUCCESS] gangin_nav_items');
                          alert('기본 상단 메뉴 구성이 데이터베이스에 완벽히 보관되었습니다.');
                        } else {
                          console.log('[SAVE FAILED] gangin_nav_items');
                          alert('데이터베이스 저장 중 서버 연결장애가 발생했습니다.');
                        }
                      } else {
                        console.log('[SAVE FAILED] gangin_nav_items - Supabase offline');
                        alert('데이터베이스 연결 오프라인으로 수동 조치 전까지 로컬 가상 환경에 유지됩니다.');
                      }
                    } catch (err: any) {
                      console.log('[SAVE FAILED] gangin_nav_items', err?.message || err);
                    }
                  }}
                  className="bg-brand-dark hover:bg-neutral-800 text-white font-semibold text-xs py-3.5 px-8 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save size={13} />
                  <span>메뉴 설정 일괄 보존하기</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
