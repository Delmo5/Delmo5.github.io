const allPokemonURL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
let allPokemons = {};

const title = document.getElementById('title');
const display = document.getElementById('display');
const pokemonNameText = document.getElementById('pokemon-name');
const idText = document.getElementById('pokemon-id');
const weightText = document.getElementById('weight');
const heightText = document.getElementById('height');
const typesText = document.getElementById('types');
const hpText = document.getElementById('hp');
const attackText = document.getElementById('attack');
const defenseText = document.getElementById('defense');
const specialAttackText = document.getElementById('special-attack');
const specialDefenseText = document.getElementById('special-defense');
const speedText = document.getElementById('speed');

const image = document.getElementById('sprite');
const typesDiv = document.getElementById('types-div');

const searchButton = document.getElementById('search-button');
const showMoreBtn = document.getElementById('show-more-btn'); 
const showMoreDiv = document.getElementById('show-more-div');
let startIndex = 0;
let endIndex = 50;

fetch(allPokemonURL)
  .then(response => response.json())
  .then(data => {
    allPokemons = data;
    console.log("All pokemons: ", allPokemons);
    })
    .catch((err) => {
      console.error(`There was an error: ${err}`);
    });

const searchPokemon = () => {
    const inputInt = parseInt(document.getElementById('search-input').value) - 1;
    const inputStr = document.getElementById('search-input').value;
    const numberRegex = /^-?\d*(\.\d+)?$/;
    const integerRegex = /^\d+$/;

    if (numberRegex.test(inputInt)) {
        if (inputInt < 0 || inputInt > allPokemons.count) {
            alert(`Please enter a number between 1 and ${allPokemons.count}`);
            return;
        }

        if(!integerRegex.test(inputInt)) {
            alert('Please enter a whole number');
            return;
        }
        
        const pokemon = allPokemons.results[inputInt];
        console.log(pokemon);
        if(!pokemon) {
            alert('Pokemon id not found');
            return;
        }
        displayPokemon(pokemon);
    }
    else  {
        const pokemon = allPokemons.results.find(pokemon => pokemon.name === inputStr.toLowerCase().replace(/\s/g, ''));
        //console.log(pokemon);
        if(!pokemon) {
            alert('Pokemon name not found');
            return;
        }
        displayPokemon(pokemon);
    }
}

const displayPokemon = (pokemon) => {
    console.log("pokemon: ", pokemon);
    let stats = {};

    fetch(pokemon.url).then(response => response.json()).then(data => {
        stats = data;
        console.log("stats: ", stats);
        pokemonNameText.textContent = pokemon.name;
        idText.textContent = pokemon.id;
        weightText.textContent = stats.weight;
        heightText.textContent = stats.height;

        typesDiv.innerHTML = '';
        let typeNames = [];
        stats.types.forEach(type => {
            typeNames.push(type.type.name);
            typesDiv.innerHTML += `<div class="${type.type.name} type">${type.type.name}</div>`
        });
        typesText.textContent = typeNames.join(", ");

        hpText.textContent = stats.stats[0].base_stat;
        attackText.textContent = stats.stats[1].base_stat;
        defenseText.textContent = stats.stats[2].base_stat;
        specialAttackText.textContent = stats.stats[3].base_stat;
        specialDefenseText.textContent = stats.stats[4].base_stat;
        speedText.textContent = stats.stats[5].base_stat;

        image.src = stats.sprites.front_default;
        title.textContent = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} #${pokemon.id}`;
        display.style.display = 'block';

        changeColorTheme(typeNames[0]);
    });
    
}

searchButton.addEventListener('click', searchPokemon);

const changeColorTheme = (color) => {
    const root = document.querySelector(':root');
    root.style.setProperty('--main-color', `var(--${color})`);
}

async function showMore(){
    showMoreDiv.style.display = 'flex';
    showMoreBtn.innerText = 'Show More';
    for(let i = startIndex; i < endIndex; i++) {
        const pokemon = allPokemons.results[i];
        const pokemonDiv = document.createElement('div');
        const response = await fetch(pokemon.url);
        const data = await response.json();
        pokemonDiv.classList.add('pokemon');
        pokemonDiv.innerHTML = `<img src="${data.sprites.front_default}" alt="Pokémon Sprite">
                                <div class="info">                        
                                    <p><strong>Name:</strong> <span>${pokemon.name}</span></p>
                                    <p><strong>ID:</strong> <span>${pokemon.id}</span></p>
                                </div>`;
        showMoreDiv.appendChild(pokemonDiv);
    }
    startIndex += 50;
    endIndex += 50;
}

showMoreBtn.addEventListener('click', showMore);

    