let budgetEl = document.getElementById('budget');
let remainingEl = document.getElementById('remaining');
let btnSave = document.getElementById('btnSave');
let inputCost = document.getElementById('inputCost');
let inputName = document.getElementById('inputName');
let btnDeleteAll = document.getElementById('btnDeleteAll');
let message = document.getElementById('message');

let list = document.querySelector('.list');
let array = [];

let budget = 16300;
let remaining = budget;

budgetEl.innerHTML = budget;
remainingEl.innerHTML = remaining;

btnSave.addEventListener('click', function () {

    let name = inputName.value;
    let cost = parseInt(inputCost.value);

    if (name.length > 0 && cost > 0) {
        let newItem =
            {
                name: name,
                cost: cost
            }


        array.push(newItem);
        remaining = remaining - cost;
        remainingEl.innerHTML = remaining;

    }
    else{
        message.innerHTML = 'Lütfen bir şey giriniz !!';
        setTimeout(function (){
            message.innerHTML = '';
        },2000);
    }

    printList();

});

function printList() {
    list.innerHTML = '';
    inputCost.value = '';
    inputName.value = '';

    array.forEach(function (item, i) {
        let listItem = document.createElement('div');
        let listName = document.createElement('div');
        let listCost = document.createElement('div');
        let btnDelete = document.createElement('button');

        listItem.classList += ' list-item';

        listName.innerHTML = item.name;
        listCost.innerHTML = item.cost;
        btnDelete.innerHTML = 'DELETE';

        listItem.appendChild(listName);
        listItem.appendChild(listCost);
        listItem.appendChild(btnDelete);
        list.appendChild(listItem);

        btnDelete.dataset.target = i;
        btnDelete.addEventListener('click', function () {
            let selectedIndex = this.dataset.target;
            let cost = array[selectedIndex].cost;
            delete array[selectedIndex];
            list.innerHTML = '';

            remaining += cost;
            remainingEl.innerHTML = remaining;
            printList();

        });
    });

};

btnDeleteAll.addEventListener('click', function () {

    if(array.length>0)
    {
        array = [];
        list.innerHTML ='';
        remaining = budget
        remainingEl.innerHTML = remaining;
    }
    else {
        message.innerHTML='Silinecek bir şey yok..!!';
        setTimeout(function (){
            message.innerHTML='';

        },2000);
    }



});
