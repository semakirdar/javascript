let point = document.getElementById('point');
let cookie = document.getElementById('cookie');
let power = document.getElementById('power');
let auto = document.getElementById('auto');
let message = document.getElementById('message');
let powerAuto = document.getElementById('power-auto');
let mouse = document.querySelector('.mouse');
let upgrade = document.getElementById('upgrade');


let powerAutoClicker = false;
let autoClicker = 0;
let hasPowerClick = false;
let hasAutoClick = false;
let score = 0;

let autoClickerLimit = 2;

cookie.addEventListener('click', function () {
    if (hasPowerClick == true) {
        score += 10;
        point.innerHTML = score;
    } else {
        score += 5;
        point.innerHTML = score;
    }
});

power.addEventListener('click', function () {
    if (score >= 100) {
        score -= 100;
        hasPowerClick = true;
        power.style.display = 'none';
        point.innerHTML = score;
    }
});

auto.addEventListener('click', function () {
    let price = 50;
    if (autoClicker > 1) {
        price = autoClicker * 50;
    }

    if (score >= price) {
        if (autoClicker >= autoClickerLimit) {
            message.innerHTML = 'alamazsınız..!!!!!';
        } else {
            score -= price;
            hasAutoClick = true;
            //auto.style.display='none';
            point.innerHTML = score;

            if (hasAutoClick == true) {

                autoClicker++;
                mouse.innerHTML = '';

                for (let i = 0; i < autoClicker; i++) {
                    mouse.innerHTML += "<img src='image/mouse.jpg'>";
                }
            }
        }


    } else {
        message.innerHTML = 'yeterli puanınız yok';
        setTimeout(function () {
            message.innerHTML = '';
        }, 1000);
    }

});

setInterval(function () {
    if (hasAutoClick == true) {

        if (powerAutoClicker == true) {
            score += autoClicker * 10;
        } else {
            score += autoClicker * 5;
        }

        point.innerHTML = score;
    }

}, 1000);

powerAuto.addEventListener('click', function () {


    if (score >= 100) {
        score -= 100;
        point.innerHTML = score;
        powerAutoClicker = true;
    }


    if (hasAutoClick == false) {
        message.innerHTML = 'lütfen auto click alınız..!';
        setTimeout(function () {
            message.innerHTML = '';
        }, 2000);
    } else {
        powerAuto.style.display = 'none';
    }

});

upgrade.addEventListener('click', function () {
    if (score >= 200) {
        score -= 200;
        point.innerHTML = score;

        autoClickerLimit += 2;
    }
});




