const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const copyBtn = document.getElementById('copyBtn');
const copyMsg = document.getElementById('copyMsg');
const finalPhrase = document.getElementById('finalPhrase');
const progressBar = document.getElementById('progressBar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const resetQuizBtn = document.getElementById('resetQuizBtn');
const scoreValue = document.getElementById('scoreValue');
const quizButtons = document.querySelectorAll('.quiz-btn');

const answered = {};

if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
});

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(finalPhrase.textContent.trim());
    copyMsg.textContent = 'Copiata!';
    setTimeout(() => copyMsg.textContent = '', 1600);
  } catch (error) {
    copyMsg.textContent = 'Copia non riuscita';
    setTimeout(() => copyMsg.textContent = '', 1600);
  }
});

function updateScore() {
  const correctAnswers = Object.values(answered).filter(Boolean).length;
  scoreValue.textContent = correctAnswers;
}

quizButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const quizId = button.dataset.quiz;
    const isCorrect = button.dataset.correct === 'true';
    const result = document.getElementById(`quizResult${quizId}`);
    const relatedButtons = document.querySelectorAll(`.quiz-btn[data-quiz="${quizId}"]`);

    relatedButtons.forEach((btn) => {
      btn.classList.remove('selected-correct', 'selected-wrong');
    });

    button.classList.add(isCorrect ? 'selected-correct' : 'selected-wrong');

    if (isCorrect) {
      result.textContent = 'Corretto.';
      result.style.color = 'var(--success)';
    } else {
      result.textContent = 'Risposta sbagliata. Riprova.';
      result.style.color = 'var(--danger)';
    }

    answered[quizId] = isCorrect;
    updateScore();
  });
});

resetQuizBtn.addEventListener('click', () => {
  Object.keys(answered).forEach((key) => delete answered[key]);
  scoreValue.textContent = '0';

  document.querySelectorAll('.quiz-result').forEach((el) => {
    el.textContent = '';
    el.style.color = '';
  });

  document.querySelectorAll('.quiz-btn').forEach((btn) => {
    btn.classList.remove('selected-correct', 'selected-wrong');
  });
});

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = (scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0) + '%';
});

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});
