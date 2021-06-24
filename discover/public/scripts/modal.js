export default function Modal() {
  const modalWraper = document.querySelector('.modal-wraper');

  const cancelButton = document.querySelector('.modal .button.cancel');
  cancelButton.addEventListener('click', close);

  function open() {
    modalWraper.classList.add('active');
  }
  function close() {
    modalWraper.classList.remove('active');
  }

  return {
    open,
    close
  }
}
