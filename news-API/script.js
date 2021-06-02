let news = document.getElementById('news');
let categoryLink = document.querySelectorAll('.category-link');
let loading = document.getElementById('loading');

fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=60c3ad8877b54155a07f667a6ded11cd')
    .then(response => response.json())
    .then(function (data) {
        console.log(data);
        printNews(data);
    });

function printNews(data) {

    data.articles.forEach(function (item, i) {
        let newsItem = document.createElement('div');
        let newsTitle = document.createElement('h3');
        let newsContent = document.createElement('p');
        let newsAuthor = document.createElement('h4');
        let newsPublishedAt = document.createElement('h5');
        let newsInfo = document.createElement('div');

        if (item.urlToImage != null) {
            let newsImg = document.createElement('img');
            newsImg.src = item.urlToImage;
            newsItem.appendChild(newsImg);
            newsImg.classList += ' newsImage';
        } else {
            let newsImg = document.createElement('img');

            newsImg.src = 'https://i.ytimg.com/vi/87ORsmVj29Y/maxresdefault.jpg';
            newsItem.appendChild(newsImg);

        }

        newsTitle.innerHTML = item.title;
        newsContent.innerHTML = item.description;
        newsAuthor.innerHTML = item.author;
        newsPublishedAt.innerHTML = item.publishedAt;

        newsInfo.appendChild(newsTitle);
        newsInfo.appendChild(newsContent);
        newsInfo.appendChild(newsAuthor);
        newsInfo.appendChild(newsPublishedAt);
        newsItem.appendChild(newsInfo);


        news.appendChild(newsItem);

        newsItem.classList += ' newsItem';
        newsInfo.classList += ' newsInfo';
    });
}

categoryLink.forEach(function (item, i) {
    item.addEventListener('click', function () {
        console.log('clicked');
        loading.innerHTML = 'loading...';
        news.innerHTML = '';
        setTimeout(function () {
            let category = item.dataset.target;
            fetch('https://newsapi.org/v2/top-headlines?country=us&category=' + category + '&apiKey=60c3ad8877b54155a07f667a6ded11cd')
                .then(response => response.json())
                .then(function (data) {
                    loading.innerHTML = '';
                    printNews(data);
                });
        }, 1500);
    });
});