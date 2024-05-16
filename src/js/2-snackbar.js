import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const delay = document.querySelector('input[type="number"]');

const form = document.querySelector('form');

function createPromise(value, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const delayValue = parseInt(delay.value);
  const radio = document.querySelector('input[type="radio"]:checked');
  const selectedValue = radio.value;
  createPromise(selectedValue, delayValue)
    .then(delay => {
      iziToast.show({
        title: '✅',
        message: `Fulfilled promise in ${delay}ms`,
        messageColor: 'white',
        backgroundColor: '#57E29A',
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.show({
        title: '❌',
        message: `Rejected promise in ${delay}ms`,
        messageColor: 'white',
        backgroundColor: '#E25757',
        position: 'topRight',
      });
    });
});
