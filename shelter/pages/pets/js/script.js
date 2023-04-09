"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger'),
        menu = document.querySelector('.menu'),
        overlay = document.querySelector('.overlay_menu'),
        menuItems = document.querySelectorAll('.menu__item');

    let pageWidth = document.documentElement.scrollWidth;
    window.addEventListener('resize', () => {
        pageWidth = document.documentElement.scrollWidth;
    });
    
    // Открытие-закрытие бургер-меню при нажатии на иконку бургера  
    burger.addEventListener('click', () => {
        burger.classList.toggle('burger_active');
        menu.classList.toggle('menu_active');
        overlay.classList.toggle('overlay_active');
        document.body.classList.toggle('no-scroll');
    });

    // Закрытие бургер-меню при нажатии на любую из ссылок в меню  
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (pageWidth < 768) {
                burger.classList.toggle('burger_active');
                menu.classList.toggle('menu_active');
                overlay.classList.toggle('overlay_active');
                document.body.classList.toggle('no-scroll');
            }

            // ?Пробный функционал для изменения класса активности пункта меню 

            // menuItems.forEach(item => {
            //     for (let key in item.classList) {
            //         if (item.classList[key] == 'menu__item_active') {
            //             console.log(true);
            //             item.classList.toggle('menu__item_active');
            //         }
            //     }
            // });
            // item.classList.toggle('menu__item_active');
        });
    });

    // Закрытие бургер-меню при нажатии на оверлэй 
    overlay.addEventListener('click', () => {
        burger.classList.toggle('burger_active');
        menu.classList.toggle('menu_active');
        overlay.classList.toggle('overlay_active');
        document.body.classList.toggle('no-scroll');
    });
});