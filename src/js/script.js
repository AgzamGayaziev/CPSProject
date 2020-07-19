import Swiper from "swiper";
import "swiper/swiper-bundle.css";

const menuListener = (() => {
    const wrapper = document.querySelector(".wrapper");
    const menu = wrapper.querySelector(".menu");
    const openButton = wrapper.querySelector("#openMenu");
    const closeButton = wrapper.querySelector("#closeMenu");

    openButton.addEventListener("click", () => {
        menu.classList.add("menu--active");
        wrapper.classList.add("wrapper--disabled");
    });

    closeButton.addEventListener("click", () => {
        menu.classList.remove("menu--active");
        wrapper.classList.remove("wrapper--disabled");
    });
})();

const initSwiper = (() => {
    const breakpoint = window.matchMedia("(min-width:768px)");

    let mySwiper;

    const breakpointChecker = () => {
        if (breakpoint.matches === true) {
            if (mySwiper !== undefined) mySwiper.destroy(true, true);
            return;
        } else if (breakpoint.matches === false) {
            return enableSwiper();
        }
    };

    const enableSwiper = function () {
        mySwiper = new Swiper(".swiper-container", {
            slidesPerView: "1",
            loop: false,
            a11y: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: false,
            },
        });
    };

    breakpoint.addListener(breakpointChecker);

    breakpointChecker();
})();
