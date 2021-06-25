import Modal from './modal.js';

const modal = Modal();

const modalTitle = document.querySelector('.modal h2');
const modalDescription = document.querySelector('.modal p');
const modalButton = document.querySelector('.modal button');

const checkButtons = document.querySelectorAll('.actions a.check');
checkButtons.forEach(button => {
  button.addEventListener('click', handleClick);
});

const deleteButtons = document.querySelectorAll('.actions a.delete');
deleteButtons.forEach(button => {
  button.addEventListener('click', event => handleClick(event, false));
});

function handleClick(event, check = true) {
  event.preventDefault();

  // Customize modal texts
  const text = check ? 'Marcar como lida' : 'Excluir';
  const slug = check ? 'check' : 'delete';

  modalTitle.innerHTML = `${text} esta pergunta`;
  modalDescription.innerHTML = `Tem certeza que você deseja ${text.toLowerCase()}?`;
  modalButton.innerHTML = `Sim, ${text.toLowerCase()}`;

  check ? modalButton.classList.remove('red') : modalButton.classList.add('red');

  // Set form action
  const form = document.querySelector('.modal form');
  const roomId = document.querySelector('#room-id').dataset.id;
  const questionId = event.target.dataset.id;

  form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`);

  modal.open();
}
