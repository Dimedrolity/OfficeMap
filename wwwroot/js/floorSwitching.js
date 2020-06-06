import {highlightCurrentFloor} from "./cardOfResults.js";
import {highlightAvatarsOnCurrentFloor} from "./cardOfResults.js";
import {setMap} from "./zoom.js";
import {resetZoom} from "./zoom.js";
import {setMap1} from "./dragAndDropOfMap.js";

const buttonUp = document.querySelector('.up-toggle');
const buttonDown = document.querySelector('.down-toggle');
const floorNumber = document.getElementById('floor-number');
const floors = document.querySelectorAll('.floor-of-map');

let currentFloor = 18;
const minFloor = 18;
const maxFloor = 19;

export function getFloorNumber() {
    return currentFloor;
}


function setFloorNumber(floor) {
    floorNumber.textContent = floor.toString();
}

setFloorNumber(currentFloor);

buttonUp.addEventListener('click', upFloor);

function upFloor() {
    //сменить на следующий спан floorNumbers(присвоить спану атрибут active)
    //если конец спанов, то сделать кнопку buttonUp disabled
    //убрать disabled у кнопки buttonDown

    if (currentFloor === maxFloor)
        buttonUp.disabled = true;
    else {
        currentFloor++;
        setFloorNumber(currentFloor);
        for (let floor of floors) {
            if (floor.getAttribute('data-floor') === 'active')
                floor.setAttribute('data-floor', '');
        }

        for (let floor of floors) {
            if (floor.getAttribute('floor-number') === currentFloor.toString())
                floor.setAttribute('data-floor', 'active');
        }
        buttonDown.disabled = false;
        if (currentFloor === maxFloor)
            buttonUp.disabled = true;

        highlightCurrentFloor();
        highlightAvatarsOnCurrentFloor();
        resetZoom();
        setMap();
        setMap1();
    }
}

buttonDown.addEventListener('click', downFloor);

function downFloor() {
    if (currentFloor === minFloor)
        buttonDown.disabled = true;
    else {
        currentFloor--;
        setFloorNumber(currentFloor);
        for (let floor of floors) {
            if (floor.getAttribute('data-floor') === 'active')
                floor.setAttribute('data-floor', '');
        }

        for (let floor of floors) {
            if (floor.getAttribute('floor-number') === currentFloor.toString())
                floor.setAttribute('data-floor', 'active');
        }
        buttonUp.disabled = false;
        if (currentFloor === minFloor)
            buttonDown.disabled = true;

        highlightCurrentFloor();
        highlightAvatarsOnCurrentFloor();
        resetZoom();
        setMap();
        setMap1();
    }
}

export function showFloorWithFloorNumber(floorNumber) {
    if (currentFloor > floorNumber)
        while (currentFloor !== floorNumber)
            downFloor();
    else if (currentFloor < floorNumber)
        while (currentFloor !== floorNumber)
            upFloor();
}
