function mostraTabelloneDOM(mat){
    let target = document.getElementById('zonaTabellone');
    let tabellone = document.createElement('table');
    for(let i = 0; i<mat.length; i++){
        let riga = document.createElement('tr');
        for(let j = 0; j<mat.length; j++){
            let colonna = document.createElement('td');
            colonna.setAttribute('onclick', 'scopriCarta('+ i + "," + j + ")");
            let foto = document.createElement('img');
            foto.setAttribute('src', 'img/'+ mat[i][j] +'.jpg');
            foto.setAttribute('id', i + '' + j);
            colonna.appendChild(foto);
            riga.appendChild(colonna);
        }
        tabellone.appendChild(riga);
    }
    target.appendChild(tabellone);
}

function creaMatrice(dim){
    let mat = [];
    let valore = 0;
    for(let i = 0; i<dim; i++){
        mat[i] = [];
        for(let j = 0; j<dim; j++){
            mat[i][j] = valore;
            if(j%2 != 0 && (i+j) != 0){
                valore++;
            }
        }
    }
    for(let i = 0; i<dim*dim*10; i++){ 
        let primaRandom = [numeroCasuale(dim), numeroCasuale(dim)];
        let salva = mat[primaRandom[0]][primaRandom[1]];
        let secondaRandom = [numeroCasuale(dim), numeroCasuale(dim)];
        mat[primaRandom[0]][primaRandom[1]] = mat[secondaRandom[0]][secondaRandom[1]];
        mat[secondaRandom[0]][secondaRandom[1]] = salva;
    }
    return mat;
}

function numeroCasuale(dim){
    return Math.trunc(Math.random()*dim);
}

function scopriCarta(riga, colonna){
    let fotoCella = document.getElementById(riga + '' + colonna);
    if(fotoCella.getAttribute('class') == undefined && numeroCarte<2){
        fotoCella.setAttribute('class', 'scoperta');
        numeroCarte++;
        if(numeroCarte == 2){
            controllaCarte();
        }
    }
}

function controllaCarte(){
    let carte = document.getElementsByClassName('scoperta');
    if(carte[0].getAttribute('src') == carte[1].getAttribute('src')){
        completamento++;
        let indiceAudio = carte[0].getAttribute('id');
        let [riga, colonna] = indiceAudio.split('').map(Number);
        if(audio != false){
            audio.pause();
        }
        audio = new Audio('sound/' + matrice[riga][colonna] + '.MP3');
        audio.play();
        for(let i = 0; i<2; i++){
            carte[0].setAttribute('class', 'trovate');
        }
        numeroCarte = 0;
        if(completamento == (dimensione*dimensione)/2){
            setTimeout(() =>{
                if(dimensione < 10){
                    completamento = 0;
                    dimensione+=2;
                    gioco();
                }
                else {
                    assegnaPremio();
                }
            }, 3000)
        }
    }
    else{
        setTimeout(() =>{nascondiCarte(carte);}, 1000);
    }
}

function nascondiCarte(carte){
    for(let i = 0; i<2; i++){
        carte[0].removeAttribute('class');
    }
    numeroCarte = 0;
}

function gioco(){
    document.getElementById('zonaTabellone').innerHTML = '';
    matrice = creaMatrice(dimensione);
    mostraTabelloneDOM(matrice);
}

function assegnaPremio(){
    alert('hai vinto');
}

let numeroCarte = 0;
let matrice;
let completamento = 0;
let dimensione = 2;
let audio = false;