document.addEventListener('DOMContentLoaded', function() {
    // Hämta DOM-element
    const searchButton = document.getElementById('searchButton');
    const searchType = document.getElementById('searchType');
    const searchInput = document.getElementById('searchInput');
    const resultsElement = document.getElementById('results');

    // Lägg till en event listener på sökknappen
    searchButton.addEventListener('click', function() {
        // Hämta värdet från input-fältet och vald typ (people eller planets)
        const searchValue = searchInput.value;
        const type = searchType.value;
        // Skapa API-URL baserat på söktypen och värdet
        const apiUrl = `https://swapi.dev/api/${type}/?search=${searchValue}`;

        // Gör ett fetch-anrop till SWAPI
        fetch(apiUrl)
            .then(response => response.json()) // Konvertera svaret till JSON
            .then(data => {
                // Kontrollera om det finns resultat
                if (data.results.length > 0) {
                    const item = data.results[0]; // Hämta det första resultatet
                    // Om typen är 'people', hämta hemplaneten
                    if (type === 'people') {
                        // Gör ytterligare ett fetch-anrop för att hämta hemplaneten
                        fetch(item.homeworld)
                            .then(response => response.json()) // Konvertera svaret till JSON
                            .then(homeworldData => {
                                // Visa karaktärens information inklusive hemplaneten
                                resultsElement.innerHTML = `
                                    <div>Name: ${item.name}</div>
                                    <div>Height: ${item.height}</div>
                                    <div>Mass: ${item.mass}</div>
                                    <div>Hair Color: ${item.hair_color}</div>
                                    <div>Skin Color: ${item.skin_color}</div>
                                    <div>Eye Color: ${item.eye_color}</div>
                                    <div>Birth Year: ${item.birth_year}</div>
                                    <div>Gender: ${item.gender}</div>
                                    <div>Homeworld: ${homeworldData.name}</div>
                                `;
                            })
                            .catch(error => {
                                console.error('Error fetching homeworld:', error);
                                resultsElement.textContent = 'An error occurred while fetching homeworld!';
                            });
                    } else if (type === 'planets') {
                        // Visa planetens information
                        resultsElement.innerHTML = `
                            <div>Name: ${item.name}</div>
                            <div>Rotation Period: ${item.rotation_period}</div>
                            <div>Orbital Period: ${item.orbital_period}</div>
                            <div>Diameter: ${item.diameter}</div>
                            <div>Climate: ${item.climate}</div>
                            <div>Gravity: ${item.gravity}</div>
                            <div>Terrain: ${item.terrain}</div>
                            <div>Population: ${item.population}</div>
                        `;
                    }
                } else {
                    // Om inga resultat hittades, visa ett meddelande
                    resultsElement.textContent = 'No results found!';
                }
            })
            .catch(error => {
                // Hantera fel vid fetch-anropet
                console.error('Error:', error);
                resultsElement.textContent = 'An error occurred while fetching data!';
            });
    });
});
