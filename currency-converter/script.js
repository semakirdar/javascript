let tryInput = document.getElementById('try-input');
let buttonSwap = document.getElementById('button-swap');
let infoText = document.getElementById('info');
let select = document.getElementById('select');
let resultInput = document.getElementById('result');
let price;
let USDCurrency = 8.40;
let EURCurrency = 10.31;
let STRCurrency = 11.91;
let selectCurrency;

buttonSwap.addEventListener('click', function () {


});

tryInput.addEventListener('keyup', function () {
    calculator(select.value);

});

select.addEventListener('change', function () {

    selectCurrency = this.value;
    calculator(select.value);
});

function calculator(currency) {
    if (currency == 'EUR') {

        info = 1 * EURCurrency;
        infoText.innerHTML = '1 EUR =' + info + 'TRY';

        price = tryInput.value;
        result = price * EURCurrency;
        console.log(result);

        resultInput.innerHTML = result;

    } else if (currency == 'USD') {

        info = 1 * USDCurrency;
        infoText.innerHTML = '1 USD =' + info + 'TRY';

        selectCurrency = select.value;

        price = tryInput.value;
        result = price * USDCurrency;
        resultInput.innerHTML = result;

    } else if (currency == 'STR') {

        info = 1 * STRCurrency;
        infoText.innerHTML = '1 STR =' + info + 'TRY';

        selectCurrency = select.value;

        price = tryInput.value;
        result = price * STRCurrency;
        resultInput.innerHTML = result;
    }
}

