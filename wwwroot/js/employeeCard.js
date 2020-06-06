import {fillAllDesksWithInitialColor} from './desks.js'
import {unDisplayHideButton} from "./hideAndShowButton.js";
import {clearInput} from "./searchAndClear.js";

const employeeCard = document.getElementById("card-employee");

export function openEmployeeCard() {
    employeeCard.style.display = "block";
}

export function closeEmployeeCard() {
    employeeCard.style.display = "none";
}


const closeButton = document.querySelector('.close-btn');

closeButton.addEventListener('click', () => {
    closeEmployeeCard();
    fillAllDesksWithInitialColor();
    unDisplayHideButton();
    clearInput();
});

const cardWithFreeDesk = document.getElementById("card-with-free-table");

export function openCardFreeDesk() {
    cardWithFreeDesk.style.display = "block";
}

export function closeCardFreeDesk() {
    cardWithFreeDesk.style.display = "none";
}

const closeButtonFreeDesk = document.querySelector('.close-btn-no-emp');
closeButtonFreeDesk.addEventListener('click', () => {
    closeCardFreeDesk();
    unDisplayHideButton();
    fillAllDesksWithInitialColor();
});

const name = document.querySelector(".first-name");
const midName = document.querySelector(".middle-name");
const lastName = document.querySelector(".last-name");
const direction = document.querySelector(".direction");
const position = document.querySelector(".position-emp");
const team = document.querySelector(".team");
const email = document.querySelector(".mail");
const phone = document.querySelector(".phone");
const floor = document.querySelector(".floor-emp");

const ava = document.querySelector(".avatar-emp");

export function initializeCard() {
    name.textContent = "";
    midName.textContent = "";
    lastName.textContent = "";
    team.textContent = "";
    direction.textContent = "";
    position.textContent = "";
    email.textContent = "";
    phone.textContent = "";
    floor.textContent = "";
}

export function setCardWithEmployee(employee) {
    name.textContent = employee.firstName;
    midName.textContent = employee.middleName;
    lastName.textContent = employee.lastName;
    team.textContent = employee.team;
    direction.textContent = employee.direction;
    position.textContent = employee.position.name;
    email.textContent = employee.emailAddress;
    phone.textContent = employee.phoneNumber;
    floor.textContent = employee.desk.floorNumber;

    ava.src = `https://offficemap.azurewebsites.net/photos/${employee.photo.id}.png`;
}
