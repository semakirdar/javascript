let question = document.querySelectorAll('.question');
let questionItem = document.querySelectorAll('.question-item');

questionItem.forEach(function (item,i){
    item.addEventListener('click',function (){

        let answers = document.querySelectorAll('.answer');
        answers.forEach(function (item,i){
            item.style.display = 'none';
        });


       let answer = item.querySelector('.answer');
       if(answer.style.display == 'none'){
           answer.style.display = 'block';
       }
       else{
           answer.style.display = 'none';
       }

    });
})
