'use strict'
@@include('testWebP.js');
//анимация бургера
let spoiler__content = document.getElementById('menu');
document.querySelector('.head__burger').addEventListener('click',
   function () {
      document.querySelector('.head__burger span').classList.toggle('active');
      spoiler__content = document.getElementById('menu');
      slideToggle(spoiler__content);
   })
//анимация бургера
//функция анимации спойлера
function slideToggle(target, duration = 500) {
   if (window.getComputedStyle(target).display === 'none') {
      return slideDown(target, duration);
   } else {
      return slideUp(target, duration);
   }
}

function slideUp(target, duration = 500) {
   target.style.transitionProperty = 'height, margin, padding';
   target.style.transitionDuration = duration + 'ms';
   target.style.boxSizing = 'border-box';
   target.style.height = target.offsetHeight + 'px';
   target.offsetHeight;
   target.style.overflow = 'hidden';
   target.style.height = 0;
   target.style.paddingTop = 0;
   target.style.paddingBottom = 0;
   target.style.marginTop = 0;
   target.style.marginBottom = 0;
   window.setTimeout(() => {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      //alert("!");
   }, duration);
}

function slideDown(target, duration = 500) {
   target.style.removeProperty('display');
   let display = window.getComputedStyle(target).display;

   if (display === 'none')
      display = 'inline-flex';

   target.style.display = display;
   let height = target.offsetHeight;
   target.style.overflow = 'hidden';
   target.style.height = 0;
   target.style.paddingTop = 0;
   target.style.paddingBottom = 0;
   target.style.marginTop = 0;
   target.style.marginBottom = 0;
   target.offsetHeight;
   target.style.boxSizing = 'border-box';
   target.style.transitionProperty = "height, margin, padding";
   target.style.transitionDuration = duration + 'ms';
   target.style.height = height + 'px';
   target.style.removeProperty('padding-top');
   target.style.removeProperty('padding-bottom');
   target.style.removeProperty('margin-top');
   target.style.removeProperty('margin-bottom');
   window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
   }, duration);
}
//функция анимации спойлера

let ratings = document.querySelectorAll('.rating');
if (ratings.length > 0) {
   initRatings();
}


//Основная функция
function initRatings() {
   let ratingActive, ratingValue;
   for (let i = 0; i < ratings.length; i++) {
      let rating = ratings[i];
      initRating(rating);
   }

   function initRating(rating) {
      initRatingVar(rating);

      setRatingActiveWidth();
      if (rating.classList.contains('rating__set')) {
         setRating(rating);
      }
   }

   function initRatingVar(rating) {
      ratingActive = rating.querySelector('.rating__active');
      ratingValue = rating.querySelector('.rating__value');
   }
   function setRatingActiveWidth(i = ratingValue.innerHTML) {
      let ratingActiveWidth = i / 0.05;
      ratingActive.style.width = `${ratingActiveWidth}%`;
   }

   function setRating(rating) {
      let ratingItems = rating.querySelectorAll('.rating__item');
      for (let i = 0; i < ratingItems.length; i++) {
         let ratingItem = ratingItems[i];
         ratingItem.addEventListener("mouseenter", function (e) {
            initRatingVar(rating);
            setRatingActiveWidth(ratingItem.value);
         });
         ratingItem.addEventListener("mouseleave", function (e) {
            setRatingActiveWidth();
         });
         ratingItem.addEventListener("click", function (e) {
            initRatingVar(rating);

            if (rating.dataset.ajax) {
               setRatingValue(ratingItem.value, rating);
            } else {
               ratingValue.innerHTML = i + 1;
               setRatingActiveWidth();
            }
         });
      }
   }


   async function setRatingValue(value, rating) {
      if (!rating.classList.contains('rating__sanding')) {
         rating.classList.add('rating__sanding');



         let response = await fetch('rating.json', {
            // method: 'POST',
            // body: JSON.stringify({
            //    userRating: value
            // }),
            // headers: {
            //    'content-type': 'aplication/json'
            // }
         });
         if (response.ok) {
            let result = await response.json();
            let newRating = result.newRating;
            let newVotes = result.votes;
            let votesValue = document.querySelector('.rating__vote');
            votesValue.innerHTML = `(${newVotes})`;
            ratingValue.innerHTML = newRating;
            setRatingActiveWidth();
            // rating.classList.remove('rating_sending');
         } else {
            rating.classList.remove('rating_sending')
         }
      }
   }
}
console.log(document.documentElement.clientWidth)
// Слайдер
function slider() {

   document.querySelector('.previews').addEventListener('click',
      function (e) {
         if (e.target.tagName === 'IMG') {
            let largeImg = document.querySelector('.large__image source');
            let preview = e.target.parentNode.parentNode.parentNode
            let anotherpreview = document.querySelectorAll('.preview')
            for (let i = 0; i < anotherpreview.length; i++) {
               anotherpreview[i].classList.remove('activeImg');
            }
            preview.classList.add('activeImg')
            let some = e.srcElement.currentSrc
            largeImg.srcset = some;
            if (modal.style.display == "flex") { zoom() }
         }
      })
   let imgClick = document.getElementById("myImg");
   let modal = document.getElementById("myModal");
   let img = document.querySelector('.my__img source');
   let modalImg = document.querySelector('.modal__img source');
   let zooming = document.querySelector('.zoom');

   function zoom() {
      modal.style.display = "flex";
      modalImg.srcset = img.srcset;
   }
   function zoomImg() {
      if (document.documentElement.clientWidth > 870) {
         imgClick.onclick = zoom;
         zooming.onclick = zoom;
         modal.onclick = () => {
            modal.style.display = "none";
         }
      }
   }
   zoomImg()
}
// Слайдер
//Каталог
function openCatalog() {
   document.querySelector('.header__catalog span').addEventListener('click',
      function () {
         document.querySelector('.header__catalog').classList.toggle('active');
         document.querySelector('.header__product').classList.toggle('active');
         document.querySelector('.header__product-professional').classList.remove('active');
      })

   document.querySelector('.catalog__professional').addEventListener('click',
      function () {
         document.querySelector('.header__product-professional').classList.add('active');
      })

   document.querySelector('.catalog__home').addEventListener('click',
      function () {
         document.querySelector('.header__product').classList.add('active');
         document.querySelector('.header__product-professional').classList.remove('active');
      })
}
//Каталог
openCatalog()
slider()