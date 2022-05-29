let show = document.querySelector('#scrollTop');

window.onscroll = () =>{
    window.scrollY > 150 ? show.classList.remove('showBtn') : show.classList.add('showBtn');
};
show.onclick = ()=> {
    window.scrollTo(0,0);
};