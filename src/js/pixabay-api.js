import { showLoader } from '../main';

export function fetchPhotoFromPixabay(inputValue) {
  const inputValueForForm = inputValue.trim().split(',').join('+');
  const searchParams = new URLSearchParams({
    key: '42920910-4418ce5fcb505a601cb14954f',
    q: [inputValueForForm],
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  showLoader();
  return fetch(`https://pixabay.com/api/?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
