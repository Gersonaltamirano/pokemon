const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const HTMLResponse = document.querySelector('#app');
const ul = document.createElement('ul');

//elementos del primero pokemon
const div1 = document.createElement('div');
div1.classList.add('card', 'col-md-4');
div1.style.width = '13rem';
div1.style.height = '30rem';
const img1 = document.createElement('img');
img1.classList.add('card-img-top');
const div3 = document.createElement('div');
div3.classList.add('card-body');
const parrafo1 = document.createElement('p');

//elementos del segundo pokemon
const div2 = document.createElement('div');
div2.classList.add('card', 'col-md-4', );
div2.style.width = '13rem';
div2.style.height = '30rem';
const img2 = document.createElement('img');
img2.classList.add('card-img-top', );
const div4 = document.createElement('div');
div4.classList.add('card-body');
const parrafo2 = document.createElement('p');

const min = 1;
const max = 500;

var id_aleatorio1 = Math.floor(Math.random() * (max - min)) + min
var id_aleatorio2 = Math.floor(Math.random() * (max - min)) + min

var pokemon1 = {}
var pokemon2 = {}

var turno = Math.floor(Math.random() * (2 - 1)) + 1

document.getElementById('turno').value = turno

obtenerPokemons()

function obtenerPokemons(){
    //funcion para obtener el pokemon1
    fetch(`${API_URL}${id_aleatorio1}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(pokemon) {
        // console.log(pokemon.moves[0].move);
        let numero_ataques = pokemon.moves.length;
        let ataques = pokemon.moves;
        let ataque_aleatorio = Math.floor(Math.random() * (numero_ataques ));
        let nombre_ataque = pokemon.moves[ataque_aleatorio].move.name;
        // let nombre_url = pokemon.moves[ataque_aleatorio].move.url;
        let poder_ataque =  Math.floor(Math.random() * (200 - 10)) + 10
        let SP = pokemon.stats[0].base_stat * 10;
        let DP = pokemon.stats[2].base_stat;

        pokemon1 = {
            nombre: pokemon.name,
            ataques: ataques,
            nombre_ataque: nombre_ataque,
            poder_ataque: poder_ataque,
            Puntos_vida: SP,
            Puntos_defensa: DP
        }

        console.log(pokemon1);

        img1.src = pokemon.sprites.other.dream_world.front_default;
        div1.appendChild(img1);
        div1.appendChild(div3);
        parrafo1.appendChild(
            document.createTextNode(
                'Nombre: '+ pokemon.name 
                + '\n' + 'Tipo: '+pokemon.types[0].type.name 
                + '\n' + 'Peso: '+pokemon.weight 
                + '\n' + 'Altura: '+pokemon.height 
                + '\n' + 'Ataque: '+ nombre_ataque 
                + '\n' + 'Poder: ' + poder_ataque  
                + '\n' + 'SP: '+ SP 
                + '\n' + 'DP: '+ DP)
        );
        div1.appendChild(parrafo1);
        return pokemon;
    })

    //funcion para obtener el pokemon2
    fetch(`${API_URL}${id_aleatorio2}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(pokemon) {
        let numero_ataques = pokemon.moves.length;
        let ataques = pokemon.moves;
        let ataque_aleatorio = Math.floor(Math.random() * (numero_ataques )) ;
        let nombre_ataque = pokemon.moves[ataque_aleatorio].move.name;
        // let nombre_url = pokemon.moves[ataque_aleatorio].move.url;
        let poder_ataque =  Math.floor(Math.random() * (200 - 10)) + 10
        let SP = pokemon.stats[0].base_stat * 10;
        let DP = pokemon.stats[2].base_stat;

        pokemon2 = {
            nombre: pokemon.name,
            ataques: ataques,
            nombre_ataque: nombre_ataque,
            poder_ataque: poder_ataque,
            Puntos_vida: SP,
            Puntos_defensa: DP
        }

        console.log(pokemon2);

        img2.src = pokemon.sprites.other.dream_world.front_default;
        div2.appendChild(img2);
        div2.appendChild(div4);
        parrafo2.appendChild(
            document.createTextNode(
                'Nombre: '+ pokemon.name 
                + '\n' + 'Tipo: ' + pokemon.types[0].type.name 
                + '\n' + 'Peso: ' + pokemon.weight 
                + '\n' + 'Altura: ' + pokemon.height 
                + '\n' + 'Ataque: ' + nombre_ataque 
                + '\n' + 'Poder: ' + poder_ataque 
                + '\n' + 'SP: ' + SP 
                + '\n' + 'DP: ' + DP
            )
        );
        div2.appendChild(parrafo2);
    })
}

    HTMLResponse.appendChild(div1);
    HTMLResponse.appendChild(div2);

    function atacar(){
        if(turno == 1){
            let ataque = pokemon1.poder_ataque;
            let defensa = pokemon2.Puntos_defensa;
            let vida = pokemon2.Puntos_vida;

            if(ataque > defensa){
                vida = vida - (ataque - defensa);
            }else{
                vida = vida - (defensa - ataque/4);
            }

            pokemon2.Puntos_vida = vida;
            turno = 2;
            document.getElementById('turno').value = turno
            console.log('puntos de vida pokemon 2 ' + pokemon2.Puntos_vida);
            if(pokemon2.Puntos_vida <= 0){
                alert('TU Ganaste');
                location.reload();
            }
        }
        else{
            let ataque = pokemon2.poder_ataque;
            let defensa = pokemon1.Puntos_defensa;
            let vida = pokemon1.Puntos_vida;

            if(ataque > defensa){
                vida = vida - (ataque - defensa);
            }else{
                vida = vida - ( defensa - ataque/4);
            }
            pokemon1.Puntos_vida = vida;
            turno = 1;
            document.getElementById('turno').value = turno
            console.log('puntos de vida pokemon 1 ' + pokemon1.Puntos_vida);
            if(pokemon1.Puntos_vida <= 0){
                alert('TU Perdiste');
                location.reload();
            }
        }
    }
    


