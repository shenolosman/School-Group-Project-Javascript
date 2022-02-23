// DOM Objects
document.getElementById("title").innerHTML = "Pokemon Webshop";
const pokeWeb = document.getElementById("pokeWeb");
const leftpagination = document.querySelector(".left-button");
const rightpagination = document.querySelector(".right-button");

//constanst and variables
let prevUrl=null;
let nextUrl=null;

//Functions
async function fetchPokemon() {
   url = new URL(`https://pokeapi.co`);
  url.pathname = `/api/v2/pokemon`;
 url.searchParams.set("limit", 20);
 url.searchParams.set("offset",0);

  const response = await fetch(url);
  console.log(response);
  const data = await response.json();
  const {previous,next}=data;
  prevUrl=previous;
  nextUrl=next;
  console.log(data);

  const pokemon = data.results.map((result, index) => ({
    apiURL: result.url,
    name: result.name,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
  }));
  console.log(pokemon);
  showPokemon(pokemon);
}

async function showPokemon(pokemon) {
  let price = Array.from({ length: 1000 }, () =>
    Math.floor((Math.random() * 100)+20)
  );
  const pokemonHTMLstring = pokemon
    .map(
      (pokeman) =>
        `
      <li class="card">
      <img class="card-image" src="${pokeman.image}"/>
      <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
     <p class="price-text">$${price[pokeman.id - 1]}<p>
     <div >
  <button type="button" id="select-pokemon-btn" class="btn btn-success" onclick="selectPokemon(${
    pokeman.id
  })">
    Läs mer
  </button>
  <button type="button" id="buy-pokemon-btn" class="btn btn-primary" onclick="BuyPokemon(${
    pokeman.id
  })">
    Köpa Kort
  </button>
   </li>
   </div>
      `
    )
    .join("");

  pokeWeb.innerHTML = pokemonHTMLstring;
}

async function selectPokemon(id) {
  const url = new URL(`https://pokeapi.co`);
  url.pathname = `/api/v2/pokemon/${id}`;

  const response = await fetch(url);
  const pokeman = await response.json();
  showPopup(pokeman);
}
function showPopup(pokeman) {
  const image = pokeman.sprites[`front_default`];
  const type = pokeman.types.map((type) => type.type.name).join(", ");

  const htmlInfoString = `
    <div class="popup">  
      <h1 style="margin-top:100px;">${pokeman.id}. ${pokeman.name}</h1>
      <img class="card-image" src="${image}"/>
      <p class="text">Height: <b>${pokeman.height}</b> | Weight: <b>${pokeman.weight}</b>  | Type: <b>${type}</b></p>
      <button type="button" id="closeBtn" class="btn btn-danger">Close</button>
      <button type="button" id="buy-pokemon-btn" class="btn btn-primary" onclick="BuyPokemon(${pokeman.id})">Köpa Kort</button>
    </div>
    `;

  pokeWeb.innerHTML = htmlInfoString + pokeWeb.innerHTML;
  document.getElementById("closeBtn").onclick = closePopup;
}
function closePopup() {
  const popup = document.querySelector(".popup");
  popup.parentElement.removeChild(popup);
}

function buyPokemon() {}


const handleRightButtonClick=()=>{
 // console.log(e)
if(nextUrl){
fetchPokemon(nextUrl);
}
}

const handleLeftButtonClick=()=>{
 if(prevUrl){
   fetchPokemon(prevUrl);
 }
 
 }
//adding event listeners


leftpagination.addEventListener('click',handleLeftButtonClick);
rightpagination.addEventListener('click',handleRightButtonClick);


//initialize functions
fetchPokemon();
