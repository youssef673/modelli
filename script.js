const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const copyBtn = document.getElementById('copyBtn');
const copyMsg = document.getElementById('copyMsg');
const finalPhrase = document.getElementById('finalPhrase');
const quizButtons = document.querySelectorAll('.quiz-btn');
const quizResult = document.getElementById('quizResult');
const progressBar = document.getElementById('progressBar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  const theme = body.classList.contains('light') ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
});

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(finalPhrase.textContent.trim());
    copyMsg.textContent = 'Copiata!';
    setTimeout(() => {
      copyMsg.textContent = '';
    }, 1600);
  } catch (error) {
    copyMsg.textContent = 'Copia non riuscita';
    setTimeout(() => {
      copyMsg.textContent = '';
    }, 1600);
  }
});

quizButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const isCorrect = button.dataset.correct === 'true';
    if (isCorrect) {
      quizResult.textContent = 'Risposta corretta: McCall usa prospettive, Boehm usa livelli.';
    } else {
      quizResult.textContent = 'Non esatto. Riprova: pensa a prospettive contro livelli gerarchici.';
    }
  });
});

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = progress + '%';
});

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});
