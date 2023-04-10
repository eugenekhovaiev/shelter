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


    // Слайдер

    const overlayPopup = document.querySelector('.overlay_popup'),
        modalWindow = document.querySelector('.card-popup'),
        popupClose = document.querySelector('.card-popup__close');

    const sliderInner = document.querySelector('.slider__inner');
    const sliderNext = document.querySelector('.slider-next');
    const sliderPrev = document.querySelector('.slider-prev');

    let cards = [];
    let createdSlides;
    let viewport = document.querySelector('.slider').clientWidth;
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
    let createdCards = [];

    
    for (let i = 0; i < pets.length; i++) {
        cards.push(addCard(pets[i].name, pets[i].img));
    }
    // cards.push(addCard(pets[5].name, pets[5].img))
    
    function addCard(petName, petImgURL) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<div class="card__picture">
                                <img src="${petImgURL}" alt="${petName}">
                            </div>
                            <div class="card__title">${petName}</div>
                            <button class="card__button button button_secondary">Learn more</button>`
        return card;
    };
    
    function createRandomCard() {
        return cards[Math.floor(Math.random() * 8)];
    };

    function createSlide(cardAmount) {
        let slide = document.createElement('div');
        slide.classList.add('slide');

        let card;
        let cardName;
        for (let i = 0; i < cardAmount; i++) {
            card = createRandomCard();
            // console.log(card);
            // console.log(listenToCard(card));
            cardName = card.querySelector('.card__title').innerHTML;
            if (!createdCards.includes(cardName)) {
                createdCards.push(cardName);
                if (createdCards.length > cardsInSlide * 2) {
                    createdCards.shift();
                }
                slide.innerHTML += card.outerHTML;
            } else {
                i--;
            }
        };
        return slide;
    };
    
    let cardsInSlide = 0;

    let cardsOnPage = [];
    function drawSlide(where) {
        let slide;
        if (viewport === 990) {
            cardsInSlide = 3;
            slide = createSlide(cardsInSlide);
        } else if (viewport === 580) {
            cardsInSlide = 2;
            slide = createSlide(cardsInSlide);
        } else {
            cardsInSlide = 1;
            slide = createSlide(cardsInSlide);
        }
        slide.style.left = viewport * where + 'px';

        if (where === 1 || where === 0) {
            sliderInner.append(slide);
        } else {
            sliderInner.prepend(slide);
        }


        cardsOnPage = sliderInner.querySelectorAll('.card');
    };

    function initSlider() {
        drawSlide(0);
    };

    initSlider();


    let viewportBefore = viewport;
    window.addEventListener('resize', () => {
        viewport = document.querySelector('.slider').clientWidth;
        createdSlides = document.querySelectorAll('.slide');
        // cardsOnPage = sliderInner.querySelectorAll('.card');
        
        if (viewport !== viewportBefore) {
            sliderInner.innerHTML = '';
            initSlider();
            viewportBefore = viewport;
        }
        listenToAllCards();
    });

    let pos = 0;

    sliderNext.addEventListener('click', () => {
        createdSlides = document.querySelectorAll('.slide');
        if (pos === -1) {
            createdCards.reverse();
        }
        if (createdSlides.length < 2 || createdSlides[createdSlides.length - 1].style.left === '0px') {
            drawSlide(1);
        }
        setTimeout(() => {
            createdSlides = document.querySelectorAll('.slide');
            createdSlides.forEach(slide => {
                slide.style.left = (parseInt(slide.style.left) - viewport) + 'px';
            });
            if (createdSlides.length > 2) {
                setTimeout(() => {
                    createdSlides[0].remove();
                }, 500);
            }

            listenToAllCards();
        }, 100);
        
        pos = 1;
    });
    
    sliderPrev.addEventListener('click', () => {
        createdSlides = document.querySelectorAll('.slide');
        if (pos === 1) {
            createdCards.reverse();
        }
        if (createdSlides.length < 2 || createdSlides[0].style.left === '0px') {
            drawSlide(-1);
        }
        setTimeout(() => {
            createdSlides = document.querySelectorAll('.slide');
            createdSlides.forEach(slide => {
                slide.style.left = (parseInt(slide.style.left) + viewport) + 'px';
            });
            
            if (createdSlides.length > 2) {
                setTimeout(() => {
                    createdSlides[createdSlides.length - 1].remove();
                }, 500);
            }


            listenToAllCards();
        }, 100);
        
        pos = -1;
    });


    // Pop-up
    
    listenToAllCards();

    function listenToAllCards() {
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