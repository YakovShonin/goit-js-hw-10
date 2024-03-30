import iziToast from "izitoast";


function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}


document.querySelector('.form').addEventListener('submit', function(event) {
  event.preventDefault();


  const delay = parseInt(this.elements['delay'].value);
  const state = this.elements['state'].value;


  createPromise(delay, state)
    .then(delay => {

      iziToast.success({
        title: 'Snackbar Generator',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight'
      });
    })
    .catch(delay => {

      iziToast.error({
        title: 'Snackbar Generator',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight'
      });
    });
});