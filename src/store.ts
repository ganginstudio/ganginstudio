import { Project, PricingPackage } from './types';
import { PORTFOLIO_PROJECTS } from './data';

export interface FAQItem {
  id: string;
  category: 'Estimate' | 'Pricing' | 'Timeline' | 'Materials' | 'Design' | 'Construction' | 'Warranty_AS' | 'Contract_Process';
  question: string;
  answer: string;
}

export interface CustomerReview {
  id: string;
  projectTitle: string;
  clientName: string;
  rating: number;
  highlight: string;
  quote: string;
  story: string;
  date: string;
  category: string;
}

export interface BlogPost {
  id: string;
  category: 'Interior Trends' | 'Material Guide' | 'Design Guide' | 'Estimate Guide' | 'Construction Knowledge';
  title: string;
  summary: string;
  content: string; // Markdown / Text
  image: string;
  date: string;
  readTime: string;
}

export interface SiteSettings {
  brandName: string;
  subTitle: string;
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
  mutedColor: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  address: string;
  phone: string;
  email: string;
  instagram: string;
  kakaotalk: string;
  blog: string;
  visualHeroImage?: string;
}

// 1204DESIGN Style detailed packages
export interface ServicePackage {
  id: string;
  name: string;
  categoryKey: string;
  startingPrice: string;
  duration: string;
  includedScope: string[];
  excludedScope: string[];
  timelineSummary: string;
  processSummary: string;
}

// Service Category details
export interface ServiceCategory {
  id: string;
  nameKr: string;
  nameEn: string;
  description: string;
  heroImage: string;
  scope: string[];
  materials: { name: string; desc: string }[];
  process: string[];
}

export const DEFAULT_CATEGORIES: ServiceCategory[] = [
  {
    id: 'apartment',
    nameKr: '아파트 인테리어',
    nameEn: 'Premium Apartment',
    description: '구조의 개방성과 디테일의 정교함이 완성하는 하이엔드 주거공간의 가치를 제안합니다.',
    heroImage: '/src/assets/images/gangin_hero_1779412179856.png',
    scope: [
      '정밀 공간 해체 공정 및 단열 보강설비 개축',
      '문선과 몰딩을 제거하여 가벽과 일체화되는 히든 도어 가구 라인 조율',
      '조명 분절 설계 및 고성능 매트 텍스처 미장 코팅',
      '친환경 원목 오크 패널 및 이탈리아 직수입 포셀린 자재 접합'
    ],
    materials: [
      { name: '천연 원목 오크 패널', desc: '자연 친화적 샌딩을 거쳐 오랜 시간 깊어지는 무광 질감 선사' },
      { name: '마이크로시멘트 바닥', desc: '이음새가 전혀 노출되지 않는 고탄성 플라스터 레이어코트' },
      { name: '메탈 몰딩 프레임', desc: '벽면과 모서리의 접합부를 1mm 미세 오차 이내로 절개 마감' }
    ],
    process: [
      '01. 현장 정밀 계측 및 습도/결로 열화상 검사',
      '02. 평면 구획 배치안 검토 및 3D 모델링 안 전달',
      '03. 세부 자재 원가 내역 심의 및 최종 도급 계약',
      '04. 본사 책임 직영 감리 하의 고결 성능 시공',
      '05. 분기별 하우스 케어 품질 순회 검사 및 A/S 개시'
    ]
  },
  {
    id: 'bathroom',
    nameKr: '욕실 인테리어',
    nameEn: 'Zen Bathroom & Spa',
    description: '물과 빛의 감각이 조화롭게 부서지는 고고한 사색과 정화의 웰니스 공간입니다.',
    heroImage: '/src/assets/images/gangin_bathroom_1779412211338.png',
    scope: [
      '특허 기술을 접목한 4중 하이브리드 완전 차폐 방수 수밀 시공',
      '아일랜드 식 조적 조형 세면대 및 타일 매립형 수전 설계',
      '벽체 일체형 배수 슬릿 구조 기술',
      '에너지 세이빙 온벽 대류 공조 열선 배선 탑재'
    ],
    materials: [
      { name: '천연 네로 마르키나 석재', desc: '심해의 깊고 조용한 묵직함을 자아내는 천연 화강석재' },
      { name: '포조 무광 건메탈 수전', desc: '장식을 억제하고 기능적 실루엣만 극대화한 명품 매립 피팅' },
      { name: '고강도 세라믹 복합 타일', desc: '메티에르 거친 입자가 미끄러짐을 원천 방지하는 안전 규격물' }
    ],
    process: [
      '01. 배수 배관 위치 진단 및 압력 수밀 누수 테스트',
      '02. 세션 조립도 및 매치 줄눈 분절 비례 설계 가설',
      '03. 4단계 습식 방조제 전개 및 정밀 도막 고착화 리포트',
      '04. 1:1 디테일 무지 손질 조수 및 세밀 가구 부착'
    ]
  },
  {
    id: 'commercial',
    nameKr: '상가 인테리어',
    nameEn: 'Strategic Commercial Space',
    description: '브랜드 가치가 고스란히 담기고, 공간 자체가 하나의 오브제가 되는 상업 공간 마케터.',
    heroImage: '/src/assets/images/gangin_commercial_1779412195768.png',
    scope: [
      '파사드 익스테리어 구조 역학 시선 기획',
      '고객 행동 동선 맞춤형 동조 조명 엔지니어링',
      '대형 철제/스톤 조각 카운터 등 맞춤형 아일랜드 가구 자체 공장 직송',
      '상가 소방 허가 및 법적 정합성 무하자 검증'
    ],
    materials: [
      { name: '아노다이징 특수 브러시 금속', desc: '지문과 마모를 방지하면서 하이테크 미래감을 전하는 고급 강철' },
      { name: '내추럴 점토 플라스터', desc: '오가닉한 질감이 조명을 휘감아 깊고 온화한 무드를 연출하는 흙 미장' },
      { name: '고강도 노출 콘크리트', desc: '강인한 기계적 볼륨을 전달하는 표면 연마 공법' }
    ],
    process: [
      '01. 브랜드 미션 연동 및 고집된 타겟 흐름 리서치',
      '02. 파사드 입면 및 수평 바 카운터 3D 이미지 기획안 협의',
      '03. 정밀 가공 부재 반입 및 단기 집중 무소음 야간 철야 시공',
      '04. 개업 스케줄 엄수를 위한 고정밀 공정 리딩제'
    ]
  },
  {
    id: 'cafe',
    nameKr: '카페 인테리어',
    nameEn: 'Signature Cafe Lounge',
    description: '에스프레소의 흐름조차 미학이 되는, 머무름만으로 가치를 환기하는 슬로우 카페.',
    heroImage: '/src/assets/images/gangin_cafe_1779412248644.png',
    scope: [
      '바리스타 주동 수량에 최적화된 물-전기 급배수 통합 동선 시스템',
      '직접 노광을 소거한 따스한 오목형 코브 배광 간접 조례',
      '자연 테라스 가설 정원 파티션 시퀀스 연출',
      '오도재성 매트 우드 비중 큐레이팅'
    ],
    materials: [
      { name: '현무암 바잘트 석재판', desc: '커피 고유 음영과 스팀에 내구성이 우수한 묵직한 가공재' },
      { name: '지중해풍 천연 석회 점토', desc: '실내 천연 탄소 정화와 따스한 음향 흡수를 돕는 특수 외장' },
      { name: '스모크드 러프 오크 나무', desc: '고온 스팀과 커피 오일 오염에 원천 차단 처리를 한 고재 우드' }
    ],
    process: [
      '01. 머신 전력 소요 전선 및 공조 유입 설비 도면 설계',
      '02. 수평 카운터 매스 수치 정위치 및 조명 도안 시방 수립',
      '03. 조명 밝기 및 저울대 공차 룩스 감리',
      '04. 완공 전 물 순환 정상 동작 최종 드립 테스트'
    ]
  },
  {
    id: 'office',
    nameKr: '오피스 인테리어',
    nameEn: 'Intelligent Work Habitat',
    description: '전선과 방해요소를 완벽히 소거하여, 생각과 몰입에 전적으로 기여하는 구조.',
    heroImage: '/src/assets/images/gangin_office_1779412287051.png',
    scope: [
      '책상과 바닥 몰딩 하부로 모든 통신 전력선을 응축해 매끄럽게 정리하는 파이프 아치 레일',
      '프라이버시와 커뮤니케이션 비율을 조정한 유연한 파티션 분비',
      '눈부심과 광 피로도를 소거한 캘리브레이션 그리드 천장 조그',
      '소음 전도를 65% 이상 상쇄하는 고밀도 흡음 카펫'
    ],
    materials: [
      { name: '아노다이징 슬림 알루미늄', desc: '부드러운 가변 격벽을 조형하면서 무게감을 격리하는 모듈 바' },
      { name: '밀크 그레이 방염 양모 카펫', desc: '소음 방지와 화재 확산 방지 특수 면사 처리품' },
      { name: '저반사 매트 월페코', desc: '고감도 고선명 사무 진행 시 빛 가려짐을 원천 소거하는 도막미장' }
    ],
    process: [
      '01. 기업 구성원 수 대비 동선 포화율 사전 컴퓨터 시뮬레이션',
      '02. 전력 트레이 배치 및 가벽 수화 조율',
      '03. 그리드 모듈 자재 수평 프레임 체킹',
      '04. 친환경 새집 대청소 도포 및 즉시 가동 오피스 전달'
    ]
  },
  {
    id: 'kidspool',
    nameKr: '키즈풀 인테리어',
    nameEn: 'Family Wellness & Kids Pool',
    description: '아이들의 안전한 모험을 위해 친환경 첨단 자재로 영혼을 담아 빚은 물의 낙원.',
    heroImage: '/src/assets/images/gangin_kidspool_1779412268156.png',
    scope: [
      '온수를 보존하고 습기를 강제 탈수하는 첨단 다목적 리싸이클 공조 기조',
      '모든 기둥 모서리와 계단의 라운드 곡선 가공 처리',
      '친환경 100% 무독성 수지 성분의 테라조 마이크로 미장 공도',
      '여과 정제 및 원천 순환 연수 순화 배관 기계 장치 안배'
    ],
    materials: [
      { name: '친환경 수지 마이크로샌드', desc: '안전 보증 성분의 무독 미용 오버레이 코트' },
      { name: '모자이크 터키 천연 스톤', desc: '물의 맑은 푸른빛을 사방으로 퍼뜨리는 유리질 가공재' },
      { name: '리세스드 안전 스틱 세이프티', desc: '습한 바닥에서도 탁월한 그립력을 선사하여 낙상을 완전 차단' }
    ],
    process: [
      '01. 슬라브 하중 용량 안전 진단 최우선 검찰',
      '02. 기계 배관의 오버플로우 급속 가열 제어 보드 탑재',
      '03. 다중 라운딩 코너 표면 공작 조공 투입',
      '04. 수밀 보존 누수 다중 담수 실시간 모니터링 후 낙성'
    ]
  },
  {
    id: 'remodeling',
    nameKr: '주거 리모델링',
    nameEn: 'Complete Living Remodeling',
    description: '시간이 흘러 노화된 가벽 속 보온 단열층부터 완전히 보강하는 가치 치환 정형.',
    heroImage: '/src/assets/images/gangin_lounge_1779412227496.png',
    scope: [
      '동절기 한기와 결로를 원천 봉쇄하는 외단열 사춤 사양 개수',
      '수직 수평이 깨진 노후 바닥 면의 초평탄 연마 몰탈 피치',
      '가변형 수납장 및 가변 도어 라인 조형 설계',
      '상수관/하수관 오폐 배관의 전면 프리미엄 신형 교체'
    ],
    materials: [
      { name: '고기밀 폼 단열 단열재', desc: '구석진 틈새까지 빈틈없이 확장되어 10년의 단열 성능 보장' },
      { name: '초평탄 마스터 슬러리 몰탈', desc: '바닥면 수평을 기계 수준으로 일치시켜 타일 들뜸을 완전 방지' },
      { name: 'E0 최고급 전용 자작나무 가재', desc: '포름알데히드 방출이 제로인 환경 보증 하이엔드 우드' }
    ],
    process: [
      '01. 노후 주거지의 단열/골조 부식 점 진단 카메라 스캔',
      '02. 배관 경로 전면 개설 및 개조형 가벽 수치 드로잉',
      '03. 내부 철거 및 보강 콘크리트 포스트 가설',
      '04. 단열/도어/마감 3중 검사 절차 수립 후 가전 세팅'
    ]
  },
  {
    id: 'commercial_interior',
    nameKr: '상업공간 인테리어',
    nameEn: 'Exclusive Business Interior',
    description: '비즈니스의 승리를 위해 공간이 전하는 최상의 럭셔리 설득 가이드라인.',
    heroImage: '/src/assets/images/gangin_commercial_1779412195768.png',
    scope: [
      '럭셔리 복합 쇼룸 및 하이엔드 편집숍 특화',
      '무장애 일직선 무슬릿 알루미늄 프로파일 피니시',
      '외부 자연광 변동에 연동하는 조광 컨트롤 디밍 스피커 탑재',
      '오도재성 매트 머드 아노다이징 가공제 결합'
    ],
    materials: [
      { name: '강도 높은 브러시드 알루미늄', desc: '정갈하면서 장난 없는 도심적 세련미를 자아내는 외장재' },
      { name: '마이크로 미세 플라스터 페이스트', desc: '매트하고 석재 같은 굳은 표면을 연출하는 특수 분말' },
      { name: '로이 이중 접합 특수 글래스', desc: '쇼인도에 반사 얼룩을 없애 내부 조각을 실사같이 드러냄' }
    ],
    process: [
      '01. 상업 마케팅 아이덴티티 및 가치가 담긴 시인 시퀀스 상담',
      '02. 전담 디렉팅 3D 렌더링 검토',
      '03. 공업 가공 유격 정밀 부재 반입 및 정렬 조립 고정',
      '04. 오픈식에 맞춘 세부 캘리브레이션 최종 연출 진행'
    ]
  },
  {
    id: 'custom_project',
    nameKr: '맞춤 프로젝트',
    nameEn: 'Bespoke Custom Space',
    description: '규격화된 어떤 카테고리에도 종속되지 않는, 오직 하나만의 예술적 공간 구획.',
    heroImage: '/src/assets/images/gangin_facade_1779412302894.png',
    scope: [
      '비대칭 및 아방가르드 마이터 베벨 수평선 설계',
      '초프리미엄 자제 해외 소싱 및 독점 시공 기술 연구',
      '한지와 금속, 돌과 가죽 등 이질적 재료의 극한 마이너스 접합 조율',
      '클라이언트 희망 사항에 대응하는 전용 엔지니어링 패널 특별 편성'
    ],
    materials: [
      { name: '수제 전통 한지 스크린', desc: '부드러운 빛 차광과 사색적인 그림자를 자아내는 미학적 천연 종이' },
      { name: '초미세 샌드 테라코타 슬레이트', desc: '흙 내음을 담으며 공간 전체의 습도를 자연 조습하는 유럽 점토석' },
      { name: '글로벌 최고 명성 수공가구', desc: '이탈리아와 독일 공정 직송의 고결하고 엄숙한 마스터 피스' }
    ],
    process: [
      '01. 무제한 자유 구상 제반 스윗룸 대면 상담 진행',
      '02. 특수 가구가 접목된 고해상도 예술 시안 3D 프레젠테이션',
      '03. 장인 전속 정밀 시공 체킹 및 수작업 수공품 맞춤 제작',
      '04. 클라이언트 단독 검수 및 영구 품질 마스터 케어 등재'
    ]
  }
];

export const DEFAULT_PACKAGES: ServicePackage[] = [
  {
    id: 'pack_basic',
    name: 'BASIC',
    categoryKey: 'pricing_general',
    startingPrice: '상담 후 안내',
    duration: '실속있고 깔끔한 마감 요소와 실용적 평면 구성을 정립하는 기본 리모델링 스타트 패키지',
    includedScope: [
      '공간 구성 설계 레이아웃 2안 제안',
      '주택/상업 기본 설계 수정 2회 제공',
      '고해상도 공간 3D 그래픽 투시 오버플 프리뷰',
      '정밀 시공 자재 표준 규격 수작 가이드 기초'
    ],
    excludedScope: [],
    timelineSummary: '',
    processSummary: ''
  },
  {
    id: 'pack_standard',
    name: 'STANDARD',
    categoryKey: 'pricing_general',
    startingPrice: '상담 후 안내',
    duration: '한층 더 견고한 무설계선 마감 및 독사색과 배광 매치까지 완성하는 실전 설계 패키지',
    includedScope: [
      '공간 구성 최적 설계 레이아웃 4안 제안',
      '실용 편의적 완벽 실사 무제한 수정 지원',
      '마감 전용 고밀 천연 마크 수입 자재/컬러 매칭',
      '빌트인 마이너스 숨김 구조 가구 맞춤 제작 설계'
    ],
    excludedScope: [],
    timelineSummary: '',
    processSummary: ''
  },
  {
    id: 'pack_premium',
    name: 'PREMIUM',
    categoryKey: 'pricing_general',
    startingPrice: '상담 후 안내',
    duration: '장인 사색 플라스터, 조적 오버플 Wellness 욕탕 등 고전 하이엔드 예술 가치를 총망라한 통합 패키지',
    includedScope: [
      '공간 구성 흐름 설계 정밀 레이아웃 6안 제안',
      '프랙탈 수치 피드백 자유 수정 기한제한 무',
      '하이엔드 마이크로시멘트 3종 시립 다각 공법',
      '완제품 책임 보증 및 프리미엄 원케어 AS 케어 적용'
    ],
    excludedScope: [],
    timelineSummary: '',
    processSummary: ''
  },
  {
    id: 'pack_apartment',
    name: 'Apartment Package (아파트 프리미엄 패키지)',
    categoryKey: 'apartment',
    startingPrice: '평당 2,500,000 KRW',
    duration: '10 - 12주 소요',
    includedScope: [
      '정밀 내단열 및 결로 차단 3중 골조 케어',
      '전체 히든 도어 무선 매립 정돈선 공작',
      '조명 분절 매립 조광 설계(수입 룩스 제어 포함)',
      '실내 마이크로시멘트 도막 가설 마감',
      '무상 입주 정화 서비스 및 3개년 프리미엄 안심 점검'
    ],
    excludedScope: [
      '외벽 증축 등 건축 허가 수수료',
      '기존 정화조 대형 수리 비용 일체',
      '해외 직구 프리미엄 단독 조명 기구 본체 가격'
    ],
    timelineSummary: '대지 계측 및 철거 (2주) → 단열 및 설비 (3주) → 가벽 및 맞춤 창호 목공 (3주) → 마이크로시멘트 도막 가공 (2주) → 디테일 위생기 장착 및 청소 (1주)',
    processSummary: '대지정밀 스캔 분석을 통해 설계 오차를 원천 소거하고, 시방 기준에 따라 숙련공들이 직접 조율된 기하 비례선을 세웁니다.'
  },
  {
    id: 'pack_bathroom',
    name: 'Bathroom Package (조적식 하이엔드 욕실 패키지)',
    categoryKey: 'bathroom',
    startingPrice: '욕실당 15,000,000 KRW',
    duration: '4 - 5주 소요',
    includedScope: [
      '4중 탄성 도막 하이브리드 완전 방수',
      '조적 타일 성형 대형 욕조 및 세면 전결 상판',
      '이탈리아 무광 매립 수전 부하 정합 피팅',
      '온기 가락 및 수분 증발을 위한 하부 대류 열선',
      '오픈 무슬릿 배수 슬릿 시스템'
    ],
    excludedScope: [
      '노후 천장 상단 누수 배관 자체 수리 비용',
      '단지 고압 급수 펌프 고장 시 동결 해제 시 소요비'
    ],
    timelineSummary: '기존 철거 및 파이프 압력 검사 (1주) → 조적 구조 축조 및 4중 교합 방조 (1.5주) → 정밀 타일 커팅 및 수접합 (1.5주) → 매립 위생기 인서팅 (0.5주)',
    processSummary: '물에 의해 훼손되지 않는 영속성에 가치를 둡니다. 엄밀한 방수 검증 이후 고급 세라믹을 아교 접합합니다.'
  },
  {
    id: 'pack_commercial',
    name: 'Commercial Package (상가 브랜드 콤팩트 패키지)',
    categoryKey: 'commercial',
    startingPrice: '평당 1,800,000 KRW',
    duration: '6 - 8주 소요',
    includedScope: [
      '브랜드 가치 아이덴티티를 웅축한 익스테리어 파사드 기획',
      '고객 심리 유도를 목적으로 기획된 간접 코브 배광 설계',
      '대형 철제 조각 쇼케이스 카운터 자체 주문 빌드',
      '상업 동선 평면 존 계획 및 소방 안전 완벽 허가권'
    ],
    excludedScope: [
      '건물 외부 대형 고압 크레인 임대비 (필요시 청구)',
      '실외 가설 상가 간판 LED 디자인 개발비'
    ],
    timelineSummary: '브랜드 리서치 및 도면 확정 (1.5주) → 파사드 성형 철거 (1.5주) → 오브제 금속가구 및 배선 (2주) → 점토 미장 가설 (1.5주) → 디밍 연출 (0.5주)',
    processSummary: '고객에게 전율성 깊은 첫 인상을 부여합니다. 공고한 기능 구조 위 브랜드 철학을 올바르게 도장합니다.'
  },
  {
    id: 'pack_cafe',
    name: 'Cafe Package (시그니처 카페 에스프레소 패키지)',
    categoryKey: 'cafe',
    startingPrice: '평당 1,950,000 KRW',
    duration: '6 - 7주 소요',
    includedScope: [
      '바리스타의 손가락 동선에 순응하는 통합 수전 배관 최적화',
      '눈부심 없는 수평 바 바잘트 석판 카운터 축조',
      '매장 자연 조경 오가닉 파티션 연출',
      '스팀 저항 표면 마감 수퍼 코팅'
    ],
    excludedScope: [
      '에스프레소 머신 및 제빙기 등 카페 기계 본체 세트 가격',
      '외부 야외 테라스 신규 정원 조경 수림 가격'
    ],
    timelineSummary: '급배수 정합 동선 빌드 (1.5주) → 목공 및 수평 바 카운터 철골 축조 (2주) → 자연 석회 플라스터 마감 (1.5주) → 수전 피팅 및 공조 정상 가동 검사 (1주)',
    processSummary: '바리스타와 내방객 간 교감이 소음 없이 잔잔해지도록 유기적인 기계 구조와 따스한 마공을 엮어냅니다.'
  },
  {
    id: 'pack_office',
    name: 'Office Package (인텔리전트 몰입 업무 오피스 패키지)',
    categoryKey: 'office',
    startingPrice: '평당 1,850,000 KRW',
    duration: '6 - 8주 소요',
    includedScope: [
      '모든 콘선트 배선과 전선을 카운트 아래 숨기는 아치 트레이 가로지르기',
      '가변 알루미늄 파티션 모듈 배치',
      '균일 휘도 유리에 기초한 저눈 피로 눈 조명 그리드 천장',
      '고성능 방염 카펫 이중 바닥 시스템'
    ],
    excludedScope: [
      '서버 장비 조립 및 사내 사설망 인트라넷 방화벽 가설 보증료',
      '기존 업무 컴퓨터 모니터 기기 세트 및 사무 집기류'
    ],
    timelineSummary: '모듈 수평 평면 설계 (1.5주) → 바닥 아치 전선 파이프 배선 (1.5주) → 알루미늄 가벽 및 카펫 세팅 (2.5주) → 천장 그리드 캘리브레이션 (1.5주)',
    processSummary: '조그마한 배선 노출로부터 비롯되는 지저분함을 원천 제거하여 오직 창의적 가치 성장에만 몰입하는 사무 Habitant를 제공합니다.'
  },
  {
    id: 'pack_custom',
    name: 'Custom Project (아방가르드 아키텍트 커스텀 패키지)',
    categoryKey: 'custom_project',
    startingPrice: '상담 후 견적 산출 (시방서 기준)',
    duration: '8주 이상 소요',
    includedScope: [
      '제한 없는 이질 자제(한지/천연석제/블랙 아연판)의 최고난도 융합',
      '수직과 수평의 엄숙한 극치 비대칭 마이너스 정돈선',
      '가구 및 위생 매립 장비 해외 전담 공장 긴급 큐리에이팅 공수 및 인스톨',
      '전속 무제한 설계 피드백 전용 단독 디렉터실 배치'
    ],
    excludedScope: [
      '해외 유명 조각가의 조소물 컬렉션 현장 낙성 세금 및 소유권 양도비'
    ],
    timelineSummary: '클라이언트 단독 설계 회의 (2.5주) → 정밀 해외 자재 소싱 (3주) → 1:1 디렉터 현장 직결 성형 밀착 건설 (배정 스케줄 조정)',
    processSummary: '공간의 한계마저 건축적 자유로 이깁니다. 전통적인 선의 흐름과 기하학 볼륨을 담아 대대에 남겨질 명작을 공정합니다.'
  }
];

export const DEFAULT_FAQ: FAQItem[] = [
  {
    id: 'faq_01',
    category: 'Estimate',
    question: '견적 산출 및 방문 상담은 어떤 방식으로 진행되나요?',
    answer: '강인스튜디오는 일차적으로 온라인 견적양식(Inquiry Portal) 접수를 통해 클라이언트님의 공간 유형, 소요 예산, 희망 시방 사양을 세밀히 검수합니다. 이를 토대로 전담 디자이너가 사전 배치안과 예비 자재를 철저히 검토한 후, 개별 연락을 드려 양림동에 위치한 저희 본사 사옥 갤러리 룸에서 1:1 정밀 도면 분석 미팅을 제공합니다. 이는 한 차원 높은 완결성을 위함이오니 예약 후 내방해 주십시오.'
  },
  {
    id: 'faq_02',
    category: 'Pricing',
    question: '평당 공사비가 타 업체와 다르게 어떻게 정찰제로 정산되나요?',
    answer: '정찰 가격 제도의 중심에는 투명한 원가 상세 산출 공식이 엄수되고 있습니다. 저희는 계약 성립 전 설계 도면 기준에 포함되는 수량 단위, 모자이크 단가 및 소모 본드, 인건비의 실단가와 감리 경비 명세를 가감 없이 엑셀 명세서로 드립니다. 저가 업체의 미끼 상품처럼 가계약 유도 후 진행 중에 과도한 핑계 금액 추가 요소를 청구하지 않아, 서류 상에 수치적인 절대 신뢰를 유지합니다.'
  },
  {
    id: 'faq_03',
    category: 'Timeline',
    question: '평균적인 전체 시공 기간은 얼마나 걸리나요?',
    answer: '주거 단독 및 50평형 프리미엄 아파트(Apartment Package) 기준으로 평균 10주에서 12주가 소요되며, 상업 매장 및 카페 인테리어는 6주에서 8주 내외를 정량 삼고 있습니다. 이는 하자 발생을 완전히 배제하기 위해 방수 및 슬러지 건조 탈수, 점토 플라스터 3회 레이어링의 자연 수축 건조 타임을 엄격히 달력 상에 보증하기 때문입니다. 단기간에 조립 가설하는 부실 마감을 철저히 경계합니다.'
  },
  {
    id: 'faq_04',
    category: 'Materials',
    question: '사용되는 자재를 클라이언트가 임의로 직접 변경하거나 해외 직접 공수도 가능합니까?',
    answer: '네, 가능합니다. 강인스튜디오는 자사가 축적한 친환경 오크 패널, 이탈리아 직수입 포셀린 스톤 스펙 북뿐만 아니라, 클라이언트께서 직접 큐레이션 하신 단독 펜던트 조명이나 유명 무쇠 수전 자재의 매립 공정이 원활히 작동하도록 도그 골조 스펙을 사전에 맞춰 설계 변경합니다. 다만, 내구성과 방수 하자 우려가 서린 기성의 불량 모사 자재는 협정이 제한될 수 있습니다.'
  },
  {
    id: 'faq_05',
    category: 'Design',
    question: '3D 제안 제도를 통해 실질적인 마감 확인이 사전에 이루어집니까?',
    answer: '네. 가상 도면 기획 및 디자인 스터디 단계에서, 마이크로시멘트 질감 입자와 빛 반사 오차 3% 이내의 레이 트레이싱 3D 포토그래픽 시뮬레이션을 드립니다. 가구가 배치되었을 때의 실제 통로 여백, 아일랜드 카운터의 기하 높낮이 비례를 눈으로 명확히 체감하신 상태에서 본격 건설에 진입하므로, 시공 중 마음에 안 들어 철거 개조하는 부작용이 일체 소거됩니다.'
  },
  {
    id: 'faq_06',
    category: 'Construction',
    question: '본사 소속 정규 면허 기술진이 직접 현장을 시공하나요?',
    answer: '강인은 전체 프로젝트를 외주 대마 하도급 계약으로 위탁 유기하는 타 중개업자들과 달리, 실내건축공업 면허 자격을 정규 취득한 자사 시공 관리 소장군을 팀단위로 고정 배치합니다. 현장에 상주하는 직영 전담 감독 하에 시방 설계 도면에 준거한 칼끝 줄눈 세로선, 메탈 보강재 프레임 삽입 상태가 미세 눈금자로 엄격하게 집행됩니다.'
  },
  {
    id: 'faq_07',
    category: 'Warranty_AS',
    question: '하자 보증 및 사후 복구 안심 제도는 타 업체 대비 보존 기간이 어떠합니까?',
    answer: '일반적인 하자 보수 보증 증권 상의 기간(1~2년)을 과감히 타파하여 자체 3개년 프리미엄 AS 보증 기간을 운영합니다. 기온차가 발생하는 격년 계절이 바뀔 때마다 당사 전속 웰니스 순회감리팀이 무료 방문하여, 원목 오크 표면 뒤틀림 가압 캘리브레이션, 타일 접합 마감재 코팅 보수, 간접 배전반 조도 미세 조율 등 오랫동안 품위가 풍화되지 않는 하우스 관리를 이행해 드립니다.'
  }
];

export const DEFAULT_REVIEWS: CustomerReview[] = [
  {
    id: 'rev_01',
    projectTitle: '정적의 궤적 (Static Orbit House)',
    clientName: '이** 님 (거주자)',
    rating: 5,
    highlight: '몰딩과 문턱을 완전히 걷어냈을 때 마주한 진정한 고요함',
    quote: '"장식과 몰딩이 가득했던 기존 집에서는 소음이 늘 마음에 얹혔는데, 강인을 만나 집이 하나의 침묵 미술관 같이 비워졌습니다. 매일 아침 자연 햇살이 마이크로시멘트 바닥에 흘려드는 그림자를 보며 진정한 정적과 영혼의 휴식을 충전합니다."',
    story: '체리색 구조의 전형적인 아파트였던 곳을 마이너스 몰딩과 벽면 전체의 밀크 화이트 히든 레이아웃으로 개축했습니다. 3D 시뮬레이션으로 가구 틈새 비례까지 미리 정합해 두어, 단 1mm의 마감선에도 눈에 걸리는 파열음 없이 물 흐르듯 가치 있는 주거 형태를 소유하게 되셨습니다.',
    date: '2025.04.12',
    category: '주거공간'
  },
  {
    id: 'rev_02',
    projectTitle: '대화의 깊이 (Volume of Silence Cafe)',
    clientName: '김** 대표 (바리스타)',
    rating: 5,
    highlight: '에스프레소 연기마저 미학적으로 수렴하는 수평의 긴 돌 테이블',
    quote: '"인테리어를 해 준다며 화려한 알록달록 자재만 전시하는 타 업체들과 달리, 강인은 에스프레소 추출 음영에 맞춰 6미터 현무암 스택을 고스란히 깎아 올렸습니다. 바에 머무는 손님들이 다 하나같이 공간의 묵직한 힘에 감탄합니다."',
    story: '광주 동명동 카페 골목에서 극치 깊은 비하인드 뷰를 이글어냈습니다. 검은 화강과 거친 티크 우드 질감을 비대칭 매치하고 바쁜 영업 시간 중 구성원이 전혀 부딪히지 않는 급배수 중앙 수렴 공도선을 배치하여, 오픈 이래 사색적 미학으로 일관된 매장 대기 행렬을 수호하는 데 기여했습니다.',
    date: '2025.05.02',
    category: '카페/디저트숍'
  },
  {
    id: 'rev_03',
    projectTitle: '깊은 정화 (Zen Bathroom Sanctuary)',
    clientName: '최** 님 (펜트하우스 소유주)',
    rating: 5,
    highlight: '96시간 동안 지켜본 방수 테스트가 준 완벽한 기술적 신뢰',
    quote: '"타일 미장 속 조적 욕탕에 물이 새서 아랫집에 피해를 줄까 봐 밤잠 설쳤는데, 강인 소장들이 96시간 동안 수위를 한 장 한 장 가로지르며 정밀 담수 현판 테스트를 이행하는 보고를 받고 소름이 돋았습니다. 웰니스 욕실은 역시 기술이 먼저입니다."',
    story: '네로 마르키나 무광 스톤 마감이 들어간 욕탕 축조 사업에서 방수의 절대 완벽을 증명했습니다. 보온에 탁월하도록 침실 바지 열선을 매립 차단해 사계절 내내 스파 온풍실 같은 건조 수밀함을 선사하는 고결 웰니스 명작을 빚었습니다.',
    date: '2025.03.18',
    category: '욕실 디자인'
  }
];

export const DEFAULT_BLOG: BlogPost[] = [
  {
    id: 'blog_01',
    category: 'Material Guide',
    title: '마이크로시멘트 바닥 시공 시 주의해야 할 하자 유발 요인 요약',
    summary: '이음새 없는 모던 평면을 완성하지만, 바탕면 수평과 균열 방지 섬유층 고정이 안 되면 즉각 들뜸이 생깁니다. 강인 기술 감리가 현장에서 준수하는 3단계 건조 공식.',
    content: `## 무슬릿 평면의 미학, 마이크로시멘트의 기술적 본질

최근 미니멀 인테리어의 대명사인 마이크로시멘트(Microcement)는 타일과 마루의 선적인 경계를 모두 걷어내고 하나의 웅장한 돌덩어리 형태로 바닥 전체를 일체화하는 데 쓰입니다. 그러나 이음새가 없다는 미적인 이면 뒤에는, 완벽히 고착화된 건조 공식과 바탕층에 흐르는 수분 습도의 기술적 상관관계를 이해해야 하는 '엄격한 시방 규격'이 도사리고 있습니다.

많은 저가 턴키 업체들이 일반 시멘트 미장하듯 젖은 몰탈 위에 가설 도포를 진행하여, 수 개월 이내에 균열과 갈라짐, 습기로 인한 하얀 백화 들뜸 현상으로 인한 공간 낭비를 촉발합니다.

### 1. 하자의 주원인: 수막과 잔류 함수율
수밀 구조를 위한 기초 콘크리트 슬래브는 타설 후 함수율이 4.5% 이하로 완전히 건조되어야 마이크로시멘트 페이스트와 빈틈없는 결합을 이룹니다. 만일 내벽 잔류 습기가 상승하게 되면 도막층과 바닥 사이에 수증기압이 걸려 기포가 발생하고 종국엔 껍질이 일어나듯 깨지기 일쑤입니다. 강인스튜디오는 시공 전 디지털 함수율 측정기를 투입해 수치 3.8%를 목격할 때까지 열풍 강제 건조 및 배수를 멈추지 않습니다.

### 2. 고탄성 유리망(Glass Fiber Mesh) 보강 필수
주거 및 아파트 빌딩은 온도에 따라 바닥 배전 열선이 팽창과 수축을 미세하게 반복합니다. 이러한 진동 응력을 이겨내기 위해선 각 미장 레이어 사이에 고탄성 섬유 격자망을 단단히 삽입 매립해야 슬래브 틈새 팽창이 표면 기포로 이어지지 않습니다.

### 3. 마감 실러의 자외선 및 표면 침투성 코팅 3차 마공
침투 깊이가 뛰어난 수입산 고분자 무광 우레탄 실러를 깊숙이 머금어, 에스프레소나 붉은 김치 국물이 닿아도 오염 얼룩이 남지 않게 다중 코팅 실크 가드를 치는 것이 강인의 기본 조례 수칙입니다.`,
    image: '/src/assets/images/gangin_hero_1779412179856.png',
    date: '2025.02.15',
    readTime: '6 min read'
  },
  {
    id: 'blog_02',
    category: 'Design Guide',
    title: '장식이 배제된 히든 몰딩과 무문선 도어가 유지하는 시선 확장 기술',
    summary: '문틀과 몰딩이 튀어나와 있으면 시선은 끊어지고 매끈한 선의 긴장을 잃습니다. 칼선 같은 공간 선정을 위해 히든 정합 가공이 필요한 기하학적 비결.',
    content: `## 시선이 막힘없이 활보하는 무간섭 공간

미니멀리즘과 LEIBAL의 미학적 핵심은 "시선의 부드러운 연속성"입니다. 우리가 문을 열거나 통로를 걸을 때, 시야에 걸리는 튀어나온 체리가구 몰딩, 가설 문선 마감재가 시선을 분절하여 좁은 공간 피로감을 부풀리게 됩니다.

그 경계를 칼로 날카롭게 날려버리듯 제거하는 공법이 바로 '무문선 무몰딩 히든도어' 마이너스 공법입니다.

### 1. 마이너스 몰딩의 기초: 메탈 프레임 역 체결
석고보드 가벽을 세우기 전, 메탈 프레임의 마이너 몰딩 가도를 벽체 상부 천장 속에 완전히 인서트 정렬해 둡니다. 가벽이 그 금속 테두리에 자석처럼 밀착 체결되어, 도장 마감 후에는 마치 천장과 벽면 사이에 칼선 틈새만 잔잔히 살아남아 벽이 가볍게 우주로 부양하는 조형감을 선사하게 됩니다.

### 2. 플러시 피팅 히든 힌지와 무헤드 정렬
문짝이 벽면과 피치 1mm 오차도 없이 일직선으로 정렬하기 위해 일반 대마 덧경첩 대신, 문틀 내부로 머리를 은밀히 은폐시키는 유럽형 히든 경첩을 결합 가공합니다. 문을 닫아놓으면 오직 하나의 숨 쉬듯 수평 선만 보여, 문이 보이지 않는 벽으로 전환되는 고급 유기감을 만끽하실 수 있습니다.`,
    image: '/src/assets/images/gangin_lounge_1779412227496.png',
    date: '2025.04.10',
    readTime: '4 min read'
  },
  {
    id: 'blog_03',
    category: 'Estimate Guide',
    title: '인테리어 계약 시 부실 견적서와 세부 자재 명세서를 판별하는 방법',
    summary: '식당 정찰 가격표처럼 정리가 안 된 1식 견적은 추가 분쟁의 뇌관입니다. 시방 표준 규격과 단가가 기재된 고해상 원가 명세를 직접 검증하십시오.',
    content: `## '1식'이라는 애매한 표현에 숨은 리스크를 경계하십시오

인테리어 사기를 예방하고 완공 전 분쟁을 차단하기위한 출발선은 바로 "견적서 검증"입니다. 대다수 기술력이 검증되지 않은 턴키 인테리어 업체들은 세부 수치 없이 [거실 미장 공사 - 1식 - 4,500,000 KRW] 처럼 포괄적으로 뭉뚱그려 소위 퉁치기 단가 서류를 발송합니다.

이는 공사가 진행되는 중간 시점, '상세 자재 등급이 빠졌으니 평당 50만원을 더 주지 않으면 장비를 멈추겠다'는 악성 유도의 빌미를 마련합니다.

### 1. 제조업 정규 부품 명찰 같은 분절 수량 필수
강인스튜디오는 어떤 자재가 소요되든 해당 규격(폭x길이x두께), 단위(㎡, m, box), 수량과 유통 도소매 수입 원가를 원단위까지 분리해 줍니다. 시방 마감 수준이 수치적으로 완전히 합의된 상태에서 상생 계약을 정량 하기에 애초에 분쟁이 발현할 씨앗이 제거됩니다.

### 2. 감리 경비 인건비 정률 지적제 도입
본 직영 소장의 상주 관리 일수와 노임 단가를 정부 고시 건설 기준 노임 표준치를 준용해 합치시킵니다. 인허가 중개 감리 수수료를 과도하게 부풀리는 이면 계약 일체를 배제하여 1204 정품 비즈니스 클린 파트너십을 보장해 드립니다.`,
    image: '/src/assets/images/gangin_commercial_1779412195768.png',
    date: '2025.05.01',
    readTime: '5 min read'
  }
];

// Safe parser to prevent crashes under bad JSON syntax or storage corruption
function safeParseJSON<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    if (!data) return fallback;
    const parsed = JSON.parse(data);
    if (parsed === null || parsed === undefined) return fallback;
    return parsed as T;
  } catch (err) {
    console.error(`Error parsing localStorage key "${key}":`, err);
    // Silent fail recovery: Create fallback backup in case user wants to parse manually later
    try {
      const corrupted = localStorage.getItem(key);
      if (corrupted) {
        localStorage.setItem(`${key}_corrupted_backup_${Date.now()}`, corrupted);
      }
    } catch (_) {}
    return fallback;
  }
}

export function getInitialState() {
  const parsedProjects = safeParseJSON<Project[]>('gangin_projects', PORTFOLIO_PROJECTS);
  const parsedPackages = safeParseJSON<ServicePackage[]>('gangin_packages', DEFAULT_PACKAGES);
  const parsedFaq = safeParseJSON<FAQItem[]>('gangin_faq', DEFAULT_FAQ);
  const parsedReviews = safeParseJSON<CustomerReview[]>('gangin_reviews', DEFAULT_REVIEWS);
  const parsedBlog = safeParseJSON<BlogPost[]>('gangin_blog', DEFAULT_BLOG);
  const parsedSettings = safeParseJSON<SiteSettings>('gangin_settings', null as any);

  // Validate, normalize, and de-duplicate projects to ensure 100% stable rendering
  const seenIds = new Set<string>();
  const sanitizedProjects = (Array.isArray(parsedProjects) ? parsedProjects : PORTFOLIO_PROJECTS)
    .map((p, idx): Project => {
      // Robust project default structure validation (Check and correct 3 & 4)
      const rawId = p && typeof p === 'object' && p.id ? String(p.id) : `space_auto_${idx}_${Date.now()}`;
      let normalizedId = rawId;
      
      // Auto-remedy duplicate React keys (Audit 1)
      if (seenIds.has(normalizedId)) {
        normalizedId = `${normalizedId}_dup_${idx}_${Math.floor(Math.random() * 1000)}`;
      }
      seenIds.add(normalizedId);

      return {
        id: normalizedId,
        title: p && typeof p === 'object' && p.title ? String(p.title) : 'GANGIN Space',
        titleEn: p && typeof p === 'object' && p.titleEn ? String(p.titleEn) : '',
        location: p && typeof p === 'object' && p.location ? String(p.location) : '광주 (Gwangju)',
        locationDetails: p && typeof p === 'object' && p.locationDetails ? String(p.locationDetails) : '',
        category: p && typeof p === 'object' && p.category ? p.category : 'Residential',
        year: p && typeof p === 'object' && p.year ? String(p.year) : '2026',
        area: p && typeof p === 'object' && p.area ? String(p.area) : '135㎡ / 41평',
        client: p && typeof p === 'object' && p.client ? String(p.client) : 'Private Client',
        image: p && typeof p === 'object' && p.image ? String(p.image) : '/src/assets/images/gangin_hero_1779412179856.png',
        concept: p && typeof p === 'object' && p.concept ? String(p.concept) : '',
        materials: p && typeof p === 'object' && Array.isArray(p.materials) ? p.materials : ['천연 보수 스펙', '매트 텍스처 패널'],
        timeline: p && typeof p === 'object' && p.timeline ? String(p.timeline) : '8주 (2026.05 - 2026.07)',
        constructionProcess: p && typeof p === 'object' && Array.isArray(p.constructionProcess) 
          ? p.constructionProcess 
          : [{ title: '수치 설계 및 도안 조율', description: '골조 수평 밸런스 점검 및 설계 레이아웃 조감 구축' }],
        beforeAfter: p && typeof p === 'object' && p.beforeAfter 
          ? p.beforeAfter 
          : {
              beforeDescription: '공사와 철거가 필요한 협착된 골조 구조 상황',
              afterDescription: '라인이 완벽히 마이너스 실선으로 수평 통합된 품위 깊은 예술관',
              desc: '장식과 불필요 요소를 전부 감하여 사색적인 음영 효과를 연출했습니다.',
              imageAfter: ''
            },
        gallery: p && typeof p === 'object' && Array.isArray(p.gallery) ? p.gallery : [],
        featured: p && typeof p === 'object' ? !!p.featured : false
      };
    });

  const initialSettings: SiteSettings = {
    brandName: 'GANG IN STUDIO',
    subTitle: 'ARCHITECTURE & SPACE',
    primaryColor: '#111111',
    accentColor: '#6B6B6B',
    bgColor: '#FFFFFF', // Updated to Pure White to honor "전체 배경색은 화이트톤으로"
    textColor: '#111111',
    mutedColor: '#6B6B6B',
    seoTitle: '강인스튜디오 | 광주 대표 하이엔드 인테리어 및 시공 정찰제 디렉팅',
    seoDescription: '광주 욕실, 상가, 오피스, 아파트 하이엔드 단독 설계 시공 전문 강인스튜디오. 1204DESIGN 공식 비즈니스 시스템을 이식하여 투명 원가를 보증하는 미니멀리즘 건축사옥입니다.',
    seoKeywords: '광주 인테리어, 광주 욕실 인테리어, 광주 상가 인테리어, 광주 카페 인테리어, 광주 오피스 인테리어, 광주 리모델링, 강인스튜디오',
    address: '광주광역시 남구 양림동 201-12 역사문화거리 강인 사옥 2층 빌딩',
    phone: '062-515-1204',
    email: 'contact@ganginstudio.com',
    instagram: 'https://instagram.com/ganginstudio',
    kakaotalk: 'https://pf.kakao.com/_xganginstudio',
    blog: 'https://blog.naver.com/ganginstudio',
    visualHeroImage: '/src/assets/images/gangin_hero_1779412179856.png'
  };

  const finalSettings: SiteSettings = parsedSettings && typeof parsedSettings === 'object' ? {
    ...initialSettings,
    ...parsedSettings,
    brandName: parsedSettings.brandName || initialSettings.brandName,
    seoTitle: parsedSettings.seoTitle || initialSettings.seoTitle,
    visualHeroImage: parsedSettings.visualHeroImage || initialSettings.visualHeroImage
  } : initialSettings;

  return {
    projects: sanitizedProjects,
    packages: Array.isArray(parsedPackages) ? (() => {
      let list = [...parsedPackages];
      const hasBasic = list.some(p => p.id === 'pack_basic');
      if (!hasBasic) {
        const defaultsToAdd = DEFAULT_PACKAGES.filter(p => ['pack_basic', 'pack_standard', 'pack_premium'].includes(p.id));
        list = [...defaultsToAdd, ...list];
      }
      return list;
    })() : DEFAULT_PACKAGES,
    faq: Array.isArray(parsedFaq) ? parsedFaq : DEFAULT_FAQ,
    reviews: Array.isArray(parsedReviews) ? parsedReviews : DEFAULT_REVIEWS,
    blog: Array.isArray(parsedBlog) ? parsedBlog : DEFAULT_BLOG,
    settings: finalSettings
  };
}

export function saveState(state: {
  projects: Project[];
  packages: ServicePackage[];
  faq: FAQItem[];
  reviews: CustomerReview[];
  blog: BlogPost[];
  settings: SiteSettings;
}) {
  try {
    localStorage.setItem('gangin_projects', JSON.stringify(state.projects));
    localStorage.setItem('gangin_packages', JSON.stringify(state.packages));
    localStorage.setItem('gangin_faq', JSON.stringify(state.faq));
    localStorage.setItem('gangin_reviews', JSON.stringify(state.reviews));
    localStorage.setItem('gangin_blog', JSON.stringify(state.blog));
    localStorage.setItem('gangin_settings', JSON.stringify(state.settings));
  } catch (err) {
    console.error("Failed to commit application state to localStorage:", err);
  }
}
