const btn = document.querySelector('.btn');
const searchDiv = document.querySelector('.search');
const input = document.querySelector('.search-bar');

btn.addEventListener('click', () => {
  searchDiv.classList.toggle('active');
  input.focus();
});
