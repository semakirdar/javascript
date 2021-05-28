let button = document.getElementById('button');
let input = document.getElementById('input');
let information = document.getElementById('information');



let randomNumber = Math.floor(Math.random() * 10);

button.addEventListener('click', function () {
    let inputNumber = input.value;
    if (inputNumber == randomNumber) {
        information.innerHTML = 'tebrikler';
    } else if(randomNumber>inputNumber){
        information.innerHTML = 'yukari cik';
    }
    else{
        information.innerHTML='asagi in';
    }
});