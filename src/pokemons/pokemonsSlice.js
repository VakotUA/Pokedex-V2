import { createSlice } from '@reduxjs/toolkit'

function loadAllPokemons () {
	let xmlHttp = new XMLHttpRequest()
	xmlHttp.open("GET", 'https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0', false)
	xmlHttp.send(null)

	const result = []
	let pokemons = JSON.parse(xmlHttp.responseText).results

	for (let i = 0; i < pokemons.length; i++) {
		let xmlHttp = new XMLHttpRequest()
		xmlHttp.open("GET", pokemons[i].url, false)
		xmlHttp.send(null)

		let pokemon = JSON.parse(xmlHttp.responseText)
		const pokemonTypes = pokemon.types.map((type) => type.type.name)

		result.push({
			id: i,
			name: pokemons[i].name,
			url: pokemons[i].url,
			types: pokemonTypes,
			image: null,
		})
	}

	return result
}

const allPokemons = loadAllPokemons()
const initialState = { allPokemons: allPokemons, filteredPokemons: allPokemons, selectedPokemon: null }

const pokemonsSlice = createSlice({
	name: 'pokemons',
	initialState,
	reducers: {
		pokemonAdded (state, action) {
			state.allPokemons.push(action.payload)
		},
		pokemonSetImage (state, action) {
			const { id, image } = action.payload

			const selectedItem = state.allPokemons.find(item => item.id === id)

			if (selectedItem && selectedItem.image === null)
				selectedItem.image = image
		},
		setFilteredPokemons (state, action) {
			state.filteredPokemons = action.payload
		},
		pokemonSelect (state, action) {
			const { id } = action.payload

			const selectedItem = state.allPokemons.find(item => item.id === id)

			if (state.selectedPokemon === null || state.selectedPokemon.id !== selectedItem.id) {
				state.selectedPokemon = selectedItem
			}
			else {
				state.selectedPokemon = null
			}
		}
	}
})

export const { pokemonSelect, pokemonSetImage, setFilteredPokemons } = pokemonsSlice.actions

export default pokemonsSlice.reducer
