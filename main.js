
//JS CODE COOKIE CLIKER
let counter = 0;
document.querySelector('.btn-cookieClicker').addEventListener('click', function () {
    counter++;
    document.querySelector('.score').textContent = counter;
});

