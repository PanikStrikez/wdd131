document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".button1");
    const navMenu = document.querySelector("nav ul");

    function handleResize() {
        if (window.innerWidth > 1000) {
            navMenu.classList.remove("hide");
        } else {
            navMenu.classList.add("hide");
        }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("hide");
    });

    const gallery = document.querySelector(".gallery");

    gallery.addEventListener("click", (event) => {
        const clickedImage = event.target.closest("img");
        if (!clickedImage) return;

        const imageSrc = clickedImage.src.split('-')[0] + "-full.jpg";
        const imageAlt = clickedImage.alt;

        const modal = document.createElement("dialog");
        modal.innerHTML = `<img src="${imageSrc}" alt="${imageAlt}">
                           <button class="close-viewer">X</button>`;
        document.body.appendChild(modal);

        modal.showModal();

        modal.querySelector(".close-viewer").addEventListener("click", () => {
            modal.close();
            modal.remove();
        });

        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.close();
                modal.remove();
            }
        });
    });
});