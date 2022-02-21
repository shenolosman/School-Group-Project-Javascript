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
  let price = [
    29, 40, 39, 50, 80, 79, 30, 39, 60, 20, 89, 59, 29, 50, 90, 99, 39, 20, 40,
    90,
  ];
  const pokemonHTMLstring = pokemon
    .map(
      (pokeman) =>
        `
      <li class="card">
      <img class="card-image" src="${pokeman.image}"/>
      <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
     <p class="price-text">$${price[pokeman.id - 1]}<p>
     <div class="text-center">
  <button type="button" id="select-pokemon-btn" class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="selectPokemon(${
    pokeman.id
  })">
    Läs mer
  </button>
  </li>
   </div>
      `
    )
    .join("");

  pokeWeb.innerHTML = pokemonHTMLstring;
}

//TODO Fixa så man inte behöver dubbelklicka för att läsa mer..
async function selectPokemon(id) {
  const url = new URL(`https://pokeapi.co`);
  url.pathname = `/api/v2/pokemon/${id}`;

  const response = await fetch(url);
  const pokeman = await response.json();
  showModal(pokeman);
}
function showModal(pokeman) {
  const image = pokeman.sprites[`front_default`];
  const type = pokeman.types.map((type) => type.type.name).join(", ");

  const htmlInfoString = `
  <div class="modal fade" id="myModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="modal-label"> ${pokeman.name}</h3>
        <button type="button" class="btn-close" id="closeX" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <img class="card-image" src="${image}"/>
      <p class="text">Height: <b>${pokeman.height}</b> | Weight: <b>${pokeman.weight}</b>  | Type: <b>${type}</b> |</p>
      </div>
      <div class="modal-footer">
        <button type="button" id="closeBtn" class="btn btn-secondary" data-bs-dismiss="modal" value="close">Close</button>
      </div>
    </div>
  </div>
  </div>
  </div>
  `;

  pokeWeb.innerHTML = htmlInfoString + pokeWeb.innerHTML;

  document.getElementById("closeBtn").onclick = closeModal;
  document.getElementById("closeX").onclick = closeModal;
}
function closeModal() {
  const elements = document.getElementsByClassName("fade");
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}
fetchPokemon();
