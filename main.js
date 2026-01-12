// ==========================================
// FPS 반응속도 테스트 게임
// ==========================================

// 게임 상태
let gameMode = 'normal';
let targetCount = 0;
let maxTargets = 10;
let reactionTimes = [];
let targetAppearTime = 0;
let missedClicks = 0;
let isTargetVisible = false;

// 난이도별 설정
const modeSettings = {
  easy: { size: 120, delay: [800, 1500] },
  normal: { size: 80, delay: [500, 1200] },
  hard: { size: 50, delay: [300, 900] }
};

// DOM 요소
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const retryBtn = document.getElementById('retry-btn');
const shareBtn = document.getElementById('share-btn');
const target = document.getElementById('target');
const clickEffect = document.getElementById('click-effect');
const instructionText = document.getElementById('instruction-text');
const gameArea = document.getElementById('game-area');
const footer = document.getElementById('footer');
const languageSelector = document.getElementById('language-selector');

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  // 언어 초기화
  languageSelector.value = currentLang;
  updateUILanguage();

  loadBestRecord();
  loadHistory();
  setupModeSelection();
  setupEventListeners();

  // AdSense 광고 로드
  if (window.adsbygoogle) {
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log('AdSense not loaded yet');
    }
  }
});

// 언어 전환
languageSelector.addEventListener('change', (e) => {
  setLanguage(e.target.value);
});

// UI 언어 업데이트 함수
function updateUILanguage() {
  // data-i18n 속성을 가진 모든 요소 업데이트
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key);

    if (Array.isArray(translation)) {
      el.textContent = translation.join(' ');
    } else {
      el.textContent = translation;
    }
  });

  // 최고 기록 다시 로드
  loadBestRecord();
  loadHistory();
}

// 전역으로 노출
window.updateUILanguage = updateUILanguage;

// 난이도 선택
function setupModeSelection() {
  const modeBtns = document.querySelectorAll('.mode-btn');
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => {
        b.classList.remove('active', 'border-primary', 'bg-gradient-to-br', 'from-primary', 'to-secondary', 'text-white', 'shadow-lg');
        b.classList.add('border-gray-300');
      });
      btn.classList.remove('border-gray-300');
      btn.classList.add('active', 'border-primary', 'bg-gradient-to-br', 'from-primary', 'to-secondary', 'text-white', 'shadow-lg');
      gameMode = btn.dataset.mode;
    });
  });
}

// 이벤트 리스너
function setupEventListeners() {
  startBtn.addEventListener('click', startGame);
  retryBtn.addEventListener('click', () => {
    hideScreen(resultScreen);
    showScreen(startScreen);
  });

  shareBtn.addEventListener('click', () => {
    const popup = document.getElementById('share-popup');
    popup.classList.toggle('hidden');
  });

  // 타겟 클릭
  target.addEventListener('click', onTargetClick);

  // 빗나간 클릭 감지
  gameArea.addEventListener('click', (e) => {
    if (e.target !== target && isTargetVisible) {
      missedClicks++;
      showClickEffect(e.clientX, e.clientY, false);
    }
  });
}

// 게임 시작
function startGame() {
  // 초기화
  targetCount = 0;
  reactionTimes = [];
  missedClicks = 0;
  isTargetVisible = false;

  // 화면 전환
  hideScreen(startScreen);
  showScreen(gameScreen);

  // Footer 숨기기
  footer.style.opacity = '0';
  footer.style.pointerEvents = 'none';

  // 카운트다운
  showInstruction('3');
  setTimeout(() => {
    showInstruction('2');
    setTimeout(() => {
      showInstruction('1');
      setTimeout(() => {
        showInstruction(t('start'));
        setTimeout(() => {
          hideInstruction();
          spawnTarget();
        }, 500);
      }, 1000);
    }, 1000);
  }, 1000);
}

// 타겟 생성
function spawnTarget() {
  if (targetCount >= maxTargets) {
    endGame();
    return;
  }

  const settings = modeSettings[gameMode];

  // 랜덤 위치 계산
  const margin = settings.size;
  const maxX = window.innerWidth - margin * 2;
  const maxY = window.innerHeight - margin * 2 - 100;

  const randomX = Math.random() * maxX + margin;
  const randomY = Math.random() * maxY + margin + 100;

  // 타겟 위치 및 크기 설정
  target.style.left = `${randomX}px`;
  target.style.top = `${randomY}px`;
  target.style.width = `${settings.size}px`;
  target.style.height = `${settings.size}px`;

  // 타겟 표시
  setTimeout(() => {
    target.classList.remove('opacity-0', 'scale-0');
    target.classList.add('opacity-100', 'scale-100', 'target-pulse');
    isTargetVisible = true;
    targetAppearTime = Date.now();
  }, getRandomDelay(settings.delay[0], settings.delay[1]));
}

// 타겟 클릭 처리
function onTargetClick(e) {
  if (!isTargetVisible) return;

  e.stopPropagation();

  // 반응속도 계산
  const reactionTime = Date.now() - targetAppearTime;
  reactionTimes.push(reactionTime);

  // 타겟 제거
  target.classList.remove('opacity-100', 'scale-100', 'target-pulse');
  target.classList.add('opacity-0', 'scale-0');
  isTargetVisible = false;

  // 클릭 효과
  showClickEffect(e.clientX, e.clientY, true);

  // 카운터 업데이트
  targetCount++;
  updateGameInfo();

  // 다음 타겟
  setTimeout(() => spawnTarget(), 500);
}

// 클릭 효과 표시
function showClickEffect(x, y, isHit) {
  clickEffect.style.left = `${x - 50}px`;
  clickEffect.style.top = `${y - 50}px`;
  clickEffect.className = `absolute w-24 h-24 border-4 rounded-full pointer-events-none ${isHit ? 'border-green-500' : 'border-red-500'}`;

  // 애니메이션
  clickEffect.classList.remove('opacity-0', 'scale-0');
  clickEffect.classList.add('hit-effect-anim');

  setTimeout(() => {
    clickEffect.classList.add('opacity-0', 'scale-0');
    clickEffect.classList.remove('hit-effect-anim');
  }, 500);
}

// 게임 정보 업데이트
function updateGameInfo() {
  document.getElementById('target-count').textContent = `${targetCount} / ${maxTargets}`;

  if (reactionTimes.length > 0) {
    const avg = Math.round(reactionTimes.reduce((a, b) => a + b) / reactionTimes.length);
    document.getElementById('avg-time').textContent = `${avg}ms`;
  }
}

// 게임 종료
function endGame() {
  hideScreen(gameScreen);
  showScreen(resultScreen);

  // Footer 다시 표시
  footer.style.opacity = '1';
  footer.style.pointerEvents = 'auto';

  displayResults();
}

// 결과 표시
function displayResults() {
  const avg = Math.round(reactionTimes.reduce((a, b) => a + b) / reactionTimes.length);
  const best = Math.min(...reactionTimes);
  const worst = Math.max(...reactionTimes);
  const accuracy = Math.round((targetCount / (targetCount + missedClicks)) * 100);

  // 결과 표시
  document.getElementById('final-avg').textContent = `${avg}ms`;
  document.getElementById('best-time').textContent = `${best}ms`;
  document.getElementById('worst-time').textContent = `${worst}ms`;
  document.getElementById('accuracy').textContent = `${accuracy}%`;

  // 등급 평가
  const rating = getRating(avg);
  document.getElementById('rating-text').textContent = rating.text;
  document.getElementById('ranking-message').textContent = rating.message;

  // 최고 기록 저장
  saveBestRecord(avg);
}

// 등급 평가
function getRating(ms) {
  if (ms < 150) {
    return {
      text: t('rating.proGamer'),
      message: t('rankingMsg.proGamer')
    };
  } else if (ms < 200) {
    return {
      text: t('rating.veryFast'),
      message: t('rankingMsg.veryFast')
    };
  } else if (ms < 250) {
    return {
      text: t('rating.fast'),
      message: t('rankingMsg.fast')
    };
  } else if (ms < 300) {
    return {
      text: t('rating.aboveAvg'),
      message: t('rankingMsg.aboveAvg')
    };
  } else if (ms < 400) {
    return {
      text: t('rating.average'),
      message: t('rankingMsg.average')
    };
  } else {
    return {
      text: t('rating.slow'),
      message: t('rankingMsg.slow')
    };
  }
}

// 최고 기록 저장/로드
function saveBestRecord(avg) {
  saveToHistory(avg);

  const best = localStorage.getItem('bestReactionTime');
  if (!best || avg < parseInt(best)) {
    localStorage.setItem('bestReactionTime', avg);
    const bestRecordEl = document.getElementById('best-record');
    bestRecordEl.textContent = `${avg}ms`;
    bestRecordEl.removeAttribute('data-i18n');
  }
}

function loadBestRecord() {
  const best = localStorage.getItem('bestReactionTime');
  const bestRecordEl = document.getElementById('best-record');
  if (best) {
    bestRecordEl.textContent = `${best}ms`;
    bestRecordEl.removeAttribute('data-i18n');
  } else {
    bestRecordEl.textContent = t('none');
  }
}

// 히스토리 저장/로드
function saveToHistory(avg) {
  let history = JSON.parse(localStorage.getItem('reactionHistory') || '[]');

  history.push({
    time: avg,
    date: new Date().toISOString(),
    mode: gameMode
  });

  // 최신 50개만 유지
  if (history.length > 50) {
    history = history.slice(-50);
  }

  localStorage.setItem('reactionHistory', JSON.stringify(history));
  loadHistory();
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem('reactionHistory') || '[]');
  const historyList = document.getElementById('history-list');

  if (history.length === 0) {
    historyList.innerHTML = `<p class="text-center text-gray-500 py-8">${t('noRecordsYet')}</p>`;
    return;
  }

  // 시간 순으로 정렬
  const sortedHistory = [...history].sort((a, b) => a.time - b.time).slice(0, 10);

  let html = '';
  sortedHistory.forEach((record, index) => {
    const date = new Date(record.date);
    const dateStr = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;

    let borderColor = 'border-primary';
    let rankDisplay = `${index + 1}.`;

    if (index === 0) {
      borderColor = 'border-yellow-400';
      rankDisplay = '🥇';
    } else if (index === 1) {
      borderColor = 'border-gray-400';
      rankDisplay = '🥈';
    } else if (index === 2) {
      borderColor = 'border-orange-600';
      rankDisplay = '🥉';
    }

    const modeEmoji = {
      'easy': '🟢',
      'normal': '🟡',
      'hard': '🔴'
    }[record.mode] || '🟡';

    html += `
      <div class="flex items-center justify-between p-3 mb-2 bg-white rounded-lg border-l-4 ${borderColor}">
        <div class="font-bold text-lg text-primary min-w-[40px]">${rankDisplay}</div>
        <div class="flex-1 mx-4">
          <div class="font-bold text-lg">${record.time}ms ${modeEmoji}</div>
          <div class="text-sm text-gray-500">${dateStr}</div>
        </div>
      </div>
    `;
  });

  historyList.innerHTML = html;
}

// SNS 공유 함수
function shareTwitter() {
  const avg = document.getElementById('final-avg').textContent;
  const text = t('shareText').replace('{time}', avg);
  const url = window.location.href.split('?')[0];
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
}

function shareFacebook() {
  const url = window.location.href.split('?')[0];
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}

function shareInstagram() {
  // Instagram은 직접 공유 불가, 링크 복사
  copyLink();
  alert('Instagram에서는 링크가 복사되었습니다. 스토리나 게시물에 붙여넣기 하세요!');
}

function copyLink() {
  const url = window.location.href.split('?')[0];
  navigator.clipboard.writeText(url).then(() => {
    alert(t('linkCopied'));
  });
}

// 유틸리티 함수
function showScreen(screen) {
  screen.classList.remove('hidden');
  screen.classList.add('active');
}

function hideScreen(screen) {
  screen.classList.add('hidden');
  screen.classList.remove('active');
}

function showInstruction(text) {
  instructionText.textContent = text;
  instructionText.classList.remove('opacity-0');
  instructionText.classList.add('opacity-100');
}

function hideInstruction() {
  instructionText.classList.remove('opacity-100');
  instructionText.classList.add('opacity-0');
}

function getRandomDelay(min, max) {
  return Math.random() * (max - min) + min;
}

// 글로벌 함수 등록
window.shareTwitter = shareTwitter;
window.shareFacebook = shareFacebook;
window.shareInstagram = shareInstagram;
window.copyLink = copyLink;
