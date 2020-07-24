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
        const modalOpenButtonClickHandler = (e) => {
            e.preventDefault();
            openModal();
        };

        const openModal = () => {
            this.element.classList.add(this.activeElement);
            wrapper.classList.add("wrapper--disabled");
            outOfModalClickHandler();
            outOfModalKeyDownHandler();
        };

        const outOfModalClickHandler = () => {
            window.addEventListener("click", modalCloseClickHandler);
        };

        const outOfModalKeyDownHandler = () => {
            window.addEventListener("keydown", modalCloseKeyDownHandler);
        };

        const modalCloseClickHandler = (e) => {
            e.preventDefault();
            if (e.target === wrapper || e.target === this.closeButton) {
                window.removeEventListener("click", modalCloseClickHandler);
                closeModal();
            } 
        }

        const modalCloseKeyDownHandler = (e) => {
            e.preventDefault();
            if (e.keyCode === ESC_KEYCODE) {
                window.removeEventListener("keydown", modalCloseKeyDownHandler);
                closeModal();
            }
        }
        const closeModal = () => {
            this.element.classList.remove(this.activeElement);
            wrapper.classList.remove("wrapper--disabled");
            this.openButton.addEventListener("click", modalOpenButtonClickHandler, { once: true });
        };

        this.openButton.addEventListener("click", modalOpenButtonClickHandler, { once: true });
    }
}

const menuModal = new ModalConstructor(".menu", "menu--active", "#openMenu", "#closeMenu");
menuModal.activate();

const feedbackModal = new ModalConstructor("#modalFeedback", "modal--active", "#openFeedback", "#closeFeedback");
feedbackModal.activate();

const callModal = new ModalConstructor("#modalCall", "modal--active", "#openCall", "#closeCall");
callModal.activate();
