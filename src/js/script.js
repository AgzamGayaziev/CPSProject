const wrapper = document.querySelector(".wrapper");
const buttonEscape = 27;

class ModalConstructor {
    constructor(element, activeElement, openButton, closeButton) {
        this.element = wrapper.querySelector(element);
        this.activeElement = activeElement;
        this.openButton = wrapper.querySelector(openButton);
        this.closeButton = wrapper.querySelector(closeButton);
    }

    activate() {
        const awaitModalOpen = () => {
            this.openButton.addEventListener(
                "click",
                (e) => {
                    e.preventDefault();
                    this.element.classList.add(this.activeElement);
                    wrapper.classList.add("wrapper--disabled");
                    awaitClose();
                },
                { once: true }
            );
        };

        const awaitModalClose = (e) => {
            e.preventDefault();
            if (e.keyCode === buttonEscape || e.target === wrapper || e.target === this.closeButton) {
                window.removeEventListener("keydown", awaitModalClose);
                window.addEventListener("click", awaitModalClose);
                this.element.classList.remove(this.activeElement);
                wrapper.classList.remove("wrapper--disabled");

                awaitModalOpen();
            }
        };

        const awaitClose = () => {
            window.addEventListener("keydown", awaitModalClose);
            window.addEventListener("click", awaitModalClose);
        };
        awaitModalOpen();
    }
}

const menu = new ModalConstructor(".menu", "menu--active", "#openMenu", "#closeMenu *");
menu.activate();

const feedback = new ModalConstructor("#modalFeedback", "modal--active", "#openFeedback", "#closeFeedback *");
feedback.activate();

const call = new ModalConstructor("#modalCall", "modal--active", "#openCall", "#closeCall *");
call.activate();
