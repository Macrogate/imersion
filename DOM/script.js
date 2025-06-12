const head = document.getElementById('head');

console.log(head);
// applying css property

head.style.backgroundColor = 'blue';
head.style.color = 'white';
head.style.border = '2px solid black';

head.addEventListener('click', () => {
    console.log('h1 clicked !');
    head.style.backgroundColor = 'green';
}