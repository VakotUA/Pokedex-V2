import React from 'react'
import Header from '../header/Header'
import Navigation from '../navigation/Navigation'
import Footer from '../footer/Footer'
import Pokemons from '../pokemons/Pokemons'
import './App.css'

function App () {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <Pokemons />
      <Footer />
    </div>
  )
}

export default App
