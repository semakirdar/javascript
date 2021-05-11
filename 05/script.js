let counter = 0;

let text = document.getElementById('text');

setInterval(function () {
        counter++;
        text.innerHTML = counter;
    },
    1000);
