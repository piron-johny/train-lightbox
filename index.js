import { galleryItems } from "./app.js";

const imagesList = document.querySelector('.gallery');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const closeButton = document.querySelector('.lightbox__button');
const overlayBox = document.querySelector('.lightbox__overlay');


const addImages = galleryItems.map((picture, index) =>
  `<li class="gallery__item"><a
    class="gallery__link"
    href="${picture.original}"
  ><img  class="gallery__image" src='${picture.preview}' alt='${picture.description}' data-source = '${picture.original}' data-index = '${index}'> </a>
  </li>`);
imagesList.insertAdjacentHTML("beforeend", addImages.join(''));


const eachImage = imagesList.querySelectorAll('.gallery__image');
const sprayImage = [...eachImage];
    
    
imagesList.addEventListener('click', bigPicture);

function bigPicture(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    const imageUrl = event.target.dataset.source;

    lightbox.classList.add('is-open');
    lightboxImage.src = imageUrl;
    lightboxImage.alt = event.target.alt;
     
window.addEventListener('keydown', keyPress);
}

closeButton.addEventListener('click', modalClose);

function modalClose(event) {
    lightbox.classList.remove('is-open');

    lightboxImage.src = '';
    lightboxImage.alt = '';

    window.removeEventListener('keydown', keyPress);
}

overlayBox.addEventListener('click', modalClose);

function keyPress(event) {
   
    let currentIndex = 0;
     galleryItems.forEach(image => {
           if (image.original === lightboxImage.src) {
               currentIndex = galleryItems.indexOf(image);
            }
     })
    
    
    if (event.code === 'Escape') {
        modalClose();
    }
    
    if (event.code === 'ArrowRight') {

        const nextIndex = currentIndex + 1;

        lightboxImage.src = galleryItems[nextIndex].original;
        // sprayImage.indexOf(event.target.)
       
        // const img = sprayImage.find(element => element.dataset.index == currentImage);
 
        // lightboxImage.src = img.dataset.source;
        // lightboxImage.alt = img.alt;
   
        
    }
    if (event.code === 'ArrowLeft') {
        const nextIndex = currentIndex - 1;

        lightboxImage.src = galleryItems[nextIndex].original;
    //     let imageIndex = event.target.firstElementChild.dataset.index;
    // let nextIndex = Number(imageIndex) - 1;
    //  const img = sprayImage.find(element => element.dataset.index == nextIndex);
   
    // console.log(img);

    //   lightboxImage.src = img.dataset.source;
    //   lightboxImage.alt = img.alt;
        }
         
    
}


    


















/* <li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li> */