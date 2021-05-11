let button = document.getElementById('button');
let colors = ['#c2982f', '#424d99', '#582261','#cb85db','#226146FF'];


button.addEventListener('click', function () {
    let randomIndex = Math.floor(Math.random() * colors.length);
    document.body.style.backgroundColor = colors[randomIndex];

    color.innerHTML =colors[randomIndex];
});