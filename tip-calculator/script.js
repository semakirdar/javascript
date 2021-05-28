let priceInput = document.getElementById('price');
let percentInput = document.getElementById('percent');
let total = document.getElementById('total');
let amount = document.getElementById('amount');
let darkInput=document.getElementById('dark');
let whiteInput=document.getElementById('light');
let active;

priceInput.addEventListener('keyup', function () {
   calculate();
});
percentInput.addEventListener('change',function (){
    calculate();

})

function calculate(){


        let price = parseInt(priceInput.value);
        let percent = parseInt(percentInput.value);

    if(!isNaN(price)){

        let tipAmount = (price) * percent / 100;
        let totalPrice = price + tipAmount;

        amount.value = tipAmount;
        total.value = totalPrice;
        percentInfo.innerHTML=percent + '%';
    }
    else{
        amount.value='lüften bir değer giriniz !!';
    }

}

darkInput.addEventListener('click',function (){
    document.body.classList+=" dark";
    console.log(dark);

});

whiteInput.addEventListener('click',function (){
    document.body.classList.remove('dark');
});
