import Swiper, { Pagination } from "swiper";
Swiper.use(Pagination);

const menuController = (() => {
    const wrapper = document.querySelector(".wrapper");
    const menu = wrapper.querySelector(".menu");
    const openButton = wrapper.querySelector("#openMenu");
    const closeButton = wrapper.querySelector("#closeMenu *");

    function menuOpenHandler() {
        openButton.addEventListener(
            "click",
            (e) => {
                e.preventDefault();
                menu.classList.add("menu--active");
                wrapper.classList.add("wrapper--disabled");
                awaitClose();
            },
            { once: true }
        );
    }

    function menuCloseHandler(e) {
        e.preventDefault();
        if (e.keyCode === 27 || e.target === wrapper || e.target === closeButton) {
            window.removeEventListener("keydown", menuCloseHandler);
            window.addEventListener("click", menuCloseHandler);
            menu.classList.remove("menu--active");
            wrapper.classList.remove("wrapper--disabled");

            menuOpenHandler();
        }
    }

    function awaitClose() {
        window.addEventListener("keydown", menuCloseHandler);
        window.addEventListener("click", menuCloseHandler);
    }

    menuOpenHandler();
})();

const initSwiper = (() => {
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
})();
