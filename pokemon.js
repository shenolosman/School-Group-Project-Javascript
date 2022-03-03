// DOM Objects
document.getElementById("title").innerHTML = "Pokemon Webshop";
const pokeWeb = document.getElementById("pokeWeb");

document.querySelector("#search").addEventListener("click", getPokemon);
const searchPoke = document.getElementById("pokemonName");

addEnter();

function addEnter() {
  searchPoke.addEventListener("keypress", handle);
}

function removeEnter() {
  searchPoke.removeEventListener("keypress", handle);
  // document.querySelector("#pokemonName").value = "";
}

function handle(e) {
  if (e.key === "Enter") {
    getPokemon();
    removeEnter();
  }
  return false;
}
function lowerCaseName(string) {
  return string.toLowerCase();
}

const leftpagination = document.querySelector(".left-button");
leftpagination.innerHTML = "Previous";
const leftpaginationDisabled = document.querySelector(".previousDisable");
leftpaginationDisabled.classList.add("disabled");

const rightpagination = document.querySelector(".right-button");
rightpagination.innerHTML = "Next";
const rightpaginationDisabled = document.querySelector(".nextDisable");
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
    id: result.url.split("/")[6],
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
    }.png`,
  }));
  showPokemon(pokemon);
}

async function showPokemon(pokemon) {
  let price = Array.from({ length: 12000 }, () =>
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
    Read More
  </button>
  <button type="button" id="buy-pokemon-btn" class="btn btn-primary" onclick="BuyPokemon(${
    pokeman.id
  })">
    Buy Card
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
async function getPokemon() {
  try {
    const nameValue = document.querySelector("#pokemonName").value;
    const pokemonName = lowerCaseName(nameValue);

    const pokemonUrl = new URL(`https://pokeapi.co`);
    pokemonUrl.pathname = `/api/v2/pokemon/${pokemonName}`;

    const response = await fetch(pokemonUrl);
    if (response.ok) {
      const pokeman = await response.json();
      showPopup(pokeman);
    }
  } catch (error) {
    console.error(error);
  }
}
function showPopup(pokeman) {
  const image = pokeman.sprites[`front_default`];
  const type = pokeman.types.map((type) => type.type.name).join(", ");

  const htmlInfoString = `
    <div class="popup">  
      <h1 ">${pokeman.id}. ${pokeman.name}</h1>
      <img class="card-image" src="${image}"/>
      <p class="text">Height: <b>${pokeman.height}</b> | Weight: <b>${pokeman.weight}</b>  | Type: <b>${type}</b></p>
      <button type="button" id="closeBtn" class="btn btn-danger">Close</button>
      <button type="button" id="buy-pokemon-btn" class="btn btn-primary" onclick="BuyPokemon(${pokeman.id})">Buy Card</button>
    </div>
    `;

  pokeWeb.innerHTML = htmlInfoString + pokeWeb.innerHTML;
  document.getElementById("closeBtn").onclick = closePopup;
}
function closePopup() {
  const popup = document.querySelector(".popup");
  popup.parentElement.removeChild(popup);

  document.querySelector("#pokemonName").value = "";
  addEnter();
}

function buyPokemon() {
  //skriv function to add pokemons to buy listan
}

const handleRightButtonClick = () => {
  if (leftpaginationDisabled)
    leftpaginationDisabled.classList.remove("disabled");
  if (nextUrl === null) rightpaginationDisabled.classList.add("disabled");
  if (nextUrl) {
    fetchPokemon(nextUrl);
  }
};

const handleLeftButtonClick = () => {
  if (rightpaginationDisabled)
    rightpaginationDisabled.classList.remove("disabled");
  if (prevUrl === null) leftpaginationDisabled.classList.add("disabled");
  if (prevUrl) {
    fetchPokemon(prevUrl);
  }
};
//adding event listeners
leftpagination.addEventListener("click", handleLeftButtonClick);
rightpagination.addEventListener("click", handleRightButtonClick);
//initialize functions
fetchPokemon(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`);

/// testar att köpa pokemons..
const boughtPoke = document.getElementById("buy-pokemon-btn");

async function BuyPokemon(id) {
  const url = new URL(`https://pokeapi.co`);
  url.pathname = `/api/v2/pokemon/${id}`;

  const response = await fetch(url);
  const pokeman = await response.json();
  //showPopup(pokeman);
  showBoughtPoke(pokeman);
}
let pokes = [];

function showBoughtPoke(pokeman) {
  if (pokeman) alert(`köpt pokemon ${pokeman.id}, ${pokeman.name}`);
  pokes.push({ id: pokeman.id, name: pokeman.name });
  console.log(pokes);
  localStorage.setItem("köpta", JSON.stringify(pokes));

  //pokes.push(JSON.stringify(pokeman.name));
}

const showBought = document.getElementById("buyIcon");
showBought.addEventListener("click", listOfPoke);

const listPoke =
  localStorage.getItem("köpta") === null ? 0 : localStorage.getItem("köpta");

function listOfPoke() {
  alert(`${listPoke}`);
}

const removeItems = document.getElementById("exit");
removeItems.addEventListener("click", removePokes);

function removePokes() {
  localStorage.removeItem("köpta");
}
