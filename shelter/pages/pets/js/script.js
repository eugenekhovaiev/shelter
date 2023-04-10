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
        });
    });

    // Закрытие бургер-меню при нажатии на оверлэй 
    overlay.addEventListener('click', () => {
        burger.classList.toggle('burger_active');
        menu.classList.toggle('menu_active');
        overlay.classList.toggle('overlay_active');
        document.body.classList.toggle('no-scroll');
    });


    // Пагинация

    function randTo(last) {
        return Math.floor(Math.random() * last);
    }

    function createSeed(last) {
        let seed = [];
        while (seed.length < 8) {
            let randomNumber = randTo(last);

            if (!seed.includes(randomNumber)) {
                seed.push(randomNumber);
            }
        }
        return seed;
    }
    
    function createSubseeds(seed) {
        let subseeds = [];
        subseeds.push(seed.slice(0, 3));
        subseeds.push(seed.slice(3, 6));
        subseeds.push(seed.slice(6, 8));
        return subseeds;
    }

    function shaffleArray (array) {
        let arrayCopy = [...array];
        for (let i = arrayCopy.length - 1; i > 0; i--) {
            let j = randTo(i + 1);
            [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
        }
        return arrayCopy;
    }

    function shaffleSeed(subseeds) {
        let shaffledSeed = [];
        for (let i = 0; i < subseeds.length; i++) {
            let shaffledSubseed = shaffleArray(subseeds[i]);
            shaffledSeed.push(...shaffledSubseed);
        }
        return shaffledSeed;
    }

    function createCardsSequence (pages, subseeds) {
        let cardsSequence = [];
        for (let i = 0; i < pages; i ++) {
            let shaffledSeed = shaffleSeed(subseeds);
            cardsSequence.push(...shaffledSeed);
        }
        return cardsSequence;
    }

    function createCard(petNumber) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<div class="card__picture">
                                <img src="${pets[petNumber].img}" alt="${pets[petNumber].name}">
                            </div>
                            <div class="card__title">${pets[petNumber].name}</div>
                            <button class="card__button button button_secondary">Learn more</button>`
        return card;
    }

    
    function createPages(cardsAmount, where) {
        where.innerHTML = '';
        for (let i = 0; i < cardsAmount; i++) {
            let card = createCard(cardsSequence[i]);
            where.insertAdjacentHTML('beforeend', card.outerHTML);
        }
    }

    function moveCards(step) {
        if ((page + 1 === 1 && step < 0) || (page + 1 === pageAmount && step > 0)) {
            return;
        }
        cardsWrapper.style.left = parseInt(cardsWrapper.style.left) - (step * pageWrapperWidth + step * 40) + 'px';
        page += step;
        pageActive.innerHTML = page + 1; 

        if (page + 1 === pageAmount) {
            pageNext.classList.add('button_paginator_inactive');
            pageEnd.classList.add('button_paginator_inactive');
        } else {
            pageNext.classList.remove('button_paginator_inactive');
            pageEnd.classList.remove('button_paginator_inactive');
        }

        if (page === 0) {
            pagePrev.classList.add('button_paginator_inactive');
            pageStart.classList.add('button_paginator_inactive');
        } else {
            pagePrev.classList.remove('button_paginator_inactive');
            pageStart.classList.remove('button_paginator_inactive');
        }
    }
    
    function updatePageWrapperWidth() {
        pageWrapperWidth = pageWrapper.clientWidth;
    }

    function updatePagesAmount() {
        if (pageWrapperWidth >= 1200) {
            pageAmount = 6;
        } else if (pageWrapperWidth >= 580) {
            pageAmount = 8;
        } else if (pageWrapperWidth >= 270) {
            pageAmount = 16; 
        }
    }


    let pets = [
        {
          "name": "Jennifer",
          "img": "../../assets/img/cards/jennifer.png",
          "type": "Dog",
          "breed": "Labrador",
          "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
          "age": "2 months",
          "inoculations": ["none"],
          "diseases": ["none"],
          "parasites": ["none"]
        },
        {
          "name": "Sophia",
          "img": "../../assets/img/cards/sophia.png",
          "type": "Dog",
          "breed": "Shih tzu",
          "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
          "age": "1 month",
          "inoculations": ["parvovirus"],
          "diseases": ["none"],
          "parasites": ["none"]
        },
        {
          "name": "Woody",
          "img": "../../assets/img/cards/woody.png",
          "type": "Dog",
          "breed": "Golden Retriever",
          "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
          "age": "3 years 6 months",
          "inoculations": ["adenovirus", "distemper"],
          "diseases": ["right back leg mobility reduced"],
          "parasites": ["none"]
        },
        {
          "name": "Scarlett",
          "img": "../../assets/img/cards/scarlett.png",
          "type": "Dog",
          "breed": "Jack Russell Terrier",
          "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
          "age": "3 months",
          "inoculations": ["parainfluenza"],
          "diseases": ["none"],
          "parasites": ["none"]
        },
        {
          "name": "Katrine",
          "img": "../../assets/img/cards/katrine.png",
          "type": "Cat",
          "breed": "British Shorthair",
          "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
          "age": "6 months",
          "inoculations": ["panleukopenia"],
          "diseases": ["none"],
          "parasites": ["none"]
        },
        {
          "name": "Timmy",
          "img": "../../assets/img/cards/timmy.png",
          "type": "Cat",
          "breed": "British Shorthair",
          "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
          "age": "2 years 3 months",
          "inoculations": ["calicivirus", "viral rhinotracheitis"],
          "diseases": ["kidney stones"],
          "parasites": ["none"]
        },
        {
          "name": "Freddie",
          "img": "../../assets/img/cards/freddie.png",
          "type": "Cat",
          "breed": "British Shorthair",
          "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
          "age": "2 months",
          "inoculations": ["rabies"],
          "diseases": ["none"],
          "parasites": ["none"]
        },
        {
          "name": "Charly",
          "img": "../../assets/img/cards/charly.png",
          "type": "Dog",
          "breed": "Jack Russell Terrier",
          "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
          "age": "8 years",
          "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
          "diseases": ["deafness", "blindness"],
          "parasites": ["lice", "fleas"]
        }
    ];

    let pageAmount = 6;
    
    const petsLength = pets.length;
    const cardsWrapper = document.querySelector('.pets__cards');
    const pageWrapper = document.querySelector('.pets__inner');
    let pageWrapperWidth = pageWrapper.clientWidth;
    
    let subseeds = createSubseeds(createSeed(petsLength));
    let cardsSequence = createCardsSequence(6, subseeds);
    // console.log(cardsSequence);
    
    createPages(cardsSequence.length, cardsWrapper);
    
    let page = 0;
    
    const pageStart = document.querySelector('.button_paginator_start');
    const pagePrev = document.querySelector('.button_paginator_prev');
    const pageActive = document.querySelector('.button_paginator_active');
    const pageNext = document.querySelector('.button_paginator_next');
    const pageEnd = document.querySelector('.button_paginator_end');
    
    cardsWrapper.style.left = '0px';
    
    updatePagesAmount();
    updatePageWrapperWidth();
    
    let pageWrapperWidthBefore = pageWrapperWidth;
    window.addEventListener('resize', () => {
        updatePageWrapperWidth();
        updatePagesAmount();
        if (pageWrapperWidth !== pageWrapperWidthBefore) {
            moveCards(-(page));
            cardsWrapper.style.left = '0px';
            pageWrapperWidthBefore = pageWrapperWidth;
        }
    });


    pageNext.addEventListener('click', () => {
        moveCards(1);
    });
    pagePrev.addEventListener('click', () => {
        moveCards(-1);
    });

    pageEnd.addEventListener('click', () => {
        moveCards(pageAmount - 1 - page);
    });
    pageStart.addEventListener('click', () => {
        moveCards(-(page));
    });


    // Pop-up

    const overlayPopup = document.querySelector('.overlay_popup'),
        modalWindow = document.querySelector('.card-popup'),
        popupClose = document.querySelector('.card-popup__close');
    
    listenToAllCards();

    function listenToAllCards() {
        let cardsOnPage = document.querySelectorAll('.card');
        cardsOnPage.forEach(card => {
            card.addEventListener('click', () => {
                changePopup(getCardNumber(card));
                // console.log(getCardNumber(card));
                modalWindow.classList.toggle('card-popup_active');
                overlayPopup.classList.toggle('overlay_active');
                document.body.classList.toggle('no-scroll');
            });
        });
    };

    overlayPopup.addEventListener('click', () => {
        modalWindow.classList.toggle('card-popup_active');
        overlayPopup.classList.toggle('overlay_active');
        document.body.classList.toggle('no-scroll');
    });

    popupClose.addEventListener('click', () => {
        modalWindow.classList.toggle('card-popup_active');
        overlayPopup.classList.toggle('overlay_active');
        document.body.classList.toggle('no-scroll');
    });

    function changePopup(cardNumber) {
        modalWindow.querySelector('.card-popup__title').innerHTML = pets[cardNumber].name;
        modalWindow.querySelector('img').src = pets[cardNumber].img;
        modalWindow.querySelector('.pet-type').innerHTML = pets[cardNumber].type;
        modalWindow.querySelector('.pet-breed').innerHTML = pets[cardNumber].breed;
        modalWindow.querySelector('.card-popup__descr').innerHTML = pets[cardNumber].description;
        modalWindow.querySelector('.pet-age').innerHTML = pets[cardNumber].age;
        modalWindow.querySelector('.pet-inoculations').innerHTML = pets[cardNumber].inoculations.join(', ');
        modalWindow.querySelector('.pet-diseases').innerHTML = pets[cardNumber].diseases.join(', ');
        modalWindow.querySelector('.pet-parasites').innerHTML = pets[cardNumber].parasites.join(', ');
    };

    function getCardNumber(card) {
        let petName = card.querySelector('.card__title').innerHTML;
        for (let i = 0; i < pets.length; i++) {
            if (pets[i].name === petName) {
                return i;
            }
        }
    }
});