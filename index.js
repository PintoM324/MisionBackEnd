function moverBotonRandom(elm){
    elm.style.position = 'absolute';
    elm.style.top = Math.random()* (window.innerHeight - elm.offsetHeight) + 'px';
    elm.style.left = Math.random()* (window.innerWidth - elm.offsetWidth) + 'px';
}

let btnSi = document.getElementById('btn_si');
let btnNo = document.getElementById('btn_no');
let divXD = document.getElementsByClassName('XD')[0];

btnNo.addEventListener('mouseenter', function(e){moverBotonRandom(e.target)});
btnSi.addEventListener('click', function(e){
    alert('gosaimasu');
    divXD.style.display = 'block';
    const cancion = new Audio('audio/xd.webm');
    cancion.play();
    }   
)
