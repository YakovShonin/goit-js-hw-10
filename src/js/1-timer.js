import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const input = document.querySelector('#datetime-picker');
const start = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
start.disabled = true;
let userSelectedDate;
let intervalId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0].getTime() < Date.now()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        backgroundColor: '#EF4040',
        position: 'topRight',
      });
      start.disabled = true;
    } else {
      start.disabled = false;
    }
    userSelectedDate = selectedDates[0];
  },
};
flatpickr('#datetime-picker', options);
start.addEventListener('click', setTimer);
function setTimer() {
  start.disabled = true;
  input.disabled = true;
  intervalId = setInterval(() => {
    let timeDifference;
    timeDifference = userSelectedDate.getTime() - Date.now();
    const objTime = convertMs(timeDifference);
    days.innerHTML = addLeadingZero(objTime.days);
    hours.innerHTML = addLeadingZero(objTime.hours);
    minutes.innerHTML = addLeadingZero(objTime.minutes);
    seconds.innerHTML = addLeadingZero(objTime.seconds);
    if (timeDifference < 1000) {
      clearInterval(intervalId);
      input.disabled = false;
    }
  }, 1000);
}
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
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}



