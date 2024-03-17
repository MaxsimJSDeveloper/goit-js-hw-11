import { fetchPhotoFromPixabay } from './js/pixabay-api';
import { renderPhotos } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
export const listOfPhotos = document.querySelector('.gallery');
export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const preloader = document.querySelector('.loader');
preloader.style.display = 'none';

export const showLoader = () => {
  preloader.style.display = 'flex';
};
const hideLoader = () => {
  preloader.style.display = 'none';
};

form.addEventListener('submit', sendForm);

function sendForm(event) {
  event.preventDefault();
  listOfPhotos.innerHTML = '';

  const input = form.elements.search.value.trim();
  if (input !== '') {
    showLoader();
    fetchPhotoFromPixabay(input)
      .then(photos => {
        renderPhotos(photos.hits);
        hideLoader();
        form.reset();
      })
      .catch(error => {
        console.error(error);
        hideLoader();
        iziToast.error({
          message: `Sorry, an error occurred while loading. Please try again!`,
          position: 'topRight',
        });
      });
  } else {
    iziToast.error({
      message: `Please complete the field!`,
      position: 'topRight',
    });
  }
}
