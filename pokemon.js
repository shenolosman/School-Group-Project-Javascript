document.getElementById("title").innerHTML = "Pokemon Webshop";

const pokeWeb = document.getElementById("pokeWeb");

const fetchPokemon = async () => {
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
};

const showPokemon = (pokemon) => {
  const pokemonHTMLstring = pokemon
    .map(
      (pokeman) =>
        `
      <li class="card">
      <img class="card-image" src="${pokeman.image}"/>
      <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
     
  <button type="button" id="select-pokemon-btn" class="btn btn-primary">
    Läs mer
  </button>
   </li>
      `
    )
    .join("");

  pokeWeb.innerHTML = pokemonHTMLstring;
};
fetchPokemon();
