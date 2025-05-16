import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './PokemonList.css'
import Pokemon from '../Pokemon/Pokemon'
import usePokemonList from '../../hooks/usePokemonList'
import { useParams } from 'react-router-dom'

export default function PokemonList() {

    
const [pokemonListState, setPokemonListState] = usePokemonList( false)

    return (
        <div className='pokemon-list-wrapper'>

            <div className='pokemon-wrapper'>
                {
                    (pokemonListState.isLoading)
                        ?
                        'Loading....'
                        :
                        pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} types={p.types} />)
                }
            </div>

            <div className='controls'>
                <button disabled={pokemonListState.preUrl == null} onClick={() => setPokemonListState({ ...pokemonListState, pokedexUrl: pokemonListState.preUrl })}>Prev</button>
                <button disabled={pokemonListState.nextUrl == null} onClick={() => setPokemonListState({ ...pokemonListState, pokedexUrl: pokemonListState.nextUrl })}>Next</button>
            </div>

        </div>
    )
}
