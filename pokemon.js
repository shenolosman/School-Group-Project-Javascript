document.getElementById("title").innerHTML = "Pokemon Webshop";

const pokeWeb = document.getElementById("pokeWeb");

async function fetchPokemon() {
  const url = new URL(`https://pokeapi.co`);
  url.pathname = `/api/v2/pokemon`;
  url.searchParams.set("limit", 20);

  const response = await fetch(url);
  const data = await response.json();

  const pokemon = data.results.map((result, index) => ({
    apiURL: result.url,
    name: result.name,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
  }));
  showPokemon(pokemon);
}

async function showPokemon(pokemon) {
  const pokemonHTMLstring = pokemon
    .map(
      (pokeman) =>
        `
      <li class="card">
      <img class="card-image" src="${pokeman.image}"/>
      <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
     
  <button type="button" id="select-pokemon-btn" class="btn btn-primary" onclick="selectPokemon(${pokeman.id})">
    Läs mer
  </button>
   </li>
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
  
  <h1>${pokeman.id}. ${pokeman.name}</h1>
    <button type="button" id="closeBtn" class="btn btn-danger">Close</button>
    
    <img class="card-image" src="${image}"/>
    <p class="text">Height: <b>${pokeman.height}</b> | Weight: <b>${pokeman.weight}</b>  | Type: <b>${type}</b> |</p>
  </div>
  </div>
    `;

  pokeWeb.innerHTML = htmlInfoString + pokeWeb.innerHTML;
  document.getElementById("closeBtn").onclick = closePopup;
}
function closePopup() {
  const popup = document.querySelector(".popup");
  popup.parentElement.removeChild(popup);
}
fetchPokemon();
