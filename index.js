import { galleryItems } from "./app.js";

const imagesList = document.querySelector(".gallery");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const closeButton = document.querySelector(".lightbox__button");
const overlayBox = document.querySelector(".lightbox__overlay");

const addImages = galleryItems.map(
  (picture, index) =>
    `<li class="gallery__item"><a
    class="gallery__link"
    href="${picture.original}"
  ><img  class="gallery__image" src='${picture.preview}' alt='${picture.description}' data-source = '${picture.original}' data-index = '${index}'> </a>
  </li>`
);
imagesList.insertAdjacentHTML("beforeend", addImages.join(""));

const eachImage = imagesList.querySelectorAll(".gallery__image");
const sprayImage = [...eachImage];

imagesList.addEventListener("click", bigPicture);

function bigPicture(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const imageUrl = event.target.dataset.source;

  lightbox.classList.add("is-open");
  lightboxImage.src = imageUrl;
  lightboxImage.alt = event.target.alt;

  window.addEventListener("keydown", keyPress);
}

closeButton.addEventListener("click", modalClose);

function modalClose(event) {
  lightbox.classList.remove("is-open");

  lightboxImage.src = "";
  lightboxImage.alt = "";

  window.removeEventListener("keydown", keyPress);
}

overlayBox.addEventListener("click", modalClose);

function keyPress(event) {
  let currentIndex = 0;
  galleryItems.forEach((image) => {
    if (image.original === lightboxImage.src) {
      currentIndex = galleryItems.indexOf(image);
    }
  });

  if (event.code === "Escape") {
    modalClose();
  }

  if (event.code === "ArrowRight") {
    let nextIndex = currentIndex + 1;
    if (currentIndex == sprayImage.length - 1) {nextIndex = '0'};

    lightboxImage.src = galleryItems[nextIndex].original;
    lightboxImage.alt = galleryItems[nextIndex].description;
  }
  if (event.code === "ArrowLeft") {
    let nextIndex = currentIndex - 1;
    if (currentIndex == '0') {nextIndex = sprayImage.length - 1};
    
    lightboxImage.src = galleryItems[nextIndex].original;
    lightboxImage.alt = galleryItems[nextIndex].description;
  }
}
