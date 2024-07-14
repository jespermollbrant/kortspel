const knapp1 = document.getElementById('knapp1');
const knapp2 = document.getElementById('knapp2');

const poäng1 = document.getElementById('poäng1');
const poäng2 = document.getElementById('poäng2');

const kort1 = document.getElementById('kort1');
const kort2 = document.getElementById('kort2');

let i = 0;
let im = 0;

function runder() {
    setTimeout(() => {
        let prompt = window.prompt("Välkommen! Hur många runder vill ni köra?");
        im = Number(prompt)*2;
        console.log(im);
    }, 700);
}

let spelare1poäng = 0;
let spelare2poäng = 0;

function draw() {
    knapp1.addEventListener('click', function (evt) {
        if (i % 2) {
            alert("Det är inte din tur spelare 1! Dickhead!");
        }
        else {
            knapp1.textContent = "Laddar...";
            fetch("https://www.deckofcardsapi.com/api/deck/new/draw/?count=1")
                .then(response => response.json())
                .then(data => {
                    poäng1.textContent = räknare1(data.cards[0].value);
                    kort1.src = data.cards[0].image
                    console.dir(data);
                    knapp1.textContent = "Dra kort";
                    setTimeout(() => {
                        domare(spelare2poäng); // Call domare after a delay
                    }, 300);
                });
        }
    });
    knapp2.addEventListener('click', function (evt) {
        if (i % 2 == 0) {
            alert("Det är inte din tur spelare 2! Dickhead!");
        }
        else {
            knapp2.textContent = "Laddar...";
            fetch("https://www.deckofcardsapi.com/api/deck/new/draw/?count=1")
                .then(response => response.json())
                .then(data => {
                    poäng2.textContent = räknare2(data.cards[0].value);
                    kort2.src = data.cards[0].image;
                    console.dir(data);
                    knapp2.textContent = "Dra kort";
                    setTimeout(() => {
                        domare(spelare2poäng); // Call domare after a delay
                    }, 300);
                })
        }
    });
}

function räknare1(value) {
    if (value === "KING") {
        spelare1poäng = spelare1poäng + 12;
    }
    else if (value === "QUEEN") {
        spelare1poäng = spelare1poäng + 13;
    }
    else if (value === "JACK") {
        spelare1poäng = spelare1poäng + 11;
    }
    else if (value === "ACE") {
        spelare1poäng = spelare1poäng + 14;
    }
    else {
        spelare1poäng += Number(value);
    }
    Number(spelare1poäng);
    return spelare1poäng;
}
function räknare2(value) {
    if (value === "KING") {
        spelare2poäng = spelare2poäng + 12;
    }
    else if (value === "QUEEN") {
        spelare2poäng = spelare2poäng + 13;
    }
    else if (value === "JACK") {
        spelare2poäng = spelare2poäng + 11;
    }
    else if (value === "ACE") {
        spelare2poäng = spelare2poäng + 14;
    }
    else {
        spelare2poäng += Number(value);
    }
    Number(spelare2poäng);
    return spelare2poäng;
}

function domare(value) {
    i++;
    if (i === im && spelare1poäng > spelare2poäng) {
        window.alert("Spelare 1 vann!");
        window.location.reload();
    }
    else if (i === im && spelare1poäng < spelare2poäng) {
        window.alert("Spelare 2 vann!");
        window.location.reload();
    }
    else if (i === im) {
        window.alert("Oavgjort!");
        window.location.reload();
    }
    else {
        return;
    }
}

runder();
draw();