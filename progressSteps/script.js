const progressLine = document.getElementById('progress-line');
const circles = document.querySelectorAll('.circle');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let activeStep = 1;

prevBtn.addEventListener('click', () => {
  activeStep--;
  if (activeStep < 1) {
    activeStep = 1;
  }

  updateStep();
});

nextBtn.addEventListener('click', () => {
  activeStep++;
  if (activeStep > circles.length) {
    activeStep = circles.length;
  }

  updateStep();
});

function updateStep() {
  circles.forEach((circle, index) => {
    if (index < activeStep) {
      circle.classList.add('active');
    } else {
      circle.classList.remove('active');
    }
  });

  const activeSteps = document.querySelectorAll('.active');
  progressLine.style.width =
    ((activeSteps.length - 1) / (circles.length - 1)) * 100 + '%';

  if (activeStep === 1) {
    prevBtn.disabled = true;
  } else if (activeStep === circles.length) {
    nextBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }
}
