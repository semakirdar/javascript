let button = document.getElementById('button');

button.addEventListener('click', function () {
    if (button.classList.contains('active')) {
        button.classList.remove("active");


    } else {

        button.classList += " active";
    }


});