import {initializeCard, setCardWithEmployee, closeEmployeeCard} from "./employeeCard.js";
import {fillAllDesksWithInitialColor, highlightDeskById} from "./desks.js";
import {closeAllCards} from "./allCards.js";
import {openEmployeeCard} from "./employeeCard.js";
import {displayHideButton, unDisplayHideButton} from "./hideAndShowButton.js";
import {updateCurrentCard} from "./allCards.js";
import {clearInput} from "./searchAndClear.js";
import {showFloorWithFloorNumber} from "./floorSwitching.js";
import {getInputValue} from "./searchAndClear.js";
import {getFloorNumber} from "./floorSwitching.js";

const cardOfResults = document.getElementById("card-of-results");

function openCardOfResults() {
    cardOfResults.style.display = "block";
}

export function closeCardOfResults() {
    document.getElementById("card-of-results").style.display = "none";
}

const cardOfNoResults = document.getElementById("card-of-no-results");

function openCardOfNoResults() {
    cardOfNoResults.style.display = "block";
}

export function closeCardOfNoResults() {
    cardOfNoResults.style.display = "none";
}

const closeButtonNoResults = document.querySelector('.close-btn-no-results');

closeButtonNoResults.addEventListener('click', () => {
    closeCardOfNoResults();
    clearInput();
});


export function setCardOfResultsAndShow(employees) {
    closeAllCards();


    if (employees.length !== 0) {
        openCardOfResults();
        updateCurrentCard(cardOfResults);
        displayHideButton();
        setCardOfResults(employees);
        fillAllDesksWithInitialColor();
        highlightDesksOfEmployees(employees);
    } else {
        openCardOfNoResults();
        updateCurrentCard(cardOfNoResults);
    }
}

let highlightedDesksIds = [];

function highlightDesksOfEmployees(employees) {
    highlightedDesksIds = [];
    for (let employee of employees) {
        if (employee.desk !== null) {
            highlightDeskById(employee.desk.id);
            highlightedDesksIds.push(employee.desk.id);
        }
    }
}

const results = cardOfResults.querySelector('.results');

function setCardOfResults(employees) {
    clearCardOfResults();

    const resultsSeparator = document.createElement('hr');
    resultsSeparator.style='border: 1px solid #FFC617; width: 300px';

    for (let employee of employees) {
        const block = document.createElement('div');
        block.classList = 'block-result';
        results.appendChild(block);
        const rowRes = document.createElement('div');
        rowRes.classList = 'row-res';
        block.appendChild(rowRes);

        const inputValue = getInputValue();

        const lastName = document.createElement('div');
        lastName.classList = 'res-name';

        const highlightedLastName = document.createElement('span');
        highlightedLastName.classList = 'highlighted-name';
        const restLastName = document.createElement('span');

        if (employee.lastName.toLowerCase().startsWith(inputValue.toLowerCase())) {
            highlightedLastName.textContent = inputValue[0].toUpperCase() + inputValue.slice(1).toLowerCase();
            restLastName.textContent = employee.lastName.replace(highlightedLastName.textContent, '');
        } else {
            restLastName.textContent = employee.lastName;
        }

        restLastName.textContent += ' ';

        const firstName = document.createElement('div');
        firstName.classList = 'res-name';

        const highlightedFirstName = document.createElement('span');
        highlightedFirstName.classList = 'highlighted-name';
        const restFirstName = document.createElement('span');

        if (employee.firstName.toLowerCase().startsWith(inputValue.toLowerCase())) {
            highlightedFirstName.textContent = inputValue[0].toUpperCase() + inputValue.slice(1).toLowerCase();
            restFirstName.textContent = employee.firstName.replace(highlightedFirstName.textContent, '');
        } else {
            restFirstName.textContent = employee.firstName;
        }

        rowRes.appendChild(lastName);
        lastName.appendChild(highlightedLastName);
        lastName.appendChild(restLastName);
        rowRes.appendChild(firstName);
        lastName.appendChild(highlightedFirstName);
        lastName.appendChild(restFirstName);

        const position = document.createElement('span');
        position.classList = 'res-pos';
        position.textContent = employee.position.name;

        rowRes.appendChild(position);

        const unchangeStroke = document.createElement('div');
        unchangeStroke.classList = 'unchange-stroke-res';
        rowRes.appendChild(unchangeStroke);
        const teamRes = document.createElement('span');
        teamRes.classList = 'team-res';
        teamRes.textContent = 'Команда: ';

        unchangeStroke.appendChild(teamRes);
        const teamDesc = document.createElement('span');
        teamDesc.classList = 'team-desc';
        teamDesc.textContent = employee.team;
        unchangeStroke.appendChild(teamDesc);

        const unchangeStroke2 = document.createElement('div');
        unchangeStroke2.classList = 'unchange-stroke-res';
        rowRes.appendChild(unchangeStroke2);

        const floorRes = document.createElement('span');
        floorRes.classList = 'floor-res';
        floorRes.textContent = 'Этаж: ';
        unchangeStroke2.appendChild(floorRes);

        const floorNumber = document.createElement('span');
        floorNumber.classList = 'floor-number';
        floorNumber.textContent = employee.desk !== null ? employee.desk.floorNumber : '';
        unchangeStroke2.appendChild(floorNumber);

        const imgRes = document.createElement('div');
        imgRes.classList = 'img-res';
        block.appendChild(imgRes);
        const avatar = document.createElement('img');
        avatar.classList = 'avatar-res';
        avatar.src = `https://offficemap.azurewebsites.net/photos/${employee.photo.id}.png`;
        imgRes.appendChild(avatar);

        results.appendChild(resultsSeparator.cloneNode(true));

        block.addEventListener('click', () => {
            closeAllCards();

            if (employee.desk !== null)
                showFloorWithFloorNumber(parseInt(employee.desk.floorNumber));

            showCard(employee);
        });
    }

    highlightCurrentFloor();
    highlightAvatarsOnCurrentFloor();

    const lastSeparator = results.lastChild;
    lastSeparator.remove();
}

export function highlightCurrentFloor() {
    const floorNumbers = document.querySelectorAll('.floor-number');

    for (let floor of floorNumbers) {
        let currentFloor = getFloorNumber();
        if (floor.textContent === currentFloor.toString()) {
            floor.style.color = '#FFC617';
            floor.style.fontWeight = 'bold';
        } else {
            floor.style.color = '';
            floor.style.fontWeight = '';
        }
    }
}

export function highlightAvatarsOnCurrentFloor() {

    const blocks = document.querySelectorAll('.block-result');

    for (let block of blocks) {
        const floor = block.querySelector('.floor-number');
        let currentFloor = getFloorNumber();
        const avatar = block.querySelector('.avatar-res');
        if (floor.textContent === currentFloor.toString()) {
            avatar.classList += ' highlighted';
        } else {
            avatar.classList = avatar.classList.toString().replace(' highlighted', '');
        }

    }
}

function clearCardOfResults() {
    let child = results.lastElementChild;
    while (child) {
        results.removeChild(child);
        child = results.lastElementChild;
    }
}

function showCard(employee) {
    //показывать назад к результатам и менять margin-top у results по клику
    backToResults.style.display = 'block';
    emp.style.marginTop = '0';

    openEmployeeCard();
    updateCurrentCard(document.getElementById("card-employee"));
    initializeCard();
    setCardWithEmployee(employee);
    displayHideButton();

    const deskId = employee.desk.id;
    fillAllDesksWithInitialColor();
    highlightDeskById(deskId);
}

const backToResults = document.querySelector('.back-to-results');

backToResults.addEventListener('click', () => clickBackToResults());

function clickBackToResults() {
    openCardOfResults();
    updateCurrentCard(cardOfResults);
    displayHideButton();

    const emp = document.querySelector('.employee');
    const backToResults = document.querySelector('.back-to-results');
    backToResults.style.display = 'none';
    emp.style.marginTop = '28px';

    closeEmployeeCard();

    for (let deskId of highlightedDesksIds) {
        highlightDeskById(deskId);
    }
}
