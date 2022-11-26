
import throttle from "lodash.throttle" // додаємо посилання на встановлену бібліотеку

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state'; // замінюємо зрозумілою константою назву ключа в local storage (необов'язково)

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));
populateTextarea();

function onFormInput(evt) { //записуємо дані в local storage
    const formData = { email: email.value, message: message.value }; // збираємо значення в новий об'єкт
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)); // метод для запису ключа/значення в local storage
}

function onFormSubmit(evt) {
    evt.preventDefault(); // знімаємо перезавантаження сторінки при роботі з формою

    console.log({ email: email.value, message: message.value });
    evt.currentTarget.reset();  // очищаємо форму після submit
    localStorage.removeItem(STORAGE_KEY); // очищаємо local storage після submit (щоб користувач випадково повторно не відправив)
}

function populateTextarea() { // Отримуємо значення з local storage у форму
    const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY)); // парсимо ключ/значення з local storage для отримання об'экту
    
    if (savedFormData) { // перевірка на нового користувача, якщо запис в local storage є -> тоді перезаписуємо, якщо запису нема -> тоді нічого не робимо
        console.log(savedFormData);
        email.value = savedFormData.email;
        message.value = savedFormData.message; // записуємо дані з local storage у форму
    }
}

