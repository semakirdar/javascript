let inputName = document.getElementById('inputName');
let inputPhone = document.getElementById('inputPhone');
let btnSave = document.getElementById('btn-save');
let error = document.getElementById('error');
let message = document.getElementById('message');
let deleteAll = document.getElementById('btn-deleteAll');
let iconSearch = document.getElementById('iconSearch');
let inputSearch = document.getElementById('searchInput');
let btnSearch = document.getElementById('btn-search');
let search = document.getElementById('search');
let contacts = document.getElementById('contacts');
let iconBars = document.getElementById('iconBars');

axios.get('http://127.0.0.1/contact-api/')
    .then(function (response) {//verileri çekmek için
        response.data.forEach(function (item, i) {
            printContact(item);
        });
    });

btnSave.addEventListener('click', function () {
    let name = inputName.value;
    let phone = inputPhone.value;


    axios.post('http://127.0.0.1/contact-api/create', {//veri eklemek için
        name: name,
        phone: phone
    })
        .then(function (response) {
            if (response.data.success == true) {
                message.innerHTML = '';
                error.innerHTML = '';
                message.style.display = 'block';
                error.style.display = 'none';
                message.innerHTML = response.data.message;
                printContact(response.data.data);
            } else {
                response.data.errors.forEach(function (item, i) {
                    message.innerHTML = '';
                    error.innerHTML = '';
                    message.style.display = 'none';
                    error.style.display = 'block';
                    error.innerHTML += item + '<br/>';
                });
            }
        });

});

function printContact(item) {
    inputName.value = '';
    inputPhone.value = '';

    let contact = document.createElement('div');
    let id = document.createElement('div');
    let img = document.createElement('img');
    let name = document.createElement('div');
    let phone = document.createElement('div');
    let createdAt = document.createElement('div');
    let contactButton = document.createElement('div');
    let contactInfo = document.createElement('div');
    let infoItem = document.createElement('div');
    let infoImg = document.createElement('div');
    let btnDelete = document.createElement('button');
    let btnUpdate = document.createElement('button');

    id.innerHTML = item.id;
    img.src = 'https://image.flaticon.com/icons/png/512/21/21104.png';
    name.innerHTML = item.name;
    phone.innerHTML = item.phone;
    createdAt.innerHTML = item.created_at;
    btnDelete.innerHTML = 'DELETE';
    btnUpdate.innerHTML = 'UPDATE';

    btnDelete.dataset.target = item.id;

    contact.classList += ' contact';
    contactInfo.classList += ' contactInfo';
    createdAt.classList += ' createdAt';

    infoImg.appendChild(img);

    infoItem.appendChild(id);
    infoItem.appendChild(name);
    infoItem.appendChild(phone);

    contactButton.appendChild(createdAt);
    contactButton.appendChild(btnDelete);
    contactButton.appendChild(btnUpdate);

    contactInfo.appendChild(infoImg);
    contactInfo.appendChild(infoItem);
    contact.appendChild(contactInfo);
    contact.appendChild(contactButton);

    contacts.appendChild(contact);


    btnDelete.addEventListener('click', function () {
        let id = this.dataset.target;

        axios.post('http://127.0.0.1/contact-api/delete', {
            id: id
        })
            .then(function (response) {
                if (response.data.success == true) {
                    contacts.innerHTML = '';
                    response.data.data.forEach(function (item, i) {
                        printContact(item);
                    });
                    error.style.display = 'none';
                    message.style.display = 'block';
                    message.innerHTML = '';
                    message.innerHTML = response.data.message;
                    setTimeout(function () {
                        error.innerHTML = '';
                    }, 2000);

                } else {
                    error.style.display = 'block';
                    message.style.display = 'none';
                    error.innerHTML = '';
                    error.innerHTML = response.data.message;
                    setTimeout(function () {
                        error.innerHTML = '';
                    }, 2000);
                }
            });
    });
}

deleteAll.addEventListener('click', function () {
    let id = this.dataset.target;
    axios.post('http://127.0.0.1/contact-api/delete-all', {
        id: id
    })
        .then(function (response) {
            if (response.data.success == true) {
                contacts.innerHTML = '';
                message.innerHTML = '';
                error.innerHTML = '';
                message.innerHTML = response.data.message;
                setTimeout(function () {
                    error.innerHTML = '';
                }, 2000);

            } else {
                response.data.errors.forEach(function (item, i) {
                    message.innerHTML = '';
                    error.innerHTML = '';
                    error.innerHTML += item + "<br/>";
                });
            }
        });
});

iconSearch.addEventListener('click', function () {
    if (search.style.display == 'block') {

        search.style.display = 'none';
    } else {
        search.style.display = 'block';
    }
});
btnSearch.addEventListener('click', function () {
    let searchText = inputSearch.value;
    if (searchText.length <=0){
       error.innerHTML ='Aranacak bir şey bulunamadı..!!';
        error.style.display = 'block';
    }
    else{
        axios.get('http://127.0.0.1/contact-api/search/' + searchText,)
            .then(function (response) {
                if(response.data.length <= 0){
                    error.innerHTML = 'Arama sonucu bulunamadı.';
                    error.style.display = 'block';
                }else{
                    contacts.innerHTML = '';
                    inputSearch.value = '';
                    response.data.forEach(function (item, i) {
                        printContact(item);
                    });
                }
            });
    }

});
iconBars.addEventListener('click',function (){
    contacts.innerHTML='';
    axios.get('http://127.0.0.1/contact-api/')
        .then(function (response) {//verileri çekmek için
            response.data.forEach(function (item, i) {
                printContact(item);
            });
        });
    search.style.display = 'none';
});



