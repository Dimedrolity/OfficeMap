


const desks = document.querySelectorAll(".light-table");

for (let desk of desks) {
    desk.addEventListener('mouseover', () => {
        desk.classList += ' hover';
    });
    desk.addEventListener('mouseout', () => {
        desk.classList = desk.classList.toString().replace(' hover', '')
    });
}

export function getAllDesks() {
    return desks;
}

export function highlightDeskById(deskId) {
    for (let desk of desks) {

        let color;
        if (desk.getAttribute('data-free') === 'true')
            color = '#5D5D5D';
        else
            color = '#B58F1C';


        let currentId = parseInt(desk.getAttribute("data-id"));
        if (currentId === deskId) {
            desk.setAttribute('fill', color);

            desk.addEventListener('mouseover', () => {
                desk.classList = desk.classList.toString().replace(' hover', '')
            });
        }
    }
}

export function fillAllDesksWithInitialColor() {
    for (let desk of desks) {
        if (desk.getAttribute('data-free') === 'true')
            desk.setAttribute('fill', '#A6A6A6');
        else desk.setAttribute('fill', '#FFC617');
    }
}

async function setFreeDesks() {
    const response = await fetch(`https://offficemap.azurewebsites.net/api/desks/free`, {
        method: "GET",
        headers: {"Accept": "application/json"}
    });

    if (response.ok === true) {
        const freeDesks = await response.json();

        for (let freeDesk of freeDesks)
            for (let desk of desks) {
                if (parseInt(desk.getAttribute('data-id')) === freeDesk.id) {
                    desk.setAttribute('fill', '#A6A6A6');
                    desk.setAttribute('data-free', true);
                }
            }
    }
}

setFreeDesks();
