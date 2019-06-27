const posts = {
    postPerPage: 10
    , currentPage: 1
    , results: null
};
const pagination = document.querySelector('.pages');
const output = document.querySelector('.output');
const init = function () {
    console.log('ready');
    const url = 'https://randomuser.me/api/?results=66';
    fetch(url).then(function (res) {
        return res.json()
    }).then(function (data) {
        posts.results = data.results;
        loadPage(8);
    })
}
const loadPage = function (pg) {
    posts.currentPage = pg;
    let startPost = (posts.currentPage - 1) * posts.postPerPage;
    let totalPages = Math.ceil(posts.results.length / posts.postPerPage);
    let endPost = startPost + posts.postPerPage > posts.results.length ? posts.results.length : startPost + posts.postPerPage;
    console.log(totalPages);
    console.log(startPost);
    output.innerHTML = `<h1>Page ${posts.currentPage}</h1>`;
    for (let x = startPost; x < endPost; x++) {
        console.log(posts.results[x]);
        let div = document.createElement('div');
        div.innerHTML = `${x} ${posts.results[x].name.first}<br>`;
        output.appendChild(div);
    }
}
window.addEventListener('load', function () {
    init();
})