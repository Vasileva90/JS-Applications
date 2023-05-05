import { updateAuth, saveUser } from '../auth.js';
import * as api from '../api.js';

const loginSection = document.querySelector('.login');
const loginForm = loginSection.querySelector('form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let email = formData.get('email');
    let password = formData.get('password');

    api.login(email, password)
        .then(user => {
            saveUser(user);
            updateAuth();
            alert('successfuly logged in');
        });
});

export function renderLogin() {
    loginSection.style.display = 'block';
}