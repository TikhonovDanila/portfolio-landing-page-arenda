
let headerBurger = document.querySelector('.header-burger');
let menuNav = document.querySelector('.header-menu-nav');
let body = document.body;

headerBurger.addEventListener('click',()=>{
    menuNav.classList.toggle('active');
    body.classList.toggle('lock');
})