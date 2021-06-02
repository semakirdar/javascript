let products = document.getElementById('products');
let buttonBasket = document.getElementById('buttonBasket');
let basketList = document.getElementById('basketList');
let message = document.getElementById('message');

let cart = [];
let productsList = [
    {
        image: 'https://productimages.hepsiburada.net/s/77/1100/110000018959482.jpg/format:webp',
        name: ' instax Mini 11 Lila',
        price: '800TL',
    },
    {
        image: 'https://productimages.hepsiburada.net/s/32/550/10364157788210.jpg/format:webp',
        name: 'Canon Zoemini S Rose Gold',
        price: '1500TL',

    },
    {
        image: 'https://productimages.hepsiburada.net/s/42/550/10754241724466.jpg/format:webp',
        name: 'Kodak Mini Shot Combo',
        price: '1000TL',

    },
];

productsList.forEach(function (item, i) {

    let productItem = document.createElement('div');
    let productImage = document.createElement('img');
    let productName = document.createElement('div');
    let productPrice = document.createElement('div');
    let btnaddCart = document.createElement('button');

    productItem.classList += ' product-item';

    productImage.src = item.image;
    productName.innerHTML = item.name;
    productPrice.innerHTML = item.price;
    btnaddCart.innerHTML = 'SEPETE EKLE';
    btnaddCart.dataset.target = i;

    productItem.appendChild(productImage);
    productItem.appendChild(productName);
    productItem.appendChild(productPrice);
    productItem.appendChild(btnaddCart);

    products.appendChild(productItem);


    btnaddCart.addEventListener('click', function () {
        let selectedIndex = this.dataset.target;

        let found = false;
        cart.forEach(function (item,i){
            if(item.id == selectedIndex)
                found = true;
        });

        if(!found){
            cart.push({
                id: selectedIndex,
                quantity: 1
            });

            printCart();
        }
        else{
            message.innerHTML = 'Bu ürün zaten sepetinizde mevcut. Sepeti kullanarak adet güncellemesi yapabilirsiniz.';
            setTimeout(function (){
                message.innerHTML = '';
            },2000);
        }
    });

});

buttonBasket.addEventListener('click', function () {

    if(basketList.style.display == 'block'){
        basketList.style.display = 'none';
    }
    else{
        basketList.style.display = 'block'
    }

});

function printCart() {
    basketList.innerHTML = '';
    cart.forEach(function (item, i) {
        let product = productsList[item.id];

        let cartItem = document.createElement('div');
        let cartName = document.createElement('div');
        let cartQuantity = document.createElement('h4');
        let btnIncrease = document.createElement('button');
        let btnDecrease = document.createElement('button');

        cartName.innerHTML = product.name;
        cartQuantity.innerHTML = item.quantity;
        btnDecrease.innerHTML = 'Decrease';
        btnIncrease.innerHTML = 'Increase';

        btnIncrease.dataset.target = i;
        btnDecrease.dataset.target = i;

        btnIncrease.addEventListener('click',function (){
            let cartIndex = this.dataset.target;

            let cartItem = cart[cartIndex];
            cartItem.quantity++;

            printCart();
        });
        btnDecrease.addEventListener('click',function (){
            let cartIndex = this.dataset.target;
            let cartItem = cart[cartIndex];
            if(cartItem.quantity>1){
                cartItem.quantity--;
            }


            printCart();
        });

        cartItem.appendChild(cartName);
        cartItem.appendChild(cartQuantity);
        cartItem.appendChild(btnIncrease);
        cartItem.appendChild(btnDecrease);

        basketList.appendChild(cartItem);
    });
}





