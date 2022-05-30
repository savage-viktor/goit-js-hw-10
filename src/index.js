import './css/styles.css';

import Notiflix from 'notiflix';

import debounce from 'lodash.debounce';

import { fetchCountries } from "./fetchCountries";

const DEBOUNCE_DELAY = 300;

const counryList = document.querySelector(".country-list")
const counryInfo = document.querySelector(".country-info")
const inputRef = document.querySelector("#search-box")

inputRef.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY))

function onInput() {
    let name = inputRef.value.trim()

    if (name === "") {
        counryInfo.innerHTML = ''
        counryList.innerHTML = ''
        return
    }

    fetchCountries(name)
        .then(res => showCoutries(res))
        .catch(err => showError(err))
}

function markUpList(name, flag) {
    return `<li class="coutry-item">
        <img class="counry-flag" src="${flag}" alt="Country flag" width="40" />
        <span>${name}</span>
    </li>`
}

function markUpCard(capital, population, languages, flag, country) {
    return `<div class="header-box">
                 <img src="${flag}" alt="Countre flag" width="40px" />
                 <h1>${country}</h1>
           </div>
            <ul>
                <li><span>Capital:</span>${capital}</li>
                <li><span>Population:</span>${population}</li>
                <li><span>Languages:</span>${languages.join(', ')}</li>
            </ul>
         </div>`
}

function showCoutries(response) {

    if (response.length === 1) {
        counryList.innerHTML = ''

        const nameOfficial = response[0].name.official
        const capital = response[0].capital[0]
        const population = response[0].population
        const flag = response[0].flags.svg
        const languages = Object.values(response[0].languages)

        counryInfo.innerHTML = markUpCard(capital, population, languages, flag, nameOfficial)
        return
    }

    if (response.length > 10) {
        counryInfo.innerHTML = ''
        counryList.innerHTML = ''

        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        return
    }

    else {
        counryInfo.innerHTML = ''

        const listArray = []

        response.map(el => {
            const nameOfficial = el.name.official
            const flag = el.flags.svg
            listArray.push(markUpList(nameOfficial, flag))
        })

        counryList.innerHTML = listArray.join('')
    }
}

function showError(error) {
    counryInfo.innerHTML = ''
    counryList.innerHTML = ''
    Notiflix.Notify.failure("Oops, there is no country with that name");
}