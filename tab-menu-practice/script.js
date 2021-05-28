let link = document.querySelectorAll('.link');

link.forEach(function (item, i) {
    item.addEventListener('click', function () {

        link.forEach(function (item, i) {
            item.classList.remove('active');
        });

        this.classList += ' active';

        let tab = document.getElementById(this.dataset.target);
        let contentItem = document.querySelectorAll('.content-item');

        contentItem.forEach(function (item, i) {
            item.classList.remove('active');
        });

        tab.classList += ' active';

    });
});


