let size = document.getElementById('size');
let weight = document.getElementById('weight');
let result = document.getElementById('result');
let button = document.getElementById('button');
let text=document.getElementById('text')
let operation;

//(inputWeight!=null & inputSize!=null)
//isNaN(inputWeight) & isNaN(inputSize)
button.addEventListener('click', function () {
    let inputSize = parseInt(size.value) / 100;
    let inputWeight = parseInt(weight.value);

    if (!isNaN(inputWeight) && !isNaN(inputSize)) {
        operation = (inputWeight) /(inputSize*inputSize);

        result.innerHTML = operation.toFixed(2);

        if(operation<=18){
            text.innerHTML='ZAYİF';
        }
        else if(operation<=25){
            text.innerHTML='NORMAL';
        }
        else if(operation<=39){
            text.innerHTML='KİLOLU';
        }
        else if(operation>=40){
            text.innerHTML='OBEZ';
        }
    } else {
        result.innerHTML = 'Boy ve Kilo bos gecilemez';
    }

});


