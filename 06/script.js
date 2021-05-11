let buttonNext = document.getElementById('buttonNext');
let buttonPrev = document.getElementById('buttonPrev');
let img = document.getElementById('img');
let images = ['https://i2.cnnturk.com/i/cnnturk/75/630x0/55cb018e8685761f08995d92.jpg', 'https://resimarama.net/wp-content/uploads/2019/07/Note-10-foto-576x1024.jpg']

let counter = 0;

buttonPrev.addEventListener('click', function () {

    if (counter <= 0)
        counter = images.length - 1;
    else
        counter--;

    img.src = images[counter];

});
buttonNext.addEventListener('click', function () {

    if (counter = images.length - 1)

        counter = 0;
    else
        counter++;

    img.src = images[counter];
});