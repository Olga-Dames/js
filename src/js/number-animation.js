const throttle = require('lodash.throttle');

// Numbers animation

const refs = {
  animationEl: document.querySelector('.advantages__text'),
  numberPossFirst: document.querySelector('[data-number="1"]'),
  numberPossSecond: document.querySelector('[data-number="2"]'),
  numberPossThird: document.querySelector('[data-number="3"]'),
};

const animationElHeight = refs.animationEl.offsetHeight;
const animationElOffest = offset(refs.animationEl).top;

// console.log(
//   `Для анимации необходимо проскролить: ${
//     animationElOffest - window.innerHeight + animationElHeight - 20
//   }`
// );

function offset(el) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

const throttledOnScrollMouse = throttle(onScrollMouse, 500);

export default throttledOnScrollMouse;

window.addEventListener('scroll', throttledOnScrollMouse);

function onScrollMouse() {
  // console.log(`Проскролил px - ${scrollY}`);
  if (
    scrollY <
    animationElOffest - window.innerHeight + animationElHeight - 20
  ) {
    return;
  }
  refs.animationEl.classList.add('isActive');
  changeNumberFirst();
  changeNumberSecond();
  changeNumberThird();
  window.removeEventListener('scroll', throttledOnScrollMouse);
}

function changeNumberFirst() {
  let counter = 0;
  const timerId = setInterval(() => {
    if (counter === 721) {
      clearInterval(timerId);
    }
    refs.numberPossFirst.textContent = counter;
    counter += 7;
  }, 35);
}

function changeNumberSecond() {
  let counterSecond = 0;
  const timerId = setInterval(() => {
    if (counterSecond === 16) {
      clearInterval(timerId);
    }
    refs.numberPossSecond.textContent = counterSecond + 'kg';
    counterSecond += 1;
  }, 210);
}

function changeNumberThird() {
  let counterThird = 0;
  const timerId = setInterval(() => {
    if (counterThird === 84) {
      clearInterval(timerId);
    }
    refs.numberPossThird.textContent = counterThird;
    counterThird += 1;
  }, 42);
}
