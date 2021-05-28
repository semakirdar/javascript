let userComment = document.getElementById('user-comment');
let userName = document.getElementById('user-name');
let sendButton = document.getElementById('comment-send');
let comments = document.getElementById('comments');
let users = document.getElementById('users');


let Array = [];


sendButton.addEventListener('click', function () {
    let inputName = userName.value;
    let inputComment =userComment.value ;

    let newComment = {
        name: inputName,
        comment: inputComment
    };
    Array.push(newComment);
    console.log(Array);

    Array.forEach(function (item, i) {
        let newCommentOption;
        newCommentOption = document.createElement('div'); //<option></option>
        newCommentOption.text = item.name;
        newCommentOption.text = item.comment;
        newCommentOption.value = i;

        comments.appendChild(newCommentOption)
    });


});


