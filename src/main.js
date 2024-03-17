import { fetchPhotoFromPixabay } from './js/pixabay-api';
import { renderPhotos } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
export const inputSearch = form.elements.search;
export const listOfPhotos = document.querySelector('.gallery');
export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', sendForm);

function sendForm(event) {
  event.preventDefault();

  listOfPhotos.innerHTML = '';

  const input = event.target.elements.search.value.trim();
  if (input !== '') {
    window.onload = () => {
      fetchPhotoFromPixabay()
        .then(photos => {
          renderPhotos(photos.hits);
          hideLoader();
        })
        .catch(error => {
          console.log(error);
          hideLoader();
          iziToast.error({
            title: 'Error',
            message: `Sorry, an error occurred while loading. Please try again!`,
            position: 'topRight',
          });
        });
    };
    window.onload();
    form.reset();
  } else {
    iziToast.error({
      title: 'Error',
      message: `Please complete the field!`,
      position: 'topRight',
    });
  }
}
