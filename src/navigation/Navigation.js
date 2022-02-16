import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { paginationChange, pageChange } from './navigationSlice'

import styles from './Navigation.module.css'
import classnames from 'classnames'

const pokemonsSelector = createSelector(
	(state) => state.pokemons,
	(pokemons) => pokemons
)

const navigationSelector = createSelector(
	(state) => state.navigation,
	(navigation) => navigation
)

function getPage (page, pagination, pokemons) {
	return Math.min(Math.max(Math.ceil(page), 1), Math.ceil(pokemons.length / pagination))
}

function Navigation () {
	const pokemons = useSelector(pokemonsSelector).filteredPokemons
	const navigation = useSelector(navigationSelector)

	const dispatch = useDispatch()

	return (
		<div className={styles.navigation}>
			<div className={styles.pagination}>
				<button
				className={classnames(styles.button, {[styles.active]: navigation.pagination === 10})}
				onClick={() => {
					dispatch(paginationChange(10))
					dispatch(pageChange(getPage(navigation.page * navigation.pagination / 10, 10, pokemons)))
				}}>10</button>
				<button
				className={classnames(styles.button, {[styles.active]: navigation.pagination === 20})}
				onClick={() => {
					dispatch(paginationChange(20))
					dispatch(pageChange(getPage(navigation.page * navigation.pagination / 20, 20, pokemons)))
				}}>20</button>
				<button
				className={classnames(styles.button, {[styles.active]: navigation.pagination === 50})}
				onClick={() => {
					dispatch(paginationChange(50))
					dispatch(pageChange(getPage(navigation.page * navigation.pagination / 50, 50, pokemons)))
				}}>50</button>
			</div>
			<div className={styles.pages}>
				<button 
				className={styles.button} 
				onClick={() => {
					dispatch(pageChange(getPage(navigation.page - 1, navigation.pagination, pokemons)))
				}}>Previous</button>
				<input
				type="number"
				value={navigation.page}
				onChange={(input) => {
					dispatch(pageChange(getPage(input.target.value, navigation.pagination, pokemons)))
				}}/>
				<button 
				className={styles.button}
				onClick={() => {
					dispatch(pageChange(getPage(navigation.page + 1, navigation.pagination, pokemons)))
				}}>Next</button>
			</div>
		</div>
	)
}

export default Navigation
