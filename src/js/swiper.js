import Swiper, { Pagination } from "swiper";
Swiper.use(Pagination);

const breakpoint = window.matchMedia("(min-width:768px)");

let mySwiper;

const breakpointChecker = () => {
    if (breakpoint.matches === true) {
        if (mySwiper !== undefined) {
            mySwiper.destroy(true, true);
        } else {
            return;
        }
    } else if (breakpoint.matches === false) {
        return enableSwiper();
    }
};

const enableSwiper = function () {
    mySwiper = new Swiper(".swiper", {
        slidesPerView: "auto",
        loop: false,
        a11y: true,
        spaceBetween: 16,
        slideClass: "swiper__slide",
        slideActiveClass: "swiper__slide--active",
        wrapperClass: "swiper__wrapper",
        containerModifierClass: "swiper--",
        slideNextClass: "swiper__slide--next",
        slidePrevClass: "swiper__slide--prev",
        pagination: {
            el: ".swiper__pagination",
            clickable: false,
            modifierClass: "swiper__pagination--",
            bulletClass: "swiper__bullet",
            bulletActiveClass: "swiper__bullet--active",
        },
    });
};

breakpoint.addListener(breakpointChecker);

breakpointChecker();
