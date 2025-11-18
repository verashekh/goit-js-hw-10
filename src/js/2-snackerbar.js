import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/styles.css';

const form = document.querySelector('.form');

const toastOpts = {
  position: 'topRight',
  timeout: 3000,
  closeOnClick: true,
};

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay?.value);
  const state = form.elements.state?.value;

  if (!Number.isFinite(delay) || delay < 0) {
    iziToast.error({
      ...toastOpts,
      title: 'Помилка',
      message: 'Вкажи коректну невід’ємну затримку (мс).',
    });
    return;
  }
  if (state !== 'fulfilled' && state !== 'rejected') {
    iziToast.error({
      ...toastOpts,
      title: 'Помилка',
      message: 'Оберіть, чи має проміс виконатися чи відхилитися.',
    });
    return;
  }

  const submitBtn = form.querySelector('[type="submit"]');
  if (submitBtn) submitBtn.disabled = true;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  });

  promise
    .then(d => {
      iziToast.success({
        ...toastOpts,
        title: 'Готово',
        message: `✅ Fulfilled promise in ${d}ms`,
      });
    })
    .catch(d => {
      iziToast.error({
        ...toastOpts,
        title: 'Відхилено',
        message: `❌ Rejected promise in ${d}ms`,
      });
    })
    .finally(() => {
      form.reset();
      if (submitBtn) submitBtn.disabled = false;
    });
});
