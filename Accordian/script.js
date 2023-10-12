// const plus = document.querySelector('.question');
const contents = document.getElementsByClassName('content');

const showAnswer = () => {
  for (const content in contents) {
    contents[content].addEventListener('click', () => {
      this.classList.toggle('active');
    });
  }
};

showAnswer();
