import flatpickr from "flatpickr";
import iziToast from "izitoast";


let userSelectedDate;
let timerInterval;


function isValidDate(date) {
  return date > new Date();
}


function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
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


function updateTimerInterface(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}


function startTimer() {
  const currentDate = new Date();
  const timeDifference = userSelectedDate - currentDate;

  
  if (timeDifference <= 0) {
    clearInterval(timerInterval);
    updateTimerInterface(0);
    iziToast.show({
      title: 'Countdown Timer',
      message: 'Time is up!',
      theme: 'dark',
      position: 'topRight'
    });
    return;
  }


  updateTimerInterface(timeDifference);
}


flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (isValidDate(userSelectedDate)) {
      document.getElementById('startButton').removeAttribute('disabled');
      iziToast.destroy();
    } else {
      document.getElementById('startButton').setAttribute('disabled', 'true');
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight'
      });
    }
  },
});


document.getElementById('startButton').addEventListener('click', function() {
  this.setAttribute('disabled', 'true');
  clearInterval(timerInterval); 
  timerInterval = setInterval(startTimer, 1000);
});