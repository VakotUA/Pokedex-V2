import { configureStore } from '@reduxjs/toolkit'
import pokemonsReducer from '../pokemons/pokemonsSlice'
import typesReducer from '../footer/typesSlice'
import searchReducer from '../header/searchSlice'
import navigationReducer from '../navigation/navigationSlice'

export default configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    types: typesReducer,
    search: searchReducer,
    navigation: navigationReducer
  }
})
