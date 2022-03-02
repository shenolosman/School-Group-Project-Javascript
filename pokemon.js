// DOM Objects
document.getElementById("title").innerHTML = "Pokemon Webshop";
const pokeWeb = document.getElementById("pokeWeb");
const webshop = document.getElementById("webShop");

document.querySelector("#search").addEventListener("click", getPokemon);

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
let price = Array.from({ length: 12000 }, () =>
    Math.floor(Math.random() * 100 + 20)
  );
async function showPokemon(pokemon) {  
  const pokemonHTMLstring = pokemon
    .map(
      (pokeman) =>
        `
      <li class="card">
      <img class="card-image" src="${pokeman.image}"/>
      <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
     <p class="price-text"> <span class="product-price">${price[pokeman.id-1]}</span> Sek<p>
     <div >
  <button type="button" id="select-pokemon-btn" class="btn btn-success" onclick="selectPokemon(${pokeman.id})">
    Read More
  </button>
  <button type="button" id="buy-pokemon-btn" class="btn btn-primary" onclick="BuyPokemon(${pokeman.id})">
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
  const nameValue = document.querySelector("#pokemonName").value;
  const pokemonName = lowerCaseName(nameValue);

  const pokemonUrl = new URL(`https://pokeapi.co`);
  pokemonUrl.pathname = `/api/v2/pokemon/${pokemonName}`;

  const response = await fetch(pokemonUrl);
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
      <button id="closeBtn" class="btn btn-danger">Close</button>
    </div>
    `;

  pokeWeb.innerHTML = htmlInfoString + pokeWeb.innerHTML;
  document.getElementById("closeBtn").onclick = closePopup;
}
function closePopup() {
  const popup = document.querySelector(".popup");
  popup.parentElement.removeChild(popup);

  document.querySelector("#pokemonName").value = "";
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
fetchPokemon(`https://pokeapi.co/api/v2/pokemon?limit=21&offset=0`);


const cartQuantity = document.querySelector(".cart-quantity");
cartQuantity.textContent = "";
let count = 0;
async function BuyPokemon(id) {
  const url = new URL(`https://pokeapi.co`);
  url.pathname = `/api/v2/pokemon/${id}`;

  const response = await fetch(url);
  const pokeman = await response.json();

  showCart(pokeman);
}

const showpopupcardcontainer = document.getElementById(
  "showpopupcardcontainer"
);
function showCart(pokeman) {
  const image = pokeman.sprites[`front_default`];
  console.log(pokeman.id);
  count++;
  let list="";
  cartQuantity.textContent = count;
   list +=`
<div class="image-box">
          <img src="${image}" height="120px" />
      </div>
      <div class="cardAbout">
          <h1 class="titleCard">${pokeman.name}</h1>
      </div>
      <div class="cardCounter">
          <div class="cardBtn">+</div>
          <div class="cardCount">${cartQuantity.textContent }</div>
          <div class="cardBtn">-</div>
      </div>
      <div class="cardPrices">
          <div class="cardAmount">${price[pokeman.id-1]}</div>
          <div class="cardRemove"><u>Remove</u></div>
      </div>
`;
  const showcartHtlm = `
  <div class="Cart-Container" >
  <div class="cardHeader">
      <h3 class="cardHeading">Shopping Cart</h3>
      <h5 class="cardAction">Remove all</h5>
  </div>
  <div class="Cart-Items">
      ${list}
  </div>
  <hr>
  <div class="cardCheckout">
      <div class="cardTotal">
          <div class="cardSubtotal">Sub-Total</div>
          <div class="cardItems">2 items</div>
          <div class="total-amount">$6.18</div>
      </div>
      <button class="cardButton">Checkout</button>
  </div>
</div>
`;

  if (showpopupcardcontainer.classList.contains("hidden")) {  
    showpopupcardcontainer.classList.remove("hidden")
    setTimeout(()=>{showpopupcardcontainer.classList.add("hidden")},10000)
  } else {
    showpopupcardcontainer.classList.add("hidden");
  }
  webshop.innerHTML = showcartHtlm + webshop.innerHTML;
}

function showCart2() {
  if (showpopupcardcontainer.classList.contains("hidden")) {
    showpopupcardcontainer.classList.remove("hidden");
  } else {
    showpopupcardcontainer.classList.add("hidden");
  }
}
