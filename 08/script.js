let text = document.getElementById('text');
let textContent = document.getElementById('textContent');
let button = document.getElementById('button');


button.addEventListener('click', function () {

      if(textContent.style.display==""){
          textContent.style.display = "block";
      }
      else{
          textContent.style.display="none";
      }
});