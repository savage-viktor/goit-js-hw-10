import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const counryList = document.querySelector(".country-list")
const counryInfo = document.querySelector(".country-info")
const inputRef = document.querySelector("#search-box")

inputRef.addEventListener("input", onInput)

let name = ""

function onInput(ev) {
    console.log(ev.currentTarget.value)
    name = ev.currentTarget.value

    const requestRef = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`


    fetch(requestRef)
        .then(response => response.json())
        .then(response => {



            console.dir(response)

            if (response.length === 1) {
                counryList.innerHTML = ''

                console.log("Малюєм картку")

                const nameOfficial = response[0].name.official
                const capital = response[0].capital[0]
                const population = response[0].population
                const flag = response[0].flags.svg
                const languages = Object.values(response[0].languages)

                // markUpCard(capital, population, languages, flag, nameOfficial)
                counryInfo.innerHTML = markUpCard(capital, population, languages, flag, nameOfficial)
                return
            }
            if (response.length > 10) {
                counryInfo.innerHTML = ''
                counryList.innerHTML = ''

                console.log("Шлем нафіг")
                return
            }

            else {
                counryInfo.innerHTML = ''

                const listArray = []

                response.map(el => {
                    const nameOfficial = el.name.official
                    const flag = el.flags.svg
                    // console.log("Імя", nameOfficial, "Прапор", flag)
                    listArray.push(markUpList(nameOfficial, flag))
                })

                console.log(listArray)
                counryList.innerHTML = listArray.join('')

            }






            // console.log("Name;", nameOfficial, "Столиця", capital, population, flag)


        }).catch(err => { console.log(err) })

}






function markUpList(name, flag) {
    return `<li class="coutry-item">
        <img class="counry-flag" src="${flag}" alt="Country flag" width="40" />
        <span>${name}</span>
    </li>`
}

function markUpCard(capital, population, languages, flag, country) {
    return `
          <div class="header-box">
        <img src="${flag}" alt="Countre flag" width="40px" />
        <h1>${country}</h1>
      </div>
      <ul>
        <li><span>Capital:</span>${capital}</li>
        <li><span>Population:</span>${population}</li>
        <li><span>Languages:</span>${languages.join(', ')}</li>
      </ul>
    </div>
    
    `
}