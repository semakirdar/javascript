let input = document.getElementById('input');
let add = document.getElementById('add');
let list = document.getElementById('list');
let del = document.getElementById('delete');

let listArray = [];

add.addEventListener('click', function () {
    let inputText = input.value;
    listArray.push(inputText);
    //list.innerHTML += inputText + "<br/>";
    list.innerHTML += "<div class='list-item'>" + inputText + "<br/>" + "</div>";

});

del.addEventListener('click', function () {
    listArray.pop();
    list.innerHTML = '';
    listArray.forEach(function (item, i) {

       //list.innerHTML += item + "<br/>";
        list.innerHTML += "<div class='list-item'>" + item + "<br/>" + "</div>";

    });
});
