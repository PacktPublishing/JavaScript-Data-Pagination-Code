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
        loadPage(1);
    }).catch(function (error) {
        console.log(error);
    })
}
const loadPage = function (pg) {
    posts.currentPage = pg;
    pagination.innerHTML = '';
    let startPost = (posts.currentPage - 1) * posts.postPerPage;
    let totalPages = Math.ceil(posts.results.length / posts.postPerPage);
    let endPost = startPost + posts.postPerPage > posts.results.length ? posts.results.length : startPost + posts.postPerPage;
    output.innerHTML = `<h1>Page ${posts.currentPage}</h1>`;
    let pageOutput = document.createElement('div');
    for (let x = 0; x < totalPages; x++) {
        let span = document.createElement('span');
        span.textContent = (x + 1);
        span.classList.add('pages');
        span.addEventListener('click', function () {
            loadPage(x + 1);
        })
        if (x + 1 === posts.currentPage) {
            span.classList.add('active');
        }
        pageOutput.appendChild(span);
    }
    for (let x = startPost; x < endPost; x++) {
        let div = document.createElement('div');
        div.classList.add('person');
        let person = posts.results[x].name;
        div.innerHTML = `${x} ${capMe(person.first)} ${capMe(person.last)}<br>`;
        output.appendChild(div);
    }
    pagination.appendChild(pageOutput);
}
const capMe = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
window.addEventListener('load', function () {
    init();
})