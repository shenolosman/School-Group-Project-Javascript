document.getElementById("title").innerHTML = "Pokemon Webshop";

const pokeWeb = document.getElementById("pokeWeb");
let offset = 0;

async function fetchPokemon(url) {
  url = new URL(url);

  const response = await fetch(url);

  const data = await response.json();

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
  console.log(pokemon);

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
}
fetchPokemon(`https://pokeapi.co/api/v2/pokemon?limit=21&offset=${offset}`);
