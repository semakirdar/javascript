let counter = 0;

let text=document.getElementById('text');
let button=document.getElementById('button');

button.addEventListener('click', function (){
    text.innerHTML=counter++;
});