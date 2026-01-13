document.addEventListener('DOMContentLoaded', () => {
  // 번역
  const translations = {
    ko: {
      title: '수학 챌린지',
      subtitle: '빠른 암산 능력을 테스트하세요!',
      selectDifficulty: '난이도 선택',
      easy: '쉬움',
      normal: '보통',
      hard: '어려움',
      selectProblems: '문제 수 선택',
      startChallenge: '챌린지 시작',
      bestTime: '최단 시간',
      problems: '문제',
      time: '시간',
      accuracy: '정확도',
      results: '결과',
      totalTime: '총 시간',
      correct: '정답',
      wrong: '오답',
      avgTimePerProblem: '문제당 평균 시간',
      challengeAgain: '다시 도전',
      backHome: '홈으로',
      privacyPolicy: '개인정보처리방침',
      termsOfService: '이용약관'
    },
    en: {
      title: 'Math Challenge',
      subtitle: 'Test your mental calculation speed!',
      selectDifficulty: 'Select Difficulty',
      easy: 'Easy',
      normal: 'Normal',
      hard: 'Hard',
      selectProblems: 'Number of Problems',
      startChallenge: 'Start Challenge',
      bestTime: 'Best Time',
      problems: 'Problems',
      time: 'Time',
      accuracy: 'Accuracy',
      results: 'Results',
      totalTime: 'Total Time',
      correct: 'Correct',
      wrong: 'Wrong',
      avgTimePerProblem: 'Avg Time per Problem',
      challengeAgain: 'Challenge Again',
      backHome: 'Home',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service'
    }
  };

  let currentLang = 'en';
  try {
    currentLang = localStorage.getItem('preferredLanguage') || 'en';
  } catch (e) {
    console.warn('LocalStorage access failed:', e);
  }

  const languageSelector = document.getElementById('language-selector');
  if (languageSelector) languageSelector.value = currentLang;

  function t(key) {
    return translations[currentLang][key] || key;
  }

  function updateLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    loadBestRecord();
  }

  if (languageSelector) {
    languageSelector.addEventListener('change', (e) => {
      currentLang = e.target.value;
      try {
        localStorage.setItem('preferredLanguage', currentLang);
      } catch (e) {
        console.warn('LocalStorage save failed:', e);
      }
      updateLanguage();
    });
  }

  updateLanguage();

  // 게임 로직
  let difficulty = 'normal';
  let problemCount = 20;
  let currentProblem = 0;
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let startTime = 0;
  let correctAnswer = 0;

  const difficultySettings = {
    easy: { min: 1, max: 10 },
    normal: { min: 1, max: 50 },
    hard: { min: 1, max: 100 }
  };

  const operations = ['+', '-', '×', '÷'];

  // 난이도 선택
  document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.difficulty-btn').forEach(b => {
        b.classList.remove('active', 'border-yellow-500', 'bg-gradient-to-br', 'from-yellow-500', 'to-orange-600', 'text-white', 'shadow-lg');
        b.classList.add('border-gray-300');
      });
      btn.classList.remove('border-gray-300');
      btn.classList.add('active', 'border-yellow-500', 'bg-gradient-to-br', 'from-yellow-500', 'to-orange-600', 'text-white', 'shadow-lg');
      difficulty = btn.dataset.difficulty;
      loadBestRecord();
    });
  });

  // 문제 수 선택
  document.querySelectorAll('.problems-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.problems-btn').forEach(b => {
        b.classList.remove('active', 'border-yellow-500', 'bg-gradient-to-br', 'from-yellow-500', 'to-orange-600', 'text-white', 'shadow-lg');
        b.classList.add('border-gray-300');
      });
      btn.classList.remove('border-gray-300');
      btn.classList.add('active', 'border-yellow-500', 'bg-gradient-to-br', 'from-yellow-500', 'to-orange-600', 'text-white', 'shadow-lg');
      problemCount = parseInt(btn.dataset.problems);
      loadBestRecord();
    });
  });

  const startBtn = document.getElementById('start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', startGame);
  }

  const retryBtn = document.getElementById('retry-btn');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      hideScreen(document.getElementById('result-screen'));
      showScreen(document.getElementById('start-screen'));
    });
  }

  const homeBtn = document.getElementById('home-btn');
  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  function startGame() {
    try {
      const startScreen = document.getElementById('start-screen');
      const gameScreen = document.getElementById('game-screen');
      
      if (!startScreen || !gameScreen) {
        throw new Error('Required screen elements not found');
      }

      hideScreen(startScreen);
      showScreen(gameScreen);

      initGame();
    } catch (e) {
      console.error('Failed to start game:', e);
      alert('Error starting game. Please try again.');
    }
  }

  function initGame() {
    currentProblem = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    startTime = Date.now();

    updateGameInfo();
    generateProblem();
  }

  function generateProblem() {
    if (currentProblem >= problemCount) {
      endGame();
      return;
    }

    const settings = difficultySettings[difficulty];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let num1, num2, answer;

    // 연산에 따라 숫자 생성
    switch(operation) {
      case '+':
        num1 = randomInt(settings.min, settings.max);
        num2 = randomInt(settings.min, settings.max);
        answer = num1 + num2;
        break;
      case '-':
        num1 = randomInt(settings.min, settings.max);
        num2 = randomInt(settings.min, num1); // 음수 방지
        answer = num1 - num2;
        break;
      case '×':
        // 곱셈은 숫자를 작게
        const maxMul = Math.floor(Math.sqrt(settings.max));
        num1 = randomInt(settings.min, maxMul);
        num2 = randomInt(settings.min, maxMul);
        answer = num1 * num2;
        break;
      case '÷':
        // 나눗셈은 정확히 떨어지게
        num2 = randomInt(settings.min, Math.floor(settings.max / 10));
        answer = randomInt(settings.min, Math.floor(settings.max / num2));
        num1 = answer * num2;
        break;
    }

    correctAnswer = answer;

    // 문제 표시
    const problemDisplay = document.getElementById('problem-display');
    if (problemDisplay) {
      problemDisplay.textContent = `${num1} ${operation} ${num2} = ?`;
    }

    // 정답과 오답 3개 생성
    const answers = [answer];
    const range = Math.max(3, Math.floor(answer * 0.3)); // 30% 범위

    while (answers.length < 4) {
      const wrongAnswer = answer + randomInt(-range, range);
      if (wrongAnswer > 0 && !answers.includes(wrongAnswer)) {
        answers.push(wrongAnswer);
      }
    }

    // 섞기
    answers.sort(() => Math.random() - 0.5);

    // 답안 버튼에 할당
    const answerBtns = document.querySelectorAll('.answer-btn');
    answerBtns.forEach((btn, idx) => {
      btn.textContent = answers[idx];
      btn.onclick = () => checkAnswer(answers[idx]);
    });
  }

  function checkAnswer(selectedAnswer) {
    const problemDisplay = document.getElementById('problem-display');

    if (selectedAnswer === correctAnswer) {
      correctAnswers++;
      if (problemDisplay) {
        problemDisplay.classList.add('correct-flash');
        setTimeout(() => {
          problemDisplay.classList.remove('correct-flash');
        }, 500);
      }
    } else {
      wrongAnswers++;
      if (problemDisplay) {
        problemDisplay.classList.add('shake');
        setTimeout(() => {
          problemDisplay.classList.remove('shake');
        }, 300);
      }
    }

    currentProblem++;
    updateGameInfo();

    setTimeout(() => {
      generateProblem();
    }, 500);
  }

  function updateGameInfo() {
    const problemCountEl = document.getElementById('problem-count');
    if (problemCountEl) problemCountEl.textContent = `${currentProblem} / ${problemCount}`;

    const elapsed = (Date.now() - startTime) / 1000;
    const timeDisplayEl = document.getElementById('time-display');
    if (timeDisplayEl) timeDisplayEl.textContent = `${elapsed.toFixed(1)}s`;

    const total = correctAnswers + wrongAnswers;
    const accuracy = total > 0 ? Math.round((correctAnswers / total) * 100) : 100;
    const accuracyDisplayEl = document.getElementById('accuracy-display');
    if (accuracyDisplayEl) accuracyDisplayEl.textContent = `${accuracy}%`;
  }

  function endGame() {
    const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
    const accuracy = Math.round((correctAnswers / problemCount) * 100);
    const avgTime = (totalTime / problemCount).toFixed(2);

    const finalTimeEl = document.getElementById('final-time');
    if (finalTimeEl) finalTimeEl.textContent = `${totalTime}s`;
    
    const correctCountEl = document.getElementById('correct-count');
    if (correctCountEl) correctCountEl.textContent = correctAnswers;
    
    const wrongCountEl = document.getElementById('wrong-count');
    if (wrongCountEl) wrongCountEl.textContent = wrongAnswers;
    
    const finalAccuracyEl = document.getElementById('final-accuracy');
    if (finalAccuracyEl) finalAccuracyEl.textContent = `${accuracy}%`;
    
    const avgTimeEl = document.getElementById('avg-time');
    if (avgTimeEl) avgTimeEl.textContent = `${avgTime}s`;

    // 최고 기록 저장 (정확도 100%일 때만)
    if (accuracy === 100) {
      const key = `mathBest_${difficulty}_${problemCount}`;
      try {
        const best = localStorage.getItem(key);
        if (!best || parseFloat(totalTime) < parseFloat(best)) {
          localStorage.setItem(key, totalTime);
        }
      } catch (e) {
        console.warn('LocalStorage save failed:', e);
      }
    }

    hideScreen(document.getElementById('game-screen'));
    showScreen(document.getElementById('result-screen'));
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function showScreen(screen) {
    if (screen) {
      screen.classList.remove('hidden');
      screen.classList.add('active');
    }
  }

  function hideScreen(screen) {
    if (screen) {
      screen.classList.add('hidden');
      screen.classList.remove('active');
    }
  }

  function loadBestRecord() {
    const key = `mathBest_${difficulty}_${problemCount}`;
    try {
      const best = localStorage.getItem(key);
      const bestRecordEl = document.getElementById('best-record');
      if (bestRecordEl) bestRecordEl.textContent = best ? `${best}s` : '--';
    } catch (e) {
      console.warn('LocalStorage access failed:', e);
    }
  }

  loadBestRecord();

  // 게임 중 시간 업데이트
  setInterval(() => {
    const gameScreen = document.getElementById('game-screen');
    if (gameScreen && gameScreen.classList.contains('active')) {
      updateGameInfo();
    }
  }, 100);
});
