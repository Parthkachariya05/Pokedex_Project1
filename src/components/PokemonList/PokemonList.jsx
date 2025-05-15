import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './PokemonList.css'
import Pokemon from '../Pokemon/Pokemon'

export default function PokemonList() {

    const [pokemonList, setPokemonList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [pokeexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon')

    // const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon'

    const [nextUrl, setNextUrl] = useState('')
    const [preUrl, setPreUrl] = useState('')

    async function downloadPokemons() {
        setIsLoading(true)
        const response = await axios.get(pokeexUrl) // this downloads list of 20 pokemons
        console.log(response.data)

        setNextUrl(response.data.next)
        setPreUrl(response.data.previous)

        const pokemonResults = response.data.results  // we get the array of pokemons from results
        console.log(pokemonResults)

        // iterating over the array of pokemons, and using their url, to create an array of promises
        // that will download those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon => axios.get(pokemon.url)))

        // passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise)  // array of 20 pokemon detailed data
        // console.log(pokemonData)


        // ab ish sare data ko save kare ge 

        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data

            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types
            }
        })

        console.log(pokeListResult)
        setPokemonList(pokeListResult)

        setIsLoading(false)
    }

    useEffect(() => {
        downloadPokemons()
    }, [pokeexUrl])    // [] hoga to pahli baar load hoga tabhi execute hoga  // [x] x ke lye hoga 



    return (
        <div className='pokemon-list-wrapper'>

            <div className='pokemon-wrapper'>
                {
                    (isLoading)
                        ?
                        'Loading....'
                        :
                        pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)
                }
            </div>

            <div className='controls'>
                <button disabled={preUrl == null} onClick={() => setPokedexUrl(preUrl)}>Prev</button>
                <button disabled={nextUrl == null} onClick={() => setPokedexUrl(nextUrl)}>Next</button>
            </div>

        </div>
    )
}
