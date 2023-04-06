//Mobile menu
//-------------------------------------------------------------------------------------
(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');

  const toggleMenu = () => {
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');

    const scrollLockMethod = !isMenuOpen
      ? 'disableBodyScroll'
      : 'enableBodyScroll';
    bodyScrollLock[scrollLockMethod](document.body);
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  // Close the mobile menu on wider screens if the device orientation changes
  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    bodyScrollLock.enableBodyScroll(document.body);
  });
})();

//Swiper
//-------------------------------------------------------------------------------------
import './js/header-scroll';
import Swiper, { Pagination, Keyboard, Autoplay } from 'swiper';
import '../node_modules/swiper/swiper.scss';

const swiper = new Swiper('[data-swiper="gallery"]', {
  modules: [Keyboard, Autoplay],
  keyboard: {
    enabled: true,
  },
  loop: true,
  autoplay: {
    delay: 3000,
  },
  speed: 800,
});

const swiperReviews = new Swiper('[data-swiper="reviews"]', {
  modules: [Pagination, Keyboard],
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  keyboard: {
    enabled: true,
  },
  loop: true,
  speed: 800,
});

//Modal window
//-------------------------------------------------------------------------------------

import { onModalOpen } from './js/modal-all';

document.addEventListener('DOMContentLoaded', onModalOpen); // end ready

//--------------------------------------------------------------------------------------
// Numbers animation
import throttledOnScrollMouse from './js/number-animation';

window.addEventListener('scroll', throttledOnScrollMouse);
