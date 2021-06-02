let info = document.getElementById('info');
let city = document.getElementById('city');
let temp = document.getElementById('temp');
let button = document.getElementById('button');
let message = document.getElementById('message');

button.addEventListener('click', function () {
    let inputCity = city.value;
    if (inputCity.length > 0) {
        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + inputCity + '&units=metric&appid=fdee8d284a5b41315c6af87eaf792101')
            .then(response => response.json())
            .then(function (data) {
                console.log(data);
                if (data.main && data.main.temp) {
                    city.innerHTML = data.name;
                    temp.innerHTML = Math.round(data.main.temp);


                } else {
                    message.innerHTML = 'Lütfen bir şehir giriniz !!';

                    setTimeout(function () {
                        message.innerHTML = '';
                    }, 2000);
                }
            });
    } else {
        message.innerHTML = 'lütfen bir şehir giriniz..!!';
        setTimeout(function () {
            message.innerHTML = '';
        }, 2000);
        temp.innerHTML = '';
    }


});