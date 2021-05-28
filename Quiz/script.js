//let buttonPrev = document.getElementById('button-prev');
//let buttonNext = document.getElementById('button-next');
let buttonFinish = document.getElementById('button-finish');
let question = document.getElementById('question');
let answerItems = document.querySelectorAll('.answer-item');
let messages = document.getElementById('message');
let questionNumber = document.getElementById('question-number');
let questionNumberItems;

let eventAdded = false;
let counter = 0;
let correctCount = 0;
let userAnswers = []
let questions = [
    {
        text: 'What does HTML stand for?',
        answers: [
            {
                text: ' Home Tool Markup Language',
                isCorrect: false,
            },
            {
                text: '  Hyper Text Markup Language',
                isCorrect: true,
            },
            {
                text: '  Hyperlinks and Text Markup Language',
                isCorrect: false,
            }

        ]
    },
    {
        text: 'Who is making the Web standards?',
        answers: [
            {
                text: '  Mozilla',
                isCorrect: false,
            },
            {
                text: 'Google',
                isCorrect: true,
            },
            {
                text: 'Microsoft',
                isCorrect: false,
            }

        ]
    },
    {
        text: 'Choose the correct HTML element for the largest heading:',
        answers: [
            {
                text: 'h6',
                isCorrect: false,
            },
            {
                text: 'head',
                isCorrect: false,
            },
            {
                text: ' h1',
                isCorrect: true,
            }
        ]
    }
]

/*buttonPrev.addEventListener('click', function () {
    nextQuestions();
});

buttonNext.addEventListener('click', function () {
    nextQuestions();
});*/

function changeAnswers() {
    answerItems.forEach(function (item, i) {
        item.innerHTML = questions[counter].answers[i].text;
        item.dataset.target = i;

        if (!eventAdded) {
            item.addEventListener('click', function () {
                eventAdded = true;
                let alreadyAnswered = false;
                userAnswers.forEach(function (item,i){
                    if(item.question == counter){
                        alreadyAnswered = true;
                    }
                })

                if(!alreadyAnswered){
                    let userAnswer = {
                        question: counter,
                        answer: i
                    };
                    userAnswers.push(userAnswer);
                }

                nextQuestions();
            });
        }
    });
}

question.innerHTML = questions[counter].text;
changeAnswers();


function nextQuestions() {
    counter++;
    if (questions[counter]) {
        question.innerHTML = questions[counter].text;
        changeAnswers();
    } else {
        messages.innerHTML = 'quiz bitti...'
    }
}

buttonFinish.addEventListener("click", function () {
    userAnswers.forEach(function (userAnswer, i) {
        if (questions[userAnswer.question].answers[userAnswer.answer].isCorrect) {
            correctCount++;
        }
        question.style.display = 'none';

        buttonFinish.style.display = 'none';
        answerItems.forEach(function (item, i) {
            item.style.display = 'none';
        })
    });
    messages.innerHTML = correctCount + ' doğru!!!!!';
});

for (let i = 1; i <= questions.length; i++) {
    let newListHTML;
    newListHTML = '<div class="question-number-item" data-target="' + (i - 1) + '">  <a href="#"  >' + i + '</a> </div>'
    questionNumber.innerHTML += newListHTML;
}

questionNumberItems = document.querySelectorAll('.question-number-item');

questionNumberItems.forEach(function (item, i) {
    item.addEventListener('click', function () {
        let questionIndex = this.dataset.target;
        question.innerHTML = questions[questionIndex].text;
        answerItems.forEach(function (item, i) {
            item.innerHTML = questions[questionIndex].answers[i].text;
        });

        counter = questionIndex;

    });
});

