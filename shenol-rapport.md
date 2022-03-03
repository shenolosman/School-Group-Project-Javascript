# Projektuppgift Rapporten


### Beskrivning projektet



Vi byggde ett webbsidan om pokemon. Det ser ut så;
<img src="https://i.ibb.co/Wpk4yfY/image.png" alt="pokemon website" border="0">

Och det finns enkelt shopkorg för att visa vilka pokemon kart har lagt in i;
<img src="https://i.ibb.co/vHbSdSY/image.png" alt="pokemon website shop cart" border="0">

Först av all vi tar pokemon genom att använda fetch. Fetch är egentligen ett API som byggt generic och kallar data genom att skriva fecth() metod.

Fecth metoden kallar given källa. Det kan vara url, json, xml, etc...  
```javascript
async function fetchPokemon(url) {
  url = new URL(url);

  const response = await fetch(url);

  const data = await response.json();

  const { previous, next } = data;
  prevUrl = previous;
  nextUrl = next;
  let resultt = data.results;

  const pokiurl = resultt.map((result) => ({
    id: result.url.split("/")[6],
  }));

  const pokemon = resultt.map((result, index) => ({
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
```

Fetch fortsätter att hämta data kontuerlig om det behövs. Vi ser här första bilden mästa informationen har laddat genom fetch och lite uppe står 1000ms, 2000ms,3000ms,4000ms... så nästan alla information som vi behövs dessa har kommit in 4sekunder. 
<img src="https://i.ibb.co/JRnzDVr/image.png" alt="fetch status of network" border="0">

efter några sekunder jag byter nästa sidan genom att använda next page och nästa och nästa. Det syns varje nytt next page fetchar nya data som sidan behövs.
<img src="https://i.ibb.co/kMgbR72/image.png" alt="fetch delay image" border="0">

Fetch funkar tills network gick ner eller sidan stänger. Det kan ladda allting nya data om det behövs.
<img src="https://i.ibb.co/vsPXzB9/image.png" alt="fetch status 200" border="0">

### Sammanfatta

Projektet började först att byggas först med planering. Vi planerade innan vi började bygga. Vi bygga först index sidan och skrev css. Sedan vi började hitta våran classar från index.html sidan in i våran javascript fil. Vi byggde först fetch promises med .then .then metoden men sedan vi ändrade det till async - await.

 Vi tagit första 20nde pokemonen och gjorde våran grund vy av sidan. Vi gav alla classar onclick metoder som vi tänkte vi ska behöva. Vi byggde modal för att se detajler av indivual pokemonen.

 Sedan förbättrade vi med pagination. Vi fetchade inte hela pokemon listan från API istället vi begränsade antalet engång för en sida med 21 stycken.

 När vi gjorde grunden av projektet tänkte vi kan gå lite mer med bonus uppgiften. Vi försökte addera ett shopkorgen och save-a med localstorage. Också vi adderade ett search funktion man kan leta efter pokemonen med fullt namn eller id genom search input i navbar.

