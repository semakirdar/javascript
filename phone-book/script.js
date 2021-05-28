let number = document.getElementById('number');
let name = document.getElementById('name');
let add = document.getElementById('add');
let list = document.getElementById('list');
let message = document.getElementById('message');
let avatars=document.querySelectorAll('.avatar');
let selected;

let array = [];

add.addEventListener('click', function () {
    let inputNumber = parseInt(number.value);
    let inputName = name.value;
    let newPerson = {
        avatar: selected,
        name: inputName,
        phone: inputNumber
    }
    if (!isNaN(inputNumber) && inputName.length > 0) {
        array.push(newPerson);

        let newPersonHTML;
        newPersonHTML = '<div class="item">';
        newPersonHTML += '  <div class="info">';
        newPersonHTML += '      <div class="avatar"><img src='+ selected +'></div>';
        newPersonHTML += '      <div class="detail">'
            newPersonHTML += '      <div class="name">' + newPerson.name + '</div>';
            newPersonHTML += '      <div class="number">' + newPerson.phone + '</div>';
        newPersonHTML += '      </div>';
        newPersonHTML += '  </div>';
        newPersonHTML += '  <div class="action"><button id="' +  newPerson.phone + '" class="delete">DELETE</button></div>';
        newPersonHTML += '</div>';

        list.innerHTML += newPersonHTML;
        //querySelector:herşey secebilirsin.by ıd sadece id seçimi.
        document.getElementById(newPerson.phone).addEventListener('click', function () {
            del(newPerson.phone);
        });
        message.innerHTML = ' ';
    } else {
        message.innerHTML = 'boş geçmeyiniz !!!';
    }

});

function del(inputNumber) {
    console.log('tıklama');
    let isDeleted = false;
    let phone = inputNumber;
    array.forEach(function (item, i) {
        if (phone == item.phone) {
            delete array[i];
            isDeleted = true;
            console.log('silindi');

        }
    });
    if (isDeleted) {
        list.innerHTML = '';
        array.forEach(function (item, i) {

            let newPersonHTML;
            newPersonHTML = '<div class="item">';
            newPersonHTML += '  <div class="info">';
            newPersonHTML += '  <div class="avatar"><img src='+ item.avatar +'></div>';
            newPersonHTML += '<div class="detail">'
            newPersonHTML += '      <div class="name">' + item.name + '</div>';
            newPersonHTML += '      <div class="number">' + item.phone + '</div>';
            newPersonHTML += '  </div>';
            newPersonHTML += '  </div>';
            newPersonHTML += '  <div class="action"><button id="' + item.phone + '" class="delete">DELETE</button></div>';
            newPersonHTML += '</div>';

            list.innerHTML += newPersonHTML;

            document.getElementById(item.phone).addEventListener('click', function () {
                del(item.phone);
            });
        })
    }
}

avatars.forEach(function (avatar,i){
    avatar.addEventListener('click',function (){
        clearSelected();

        this.classList+=" selected";

        selected = this.src;
        console.log(selected);
    });

});

function clearSelected(){
    avatars.forEach(function (item,i){
        item.classList.remove('selected');
    });
}





