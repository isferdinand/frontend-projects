function play(e) {
  const audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
  const key = document.querySelector(`.key[data-key='${e.keyCode}']`);
  if (!audio) return; //If key is not on audio don't play
  audio.play();
  audio.currentTime = 0;
  key.classList.add('playing');
}

function endTransform(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach((key) => {
  key.addEventListener('transitionend', endTransform);
});

window.addEventListener('keydown', play);
