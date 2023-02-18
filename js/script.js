const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')
let pokemonId = 0
const prevPokemon = document.querySelector('.prev')
const nextPokemon = document.querySelector('.next')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
let stat

const fetchPokemon = async (pokemon) => {
    const apiResponsive = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    stat = apiResponsive['status']
    if(stat == 200) {
        const data = await apiResponsive.json()
        return data
    } else {
        input.value = ''
    }
}

const renderizarPokemon = async (inputPokemon) => {
    const data = await fetchPokemon(inputPokemon)

    if(stat == 200) {
        pokemonImage.src = await data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        pokemonName.innerHTML = await data['forms']['0']['name']
        pokemonId = await data['id']
        pokemonNumber.innerHTML = pokemonId
        input.value = ''
    } else {
        pokemonName.innerHTML = 'Not a Found'
        pokemonNumber.innerHTML = '0'
        pokemonImage.src = ''
        
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderizarPokemon(input.value.toLowerCase())
})

prevPokemon.addEventListener('click', () => {
    pokemonId--
    if(pokemonId > 0) {
        renderizarPokemon(pokemonId)
    } else {
        pokemonId = 1
    }
})

nextPokemon.addEventListener('click', () => {
    pokemonId++
    if(pokemonId > 0) {
        renderizarPokemon(pokemonId)
    }
})
