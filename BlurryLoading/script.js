const bg = document.querySelector('.bg');
const loadText = document.querySelector('.load-percent');

let load = 0;

const percent = setInterval(unblur, 30);

function unblur() {
  load++;

  if (load > 99) {
    clearInterval(percent);
  }

  loadText.innerText = load + '%';
  //   bg.style.opacity = scale(load, 0, 100, 0, 1);
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
}

// Map a range of numbers to another range of numbers
const scale = (num, input_min, input_max, output_min, output_max) => {
  return (
    ((num - input_min) * (output_max - output_min)) / (input_max - input_min) +
    output_min
  );
};
