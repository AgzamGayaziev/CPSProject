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
            this.openButton.addEventListener("click", (e) => {
                e.preventDefault();
                openModal();
            }, { once: true });
        };

        const openModal = () => {
            this.element.classList.add(this.activeElement);
            wrapper.classList.add("wrapper--disabled");
            outOfModalClickHandler();
        };

        const outOfModalClickHandler = () => {
            window.addEventListener("keydown", modalCloseButtonClickHandler);
            window.addEventListener("click", modalCloseButtonClickHandler);
        };

        const modalCloseButtonClickHandler = (e) => {
            e.preventDefault();
            if (e.keyCode === ESC_KEYCODE || e.target === wrapper || e.target === this.closeButton) {
                window.removeEventListener("keydown", modalCloseButtonClickHandler);
                window.addEventListener("click", modalCloseButtonClickHandler);
                closeModal();
            }
        };

        const closeModal = () => {
            this.element.classList.remove(this.activeElement);
            wrapper.classList.remove("wrapper--disabled");
            modalOpenButtonClickHandler();
        };

        modalOpenButtonClickHandler();
    }
}

const menuModal = new ModalConstructor(".menu", "menu--active", "#openMenu", "#closeMenu");
menuModal.activate();

const feedbackModal = new ModalConstructor("#modalFeedback", "modal--active", "#openFeedback", "#closeFeedback");
feedbackModal.activate();

const callModal = new ModalConstructor("#modalCall", "modal--active", "#openCall", "#closeCall");
callModal.activate();
