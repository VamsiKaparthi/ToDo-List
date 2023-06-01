import './style.css';
import 'boxicons';

const toggle = document.getElementById('toggleDark');
const body = document.querySelector('body');
const icon = document.querySelector('i')
toggle.addEventListener('click', function(){
    this.classList.toggle('bi-brightness-high-fill');
    if(this.classList.toggle('bi-moon-fill')){
        body.style.background = 'antiquewhite';
        body.style.color = 'black';
        body.style.transition = '0.5s';
        icon.style.color = 'black'
        
    }else{
        body.style.background = 'black';
        body.style.color = 'white';
        body.style.transition = '0.5s';
        icon.style.color = '#ca4726';
    }
});