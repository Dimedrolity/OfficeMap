import {setCurrentScale} from "./zoom.js";


let map1;
let back;

let scale = setCurrentScale();
//TODO убрать перепрыгивание в начало(когда масштаб отличный от 100) при перетаскивании карты

export function setMap1() {
    const floors = document.querySelectorAll('.floor-of-map');

    for (let floor of floors) {
        if (floor.getAttribute('data-floor') === 'active') {
            map1 = floor;
            back = floor.querySelector('.droggable');
        }
    }

    addEventsOnMap();
}

setMap1();

function addEventsOnMap(){
    back.addEventListener('mousedown', function (e) {

        let coords = getCoords(map1);
        let shiftX = e.pageX - coords.left;
        let shiftY = e.pageY - coords.top;

        map1.style.position = 'absolute';
        document.body.appendChild(map1);
        moveAt(e);

        map1.style.zIndex = 1; // над другими элементами

        function moveAt(e) {
            map1.style.left = e.pageX - shiftX + 'px';
            map1.style.top = e.pageY - shiftY + 'px';
            map1.style.cursor = 'move';
        }

        document.onmousemove = function (e) {
            moveAt(e);
        };

        back.onmouseup = function () {
            document.onmousemove = null;
            back.onmouseup = null;
        };

    });

    back.ondragstart = function () {
        return false;
    };
}



function getCoords(elem) {   // кроме IE8-
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}