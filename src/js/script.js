const wrapper = document.querySelector(".wrapper");
const ESC_KEYCODE = 27;

class ModalConstructor {
    constructor(element, activeElement, openButton, closeButton) {
        this.element = wrapper.querySelector(element);
        this.activeElement = activeElement;
        this.openButton = wrapper.querySelector(openButton);
        this.closeButton = wrapper.querySelector(closeButton);
    }

    activate() {
        const modalOpenButtonClickHandler = () => {
            this.openButton.addEventListener(
                "click",
                (e) => {
                    e.preventDefault();
                    this.element.classList.add(this.activeElement);
                    wrapper.classList.add("wrapper--disabled");
                    outOfModalClickHandler();
                },
                { once: true }
            );
        };

        const modalCloseButtonClickHandler = (e) => {
            e.preventDefault();
            if (e.keyCode === ESC_KEYCODE || e.target === wrapper || e.target === this.closeButton) {
                window.removeEventListener("keydown", modalCloseButtonClickHandler);
                window.addEventListener("click", modalCloseButtonClickHandler);
                this.element.classList.remove(this.activeElement);
                wrapper.classList.remove("wrapper--disabled");
                modalOpenButtonClickHandler();
            }
        };

        const outOfModalClickHandler  = () => {
            window.addEventListener("keydown", modalCloseButtonClickHandler);
            window.addEventListener("click", modalCloseButtonClickHandler);
        };
        modalOpenButtonClickHandler();
    }
}

const menu = new ModalConstructor(".menu", "menu--active", "#openMenu", "#closeMenu");
menu.activate();

const feedback = new ModalConstructor("#modalFeedback", "modal--active", "#openFeedback", "#closeFeedback");
feedback.activate();

const call = new ModalConstructor("#modalCall", "modal--active", "#openCall", "#closeCall");
call.activate();
