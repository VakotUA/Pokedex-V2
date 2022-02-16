import React from 'react'
import { useDispatch } from 'react-redux'
import { searchChange } from './searchSlice'
import { pageChange } from '../navigation/navigationSlice'
import styles from './Header.module.css'

function Header () {
  const dispatch = useDispatch()

  return (
    <div className={styles.header}>
      <h1>Pokedex</h1>
      <input
      type="text"
      placeholder="Search..."
      className={styles.search}
      onInput={(search) => {
        dispatch(searchChange({value: search.target.value}))
        dispatch(pageChange(1))
      }}/>
    </div>
  )
}

export default Header
