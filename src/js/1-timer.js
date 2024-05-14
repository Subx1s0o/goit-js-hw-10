import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const mainInp = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: null,
  minuteIncrement: 1,

  onClose(SelectedDate) {
    userSelectedDate = SelectedDate[0];
  },
};

flatpickr(mainInp, options);

function setTimer(userDate) {
  const isFutureDate =
    userDate !== undefined && userDate.getTime() >= new Date().getTime();

  if (isFutureDate) {
    const timer = setInterval(() => {
      const todayDate = new Date();
      const timeDiff = Math.max(userDate.getTime() - todayDate.getTime(), 0);
      const { days, hours, minutes, seconds } = convertMs(timeDiff);

      document.querySelector('span[data-days]').textContent = days
        .toString()
        .padStart(2, '0');
      document.querySelector('span[data-hours]').textContent = hours
        .toString()
        .padStart(2, '0');
      document.querySelector('span[data-minutes]').textContent = minutes
        .toString()
        .padStart(2, '0');
      document.querySelector('span[data-seconds]').textContent = seconds
        .toString()
        .padStart(2, '0');

      if (timeDiff === 0) {
        clearInterval(timer);
        iziToast.show({
          title: '✅',
          message: `Time is left`,
          messageColor: 'white',
          backgroundColor: '#57E29A',
          position: 'topRight',
        });
      }
    }, 1000);
  } else {
    iziToast.show({
      title: '❌',
      message: `Please choose the date in the future.`,
      messageColor: 'white',
      backgroundColor: '#E25757',
      position: 'topRight',
    });
  }
}

button.addEventListener('click', () => {
  setTimer(userSelectedDate);
});
