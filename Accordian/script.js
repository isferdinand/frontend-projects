const contents = document.querySelectorAll('.content');

const displayAnswer = () => {
  contents.forEach((content) => {
    content.addEventListener('click', (e) => {
      e.target.parentElement.classList.toggle('active');
    });
  });
};

displayAnswer();
