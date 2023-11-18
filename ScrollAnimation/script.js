const boxes = document.querySelectorAll('.box');

window.addEventListener('scroll', checkBox);
checkBox();

function checkBox() {
  const triggerPoint = (window.innerHeight / 5) * 4;

  boxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop < triggerPoint) {
      box.classList.add('appear');
    } else {
      box.classList.remove('appear');
    }
  });
}
