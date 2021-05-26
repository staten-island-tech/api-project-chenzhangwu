import { DOMSelectors } from "./DOM";

document.getElementById('button').addEventListener('click' ,
function (){
    document.querySelector('.popUp').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', 
function() {
    document.querySelector('.popUp').style.display = 'none';
});