let productList = document.getElementById('product-list');
let productDetail = document.getElementById('product-detail');
let detailImg = document.getElementById('image');
let detailName = document.getElementById('name');
let detailDescription = document.getElementById('description');
let detailComments = document.getElementById('comments');
let inputName = document.getElementById('inputName');
let inputComment = document.getElementById('inputComment');
let addButton = document.getElementById('addButton');
let error = document.getElementById('error');
let message = document.getElementById('message');
let prev = document.getElementById('prev');
let inputRating = document.getElementById('inputRating');

axios.get('http://127.0.0.1/product-api/')
    .then(function (response) {
        console.log(response)
        response.data.forEach(function (item, i) {

            let productItem = document.createElement('div');
            let name = document.createElement('div');
            let image = document.createElement('img');
            let img = document.createElement('div');
            let button = document.createElement('div');
            let btnDetail = document.createElement('button');


            btnDetail.dataset.target = item.id;

            btnDetail.classList += ' detailButton';
            productItem.classList += ' productItem';
            name.classList += ' name';

            name.innerHTML = item.name;
            image.src = item.image;
            btnDetail.innerHTML = 'Detail';


            btnDetail.addEventListener('click', function () {
                productList.style.display = 'none';
                productDetail.style.display = 'block';

                detailComments.innerHTML = '';

                let id = this.dataset.target;

                axios.get('http://127.0.0.1/product-api/detail/' + id)
                    .then(function (response) {
                        console.log(response);

                        addButton.dataset.target = id;
                        detailImg.src = response.data.product.image;
                        detailName.innerHTML = response.data.product.name;
                        detailDescription.innerHTML = response.data.product.description;
                        if (response.data.comments.length > 0) {
                            response.data.comments.forEach(function (item, i) {
                                commentPrint(item);
                            });
                        }
                    });


            });
            img.appendChild(image);
            button.appendChild(btnDetail);

            productItem.appendChild(img);
            productItem.appendChild(name);
            productItem.appendChild(button);

            productList.appendChild(productItem);

        });
    });

addButton.addEventListener('click', function () {

    let userName = inputName.value;
    let userComment = inputComment.value;
    let userRating = inputRating.value;
    let product_id = this.dataset.target;

    console.log('add button clicked');

    axios.post('http://127.0.0.1/product-api/comment/create', {
        name: userName,
        comment: userComment,
        rating: userRating,
        product_id: product_id
    })
        .then(function (response) {
            if (response.data.success == true) {
                inputName.value = '';
                inputComment.value = '';
                inputRating.value = '';
                commentPrint(response.data.data);


                message.innerHTML = response.data.message;
                setTimeout(function () {
                    message.innerHTML = '';

                }, 2000);

            } else {
                error.innerHTML = '';
                response.data.errors.forEach(function (item, i) {

                    error.innerHTML += item + '</br>';
                });
            }
        })
})

function commentPrint(item) {

    let commentItem = document.createElement('div');
    let commentName = document.createElement('div');
    let commentContent = document.createElement('div');
    let comment = document.createElement('div');
    let rating = document.createElement('div');
    let createdAt = document.createElement('div');

    let btnDelete = document.createElement('button');

    let commentLeft = document.createElement('div');


    commentName.innerHTML = item.name;
    comment.innerHTML = item.comment;
    createdAt.innerHTML = item.created_at;

    commentName.classList += ' commentName';

    commentItem.classList += ' commentItem';
    commentLeft.classList += ' commentLeft';


    btnDelete.innerHTML = 'Delete';
    for(let i = 1; i <= item.rating; i++){
        let ratingStarIcon =document.createElement('i');
        ratingStarIcon.classList += ' fas fa-star';
        rating.appendChild(ratingStarIcon);
    }

    btnDelete.dataset.target = item.id;

    commentContent.appendChild(comment);
    commentContent.appendChild(rating);

    commentLeft.appendChild(commentName);
    commentLeft.appendChild(commentContent);

    //commentItem.appendChild(commentName);
    //commentItem.appendChild(commentContent);
    commentItem.appendChild(commentLeft);
    commentItem.appendChild(createdAt);

    commentItem.appendChild(btnDelete);

    detailComments.appendChild(commentItem);
    btnDelete.addEventListener('click', function () {
        let id = this.dataset.target;
        axios.post('http://127.0.0.1/product-api/comment/delete', {
            id: id
        })
            .then(function (response) {
                if (response.data.success == true) {
                    message.innerHTML = response.data.message;
                    setTimeout(function (){
                        message.innerHTML ='';
                    },1500);
                    detailComments.innerHTML = '';
                    response.data.data.forEach(function (item, i) {
                        commentPrint(item);

                    });
                }
            })
    });
}
prev.addEventListener('click',function (){

        productList.style.display = 'flex';
        productDetail.style.display = 'none';





});