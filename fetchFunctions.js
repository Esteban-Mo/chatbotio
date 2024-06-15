// fetchFunctions.js

export function fetchJoke() {
    return fetch('https://api.chucknorris.io/jokes/random')
        .then(response => response.json())
        .then(data => `${data.value}`)
        .catch(error => 'Erreur lors de la récupération de la blague.');
}

export function fetchQuote() {
    return fetch('https://api.quotable.io/random?lang=fr')
        .then(response => response.json())
        .then(data => `${data.content} - ${data.author}`)
        .catch(error => 'Erreur lors de la récupération de la citation.');
}

export function fetchFact() {
    return fetch('https://uselessfacts.jsph.pl/random.json?language=fr')
        .then(response => response.json())
        .then(data => data.text)
        .catch(error => 'Erreur lors de la récupération du fait.');
}

export function fetchPokemonTeam() {
    return fetch('https://pokebuildapi.fr/api/v1/random/team/suggest')
        .then(response => response.json())
        .then(data => {
            return data[0].map(pokemon => {
                return `<div><img src="${pokemon.image}" alt="${pokemon.name}" style="max-width: 100px; height: auto;"><br>${pokemon.name}</div>`;
            }).join('');
        })
        .catch(error => 'Erreur lors de la récupération de l\'équipe Pokémon.');
}

export function fetchCatFact() {
    return fetch('https://catfact.ninja/fact')
        .then(response => response.json())
        .then(data => data.fact)
        .catch(error => 'Erreur lors de la récupération du fait sur les chats.');
}

export function fetchAdvice() {
    return fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => data.slip.advice)
        .catch(error => 'Erreur lors de la récupération du conseil.');
}

export function fetchDogFact() {
    return fetch('https://dog-api.kinduff.com/api/facts')
        .then(response => response.json())
        .then(data => data.facts[0])
        .catch(error => 'Erreur lors de la récupération du fait sur les chiens.');
}
