// ==========================================
// 반응속도 테스트 게임
// ==========================================

// 게임 상태
let gameMode = 'normal';  // easy, normal, hard
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

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  loadBestRecord();
  setupModeSelection();
  setupEventListeners();
});

// 난이도 선택
function setupModeSelection() {
  const modeBtns = document.querySelectorAll('.mode-btn');
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
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
    popup.classList.toggle('show');
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

  // 카운트다운
  showInstruction('3');
  setTimeout(() => {
    showInstruction('2');
    setTimeout(() => {
      showInstruction('1');
      setTimeout(() => {
        showInstruction('시작!');
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

  // 랜덤 위치 계산 (화면 가장자리 피하기)
  const margin = settings.size;
  const maxX = window.innerWidth - margin * 2;
  const maxY = window.innerHeight - margin * 2 - 100; // 상단 UI 공간 확보

  const randomX = Math.random() * maxX + margin;
  const randomY = Math.random() * maxY + margin + 100;

  // 타겟 위치 및 크기 설정
  target.style.left = `${randomX}px`;
  target.style.top = `${randomY}px`;
  target.style.width = `${settings.size}px`;
  target.style.height = `${settings.size}px`;

  // 타겟 표시
  setTimeout(() => {
    target.classList.add('show');
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
  target.classList.remove('show');
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
  clickEffect.style.borderColor = isHit ? '#00ff00' : '#ff0000';

  // 애니메이션 재시작
  clickEffect.classList.remove('hit');
  void clickEffect.offsetWidth; // 리플로우 트리거
  clickEffect.classList.add('hit');
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
      text: '🏆 프로게이머 급!',
      message: '상위 1%의 괴물 반응속도입니다!'
    };
  } else if (ms < 200) {
    return {
      text: '⚡ 매우 빠름!',
      message: '상위 5% 수준입니다. 대단해요!'
    };
  } else if (ms < 250) {
    return {
      text: '🎯 빠름',
      message: '상위 15% 수준입니다. 훌륭합니다!'
    };
  } else if (ms < 300) {
    return {
      text: '👍 평균 이상',
      message: '상위 30% 수준입니다. 괜찮아요!'
    };
  } else if (ms < 400) {
    return {
      text: '😊 평균',
      message: '평균 수준입니다. 연습하면 더 빨라질 거예요!'
    };
  } else {
    return {
      text: '🐌 느림',
      message: '연습이 필요합니다. 다시 도전해보세요!'
    };
  }
}

// 최고 기록 저장/로드
function saveBestRecord(avg) {
  const best = localStorage.getItem('bestReactionTime');
  if (!best || avg < parseInt(best)) {
    localStorage.setItem('bestReactionTime', avg);
    document.getElementById('best-record').textContent = `${avg}ms`;
  }
}

function loadBestRecord() {
  const best = localStorage.getItem('bestReactionTime');
  if (best) {
    document.getElementById('best-record').textContent = `${best}ms`;
  }
}

// SNS 공유 함수
function shareTwitter() {
  const avg = document.getElementById('final-avg').textContent;
  const text = `반응속도 테스트 결과: ${avg}! 나는 얼마나 빠를까? 🎯`;
  const url = window.location.href;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
}

function shareFacebook() {
  const url = window.location.href;
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('링크가 복사되었습니다!');
  });
}

// 유틸리티 함수
function showScreen(screen) {
  screen.classList.add('active');
}

function hideScreen(screen) {
  screen.classList.remove('active');
}

function showInstruction(text) {
  instructionText.textContent = text;
  instructionText.classList.add('show');
}

function hideInstruction() {
  instructionText.classList.remove('show');
}

function getRandomDelay(min, max) {
  return Math.random() * (max - min) + min;
}

// 글로벌 함수 등록 (HTML onclick용)
window.shareTwitter = shareTwitter;
window.shareFacebook = shareFacebook;
window.copyLink = copyLink;
