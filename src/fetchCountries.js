export function fetchCountries(name) {
    const requestRef = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`

    return fetch(requestRef).then(response => response.json())
}