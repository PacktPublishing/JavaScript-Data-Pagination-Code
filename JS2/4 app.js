const posts = {
    postPerPage: 10
    , currentPage: 1
    , results: null
};
const pagination = document.querySelector('.pages');
const output = document.querySelector('.output');
const init = function () {
    console.log('ready');
    const url = 'https://randomuser.me/api/?results=100';
    fetch(url).then(function (res) {
        return res.json()
    }).then(function (data) {
        posts.results = data.results;
        loadPage(1);
    })
}
const loadPage = function (pg) {
    console.log(pg);
    posts.currentPage = pg;
    output.innerHTML = `<h1>Page ${posts.currentPage}</h1>`;
    for (let x = 0; x < posts.postPerPage; x++) {
        console.log(posts.results[x]);
        let div = document.createElement('div');
        div.innerHTML = `${posts.results[x].name.first}<br>`;
        output.appendChild(div);
    }
}
window.addEventListener('load', function () {
    init();
})