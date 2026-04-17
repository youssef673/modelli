const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const copyBtn = document.getElementById('copyBtn');
const copyMsg = document.getElementById('copyMsg');
const finalPhrase = document.getElementById('finalPhrase');

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
    }, 1800);
  } catch (error) {
    copyMsg.textContent = 'Copia non riuscita';
    setTimeout(() => {
      copyMsg.textContent = '';
    }, 1800);
  }
});
