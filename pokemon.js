// DOM Objects
document.getElementById("title").innerHTML = "Pokemon Webshop";
const pokeWeb = document.getElementById("pokeWeb");
const leftpagination = document.querySelector(".left-button");
const leftpaginationDisabled = document.querySelector(".previousDisable");
leftpaginationDisabled.classList.add("disabled");
const rightpagination = document.querySelector(".right-button");

//constanst and variables
let prevUrl = null;
let nextUrl = null;
//Functions
async function fetchPokemon(url) {
  url = new URL(url);

  const response = await fetch(url);
  
  const data = await response.json();
  const { result, previous, next } = data;
  prevUrl = previous;
  nextUrl = next;

  const pokiurl = data.results.map((result) => ({
    a: result.url.split("/")[6],
  }));

  const pokemon = data.results.map((result, index) => ({
    apiURL: result.url,
    name: result.name,
    id: JSON.stringify(pokiurl[index])
      .split(":")[1]
      .split("}")[0]
      .split('"')[1],
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      JSON.stringify(pokiurl[index]).split(":")[1].split("}")[0].split('"')[1]
    }.png`}));
  showPokemon(pokemon);
}

async function showPokemon(pokemon) {
  let price = Array.from({ length: 2000 }, () =>
    Math.floor(Math.random() * 100 + 20)
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

function buyPokemon() {
  //skriv function to add pokemons to buy listan
}

const handleRightButtonClick = () => {
  if (leftpaginationDisabled)
    leftpaginationDisabled.classList.remove("disabled");
  if (nextUrl) {
    fetchPokemon(nextUrl);
  }
};

const handleLeftButtonClick = () => {
  if (leftpagination === null) leftpaginationDisabled.classList.add("disabled");
  if (prevUrl) {
    fetchPokemon(prevUrl);
  }
};
//adding event listeners
leftpagination.addEventListener("click", handleLeftButtonClick);
rightpagination.addEventListener("click", handleRightButtonClick);

//initialize functions
fetchPokemon(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`);
