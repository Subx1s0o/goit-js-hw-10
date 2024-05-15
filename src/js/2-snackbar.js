import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const delay = document.querySelector('input[type="number"]');
const radio = document.querySelectorAll('input[type="radio"][name="state"]');

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  let selectedValue = null;
  const delayValue = delay.value;
  radio.forEach(radioButton => {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
    }
  });
  const promise = new Promise((resolve, reject) => {
    if (selectedValue === 'fulfilled') {
      setTimeout(() => {
        iziToast.show({
          title: '✅',
          message: `Fulfilled promise in ${delayValue}ms`,
          messageColor: 'white',
          backgroundColor: '#57E29A',
          position: 'topRight',
        });
        resolve();
      }, delayValue);
    } else {
      setTimeout(() => {
        iziToast.show({
          title: '❌',
          message: `Rejected promise in ${delayValue}ms`,
          messageColor: 'white',
          backgroundColor: '#E25757',
          position: 'topRight',
        });
        reject(new Error(`Rejected promise in ${delayValue}ms`));
      }, delayValue);
    }
  });
});
