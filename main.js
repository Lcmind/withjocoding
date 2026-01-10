// ==================================
// 패션 코어 분석 AI
// 온디바이스 AI (Transformer.js + CLIP)
// ==================================

// 패션 코어 데이터베이스
const FASHION_CORES = {
  // 그룹 A: 게으름 & 현실 고증
  'gs25-core': {
    name: '편의점 야간 알바 코어 (GS25-core)',
    category: '🛋️ 게으름 & 현실 고증',
    features: ['회색 후드티', '트레이닝 바지', '슬리퍼'],
    roast: '최저시급의 향기가 납니다. 폐기 도시락 시간만 기다리는 하이에나 눈빛. 인생이 대충 그 자체.',
    keywords: ['hoodie', 'sweatpants', 'slippers', 'lazy', 'casual', 'gray']
  },
  'brain-rot-core': {
    name: '도파민 절임 좀비 코어 (Brain-Rot-core)',
    category: '🛋️ 게으름 & 현실 고증',
    features: ['수면 잠옷', '부시시한 머리', '이불'],
    roast: '주말 내내 침대와 물아일체. 숏츠 보느라 뇌가 녹아내림. 씻는 것조차 귀찮아하는 현대 사회의 슬픈 자화상.',
    keywords: ['pajamas', 'messy hair', 'lazy', 'indoor', 'comfy']
  },
  'exam-hell-core': {
    name: 'K-고삼 수험생 코어 (Exam-Hell-core)',
    category: '🛋️ 게으름 & 현실 고증',
    features: ['롱패딩', '뿔테 안경', '마스크'],
    roast: '멋부리는 법을 잊어버린 생존형 패션. 영혼은 이미 독서실에 가 있음. 건드리면 예민해서 뭅니다.',
    keywords: ['long padding', 'glasses', 'mask', 'student', 'tired']
  },
  'error-core': {
    name: '판교 코딩 노예 코어 (Error-core)',
    category: '🛋️ 게으름 & 현실 고증',
    features: ['체크무늬 셔츠', '백팩', '거북목 자세'],
    roast: '일주일 안 씻은 듯한 내추럴함. 당신 주변엔 버그가 꼬입니다. 제발 모니터 끄고 밖을 좀 보세요.',
    keywords: ['checkered shirt', 'backpack', 'tech', 'programmer', 'casual']
  },
  'salary-slave-core': {
    name: '영혼 가출 직장인 코어 (Salary-Slave-core)',
    category: '🛋️ 게으름 & 현실 고증',
    features: ['칙칙한 색 정장/셔츠', '무표정', '굽은 어깨'],
    roast: '퇴사 마렵다는 말을 숨 쉬듯이 함. 눈에 총기가 없고 "네, 아니요"로만 대화 가능. 월급 스쳐 지나가는 중.',
    keywords: ['suit', 'formal', 'office', 'tired', 'corporate', 'gray']
  },

  // 그룹 B: 허세 & 자의식 과잉
  'seongsu-wannabe': {
    name: '성수동 힙스터 호소인 코어 (Seongsu-Wannabe)',
    category: '😎 허세 & 자의식 과잉',
    features: ['헤드셋', '비니', '힙합 바지'],
    roast: '성수동 카페거리에서 맥북 펴놓고 인스타 할 관상. 남들 다 하는 건데 본인만 힙한 줄 앎.',
    keywords: ['headphones', 'beanie', 'hip hop', 'streetwear', 'urban', 'trendy']
  },
  'hongdae-disease': {
    name: '홍대병 말기 환자 코어 (Hongdae-Disease)',
    category: '😎 허세 & 자의식 과잉',
    features: ['난해한 레이어드', '튀는 염색', '문신 토시'],
    roast: '남들 하는 건 죽어도 안 하려는 똥고집. 근데 결국 유행 다 따라 함. "나만 아는 밴드" 이야기 그만해.',
    keywords: ['layered', 'colorful hair', 'tattoo', 'alternative', 'artistic', 'indie']
  },
  'fake-rich': {
    name: '가짜 올드머니 코어 (Fake-Rich)',
    category: '😎 허세 & 자의식 과잉',
    features: ['베이지색 트렌치코트', '니트', '머플러'],
    roast: '귀티 내려고 애쓰지만 어딘가 짠내가 남. 통장 잔고는 텅 비었지만 겉모습은 청담동 며느리/사위.',
    keywords: ['trench coat', 'beige', 'knit', 'scarf', 'elegant', 'classy']
  },
  'ceo-roleplay': {
    name: '스타트업 대표 놀이 코어 (CEO-Roleplay)',
    category: '😎 허세 & 자의식 과잉',
    features: ['검정 폴라티', '스마트 워치', '깔끔한 재킷'],
    roast: '성공한 CEO 코스프레 중. 입만 열면 "비전", "인사이트" 타령하지만 실속은 제로. 사기꾼 기질 다분함.',
    keywords: ['black turtleneck', 'smart watch', 'jacket', 'business', 'tech CEO', 'startup']
  },
  'muscle-brain': {
    name: '3대 500 단백질 도둑 코어 (Muscle-Brain)',
    category: '😎 허세 & 자의식 과잉',
    features: ['나시 티', '머슬핏 반팔', '레깅스'],
    roast: '뇌 근육까지 펌핑됨. 모든 대화가 기승전-근손실. 거울 볼 때마다 본인 몸에 취해서 키스할 기세.',
    keywords: ['tank top', 'muscle fit', 'leggings', 'athletic', 'fitness', 'gym']
  },

  // 그룹 C: 유행 & 컨셉충
  'gorpcore': {
    name: '엄홍길 대장님 빙의 코어 (Gorpcore)',
    category: '🎨 유행 & 컨셉충',
    features: ['바람막이', '등산화', '아웃도어 조끼'],
    roast: '동네 마실 나가는데 에베레스트 장비 착용. 기능성만 따지다가 사회성을 잃어버림.',
    keywords: ['windbreaker', 'hiking boots', 'outdoor vest', 'technical', 'outdoor']
  },
  'blokecore': {
    name: '짝퉁 축구선수 코어 (Blokecore)',
    category: '🎨 유행 & 컨셉충',
    features: ['축구 유니폼', '저지'],
    roast: '축구 룰도 모르면서 유니폼만 입음. 힙해 보이고 싶어서 입었지만 그냥 조기축구회 아저씨 같음.',
    keywords: ['soccer jersey', 'football', 'sports', 'athletic', 'sporty']
  },
  'coquette-core': {
    name: '장원영 호소인 코어 (Coquette-core)',
    category: '🎨 유행 & 컨셉충',
    features: ['리본', '레이스', '핑크색 옷'],
    roast: '거울 보면서 "나 좀 예쁜 듯?" 생각하는 공주병. 인생이 뮤직뱅크임. 현실은 그냥 자의식 과잉.',
    keywords: ['ribbon', 'lace', 'pink', 'cute', 'feminine', 'princess']
  },
  'y3k-core': {
    name: '세기말 사이버 전사 코어 (Y3K-core)',
    category: '🎨 유행 & 컨셉충',
    features: ['은색/메탈릭 소재', '고글', '딱 붙는 옷'],
    roast: '에스파가 되고 싶었던 일반인. 시대를 너무 앞서가서 화성까지 가버림. 보는 사람 눈이 시림.',
    keywords: ['metallic', 'silver', 'goggles', 'futuristic', 'cyberpunk', 'tight']
  },
  'vintage-beggar': {
    name: '동묘 구제시장 털이범 코어 (Vintage-Beggar)',
    category: '🎨 유행 & 컨셉충',
    features: ['구멍 난 니트', '물 빠진 청바지', '낡은 조끼'],
    roast: '빈티지라고 우기지만 남들 눈엔 그냥 거지룩. 할머니 옷장에서 몰래 훔쳐 입은 듯한 난해함.',
    keywords: ['vintage', 'distressed', 'ripped', 'old', 'worn', 'thrifted']
  },

  // 그룹 D: 성격 & 분위기
  'celebrity-disease': {
    name: '연예인병 말기 코어 (Celebrity-Disease)',
    category: '✨ 성격 & 분위기',
    features: ['올블랙', '검은 마스크', '모자 푹 눌러씀'],
    roast: '아무도 안 쳐다보는데 혼자 파파라치 의식함. 홍대병과 쿨찐병 합병증. 이어폰 꼈지만 노래 안 듣고 있음.',
    keywords: ['all black', 'mask', 'hat', 'sunglasses', 'celebrity', 'mysterious']
  },
  'confucianism-core': {
    name: '유교걸/유교보이 코어 (Confucianism-core)',
    category: '✨ 성격 & 분위기',
    features: ['단추 끝까지 잠근 셔츠', '롱스커트', '단정함'],
    roast: '조선시대에서 타임머신 타고 옴. 노출을 죄악으로 여김. 꽉 막힌 꼰대력이 느껴짐.',
    keywords: ['conservative', 'button up', 'long skirt', 'modest', 'traditional', 'formal']
  },
  'manipulator-core': {
    name: '첫사랑 조작단 코어 (Manipulator-core)',
    category: '✨ 성격 & 분위기',
    features: ['흰 티에 청바지', '청순한 니트'],
    roast: '겉은 순해 보이나 속은 시커멓음. "아무것도 몰라요" 표정으로 어장관리 하는 고단수 여우.',
    keywords: ['white tee', 'jeans', 'innocent', 'simple', 'clean', 'pure']
  },
  'rich-unemployed': {
    name: '금수저 백수 코어 (Rich-Unemployed)',
    category: '✨ 성격 & 분위기',
    features: ['골프웨어', 'PK 티셔츠', '명품 로고'],
    roast: '부모님 카드로 사는 평화로운 인생. 노동의 가치를 모름. 해맑아서 더 킹받는 타입.',
    keywords: ['golf wear', 'luxury brand', 'logo', 'polo', 'preppy', 'rich']
  },
  'strong-unni': {
    name: '환불 원정대 프리패스 코어 (Strong-Unni)',
    category: '✨ 성격 & 분위기',
    features: ['가죽 재킷', '진한 화장', '호피 무늬'],
    roast: '가게 들어가면 사장님이 알아서 환불해 줄 기세. 옷이 문제가 아니라 눈빛에 살기가 가득함.',
    keywords: ['leather jacket', 'bold makeup', 'leopard print', 'strong', 'fierce']
  },

  // SSR 히든 결과 3종 (확률적 등장)
  'unicorn-core': {
    name: '걸어 다니는 기업가치 1조 코어 (Unicorn-core)',
    category: '🎉 SSR 등급 - 극찬',
    features: ['완벽한 비율', '황금빛 아우라', '패션 교과서'],
    roast: '죄송합니다. AI가 감히 당신의 패션을 평가할 수 없습니다. 옷이 명품인 게 아니라, 당신 자체가 명품이군요. 뭘 걸쳐도 화보가 되는 "비주얼 깡패"입니다. (얼른 캡처해서 스토리에 올리세요. 오늘 DM 폭발합니다.)',
    keywords: ['perfect', 'stunning', 'flawless', 'model', 'fashionable', 'elegant']
  },
  'alien-core': {
    name: '404 Not Found: 외계 생명체 (Alien-core)',
    category: '👽 SSR 등급 - 엽기',
    features: ['정체불명', '차원이 다름', '이해불가'],
    roast: '삐비빅... 분석 실패. 당신의 패션은 지구의 데이터로는 해석이 불가능합니다. 시대를 100년 앞서간 겁니까, 아니면 그냥 패션 테러리스트입니까? NASA에 신고하기 전에 옷 갈아입으세요.',
    keywords: ['weird', 'strange', 'unusual', 'bizarre', 'eccentric', 'unique']
  },
  'npc-core': {
    name: '지나가던 행인 1 (NPC-core)',
    category: '👤 SSR 등급 - 극딜',
    features: ['존재감 제로', '투명인간', '배경화'],
    roast: '어라? 사진에 아무것도 없는데요? 존재감이 너무 희미해서 AI가 사람인지 전봇대인지 구분을 못하고 있습니다. 암살자가 적성이네요. 어디 가서 나쁜 짓 해도 아무도 모를 관상.',
    keywords: ['plain', 'basic', 'invisible', 'bland', 'forgettable', 'nondescript']
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

    // CLIP 모델 로드 (이미지-텍스트 매칭)
    const { pipeline } = window.transformers;
    imageClassifier = await pipeline('zero-shot-image-classification',
      'Xenova/clip-vit-base-patch32');

    isModelLoaded = true;
    console.log('✅ AI 모델 로드 완료!');
  } catch (error) {
    console.error('❌ 모델 로드 실패:', error);
    // 폴백: 간단한 랜덤 분석
    isModelLoaded = false;
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
    const result = await analyzeFashion(imageDataUrl);
    showResults(result, imageDataUrl);
  } catch (error) {
    console.error('분석 에러:', error);
    alert('분석에 실패했습니다. 다시 시도해주세요.');
  } finally {
    loading.style.display = 'none';
  }
}

// 패션 코어 분석 (AI 또는 폴백)
async function analyzeFashion(imageDataUrl) {
  // SSR 히든 결과 확률 체크 (8% 확률)
  const hiddenRoll = Math.random();
  if (hiddenRoll < 0.01) { // 1% - 극찬
    return 'unicorn-core';
  } else if (hiddenRoll < 0.04) { // 3% - 엽기
    return 'alien-core';
  } else if (hiddenRoll < 0.09) { // 5% - 극딜
    return 'npc-core';
  }

  if (!isModelLoaded) {
    // 모델이 아직 로딩 안됐으면 로드 시도
    await initAI();
  }

  if (isModelLoaded && imageClassifier) {
    try {
      // AI 분석
      const allKeywords = Object.entries(FASHION_CORES).flatMap(([id, core]) =>
        core.keywords.map(kw => ({ id, keyword: kw }))
      );

      // 중복 제거된 키워드 목록
      const uniqueKeywords = [...new Set(allKeywords.map(k => k.keyword))];

      // 이미지 분류
      const results = await imageClassifier(imageDataUrl, uniqueKeywords);

      // 가장 높은 점수의 키워드 찾기
      const topResult = results.reduce((max, r) => r.score > max.score ? r : max, results[0]);

      // 해당 키워드를 가진 코어 찾기
      const matchingCore = allKeywords.find(k => k.keyword === topResult.label);

      if (matchingCore) {
        return matchingCore.id;
      }
    } catch (error) {
      console.warn('AI 분석 실패, 폴백 사용:', error);
    }
  }

  // 폴백: 랜덤 선택 (SSR 제외)
  const normalCores = Object.keys(FASHION_CORES).filter(
    id => !['unicorn-core', 'alien-core', 'npc-core'].includes(id)
  );
  return normalCores[Math.floor(Math.random() * normalCores.length)];
}

// 결과 표시
function showResults(coreId, imageDataUrl) {
  const core = FASHION_CORES[coreId];

  // 결과 데이터 채우기
  document.getElementById('core-name').textContent = core.name;
  document.getElementById('core-category').textContent = core.category;
  document.getElementById('result-image').src = imageDataUrl;
  document.getElementById('core-description-text').textContent = core.roast;

  // 스타일 특징
  const featuresHtml = core.features
    .map(f => `<span class="feature-tag">${f}</span>`)
    .join('');
  document.getElementById('style-features').innerHTML = featuresHtml;

  // 한마디 평가
  document.getElementById('roast-text').textContent = core.roast;

  // 결과 섹션 표시
  resultsSection.style.display = 'block';
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // 공유 데이터 저장
  window.currentResult = {
    coreId,
    coreName: core.name,
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
  const text = `패션 코어 분석 결과: ${result.coreName}! 여러분도 해보세요!`;
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
    const core = FASHION_CORES[result.coreId];

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('패션 코어 분석 결과', canvas.width / 2, 120);

    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(core.name, canvas.width / 2, 1100);

    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#64748b';
    wrapText(ctx, core.roast, canvas.width / 2, 1180, 900, 40);

    // 다운로드
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'fashion-core-result.png';
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

// 페이지 로드 시 AI 모델 초기화
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎨 패션 코어 분석 AI 시작!');
  // AI 모델은 첫 분석 시 로드 (성능 최적화)
});
