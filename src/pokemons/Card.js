import React from 'react'
import { useDispatch } from 'react-redux'
import { pokemonSetImage, pokemonSelect } from './pokemonsSlice'
import styles from './Cards.module.css'
import classnames from "classnames"

import shadowImage from './image_preload.png'

function getImage (pokemon) {
	let xml = new XMLHttpRequest()
	xml.open("GET", pokemon.url, false)
	xml.send(null)

	let url = JSON.parse(xml.responseText)
	let image = url.sprites.front_default

	return image
}

function Card(props) {
	const pokemon = props.pokemon
	const selectedPokemon = props.selectedPokemon
	const dispacth = useDispatch()

	const isSelected = selectedPokemon !== null && selectedPokemon.id === pokemon.id

	if (pokemon.image === null)
	 	dispacth(pokemonSetImage({id: pokemon.id, image: getImage(pokemon)}))

	return (
		<div 
		className={classnames(styles.card, {[styles.active]: isSelected })} 
		onClick={() => dispacth(pokemonSelect({ id: pokemon.id }))}>
			<img 
			src={ pokemon.image !== null ? pokemon.image : shadowImage } 
			className={styles.image} 
			alt={pokemon.name} />
			<h3>{pokemon.name.toUpperCase()}</h3>
			<ul className={styles.types}>{pokemon.types.map(type => (
				<li 
				key={ pokemon.id + type }
				className={classnames(styles.type, type)}>{ type }</li>
			))}</ul>
		</div>
	)
}

export default Card;