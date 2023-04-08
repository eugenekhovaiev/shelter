"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger'),
          menu = document.querySelector('.menu'),
          overlay = document.querySelector('.overlay'),
          menuItems = document.querySelectorAll('.menu__item');
    
    burger.addEventListener('click', () => {
        burger.classList.toggle('burger_active');
        menu.classList.toggle('menu_active');
        overlay.classList.toggle('overlay_active');
        document.body.classList.toggle('no-scroll');
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            burger.classList.toggle('burger_active');
            menu.classList.toggle('menu_active');
            overlay.classList.toggle('overlay_active');
            document.body.classList.toggle('no-scroll');
        });
    });

    overlay.addEventListener('click', () => {
        burger.classList.toggle('burger_active');
        menu.classList.toggle('menu_active');
        overlay.classList.toggle('overlay_active');
        document.body.classList.toggle('no-scroll');
    });
});