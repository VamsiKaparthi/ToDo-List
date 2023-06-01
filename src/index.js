import './style.css';
import 'boxicons';
import {f,quoteGen} from './functions/headerFunctions.js';

//Header

//dark light mode toggle
const toggle = document.getElementById('toggleDark');
toggle.addEventListener('click',f);

//Quote Generator
quoteGen()

//Control
