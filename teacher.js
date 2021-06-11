const DELETE_BTN_CLASS = 'delete-btn';
const CONTACT_ITEM_SELECTOR = '.contact-item';
const CONTACT_ID_ATTRIBUTE_NAME = 'data-contact-id';

const contactTemplate = document.getElementById('newContactTemplate').innerHTML;
const contactsListEl = document.getElementById('contactsList');
const nameInputEl = document.getElementById('nameInput');
const surnameInputEl = document.getElementById('surnameInput');
const phoneInputEl = document.getElementById('phoneInput');

let contactsList = [];

document
  .getElementById('addContactBtn')
  .addEventListener('click', onAdddContactBtnClick);

contactsListEl.addEventListener('click', onContactsListClick);

init();

function onAdddContactBtnClick() {
  if (isFormValid()) {
    const newContact = getFormData();
    addContact(newContact);

    resetForm();
  }
}

function onContactsListClick(e) {
  if (e.target.classList.contains(DELETE_BTN_CLASS)) {
    const contactId = getContactId(e.target);

    console.log('delete', contactId);
    // el.dataset.contactId;
    deleteContact(contactId);
  }
}

function init() {
  restoreFromStorage();
  renderContacts(contactsList);
}

function getContactId(el) {
  const row = el.closest(CONTACT_ITEM_SELECTOR);
  return +row.dataset.contactId;
}

function getContactRow(id) {
  return contactsListEl.querySelector(`[${CONTACT_ID_ATTRIBUTE_NAME}="${id}"]`);
}

function deleteContact(id) {
  contactsList = contactsList.filter((item) => item.id !== id);
  saveToStorage();
  renderContacts(contactsList);
  //removeContactElement(id); 
}

function removeContactElement(id) {
  const el = getContactRow(id);

  el.remove();
}

function isFormValid() {
  return (
    !isEmpty(nameInputEl.value) &&
    !isEmpty(surnameInputEl.value) &&
    !isEmpty(phoneInputEl.value)
  );
}

function isEmpty(str) {
  return str === '' || str === null;
}

function addContact(contact) {
  contactsList.push(contact);
  saveToStorage();
  renderContacts(contactsList);
  //renderContact(contact);
}

function renderContacts(list) {
  contactsListEl.innerHTML = '';
  list.forEach((item) => renderContact(item));
}

function renderContact(contact) {
  const newContactHtml = getContactRowHtml(contact);

  contactsListEl.insertAdjacentHTML('beforeend', newContactHtml);
}

function getContactRowHtml(contact) {
  return contactTemplate
    .replace('{{id}}', contact.id)
    .replace('{{name}}', contact.name)
    .replace('{{surname}}', contact.surname)
    .replace('{{phone}}', contact.phone);
}

function getFormData() {
  return {
    id: Date.now(),
    name: nameInputEl.value,
    surname: surnameInputEl.value,
    phone: phoneInputEl.value,
  };
}

function resetForm() {
  nameInputEl.value = '';
  surnameInputEl.value = '';
  phoneInputEl.value = '';
}

function saveToStorage() {
  localStorage.setItem('contactsList', JSON.stringify(contactsList));
}

function restoreFromStorage() {
  const data = localStorage.getItem('contactsList');
  if (data !== null) {
    contactsList = JSON.parse(data);
  } else {
    contactsList = [];
  }
}

// {
//   id: 25,
//   name: 'Alex',
//   surname: 'Smith',
//   phone: 'asdf'
// }