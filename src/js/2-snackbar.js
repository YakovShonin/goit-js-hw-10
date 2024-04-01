import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
const inputDelay = form.elements.delay;
const states = form.elements.state;
form.addEventListener('submit', handleSubmit);
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === `fulfilled`) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
function handleSubmit(event) {
  event.preventDefault();
  const delay = inputDelay.value;
  const state = states.value;
  form.reset();
  createPromise(delay, state)
    .then(delay => {
      iziToast.show({
        message: `:white_check_mark: Fulfilled promise in ${delay}ms`,
        backgroundColor: '#59A10D',
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.show({
        message: `:x: Rejected promise in ${delay}ms`,
        backgroundColor: '#EF4040',
        position: 'topRight',
      });
    });
}