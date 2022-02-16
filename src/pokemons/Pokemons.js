import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { setFilteredPokemons } from './pokemonsSlice'

import Card from './Card'
import styles from './Cards.module.css'

const pokemonsListSelector = createSelector(
	(state) => state.pokemons,
	(pokemons) => pokemons
)

const typesListSelector = createSelector(
	(state) => state.types,
	(types) => types
)

const searchSelector = createSelector(
	(state) => state.search,
	(search) => search
)

const navigationSelector = createSelector(
	(state) => state.navigation,
	(navigation) => navigation
)

function arrayEquals(a, b) {
	return a.length === b.length && a.every((val, index) => val === b[index])
}

function getPokemons (search, pokemons, types) {
	var result
	if (search) {
		result = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()))
	}
	else {
		result = pokemons
	}

	let selectedTypes = types.map((type) => type.name)
	if (selectedTypes.length > 0) {
		return result.filter((pokemon) => arrayEquals(pokemon.types, selectedTypes))
	}
	
	return result
}

function Pokemons () {
	const pokemons = useSelector(pokemonsListSelector)
	const types = useSelector(typesListSelector)
	const search = useSelector(searchSelector)
	const dispatch = useDispatch()

	const page = useSelector(navigationSelector).page
	const pagination = useSelector(navigationSelector).pagination

	useEffect(() => {
		dispatch(setFilteredPokemons(getPokemons(search.value, pokemons.allPokemons, types.selectedTypes)))
	}, [search, pokemons.allPokemons, types.selectedTypes, dispatch])

	if (pokemons.filteredPokemons.length === 0) {
		return <h1 className={styles.notFound}>Not found</h1>
	}

	return (
		<div className={ styles.cardsBlock }>
			<ul className={ styles.cards }>
			{pokemons.filteredPokemons.slice((page - 1) * pagination, Math.min(page * pagination, pokemons.allPokemons.length)).map((pokemon) => (
				<li key={ pokemon.id }>
					<Card pokemon={pokemon} selectedPokemon={pokemons.selectedPokemon}/>
				</li>
			))}</ul>
		</div>
	)
}

export default Pokemons
