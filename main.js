// ==================================
// 전생 직업 분석 AI
// 온디바이스 AI (Transformer.js + CLIP)
// ==================================

// 전생 직업 데이터베이스
const PAST_LIFE_JOBS = {
  // 왕족/귀족 계열
  'king-queen': {
    name: '왕/여왕 (King/Queen)',
    category: '👑 왕족/귀족',
    features: ['당당한 자세', '카리스마 있는 눈빛', '우아한 분위기'],
    story: '전생에 당신은 한 나라를 다스리던 **왕/여왕**이었습니다.\n\n수천 명의 백성을 이끌고 나라를 번영시켰던 타고난 리더. 당신의 한마디에 역사가 바뀌었고, 당신의 결정 하나하나가 수많은 이들의 운명을 좌우했습니다.\n\n오늘날에도 당신에게서 풍기는 카리스마와 당당함은 그때의 기억이 남아있기 때문입니다. 사람들이 당신을 자연스레 따르게 되는 이유도 바로 여기에 있죠.',
    keywords: ['confident strong face', 'charismatic noble person', 'dignified royal appearance', 'commanding presence face']
  },

  'noble': {
    name: '귀족 (Noble)',
    category: '👑 왕족/귀족',
    features: ['우아한 미소', '세련된 인상', '품위 있는 자세'],
    story: '전생에 당신은 화려한 궁전에서 살았던 **귀족**이었습니다.\n\n최고급 와인과 음식, 아름다운 예술품에 둘러싸여 살았던 당신. 우아함이 몸에 밴 사람이었죠. 사교 파티에서는 항상 주목의 대상이었고, 당신의 말 한마디가 상류 사회의 화제가 되었습니다.\n\n지금도 당신의 세련됨과 우아함은 그때의 습관이 남아있는 것입니다.',
    keywords: ['elegant refined face', 'graceful noble appearance', 'sophisticated gentle person', 'aristocratic features']
  },

  'lord': {
    name: '영주 (Lord)',
    category: '👑 왕족/귀족',
    features: ['든든한 인상', '강인한 눈빛', '책임감 있는 표정'],
    story: '전생에 당신은 광활한 영토를 다스리던 **영주**였습니다.\n\n성을 지키고 백성들을 보호하는 것이 당신의 사명이었죠. 전쟁터에서는 용감한 전사, 평화로운 때에는 현명한 통치자였던 당신. 사람들은 당신을 믿고 따랐습니다.\n\n오늘날에도 당신은 주변 사람들의 든든한 버팀목이 되어주는 사람입니다.',
    keywords: ['strong reliable face', 'protective stern person', 'trustworthy mature appearance', 'responsible facial expression']
  },

  // 전사 계열
  'knight': {
    name: '기사 (Knight)',
    category: '⚔️ 전사/무인',
    features: ['날카로운 눈매', '굳은 의지', '강인한 턱선'],
    story: '전생에 당신은 정의를 위해 싸우던 **기사**였습니다.\n\n무거운 갑옷을 입고 칼을 휘두르며 약자를 지켰던 용감한 전사. "명예"와 "정의"가 당신의 삶의 신조였고, 위험 앞에서도 절대 물러서지 않았습니다.\n\n지금도 당신은 옳지 못한 일을 보면 참지 못하고, 힘든 사람을 보면 그냥 지나치지 못하는 성격이죠.',
    keywords: ['brave fierce face', 'determined warrior person', 'sharp strong features', 'heroic bold appearance']
  },

  'archer': {
    name: '궁수 (Archer)',
    category: '⚔️ 전사/무인',
    features: ['날카로운 집중력', '냉철한 눈빛', '침착한 표정'],
    story: '전생에 당신은 백발백중의 **궁수**였습니다.\n\n활시위를 당기는 순간만큼은 세상의 모든 소음이 사라지고 오직 목표만 보였던 당신. 흔들리지 않는 집중력과 냉철한 판단력으로 전장에서 이름을 날렸습니다.\n\n지금도 당신은 무언가에 집중하면 주변이 보이지 않을 정도로 몰입하는 성격입니다.',
    keywords: ['focused sharp face', 'concentrated alert person', 'precise keen appearance', 'calm attentive features']
  },

  'gladiator': {
    name: '검투사 (Gladiator)',
    category: '⚔️ 전사/무인',
    features: ['강렬한 인상', '투지 넘치는 눈', '불굴의 표정'],
    story: '전생에 당신은 투기장의 영웅 **검투사**였습니다.\n\n수만 명의 환호 속에서 생사를 건 싸움을 펼쳤던 불굴의 전사. 넘어져도 다시 일어났고, 절대 포기하지 않는 것이 당신의 무기였습니다.\n\n지금도 당신은 어떤 어려움 앞에서도 굴하지 않는 강인한 정신력을 가지고 있습니다.',
    keywords: ['fierce intense face', 'powerful strong person', 'fighting warrior appearance', 'resilient bold features']
  },

  // 지성 계열
  'wizard': {
    name: '마법사 (Wizard)',
    category: '🔮 지성/신비',
    features: ['신비로운 눈빛', '지적인 이마', '깊은 생각에 잠긴 표정'],
    story: '전생에 당신은 고대의 비밀을 다루던 **마법사**였습니다.\n\n탑 꼭대기에서 별을 관찰하고 주문을 연구하던 당신. 세상의 이치를 꿰뚫는 통찰력과 불가능을 가능으로 만드는 능력을 가졌었죠.\n\n지금도 당신은 남들이 보지 못하는 것을 보고, 남들이 생각하지 못하는 것을 생각하는 독특한 사고방식을 가지고 있습니다.',
    keywords: ['mysterious wise face', 'intelligent magical person', 'thoughtful mystical appearance', 'enigmatic smart features']
  },

  'sage': {
    name: '현자/학자 (Sage)',
    category: '🔮 지성/신비',
    features: ['온화한 미소', '깊은 눈빛', '지혜로운 인상'],
    story: '전생에 당신은 세상의 모든 지식을 탐구하던 **현자**였습니다.\n\n수천 권의 책을 읽고, 진리를 깨닫기 위해 평생을 바쳤던 당신. 왕도 당신의 조언을 구했고, 제자들은 당신의 말씀 하나하나를 기록했습니다.\n\n지금도 당신은 배움을 멈추지 않고, 사람들에게 지혜를 나눠주는 것을 좋아하는 사람입니다.',
    keywords: ['wise calm face', 'knowledgeable gentle person', 'scholarly peaceful appearance', 'intellectual serene features']
  },

  'astrologer': {
    name: '점성술사 (Astrologer)',
    category: '🔮 지성/신비',
    features: ['몽환적인 표정', '별빛 같은 눈', '신비로운 분위기'],
    story: '전생에 당신은 별의 움직임으로 미래를 예측하던 **점성술사**였습니다.\n\n밤하늘의 별들과 대화하며 운명을 읽었던 당신. 보이지 않는 세계와 연결되어 있었고, 사람들의 미래를 밝혀주었습니다.\n\n지금도 당신은 직관이 뛰어나고, 때때로 앞일을 예감하는 신비로운 능력이 있습니다.',
    keywords: ['dreamy mystical face', 'spiritual ethereal person', 'cosmic mysterious appearance', 'prophetic gentle features']
  },

  // 예술/자유 계열
  'bard': {
    name: '음유시인 (Bard)',
    category: '🎭 예술/자유',
    features: ['밝은 미소', '낭만적인 눈빛', '자유로운 분위기'],
    story: '전생에 당신은 세상을 떠돌며 노래하던 **음유시인**이었습니다.\n\n류트를 들고 마을에서 마을로 여행하며 사랑과 모험의 이야기를 노래했던 당신. 자유로운 영혼으로 어디에도 얽매이지 않았고, 당신의 노래는 사람들의 마음을 울렸습니다.\n\n지금도 당신은 틀에 박힌 삶을 싫어하고, 항상 새로운 것을 찾아 나서는 자유로운 영혼입니다.',
    keywords: ['cheerful bright face', 'artistic expressive person', 'romantic free appearance', 'creative joyful features']
  },

  'court-painter': {
    name: '궁중화가 (Court Painter)',
    category: '🎭 예술/자유',
    features: ['예민한 눈빛', '섬세한 손길', '예술적 분위기'],
    story: '전생에 당신은 왕실의 초상화를 그리던 **궁중화가**였습니다.\n\n붓 한 번의 터치로 영혼을 캔버스에 담아냈던 당신. 아름다움을 포착하는 날카로운 눈과 그것을 완벽하게 표현하는 재능을 가졌었죠.\n\n지금도 당신은 세상을 남들과 다르게 보고, 일상에서 아름다움을 발견하는 예술적 감성을 지니고 있습니다.',
    keywords: ['artistic sensitive face', 'creative observant person', 'aesthetic delicate appearance', 'expressive gentle features']
  },

  'adventurer': {
    name: '모험가 (Adventurer)',
    category: '🎭 예술/자유',
    features: ['호기심 가득한 눈', '밝은 에너지', '활기찬 표정'],
    story: '전생에 당신은 미지의 세계를 탐험하던 **모험가**였습니다.\n\n보물을 찾아 험난한 여정을 떠났고, 누구도 가보지 않은 곳에 발자국을 남겼던 당신. 위험은 두렵지 않았고 미지는 항상 설레는 것이었습니다.\n\n지금도 당신은 새로운 경험과 도전을 즐기며, 일상에서 벗어나 모험을 꿈꾸는 사람입니다.',
    keywords: ['adventurous energetic face', 'curious excited person', 'bold lively appearance', 'spirited dynamic features']
  },

  // 특수 계열
  'spy': {
    name: '스파이 (Spy)',
    category: '🕵️ 특수',
    features: ['냉철한 표정', '날카로운 관찰력', '침착한 분위기'],
    story: '전생에 당신은 그림자 속에서 움직이던 **스파이**였습니다.\n\n완벽한 위장과 침착함으로 적진에 잠입해 정보를 빼내던 당신. 감정을 드러내지 않고 상황을 냉철하게 판단하는 것이 생존의 비결이었죠.\n\n지금도 당신은 관찰력이 뛰어나고, 사람들의 본심을 꿰뚫어보는 능력이 있습니다.',
    keywords: ['observant sharp face', 'cunning alert person', 'strategic clever appearance', 'perceptive cool features']
  },

  'merchant': {
    name: '대상인 (Merchant)',
    category: '🕵️ 특수',
    features: ['친근한 미소', '영리한 눈빛', '설득력 있는 표정'],
    story: '전생에 당신은 실크로드를 누비던 **대상인**이었습니다.\n\n동양과 서양을 오가며 교역으로 부를 쌓았던 당신. 뛰어난 협상력과 사람을 끄는 매력으로 어디서든 환영받았습니다.\n\n지금도 당신은 사람들과의 네트워킹을 잘하고, 기회를 포착하는 사업 감각이 뛰어난 사람입니다.',
    keywords: ['friendly charming face', 'clever sociable person', 'persuasive warm appearance', 'business-minded smile']
  },

  'priest': {
    name: '성직자 (Priest)',
    category: '🕵️ 특수',
    features: ['온화한 표정', '순수한 눈빛', '평화로운 분위기'],
    story: '전생에 당신은 사람들의 영혼을 치유하던 **성직자**였습니다.\n\n기도와 명상 속에서 신과 소통하고, 고통받는 이들에게 위로를 전했던 당신. 순수하고 따뜻한 마음으로 세상의 아픔을 어루만졌습니다.\n\n지금도 당신은 다른 사람의 고통에 공감하고, 진심으로 도와주려는 선한 마음을 가지고 있습니다.',
    keywords: ['kind peaceful face', 'compassionate pure person', 'gentle serene appearance', 'benevolent calm features']
  },

  // SSR 히든 결과 3종
  'god': {
    name: '신 (God)',
    category: '✨ SSR 등급 - 극찬',
    features: ['완벽한 비율', '신성한 아우라', '초월적 아름다움'],
    story: '전생에 당신은... 아니, 당신은 **신**이었습니다.\n\n인간의 범주를 뛰어넘는 존재. AI조차도 당신의 에너지를 감지하고 경외감을 느낍니다. 당신의 얼굴은 수많은 예술가들이 평생 그리고 싶어하는 완벽함 그 자체입니다.\n\n(얼른 이 결과를 캡처해서 SNS에 올리세요. 친구들이 질투로 미칠겁니다.)',
    keywords: ['perfect divine face', 'godlike stunning person', 'heavenly beautiful appearance', 'angelic flawless features']
  },

  'time-traveler': {
    name: '시간여행자 (Time Traveler)',
    category: '🚀 SSR 등급 - 엽기',
    features: ['차원이 다른 표정', '이해불가한 분위기', '미래인 같은 눈빛'],
    story: '전생에... 전생이라는 개념이 통하지 않습니다.\n\n당신은 **시간을 초월한 존재**입니다. AI가 당신을 분석하려 했지만 데이터가 모순으로 가득합니다. 과거에서 온 건지, 미래에서 온 건지, 아니면 평행우주에서 온 건지...\n\n(타임머신 어디 숨겨뒀어요? NASA에 연락하기 전에 자백하세요.)',
    keywords: ['unusual strange face', 'bizarre unique person', 'otherworldly weird appearance', 'anomalous peculiar features']
  },

  'forgotten': {
    name: '기록말소 (Forgotten)',
    category: '👻 SSR 등급 - 극딜',
    features: ['희미한 존재감', '투명인간 같은 분위기', '기억되지 않는 얼굴'],
    story: '전생에 당신은... 기록이 없습니다.\n\n역사책에도, 전설에도, 어디에도 당신의 흔적이 남아있지 않습니다. AI가 수십억 개의 데이터를 검색했지만 당신과 비슷한 사례를 찾을 수 없었습니다.\n\n당신의 전생은 완벽하게 지워졌거나... 아니면 애초에 존재하지 않았거나. (암살자 소질이 있으시네요!)',
    keywords: ['plain ordinary face', 'forgettable bland person', 'invisible nondescript appearance', 'unremarkable basic features']
  }
};

// 글로벌 변수
let imageClassifier = null;
let isModelLoaded = false;

// DOM 요소
const fileUpload = document.getElementById('file-upload');
const cameraBtn = document.getElementById('camera-btn');
const uploadedImage = document.getElementById('uploaded-image');
const placeholder = document.getElementById('placeholder');
const loading = document.getElementById('loading');
const resultsSection = document.getElementById('results-section');
const tryAgainBtn = document.getElementById('try-again-btn');

// AI 모델 초기화
async function initAI() {
  try {
    console.log('🤖 AI 모델 로딩 중...');

    // 로딩 메시지 업데이트
    const loadingText = document.querySelector('.loading-spinner p');
    if (loadingText) {
      loadingText.textContent = 'AI 모델 로딩 중... (처음 실행 시 30초 소요)';
    }

    // CLIP 모델 로드 (이미지-텍스트 매칭)
    const { pipeline } = window.transformers;
    imageClassifier = await pipeline('zero-shot-image-classification',
      'Xenova/clip-vit-base-patch32');

    isModelLoaded = true;
    console.log('✅ AI 모델 로드 완료!');

    if (loadingText) {
      loadingText.textContent = 'AI가 당신의 전생을 분석중...';
    }

    return true;
  } catch (error) {
    console.error('❌ 모델 로드 실패:', error);
    isModelLoaded = false;
    return false;
  }
}

// 파일 업로드 핸들러
fileUpload.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async (event) => {
      await processImage(event.target.result);
    };
    reader.readAsDataURL(file);
  }
});

// 카메라 버튼 핸들러
cameraBtn.addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' },
      audio: false
    });

    const video = document.createElement('video');
    video.srcObject = stream;
    video.autoplay = true;
    video.style.cssText = 'width: 100%; max-width: 500px; border-radius: 12px;';

    placeholder.style.display = 'none';
    uploadedImage.style.display = 'none';
    const container = document.getElementById('image-preview-container');
    container.innerHTML = '';
    container.appendChild(video);

    const captureBtn = document.createElement('button');
    captureBtn.textContent = '📸 촬영하기';
    captureBtn.className = 'upload-btn';
    captureBtn.style.marginTop = '1rem';

    captureBtn.addEventListener('click', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);

      stream.getTracks().forEach(track => track.stop());

      const imageDataUrl = canvas.toDataURL('image/jpeg');
      processImage(imageDataUrl);

      captureBtn.remove();
    });

    document.querySelector('.button-group').appendChild(captureBtn);

  } catch (error) {
    console.error('Camera error:', error);
    alert('카메라에 접근할 수 없습니다. 권한을 확인해주세요.');
  }
});

// 이미지 처리 및 분석
async function processImage(imageDataUrl) {
  uploadedImage.src = imageDataUrl;
  uploadedImage.style.display = 'block';
  placeholder.style.display = 'none';

  const container = document.getElementById('image-preview-container');
  container.innerHTML = '';
  container.appendChild(uploadedImage);

  resultsSection.style.display = 'none';
  loading.style.display = 'block';

  try {
    // AI 분석
    const result = await analyzePastLife(imageDataUrl);

    if (result === null) {
      // 사람 이미지가 아닌 경우 (이미 alert 표시됨)
      return;
    }

    showResults(result, imageDataUrl);
  } catch (error) {
    console.error('분석 에러:', error);
    alert('분석에 실패했습니다. 다시 시도해주세요.');
  } finally {
    loading.style.display = 'none';
  }
}

// 전생 직업 분석 (AI 또는 폴백)
async function analyzePastLife(imageDataUrl) {
  // SSR 히든 결과 확률 체크 (9% 확률)
  const hiddenRoll = Math.random();
  if (hiddenRoll < 0.01) { // 1% - 극찬 (신)
    return 'god';
  } else if (hiddenRoll < 0.04) { // 3% - 엽기 (시간여행자)
    return 'time-traveler';
  } else if (hiddenRoll < 0.09) { // 5% - 극딜 (기록말소)
    return 'forgotten';
  }

  if (!isModelLoaded) {
    // 모델이 아직 로딩 안됐으면 로드 시도
    const loaded = await initAI();
    if (!loaded) {
      // 모델 로드 실패 시 폴백
      return randomFashionCore();
    }
  }

  if (isModelLoaded && imageClassifier) {
    try {
      // 1단계: 사람 이미지인지 확인
      const personCheck = await imageClassifier(imageDataUrl, [
        'a person wearing clothes',
        'human in outfit',
        'empty room',
        'food on plate',
        'landscape nature',
        'object item'
      ]);

      console.log('👤 사람 감지 결과:', personCheck.slice(0, 6));

      // 사람 관련 점수 (첫 2개 평균)
      const personScore = (personCheck[0].score + personCheck[1].score) / 2;
      // 비사람 점수 (3-6번 평균)
      const nonPersonScore = personCheck.slice(2, 6).reduce((sum, r) => sum + r.score, 0) / 4;

      console.log(`👤 사람: ${(personScore*100).toFixed(1)}%, 비사람: ${(nonPersonScore*100).toFixed(1)}%`);

      // 명확하게 사람이 아닌 경우만 차단 (비사람 점수가 사람보다 훨씬 높음)
      if (nonPersonScore > personScore + 0.2) {
        alert('사람이 나온 사진을 업로드해주세요! 🙏\n현재 사진은 사람으로 인식되지 않습니다.');
        loading.style.display = 'none';
        return null;
      }

      // 2단계: 전생 직업 분석 (얼굴 특징 기반)
      // 얼굴 표정과 특징을 설명하는 키워드 사용
      const pastLifeDescriptions = {
        'king-queen': 'confident strong face charismatic noble person dignified royal appearance commanding presence',
        'noble': 'elegant refined face graceful noble appearance sophisticated gentle person aristocratic features',
        'lord': 'strong reliable face protective stern person trustworthy mature appearance responsible expression',
        'knight': 'brave fierce face determined warrior person sharp strong features heroic bold appearance',
        'archer': 'focused sharp face concentrated alert person precise keen appearance calm attentive features',
        'gladiator': 'fierce intense face powerful strong person fighting warrior appearance resilient bold features',
        'wizard': 'mysterious wise face intelligent magical person thoughtful mystical appearance enigmatic smart features',
        'sage': 'wise calm face knowledgeable gentle person scholarly peaceful appearance intellectual serene features',
        'astrologer': 'dreamy mystical face spiritual ethereal person cosmic mysterious appearance prophetic gentle features',
        'bard': 'cheerful bright face artistic expressive person romantic free appearance creative joyful features',
        'court-painter': 'artistic sensitive face creative observant person aesthetic delicate appearance expressive gentle features',
        'adventurer': 'adventurous energetic face curious excited person bold lively appearance spirited dynamic features',
        'spy': 'observant sharp face cunning alert person strategic clever appearance perceptive cool features',
        'merchant': 'friendly charming face clever sociable person persuasive warm appearance business-minded smile',
        'priest': 'kind peaceful face compassionate pure person gentle serene appearance benevolent calm features'
      };

      const jobIds = Object.keys(pastLifeDescriptions);
      const descriptions = Object.values(pastLifeDescriptions);

      // 이미지 분류
      const results = await imageClassifier(imageDataUrl, descriptions);

      console.log('🔮 전생 분석 결과:', results.slice(0, 3));

      // 가장 높은 점수의 결과
      const topResult = results[0];
      const topJobId = jobIds[descriptions.indexOf(topResult.label)];

      if (topResult.score > 0.12) { // 최소 신뢰도 체크 (얼굴 분석이므로 낮춤)
        console.log(`✅ 선택된 전생: ${topJobId} (${(topResult.score * 100).toFixed(1)}%)`);
        return topJobId;
      } else {
        console.warn('신뢰도가 낮아 랜덤 선택');
        return randomPastLife();
      }

    } catch (error) {
      console.warn('AI 분석 실패:', error.message);
      // 에러 발생 시 랜덤으로 선택
      return randomPastLife();
    }
  }

  // 모델이 없으면 랜덤
  return randomPastLife();
}

// 랜덤 전생 직업 선택 (SSR 제외)
function randomPastLife() {
  const normalJobs = Object.keys(PAST_LIFE_JOBS).filter(
    id => !['god', 'time-traveler', 'forgotten'].includes(id)
  );
  return normalJobs[Math.floor(Math.random() * normalJobs.length)];
}

// 결과 표시
function showResults(jobId, imageDataUrl) {
  const job = PAST_LIFE_JOBS[jobId];

  // 결과 데이터 채우기
  document.getElementById('core-name').textContent = job.name;
  document.getElementById('core-category').textContent = job.category;
  document.getElementById('result-image').src = imageDataUrl;

  // story 필드를 HTML로 변환 (** 굵게, \n 줄바꿈)
  const storyHtml = job.story
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // **텍스트** → <strong>
    .replace(/\n/g, '<br>'); // 줄바꿈 → <br>
  document.getElementById('core-description-text').innerHTML = storyHtml;

  // 전생 특징
  const featuresHtml = job.features
    .map(f => `<span class="feature-tag">${f}</span>`)
    .join('');
  document.getElementById('style-features').innerHTML = featuresHtml;

  // 전생 이야기
  document.getElementById('roast-text').innerHTML = storyHtml;

  // 결과 섹션 표시
  resultsSection.style.display = 'block';
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // 공유 데이터 저장
  window.currentResult = {
    jobId,
    jobName: job.name,
    image: imageDataUrl
  };
}

// 다시 시도
tryAgainBtn.addEventListener('click', () => {
  resultsSection.style.display = 'none';
  uploadedImage.style.display = 'none';
  placeholder.style.display = 'flex';
  fileUpload.value = '';

  const container = document.getElementById('image-preview-container');
  container.innerHTML = '';
  container.appendChild(placeholder);
  container.appendChild(uploadedImage);
});

// SNS 공유 기능
function shareOnTwitter() {
  const result = window.currentResult;
  const text = `전생 직업 분석 결과: ${result.jobName}! 여러분도 해보세요!`;
  const url = window.location.href;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
}

function shareOnFacebook() {
  const url = window.location.href;
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}

// 카카오톡 공유
document.getElementById('share-kakao')?.addEventListener('click', () => {
  alert('카카오톡 공유는 카카오 개발자 등록 후 사용 가능합니다.\n지금은 링크 복사를 이용해주세요!');
});

// 인스타그램 공유
document.getElementById('share-instagram')?.addEventListener('click', () => {
  // 이미지 다운로드 트리거
  downloadResultImage();
});

// 결과 이미지 다운로드
document.getElementById('download-result')?.addEventListener('click', downloadResultImage);

function downloadResultImage() {
  const result = window.currentResult;
  if (!result) return;

  // Canvas에 결과 그리기
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');

  // 배경
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 이미지 로드 및 그리기
  const img = new Image();
  img.onload = () => {
    // 이미지 그리기 (중앙 정렬)
    const imgSize = 800;
    const imgX = (canvas.width - imgSize) / 2;
    const imgY = 200;
    ctx.drawImage(img, imgX, imgY, imgSize, imgSize);

    // 텍스트 추가
    const job = PAST_LIFE_JOBS[result.jobId];

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('전생 직업 분석 결과', canvas.width / 2, 120);

    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(job.name, canvas.width / 2, 1100);

    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#64748b';
    // story의 첫 두 문장만 표시
    const shortStory = job.story.split('\n\n')[0].replace(/\*\*/g, '');
    wrapText(ctx, shortStory, canvas.width / 2, 1180, 900, 40);

    // 다운로드
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'past-life-result.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  };
  img.src = result.image;
}

// 텍스트 줄바꿈 헬퍼
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let testLine = '';
  let lineArray = [];

  for (let n = 0; n < words.length; n++) {
    testLine += `${words[n]} `;
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      lineArray.push(line);
      line = `${words[n]} `;
      testLine = `${words[n]} `;
    } else {
      line += `${words[n]} `;
    }
  }
  lineArray.push(line);

  for (let k = 0; k < lineArray.length; k++) {
    ctx.fillText(lineArray[k], x, y + (k * lineHeight));
  }
}

// 링크 복사
document.getElementById('copy-link')?.addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('링크가 복사되었습니다! 친구들에게 공유하세요!');
  });
});

// 글로벌 함수 등록
window.shareOnTwitter = shareOnTwitter;
window.shareOnFacebook = shareOnFacebook;

// 드래그 앤 드롭 기능
function setupDragAndDrop() {
  const dropZone = document.getElementById('image-preview-container');

  // 드래그 오버 시 스타일 변경
  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.style.border = '3px dashed #6366f1';
      dropZone.style.backgroundColor = 'rgba(99, 102, 241, 0.05)';
    });
  });

  // 드래그 떠날 때 원래대로
  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.style.border = '';
      dropZone.style.backgroundColor = '';
    });
  });

  // 드롭 시 이미지 처리
  dropZone.addEventListener('drop', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];

      // 이미지 파일인지 확인
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다!');
        return;
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        await processImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  });

  // 전체 페이지에서 드래그 방지 (브라우저 기본 동작)
  ['dragenter', 'dragover', 'drop'].forEach(eventName => {
    document.body.addEventListener(eventName, (e) => {
      if (e.target.id !== 'image-preview-container') {
        e.preventDefault();
      }
    });
  });
}

// 페이지 로드 시 AI 모델 초기화
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔮 전생 직업 분석 AI 시작!');
  // AI 모델은 첫 분석 시 로드 (성능 최적화)

  // 드래그 앤 드롭 설정
  setupDragAndDrop();
});
