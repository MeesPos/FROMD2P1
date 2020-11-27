document.querySelector('.animeer-knop').addEventListener('click', (e) => {
    document.querySelector('.vlak').classList.toggle('vlak__naar-rechts')
});

setTimeout( () => {
    document.querySelector('.vlak').classList.toggle('vlak__naar-rechts')
}, 2000 );

const menuKnop = document.querySelector('.nav__knop');
const navItems = document.querySelectorAll('.nav__link');

menuKnop.addEventListener('click', () => {
    navItems.forEach( (item, index) => {
        setTimeout( () => {
            item.classList.toggle('nav__link--schuif-in');
        }, 100 * index );
    })
})