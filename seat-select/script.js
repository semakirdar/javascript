let seats = document.querySelectorAll('.seat');
let text = document.getElementById('text');
let filmsPrice = document.getElementById('films-price');
let filmInput = document.getElementById('film');
let priceText = document.getElementById('priceText');
let total = 0;
let chooseFilm;
let ticketPrice;


let films = [
    {
        name: 'Joker',
        price: '15TL',
    },
    {
        name: 'Ayla',
        price: '20TL'
    },
    {
        name: 'Dangal',
        price: '35TL'
    }
]

films.forEach(function (item, i) {
    let newFilmOption = document.createElement('option'); // <option></option>
    newFilmOption.text = item.name; //<option>Joker</option>
    newFilmOption.value = i; //<option>Joker</option>
    filmInput.add(newFilmOption);
});

filmInput.addEventListener('change', function () {
    console.log('changed');
    chooseFilm = this.value;
    filmsPrice.innerHTML = films[chooseFilm].price;
    ticket();
});

seats.forEach(function (item, i) {
    item.addEventListener('click', function () {
        if(!item.classList.contains( "full")){
            if (this.classList.contains('selected')) {
                //var
                this.classList.remove("selected");
                total--;
                text.innerHTML = total;
                ticket();
            } else {
                //yok
                this.classList += " selected";
                total++;
                text.innerHTML = total + ' ADET';
                ticket();
            }

        }
        else{
            text.innerHTML='Bu Koltuk Dolu !';
            priceText.innerHTML = '';
        }
    });
});

function ticket() {
    ticketPrice = parseInt(total) * parseInt(films[chooseFilm].price);
    priceText.innerHTML = ticketPrice + 'TL';
}










