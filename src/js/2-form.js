const input = document.querySelector('.feedback-form input');
const text = document.querySelector('.feedback-form textarea');
const form = document.querySelector('.feedback-form');
const formData = { email: '', message: '' };

form.addEventListener('input', () => {
  formData.email = input.value.trim();
  formData.message = text.value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

const savedSettings = JSON.parse(localStorage.getItem('feedback-form-state'));

if (savedSettings !== null) {
  text.value = savedSettings.message;
  input.value = savedSettings.email;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (input.value !== '' && text.value !== '') {
    formData.email = input.value.trim();
    formData.message = text.value.trim();

    input.value = '';
    text.value = '';
    localStorage.removeItem('feedback-form-state');
    console.log(formData);
  } else {
    const alert = document.querySelector('.alert');
    alert.style.visibility = 'visible';
    alert.classList.add('anim');
    console.log('ENTER WORDS!!!');

    setTimeout(() => {
      alert.style.visibility = 'hidden';
    }, 3000);
  }
});
