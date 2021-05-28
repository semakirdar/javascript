let tabLink = document.querySelectorAll('.tab-link');

tabLink.forEach(function (item, i) {
    item.addEventListener('click', function () {
        tabLink.forEach(function (item,i){
            item.classList.remove('active');
        })

        this.classList += ' active';

        let tab = document.getElementById(this.dataset.target);


         let tabContentItem = document.querySelectorAll('.tab-content-item');
         tabContentItem.forEach(function (item,i){
            item.classList.remove('active');
         })

        tab.classList += ' active';
    });

});


