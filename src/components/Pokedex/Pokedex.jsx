import React, { useState } from 'react'
import Search from '../Search/Search'

import './Pokedex.css'
import PokemonList from '../PokemonList/PokemonList'
import PokemonDetails from '../PokemonDetails/PokemonDetails'

export default function Pokedex() {

  const [searchTerm, setSearchTerm] = useState('')
  
  return (
    <div className='pokedex-wrapper'>
      <Search updateSearchTerm={setSearchTerm} />

      {
        (!searchTerm)
        ?
        <PokemonList />
        :
        <PokemonDetails key={searchTerm} pokemonName={searchTerm} />
      }
    </div>
  )
}
