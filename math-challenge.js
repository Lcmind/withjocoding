document.addEventListener('DOMContentLoaded', () => {
  // 번역
  const translations = {
    ko: {
      title: '수학 챌린지',
      subtitle: '빠른 암산 능력을 테스트하세요!',
      gameMethod: '게임 방법',
      mathMethodDesc: {
        0: '수학 문제가 화면에 나타납니다',
        1: '빠르게 정답을 선택하세요',
        2: '모든 문제를 완료하여 속도를 확인하세요!'
      },
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
      gameMethod: 'How to Play',
      mathMethodDesc: {
        0: 'Math problems appear on screen',
        1: 'Choose the correct answer quickly',
        2: 'Complete all problems to see your speed!'
      },
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
    },
    ja: {
      title: '数学チャレンジ',
      subtitle: '暗算の速さをテストしよう！',
      gameMethod: '遊び方',
      mathMethodDesc: {
        0: '数学の問題が画面に表示されます',
        1: '素早く正しい答えを選んでください',
        2: 'すべての問題を完了して速度を確認!'
      },
      selectDifficulty: '難易度選択',
      easy: '簡単',
      normal: '普通',
      hard: '難しい',
      selectProblems: '問題数選択',
      startChallenge: 'チャレンジ開始',
      bestTime: '最短時間',
      problems: '問題',
      time: '時間',
      accuracy: '正確度',
      results: '結果',
      totalTime: '合計時間',
      correct: '正解',
      wrong: '不正解',
      avgTimePerProblem: '問題あたりの平均時間',
      challengeAgain: '再挑戦',
      backHome: 'ホーム',
      privacyPolicy: 'プライバシーポリシー',
      termsOfService: '利用規約'
    },
    zh: {
      title: '数学挑战',
      subtitle: '测试你的心算速度！',
      gameMethod: '游戏方法',
      mathMethodDesc: {
        0: '数学题出现在屏幕上',
        1: '快速选择正确答案',
        2: '完成所有问题查看你的速度!'
      },
      selectDifficulty: '选择难度',
      easy: '简单',
      normal: '普通',
      hard: '困难',
      selectProblems: '问题数量',
      startChallenge: '开始挑战',
      bestTime: '最佳时间',
      problems: '问题',
      time: '时间',
      accuracy: '准确度',
      results: '结果',
      totalTime: '总时间',
      correct: '正确',
      wrong: '错误',
      avgTimePerProblem: '每题平均时间',
      challengeAgain: '再次挑战',
      backHome: '主页',
      privacyPolicy: '隐私政策',
      termsOfService: '服务条款'
    },
    es: {
      title: 'Desafío Matemático',
      subtitle: '¡Prueba tu velocidad de cálculo mental!',
      gameMethod: 'Cómo Jugar',
      mathMethodDesc: {
        0: 'Problemas matemáticos aparecen en pantalla',
        1: 'Elige la respuesta correcta rápidamente',
        2: '¡Completa todos los problemas para ver tu velocidad!'
      },
      selectDifficulty: 'Seleccionar Dificultad',
      easy: 'Fácil',
      normal: 'Normal',
      hard: 'Difícil',
      selectProblems: 'Número de Problemas',
      startChallenge: 'Comenzar Desafío',
      bestTime: 'Mejor Tiempo',
      problems: 'Problemas',
      time: 'Tiempo',
      accuracy: 'Precisión',
      results: 'Resultados',
      totalTime: 'Tiempo Total',
      correct: 'Correcto',
      wrong: 'Incorrecto',
      avgTimePerProblem: 'Tiempo Promedio por Problema',
      challengeAgain: 'Desafiar de Nuevo',
      backHome: 'Inicio',
      privacyPolicy: 'Política de Privacidad',
      termsOfService: 'Términos de Servicio'
    },
    fr: {
      title: 'Défi Mathématique',
      subtitle: 'Testez votre vitesse de calcul mental !',
      gameMethod: 'Comment Jouer',
      mathMethodDesc: {
        0: 'Des problèmes mathématiques apparaissent à l écran',
        1: 'Choisissez la bonne réponse rapidement',
        2: 'Complétez tous les problèmes pour voir votre vitesse!'
      },
      selectDifficulty: 'Sélectionner la Difficulté',
      easy: 'Facile',
      normal: 'Normal',
      hard: 'Difficile',
      selectProblems: 'Nombre de Problèmes',
      startChallenge: 'Commencer le Défi',
      bestTime: 'Meilleur Temps',
      problems: 'Problèmes',
      time: 'Temps',
      accuracy: 'Précision',
      results: 'Résultats',
      totalTime: 'Temps Total',
      correct: 'Correct',
      wrong: 'Incorrect',
      avgTimePerProblem: 'Temps Moyen par Problème',
      challengeAgain: 'Réessayer',
      backHome: 'Accueil',
      privacyPolicy: 'Politique de Confidentialité',
      termsOfService: 'Conditions d\'Utilisation'
    },
    de: {
      title: 'Mathe-Herausforderung',
      subtitle: 'Teste deine Kopfrechengeschwindigkeit!',
      gameMethod: 'Spielanleitung',
      mathMethodDesc: {
        0: 'Mathematikaufgaben erscheinen auf dem Bildschirm',
        1: 'Wähle schnell die richtige Antwort',
        2: 'Löse alle Aufgaben um deine Geschwindigkeit zu sehen!'
      },
      selectDifficulty: 'Schwierigkeit Wählen',
      easy: 'Einfach',
      normal: 'Normal',
      hard: 'Schwer',
      selectProblems: 'Anzahl der Aufgaben',
      startChallenge: 'Herausforderung Starten',
      bestTime: 'Beste Zeit',
      problems: 'Aufgaben',
      time: 'Zeit',
      accuracy: 'Genauigkeit',
      results: 'Ergebnisse',
      totalTime: 'Gesamtzeit',
      correct: 'Richtig',
      wrong: 'Falsch',
      avgTimePerProblem: 'Durchschnittliche Zeit pro Aufgabe',
      challengeAgain: 'Erneut Herausfordern',
      backHome: 'Startseite',
      privacyPolicy: 'Datenschutzrichtlinie',
      termsOfService: 'Nutzungsbedingungen'
    },
    pt: {
      title: 'Desafio Matemático',
      subtitle: 'Teste sua velocidade de cálculo mental!',
      gameMethod: 'Como Jogar',
      mathMethodDesc: {
        0: 'Problemas matemáticos aparecem na tela',
        1: 'Escolha a resposta correta rapidamente',
        2: 'Complete todos os problemas para ver sua velocidade!'
      },
      selectDifficulty: 'Selecionar Dificuldade',
      easy: 'Fácil',
      normal: 'Normal',
      hard: 'Difícil',
      selectProblems: 'Número de Problemas',
      startChallenge: 'Começar Desafio',
      bestTime: 'Melhor Tempo',
      problems: 'Problemas',
      time: 'Tempo',
      accuracy: 'Precisão',
      results: 'Resultados',
      totalTime: 'Tempo Total',
      correct: 'Correto',
      wrong: 'Errado',
      avgTimePerProblem: 'Tempo Médio por Problema',
      challengeAgain: 'Desafiar Novamente',
      backHome: 'Início',
      privacyPolicy: 'Política de Privacidade',
      termsOfService: 'Termos de Serviço'
    },
    ru: {
      title: 'Математический Вызов',
      subtitle: 'Проверь скорость своего устного счета!',
      gameMethod: 'Как Играть',
      mathMethodDesc: {
        0: 'Математические задачи появляются на экране',
        1: 'Быстро выбирайте правильный ответ',
        2: 'Решите все задачи чтобы увидеть свою скорость!'
      },
      selectDifficulty: 'Выбрать Сложность',
      easy: 'Легко',
      normal: 'Нормально',
      hard: 'Сложно',
      selectProblems: 'Количество Задач',
      startChallenge: 'Начать Вызов',
      bestTime: 'Лучшее Время',
      problems: 'Задачи',
      time: 'Время',
      accuracy: 'Точность',
      results: 'Результаты',
      totalTime: 'Общее Время',
      correct: 'Правильно',
      wrong: 'Неправильно',
      avgTimePerProblem: 'Среднее Время на Задачу',
      challengeAgain: 'Попробовать Снова',
      backHome: 'Главная',
      privacyPolicy: 'Политика Конфиденциальности',
      termsOfService: 'Условия Использования'
    },
    ar: {
      title: 'تحدي الرياضيات',
      subtitle: 'اختبر سرعة حسابك الذهني!',
      gameMethod: 'كيفية اللعب',
      mathMethodDesc: {
        0: 'تظهر المسائل الرياضية على الشاشة',
        1: 'اختر الإجابة الصحيحة بسرعة',
        2: 'أكمل جميع المسائل لرؤية سرعتك!'
      },
      selectDifficulty: 'اختر الصعوبة',
      easy: 'سهل',
      normal: 'عادي',
      hard: 'صعب',
      selectProblems: 'عدد المسائل',
      startChallenge: 'ابدأ التحدي',
      bestTime: 'أفضل وقت',
      problems: 'المسائل',
      time: 'الوقت',
      accuracy: 'الدقة',
      results: 'النتائج',
      totalTime: 'الوقت الإجمالي',
      correct: 'صحيح',
      wrong: 'خطأ',
      avgTimePerProblem: 'متوسط الوقت لكل مسألة',
      challengeAgain: 'تحدى مجدداً',
      backHome: 'الصفحة الرئيسية',
      privacyPolicy: 'سياسة الخصوصية',
      termsOfService: 'شروط الخدمة'
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

  // 게임 로직 변수 선언 (최상단으로 이동)
  let difficulty = 'normal';
  let problemCount = 20;
  let currentProblem = 0;
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let startTime = 0;
  let correctAnswer = 0;

  function t(key) {
    const keys = key.split('.');
    let value = translations[currentLang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
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

  // 변수 선언 제거 (상단으로 이동됨)
  const difficultySettings = {
    easy: { min: 1, max: 50, operations: ['+', '-'] },
    normal: { min: 10, max: 99, operations: ['+', '-', '×', '÷'] },
    hard: { min: 10, max: 999, operations: ['+', '-', '×', '÷'] }
  };

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
    const operation = settings.operations[Math.floor(Math.random() * settings.operations.length)];

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
        // 곱셈은 숫자를 조정
        if (difficulty === 'easy') {
          num1 = randomInt(settings.min, settings.max);
          num2 = randomInt(settings.min, settings.max);
        } else {
          // 중간, 어려움은 곱셈 결과가 너무 크지 않게
          const maxMul = Math.min(99, Math.floor(Math.sqrt(settings.max * 100)));
          num1 = randomInt(settings.min, maxMul);
          num2 = randomInt(2, 12);
        }
        answer = num1 * num2;
        break;
      case '÷':
        // 나눗셈은 정확히 떨어지게
        if (difficulty === 'easy') {
          num2 = randomInt(2, settings.max);
          answer = randomInt(1, settings.max);
        } else {
          num2 = randomInt(2, 12);
          answer = randomInt(settings.min, Math.floor(settings.max / num2));
        }
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
