
# RAPPORT

 ![image](https://user-images.githubusercontent.com/89410611/155989671-7309ac8a-9295-4969-ae84-da36ada8a3a7.png)

 
## FETCH

Vi använder fetch för att hämta information om varje Pokémon (sökfunktionen och läs mer funktionen), samt första gången sidan laddas, när man köper pokémon och sedan när man klickar sig vidare via pagnationen. 

Fetch betyder på svenska ”hämta” så därav lättare att förstå vad fetch gör. Smidigt att använda för du behöver inte ladda om sidan för att hämta info.

Du hämtar information från en URL. 

Fetch hämtar den valda URL:en som du vill hämta ifrån och returnerar en ”promise”. När förfrågningen är klar så finns informationen tillgänglig. Löftet eller som det kallas ”promise” blir till ett Response objekt. 

Om du vill få ut data av ditt svar kan du tillexempel använda metoden ”json()”.

Om vi tar exemplet med informationen om varje Pokémon. Fetch triggas när du klickar på knappen ”read more” via en onclick. Den hämtar information via fetchen som hämtar den valda pokémonens id och dess information. 

Den hämtar via Pokémon API:n både id, namn, bild, vikt, längd samt typ. Allt sker när du klickar på knappen. 

Fetch/Response svarar genom statuskoder exempelvis ”404 not found” eller ”200 ok” som betyder att det gick bra och kunde hämtas. Det är sättet att ta reda på hur fetch anropet gick. 


## REFLEKTION


Vår lösning för att få ut id:t i fetchPokemon är något som kan förbättras och läggas i en hjälpmetod men det fungerar lika bra som det är nu. För kodens läsbarhet och helhet hade det varit bra att flytta ut den. Vi fick klura tillsammans om hur vi skulle lösa problemet vilket var lärorikt. Ute i arbetslivet kommer man få hjälpas åt för att lösa olika problem. 

Vår kod hade kunnat delats upp för att öka strukturen, tex program-logik och glue code för sig. Vi valde att jobba i samma js fil för att det kändes enklare.
I efterhand insåg vi att det blev mycket kod i samma fil vilket resulterar i att koden kan bli rörig.

Jag bestämde mig för att lägga till en sökfunktion för att lättare hitta den Pokémon man söker efter. Jag ville att det inte skulle spela någon roll ifall man skrev med stora eller små bokstäver därav av ”lowerCaseName” funktionen. Funktionen returnerar det man skriver in i sökrutan till små bokstäver (inget vi ser men som ”dator” ser). Detta eftersom namnen i PokeApi:n börjar med liten bokstav. Jag adderade även en funktion som tillåter användaren att söka på pokemonéns via tangentknappen "Enter". Kunden har möjlighet att söka via knappen eller tangenten "Enter".

Funktionerna selectPokemon och getPokemon påminner om varandra. Funktionerna är lika eftersom jag ville få upp samma resultat via "Läs mer" och "Sök" knappen. Båda kallar på showPopup(pokeman) som är popup rutan med information och som innehåller en stäng funktion (closePopup). Jag la till i closePopup att sökresultatet ska bli till en tom sträng när den stängs ner.

Vi har suttit tillsammans och klurat på hur vi ska addera pokémons till varukorgen. Vi har tagit steg för steg. Vi kom fram till en bra lösning med tanke på tidspressen. Funktionen kan definitivt utvecklas och bli bättre. Vi har fått samarbeta och det har varit både roligt och lärorikt.
