import { createSlice } from '@reduxjs/toolkit'

function loadAllTypes() {
	let xmlHttp = new XMLHttpRequest()
	xmlHttp.open("GET", 'https://pokeapi.co/api/v2/type/', false)
	xmlHttp.send(null)

	let types = JSON.parse(xmlHttp.responseText).results

	let typesList = []
	for (let i = 0; i < types.length; i++) {
		typesList.push({
			id: i,
			name: types[i].name,
		})
	}

	return typesList
}

const initialState = { allTypes: loadAllTypes(), selectedTypes: [] }

const typesSlice = createSlice({
	name: 'types',
	initialState,
	reducers: {
		typeSelect (state, action) {
			const { id } = action.payload

			const selectedItem = state.allTypes.find(item => item.id === id)

			if (!state.selectedTypes.find(item => item.id === selectedItem.id)) {
				state.selectedTypes.push(selectedItem)
				if (state.selectedTypes.length > 2) {
					state.selectedTypes.shift()
				}
			}
			else {
				state.selectedTypes = state.selectedTypes.filter(item => item.id !== selectedItem.id)
			}
		}
	}
})

export const { typeSelect } = typesSlice.actions

export default typesSlice.reducer
