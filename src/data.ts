import { Project, PricingPackage } from './types';

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'space_01',
    title: '정적의 궤적 (Static Orbit)',
    titleEn: 'Static Orbit House',
    location: '광주 남구 봉선동 (Bongseon-dong)',
    locationDetails: 'Bongseon-dong Private Residence 1F-2F',
    category: 'Residential',
    year: '2025',
    area: '165㎡ / 50평',
    client: 'Private Owner',
    image: '/src/assets/images/gangin_hero_1779412179856.png',
    featured: true,
    concept: '정적과 침묵을 담아내는 주거 공간입니다. 무채색의 질감이 주는 미묘한 온도 차이와 자연광이 만드는 시간별 음영을 극대화하기 위해 천연 오크 패널과 천연 러석 마감재를 매치했습니다. 모든 이음새와 선을 마이너스 줄눈으로 마감하여 장식적인 요소를 최소화하고, 거주자의 정서적인 휴식에 집중한 공간 정체성을 선사합니다.',
    materials: ['오크 무늬목 패널', '이탈리아 트래버틴 스톤', '마이크로시멘트 바닥', '마이너스 몰딩 디테일'],
    timeline: '12주 (2025.01 - 2025.04)',
    constructionProcess: [
      { title: '수치 설계 및 축조', description: '골조의 수평수직 배분을 확인하고 마이너스 몰딩을 위한 메탈 프레임 인서트 정밀 설치' },
      { title: '목가구 및 레이아웃', description: '천장부터 바닥까지 이어지는 플러시 목제 도어와 은폐형 오크 리베이트 가구 피팅 수작업 설치' },
      { title: '표면 질감 가공', description: '마이크로시멘트 다중 평탄 코팅 및 스톤 실링 가공을 통한 매트 광택 및 고밀도 보존층 구축' }
    ],
    beforeAfter: {
      beforeDescription: '체리가구와 노란 LED 우물천장, 불필요한 격자 창틀로 가로막혀 일조권이 저하되고 공간이 좁아 보이던 기존의 50평 아파트 공간',
      afterDescription: '벽면 전체를 히든도어로 정렬하고, 마이너스 몰딩과 미터 단위 빌트인 가구를 배치하여 하나의 매트한 석조 예술관 같은 흐름 완성',
      desc: '선과 선이 만나는 접합부를 히든 가공하여 시각적 간섭을 없앴으며, 남향에서 스며드는 잔잔한 햇빛을 머금는 중성적인 은신처를 구현했습니다.',
      imageAfter: '/src/assets/images/gangin_hero_1779412179856.png'
    },
    gallery: [
      { url: '/src/assets/images/gangin_hero_1779412179856.png', caption: '바닥과 벽체가 동일한 중성 톤으로 이어져 거주자의 시선을 확장시키는 거실 코너.', aspect: 'landscape' },
      { url: '/src/assets/images/gangin_lounge_1779412227496.png', caption: '자연 채광을 모으는 서재 공간과 어두운 스톤 텍스처 데스크의 아날로그적인 무드.', aspect: 'portrait' }
    ]
  },
  {
    id: 'space_02',
    title: '대화의 깊이 (Volume of Silence)',
    titleEn: 'Minimalist Coffee Bar',
    location: '광주 동구 동명동 (Dongmyeong-dong)',
    locationDetails: 'Dongmyeong Cafe block A',
    category: 'Cafe',
    year: '2025',
    area: '82㎡ / 25평',
    client: 'Static Coffee Club',
    image: '/src/assets/images/gangin_cafe_1779412248644.png',
    featured: true,
    concept: '화려한 장식을 배제하고 에스프레소의 흐름과 아로마에만 어울릴 수 있도록 어두운 화강석 테라스와 로우 러프 우드 그리드를 결합했습니다. 긴 수평 바 카운터는 묵직하면서도 정갈한 느낌을 주어, 바리스타와 고객이 가감 없이 차분히 소통할 수 있는 프리미엄 공간 구조를 완성했습니다. 광주 카페 인테리어의 새로운 미학적 거점이 될 수 있게 기획되었습니다.',
    materials: ['검정 화강 바잘트 현무암', '러프 내추럴 티크 우드', '머드 플라스터 월', '모노톤 스텐 발색강'],
    timeline: '6주 (2025.04 - 2025.05)',
    constructionProcess: [
      { title: '바 카운터 금속 보강', description: '6미터에 달하는 석재 매스 하중 분산을 위해 고하중 각파이프 구조용 백 골조 프레임 보강 공사 진행' },
      { title: '점토 플라스터 레이어링', description: '습도 변화에 강하고 입자감이 고급스러운 매트 점토 미장을 숙련공들이 3회 걸친 수작업 레이어 적용' },
      { title: '오라 조명 및 노즐 커버', description: '간접 광원의 방향성을 조절해 광원이 직접 노출되는 지점을 제로화하고, 전선과 파이프라인의 이중 은폐 처리' }
    ],
    beforeAfter: {
      beforeDescription: '과거 낡은 잡화점 구조로 조도가 어둡고 내부 환기가 취약했으며, 공간이 세 조각으로 나뉘어 기둥 간섭이 극심했던 상가',
      afterDescription: '현관부터 바 끝까지 수평 구도를 지향하는 시각적 앙상블 시스템으로 단일한 선형 흐름과 묵직한 돌의 질감을 극대화',
      desc: '입구에 자연식 정원 디테일을 더해 내부로 유도되는 시선이 서서히 톤다운되도록 조율한 시퀀스 디자인입니다.',
      imageAfter: '/src/assets/images/gangin_cafe_1779412248644.png'
    },
    gallery: [
      { url: '/src/assets/images/gangin_cafe_1779412248644.png', caption: '빛이 흘러드는 모서리와 바잘트 카운터 위의 조각적 하모니.', aspect: 'landscape' }
    ]
  },
  {
    id: 'space_03',
    title: '단결과 분절 (Mono Lithic)',
    titleEn: 'Monolith Showroom',
    location: '광주 서구 상무지구 (Sangmu-dist)',
    locationDetails: 'Sangmu Boulevard Gallery Site',
    category: 'Commercial',
    year: '2024',
    area: '210㎡ / 63평',
    client: 'Atelier de L\'art',
    image: '/src/assets/images/gangin_commercial_1779412195768.png',
    featured: true,
    concept: '미니멀 아트 갤러리와 하이엔드 수입 브랜드를 위한 복합 상업공간 제안입니다. 바닥과 벽체의 경계를 없앤 마이크로시멘트 기법과 비대칭 브러시드 하이 콘트라스트 스틸 아일랜드 쇼케이스를 통해, 공간 자체가 하나의 조형물로 인식되게 했습니다. 상업공간 인테리어에서 기능적 구조가 가지는 순수한 볼륨을 탐구하는 작업이었습니다.',
    materials: ['특수 브러시드 아노다이징 스틸', '조인트레스 마이크로 플라스터', '노출 콘크리트', '무슬릿 슬림 알루미늄'],
    timeline: '8주 (2024.10 - 2024.12)',
    constructionProcess: [
      { title: '면 갈이 및 고수압 콘크리트 피니시', description: '기존 바닥의 페인트를 완전히 갈아낸 후 초정밀 입자의 마이크로 미장 페이스트로 단차 없는 매끈한 스크리드 구현' },
      { title: '알루미늄 프로파일 시스템', description: '벽체 접합부마다 노출되는 프로파일 마감을 제로-갭 조인트로 설계하여 기성 마감재의 간섭 차단' }
    ],
    beforeAfter: {
      beforeDescription: '여러 조각으로 분리된 가벽과 낮은 플라스틱 텍스 층 때문에 어수선함이 극도에 달했던 오래된 매장',
      afterDescription: '노출 보와 일직선 벽체, 수평 철제 오브제를 기하학적으로 치환하여 제품이 지닌 조각적 미학을 돋보이게 재탄생',
      desc: '제품을 장식하는 장식을 제거하고, 조명과 공간감만으로 제품에 가치를 얹어주는 미적인 환원을 시도했습니다.',
      imageAfter: '/src/assets/images/gangin_commercial_1779412195768.png'
    },
    gallery: [
      { url: '/src/assets/images/gangin_commercial_1779412195768.png', caption: '금속 카운터의 기하학적 정렬 상태와 아침 자연 배광.', aspect: 'landscape' }
    ]
  },
  {
    id: 'space_04',
    title: '깊은 정화 (Deep Purification Bathroom)',
    titleEn: 'Zen Bathroom Sanctuary',
    location: '광주 광산구 수완지구 (Suwan-dong)',
    locationDetails: 'Suwan-dong luxury Penthouse 3F',
    category: 'Bathroom',
    year: '2025',
    area: '23㎡ / 7평',
    client: 'Private Residence',
    image: '/src/assets/images/gangin_bathroom_1779412211338.png',
    featured: true,
    concept: '물과 빛, 그리고 돌이 지니는 자연의 원초성을 침실 욕조 공간에 고스란히 담아냈습니다. 배수가 이루어지는 슬릿 라인까지 석제 상판 안에 완벽히 빌트인하여 하나의 거대한 돌덩어리에서 물이 솟아오르는 정취적인 경험을 선사합니다. 광주 욕실 인테리어 및 하이엔드 위생실 설계의 패러다임을 넓히는 예술적 수련처입니다.',
    materials: ['천연 네로 마르키나 석재', '고밀도 다크 콘크리트 무광 미장', '포조 건메탈 미니멀 수전', '커스텀 슬릿 배수트렌치'],
    timeline: '4주 (2025.02 - 2025.03)',
    constructionProcess: [
      { title: '방수 보증 및 액침 제어', description: '아스팔트 시트 및 특수 탄성 도막 4중 특허 방수 후 96시간 워터 리크 누수 담수 테스트 완벽 수용' },
      { title: '석재 엠버 가공 및 조인팅', description: '네추럴 스톤 마이터 베벨 조인팅 가공을 통하여 모서리 선의 연속성을 끊어짐 없이 접합' }
    ],
    beforeAfter: {
      beforeDescription: '유광 타일과 불필요한 은색 유리 수납장, 욕실 전체를 부식되게 만들던 좁고 습한 기성 아파트 욕실 분위기',
      afterDescription: '도어가 불필요한 오픈 세면대 영역과 조적 욕조, 매립식 슬릿 수전으로 심미적인 마사지 룸 리조트 무드 100% 흡수',
      desc: '수분을 머금으면 더욱 고요해지는 짙은 차콜 석재 마감과, 눈의 피로를 완전히 없애주는 따스한 매립 코브 간접광의 조합입니다.',
      imageAfter: '/src/assets/images/gangin_bathroom_1779412211338.png'
    },
    gallery: [
      { url: '/src/assets/images/gangin_bathroom_1779412211338.png', caption: '천연 스톤 텍스처와 물과 조명이 일렁이는 오묘한 대비의 순간.', aspect: 'square' }
    ]
  },
  {
    id: 'space_05',
    title: '순수의 파동 (Turquoise Pavilion)',
    titleEn: 'Minimalist Kids Pool & Play',
    location: '광주 남구 양림동 (Yangnim-dong)',
    locationDetails: 'Yangnim Premium Kids Club',
    category: 'Kids Pool',
    year: '2024',
    area: '100㎡ / 30평',
    client: 'Ondo Pool Group',
    image: '/src/assets/images/gangin_kidspool_1779412268156.png',
    featured: true,
    concept: '아이들의 전인적인 오감 발달을 돕는 물의 유원지입니다. 기존의 유치하고 자극적인 비비드 색상 대신, 천연 베이지 샌드 미장과 정갈한 터콰이즈 스파 원형 대칭 구조를 적용해 어른과 아이 모두 명상하듯 즐길 수 있는 가족 휴식 성소입니다. 친환경 천연 수지 성분의 무독성 미세 크리트 공법만을 고집했습니다.',
    materials: ['무독성 마이크로 오버레이트 샌드', '천연 터키석 모자이크 타일', '베이지 미세 리세스드 도막', '구조용 프리스탠딩 라운드 기둥'],
    timeline: '7주 (2024.08 - 2024.10)',
    constructionProcess: [
      { title: '친환경 순환 오버플로우 설비', description: '소음 없는 수중 스파 정화 수용 장치의 배관 설계 기술을 통하여 지속적인 오염 차단 및 위생 수질 연수화' },
      { title: '곡선 면 샌딩 작업', description: '기둥과 수중 계단 모든 라운드 코너를 둥글게 표면 샌딩해 안전사고 우려 원천 삭제 및 부드러운 빛 반사 전파' }
    ],
    beforeAfter: {
      beforeDescription: '누수가 심했던 지하 사우나 상가를 완전히 단일 철거한 상태로 벽 기둥 습식 구조 전체에 백화 현상이 서린 공실',
      afterDescription: '정수 및 물 순환을 위한 이중 바닥 시스템을 완비하고 지중해 리조트 같은 따스한 베이지 크리트의 환상적인 하모니 정착',
      desc: '아이들의 건강을 보장하기 위해 100% 무독성 자재만을 선별하고, 실내에서도 은은한 야외 채광을 받듯 스카이라이트 라이팅 필터를 기획했습니다.',
      imageAfter: '/src/assets/images/gangin_kidspool_1779412268156.png'
    },
    gallery: [
      { url: '/src/assets/images/gangin_kidspool_1779412268156.png', caption: '베이지 석회 기둥 사이 가볍게 일렁이는 연청록빛 풀 물안개.', aspect: 'landscape' }
    ]
  },
  {
    id: 'space_06',
    title: '지성의 흐름 (Intelligent Flow Office)',
    titleEn: 'Aluminium Grid Headquarter',
    location: '광주 광산구 하남동 (Hanam-dong)',
    locationDetails: 'Creative Lab Office Suite 402',
    category: 'Office',
    year: '2025',
    area: '198㎡ / 60평',
    client: 'Design House Partner',
    image: '/src/assets/images/gangin_office_1779412287051.png',
    featured: true,
    concept: '미색과 아노다이징 알루미늄이 제공하는 차갑지만 품격 있는 오피스 플랜입니다. 연속되는 시선과 전선들을 테이블 하부 중심 레일로 은밀하게 배치하고 파티션 높낮이를 고요한 수평선으로 통일하여, 구성원들이 시선의 번거로움 없이 작업과 사색에 동시 몰입 가능하도록 레이아웃했습니다.',
    materials: ['아노다이징 알루미늄 파티션 및 데스크', '밀크 그레이 고탄성 카펫', '마이크로 샌드 콘크리트 코팅 벽', '그리드 모듈 조명 천장'],
    timeline: '6주 (2025.02 - 2025.03)',
    constructionProcess: [
      { title: '그리드 시스템 가설 공사', description: '천장의 모듈 조면 배선을 수치 제어로 각 그리드 프로파일 사이에 한치의 유격 없이 매입 가설 완성' },
      { title: '트레이 빌트인 파이프 레이', description: '책상 하부 프레임 구조와 알루미늄 바닥 몰딩을 커스텀 제작해 모든 전원 통신선을 중앙 제어실로 깔끔 수렴' }
    ],
    beforeAfter: {
      beforeDescription: '벽면을 가로지르던 배전반 누수와 지저분한 멀티탭 선, 격벽으로 소통이 완벽히 가로막혀 우울했던 기존 사무 공간',
      afterDescription: '개방성 높은 알루미늄 그리드 모듈 구조로 구성원의 프라이버시를 안전하게 확보하면서도 수평 정돈된 개방감을 부여',
      desc: '업무 집중도가 30% 이상 향상될 수 있도록 빛의 도절 반사를 막아주는 저반사 무광 마티에르 마감 처리를 주도했습니다.',
      imageAfter: '/src/assets/images/gangin_office_1779412287051.png'
    },
    gallery: [
      { url: '/src/assets/images/gangin_office_1779412287051.png', caption: '금속의 이성적인 빛바램과 편안함을 선사하는 밀크 그레이 배경의 조화.', aspect: 'landscape' }
    ]
  },
  {
    id: 'space_07',
    title: '구조의 침묵 (Structural Silence)',
    titleEn: 'Raw Concrete Gallery Facade',
    location: '광주 남구 양림동 역사거리 (Yangnim Heritage Dist)',
    locationDetails: 'Yangnim-dong Gallery & Lounge',
    category: 'Architecture',
    year: '2024',
    area: '345㎡ / 104평',
    client: 'GANG IN STUDIO HQ',
    image: '/src/assets/images/gangin_facade_1779412302894.png',
    featured: true,
    concept: '시간의 흐름이 남기는 나이테와 풍화의 흔적을 담은 노출 콘크리트 사옥 디자인입니다. 계절의 변화와 낮밤의 흐름에 따라 그림자가 만들어내는 자취가 벽면 위에 하나의 미니멀한 회화로서 춤추게 설계했습니다. 인위적인 페인트나 치장은 차단하고 구조가 가진 힘만으로 도시 경관을 잔잔하게 장식합니다.',
    materials: ['정밀 포폼 유로폼 노출 콘크리트', '고탄소 블랙 산화 아연 발색판', '로이 복층 슬림 더블 프레임 글라스', '외단열 사춤 메탈 코어'],
    timeline: '24주 (2024.03 - 2024.09)',
    constructionProcess: [
      { title: '콘크리트 조형 배합 타설', description: '기포 발생 방지 및 고품질 노출 외형을 얻기 위해 레미콘 함수율과 슬럼프 테스트 철저 검증 및 타설 시 정밀 다짐 기술 투입' },
      { title: '발색 메탈 루버 고정 공작', description: '금속 접합면의 코킹 코발트 볼트 체결 지점을 숨겨 우수가 흘러내려 발생하는 불필요한 녹 흔적 원천 예방' }
    ],
    beforeAfter: {
      beforeDescription: '구조 보강이 전혀 되어 있지 않고 옹기종기 낡은 판넬 가옥이 밀집했던 구옥 부지',
      afterDescription: '거리의 시선을 흡수하면서 비례미가 돋보이는 모던 노출 벽과 슬림 가구 철골이 부양하는 고품격 랜드마크 구현',
      desc: '시간이 흘러 비를 맞고 외부에 노출될수록 깊이를 발하는 수수하고도 단단한 구조의 존엄을 실체화했습니다.',
      imageAfter: '/src/assets/images/gangin_facade_1779412302894.png'
    },
    gallery: [
      { url: '/src/assets/images/gangin_facade_1779412302894.png', caption: '외관의 매스 비례와 따스한 낙조가 드리워지는 벽체의 단세포적 무드.', aspect: 'landscape' }
    ]
  },
  {
    id: 'space_08',
    title: '사색의 공간 (Sanctuary of Recess)',
    titleEn: 'Warm Minimalist Guestroom',
    location: '광주 북구 용봉동 (Yongbong-dong)',
    locationDetails: 'Yongbong Guesthouse Lounge Suite',
    category: 'Custom Project',
    year: '2025',
    area: '115㎡ / 35평',
    client: 'Heritage House',
    image: '/src/assets/images/gangin_lounge_1779412227496.png',
    featured: false,
    concept: '미색의 고요함을 추구하는 주거 라운지 프로젝트입니다. 수평적으로 길게 배치된 창틀은 대나무 정원의 움직임을 액자 속 동양화처럼 수용합니다. 전통적인 종이 한지의 차분한 빚 전도율과 매트한 노출 골조의 무거운 대비가 공간 전체를 명상적인 분위기로 일관되게 감싸 줍니다.',
    materials: ['전통 수제 한지 윈도우 스크린', '초미세 샌드스톤 테라코타 슬레이트', '스모크드 다크 오크 솔리드 가구'],
    timeline: '8주 (2025.01 - 2025.03)',
    constructionProcess: [
      { title: '창호 슬림 가변 프레임', description: '창짝이 완전히 벽 속으로 매립되어 유리가 지닌 무게만 잔류하도록 구조적 슬라이딩 은폐 포켓 도어 시공' },
      { title: '한지 도포 공법 연구', description: '천연 아교 풀과 한지 레이어를 장력을 조절하며 고정해 온도 변화에도 처짐이나 찢어짐 없는 고아한 무드 수호' }
    ],
    beforeAfter: {
      beforeDescription: '수많은 가벽 배관으로 시야가 단절되고 보일러 실과의 단열 실패로 고질적 한기가 가득했던 노후 라운지',
      afterDescription: '벽체를 통풍 구조로 개방하고 한지와 오크 가구를 빌트인해 공기가 유연하게 흘러가는 사색의 공간 완성',
      desc: '복잡한 현대사회에서 머리를 식히고 자연의 숨결을 그대로 마주할 거처의 정적 미학을 세심하게 빚었습니다.',
      imageAfter: '/src/assets/images/gangin_lounge_1779412227496.png'
    },
    gallery: [
      { url: '/src/assets/images/gangin_lounge_1779412227496.png', caption: '창가의 흐린 그림자와 목재 가구가 조우하는 명상적인 오후 3시.', aspect: 'portrait' }
    ]
  }
];

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'price_residential',
    title: 'Residential Architecture Suite',
    subtitle: '하이엔드 단독 및 프리미엄 아파트 주거 전문',
    priceRange: '평당 250만 - 350만 KRW',
    features: [
      '1:1 전담 건축사 & 인테리어 수석 디자이너 배정',
      '수치 계산 설계 및 3D 포토그래픽 렌더링 2회',
      '모든 가구 및 도터 프레임 마이너스 칼날 마감 디테일',
      '이탈리아 수입 포셀린 타일 및 매트 천연 석재 설계',
      '은폐형 슬라이딩 및 히든 포켓 마그네틱 도어 라인업',
      '96시간 담수 방수 보증 및 외벽 단열 무상 원격 모니터링',
      '친환경 마이크로시멘트 다중 오버플로우 바닥 코팅'
    ],
    details: '강인스튜디오는 찍어내는 인테리어가 아닌, 클라이언트의 평생을 함께할 물리적인 시간의 궤적을 철저히 기획합니다. 벽체 내단열, 환기 설비, 매립 수전 파이프까지 모든 설비적 디테일을 표준 시방서에 따라 완벽하게 선도합니다.',
    process: [
      '01. 대면 인터뷰 및 대지 분석 (공간 가치 기획)',
      '02. 레이아웃 평면안 도안 및 3D 텍스처 프리뷰 수용',
      '03. 친환경 천연 자재 선별 및 맞춤 가구 제작 실도안',
      '04. 엄격한 정밀 시공 및 감리 (방수/단열 중점 관리)',
      '05. 완공 후 프리미엄 입주 청소 및 평생 안심 AS 제공'
    ]
  },
  {
    id: 'price_commercial',
    title: 'Signature Commercial & Branding',
    subtitle: '카페, 리테일 쇼룸 및 하이엔드 사옥 상업공간 특화',
    priceRange: '평당 180만 - 270만 KRW',
    features: [
      '브랜드 아이덴티티 시각화 및 공간 가치를 더하는 조닝 기획',
      '대형 철제 아일랜드 바, 스틸 카운터 등 예술적 오브제 가구 맞춤 제작',
      '상업 동선 유도를 위한 빛 음영 조명 엔지니어링 설계 (매립형 코브 배광)',
      '오도재성 매트 머드 및 점토 미장 플라스터 다중 핸드코트 특화 공법 적용',
      '소방, 전기안전 검사 대행 패키지 및 상가 법적 요건 완벽 통과 보장',
      '공사 기간 단축 공정 고밀 마케팅 가치 분석 적용'
    ],
    details: '고객이 문을 연 첫 3초간 경험하는 원초적인 몰입감을 설계합니다. 강인이 시공하는 상업 공간은 사진 속에 잘 담길 뿐만 아니라, 장시간 머물렀을 때 신체적으로 편안함과 잔잔한 신비감을 선사하여 재방문율을 기약합니다.',
    process: [
      '01. 브랜드 미션 해석 및 핵심 가치 조닝 상담',
      '02. 익스테리어 파사드 및 인테리어 바 일체 설계안 발표',
      '03. 특수 스틸/석재 대형 부재 자체 공장 직송 및 오차 제로 가공',
      '04. 야간 무소음 시공 공정 단축을 통한 영업 개시일 완벽 수호'
    ]
  },
  {
    id: 'price_bathroom',
    title: 'Modern Bathroom & Wellness Pool',
    subtitle: '조적 욕탕, 위생 수련처 및 키즈 풀 특화',
    priceRange: '공간당 1,500만 - 3,500만 KRW',
    features: [
      '호텔식 조적식 대형 욕탕 및 라운딩 스케일 욕조 설계',
      '스위스/이탈리아 프리미엄 매립 수전 및 무슬릿 배수 트렌치 접목',
      '4중 특허 도막 아스팔트 하이브리드 수밀 차단 배수 설계',
      '천연석 및 하이포밀 크리트 마이크로 세라믹 타일 수접합 시공',
      '온기 보존 및 제습을 위한 은폐형 대류 공조 열선 매입'
    ],
    details: '수분과 습기가 지배하는 웰니스 욕실은 인테리어 업체의 기술력이 완벽히 탄로 나는 영역입니다. 강인의 기술진은 완곡하고 집념 어린 공법으로 누수를 원천 봉쇄하여 대대로 변치 않는 쾌적함을 담아냅니다.',
    process: [
      '01. 기존 배관 노후도 진단 및 특수 압력 테스트',
      '02. 조립 도안 배치 및 조적 성형 비례 정합',
      '03. 4차 연속 수압 방조 공정 및 특수 프라이머 조포',
      '04. 정밀 타일 줄눈 시공 및 위생 설비 단초 조립 완공'
    ]
  }
];

export const PHILOSOPHY_NARRATIVES = {
  intro: '우리는 장식되지 않은 침묵의 미학을 믿습니다.',
  philosophyDesign: '공간은 삶의 온도를 낮추고 사색을 머금어야 합니다. 불필요한 몰딩, 무늬만 화려한 벽지, 자극적인 조명은 도심속의 피로만을 증폭할 뿐입니다. 강인스튜디오는 뺄 수 있는 모든 마감재를 끝까지 제거하여, 빛과 재료의 원초적인 정감만이 공간의 공기를 채우도록 정성을 쏟아 올립니다. 이것이 우리의 공간 철학이자 LEIBAL이 전하는 절제된 가치와 맞닿아 있습니다.',
  philosophyConstruction: '인테리어의 고통은 불성실한 마감과 누수, 하자에서 나옵니다. 우리는 감각적인 시안을 그리는 디자이너이자, 고망치와 시방서를 들고 현장을 누비는 철저한 엔지니어입니다. 수평수직의 원초적 일치, 눈에 안 보이는 배관 하부 슬러지 관리, 내벽의 미세한 보온 결로 단열 코트까지 타협 없이 설계서 기술 기준을 직접 집행하기에 당당히 10년의 감리 품질을 증명해냅니다.',
  afterService: '저가의 턴키 인테리어 업체들과 달리 무상 3개년 프리미엄 AS 보증 기간과 자체 정기 하우스 케어 리포팅 시스템을 운영합니다. 준공 후 계절이 두 번 바뀔 때마다 전문 기술감리진이 무료로 직접 방문하여 목재 수축률 확인, 타일 줄눈 마모 코팅 가운팅, 그리고 실내 공조 조명을 미세 조정해 드리며 오랜 품위를 항시 단단히 견인합니다.'
};
