/*let currentZoom = 100;
const zoomDelta = 25;
const minZoom = 50;
const maxZoom = 150;

let currentWidth = 905;
const widthDelta = currentWidth / 4;

let currentHeight = 581;
const heightDelta = currentHeight / 4;

let map;

export function setMap() {
    const floors = document.querySelectorAll('.floor-of-map');

    for (let floor of floors) {
        if (floor.getAttribute('data-floor') === 'active')
            map = floor;
    }
}

export function resetZoom() {
    currentZoom = 100;
    currentWidth = 905;
    currentHeight = 581;
    map.style.width = currentWidth.toString() + 'px';
    map.style.height = currentHeight.toString() + 'px';
    procentValue.textContent = currentZoom + '%';

    plusButton.disabled = false;
    minusButton.disabled = false;
}

setMap();

const plusButton = document.getElementById('plus');

const minusButton = document.getElementById('minus');

const procentValue = document.getElementById('val-scale');


plusButton.onclick = () => {
    setTimeout(upZoom, 100);
};


function upZoom() {
    console.log(currentWidth);
    if (currentZoom === maxZoom) {
        plusButton.disabled = true;
        minusButton.disabled = false;
    } else {
        currentZoom += zoomDelta;
        currentWidth += widthDelta;
        currentHeight += heightDelta;
        plusButton.disabled = false;
    }

    map.style.width = currentWidth.toString() + 'px';
    map.style.height = currentHeight.toString() + 'px';
    procentValue.textContent = currentZoom + '%';
}

minusButton.onclick = () => {
    setTimeout(downZoom, 100);
};

function downZoom() {

    if (currentZoom === minZoom) {
        minusButton.disabled = true;
        plusButton.disabled = false;
    } else {
        currentZoom -= zoomDelta;
        currentWidth -= widthDelta;
        currentHeight -= heightDelta;
        minusButton.disabled = false;
    }

    map.style.width = currentWidth.toString()  + 'px';
    map.style.height = currentHeight.toString()  + 'px';
    procentValue.textContent = currentZoom + '%';
}*/

let scale = 1;
const minZoom = 0.5;
const maxZoom = 1.5;

let map;

export function setMap() {
    const floors = document.querySelectorAll('.floor-of-map');

    for (let floor of floors) {
        if (floor.getAttribute('data-floor') === 'active')
            map = floor;
    }
}

export function resetZoom() {
    scale = 1;
    map.style.transform = map.style.WebkitTransform = map.style.MsTransform = 'scale(' + scale + ')';
    percentValue.textContent = scale*100 + '%';

    plusButton.disabled = false;
    minusButton.disabled = false;
}

setMap();

const plusButton = document.getElementById('plus');

const minusButton = document.getElementById('minus');

const percentValue = document.getElementById('val-scale');


plusButton.onclick = () => {
    setTimeout(upZoom, 100);
};


function upZoom() {
    if (scale === maxZoom) {
        plusButton.disabled = true;
        minusButton.disabled = false;
    } else {
        scale += 0.25;
        plusButton.disabled = false;
    }

    changeMapAndPercentValue();
}

minusButton.onclick = () => {
    setTimeout(downZoom, 100);
};

function downZoom() {

    if (scale === minZoom) {
        minusButton.disabled = true;
        plusButton.disabled = false;
    } else {
        scale -= 0.25;
        minusButton.disabled = false;
    }

    changeMapAndPercentValue();
}

function changeMapAndPercentValue() {
    map.style.transform = map.style.WebkitTransform = map.style.MsTransform = 'scale(' + scale + ')';
    percentValue.textContent = scale*100 + '%';
}

function addOnWheel(elem, handler) {
    if (elem.addEventListener) {
        if ('onwheel' in document)
            elem.addEventListener("wheel", handler);
    }
}

addOnWheel(map, function(e) {

    let delta = e.deltaY || e.detail || e.wheelDelta;

    if (delta < 0 && scale !== maxZoom) scale += 0.25;
    else if (delta > 0 && scale !== minZoom) scale -= 0.25;

    changeMapAndPercentValue();

    // отменим прокрутку
    e.preventDefault();
});

export function setCurrentScale() {
    return scale;
}
//TODO не работает масштабирование колесиком для второго этажа