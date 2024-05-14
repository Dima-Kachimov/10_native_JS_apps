'use strict';

const input = document.querySelector('#input');
const copy = document.querySelector('.copy');
const generate = document.querySelector('.generate');
const inputModal = document.querySelector('.modal-input');
const modalStart = document.querySelector('.modal-quantity-selection');
const modalBody = document.querySelector('.quantity-selection__content');
const modalBtn = document.querySelector('.modalBtn');
const interfaceValue = document.querySelector('.interface span');
const btnInterface = document.querySelector('.btn-interface');
const modalMessage = document.querySelector('.modalMessage');

let length;

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        modalBody.classList.add('modalAnimation');
        modalStart.classList.add('modalAnimation');
    }, 1000);
});

function generatePassword(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$&';
    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
        let randomNumber = Math.floor(Math.random() * characters.length);
        generatedPassword += characters[randomNumber];
    }
    return generatedPassword;
}

function copyPassword(input) {
    navigator.clipboard.writeText(input.value).then(function() {
        modalMessage.classList.add('show');
        setTimeout(() => {
            modalMessage.classList.remove('show');
        }, 2000);
        input.value = '';
    }, function(err) {
        console.error('Не удалось скопировать текст!');
    });
}

generate.addEventListener('click', () => {
    length = inputModal.value;
    interfaceValue.textContent = length;
    input.value = generatePassword(length);
});

copy.addEventListener('click', () => {
    copyPassword(input);
});

modalBtn.addEventListener('click', () => {
    length = inputModal.value;
    interfaceValue.textContent = length;
    modalBody.classList.remove('modalAnimation');
    modalStart.classList.remove('modalAnimation');
    length = inputModal.value;
    input.value = generatePassword(length);
});

btnInterface.addEventListener('click', () => {
    modalBody.classList.add('modalAnimation');
    modalStart.classList.add('modalAnimation');
});