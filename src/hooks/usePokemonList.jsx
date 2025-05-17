import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function usePokemonList() {


    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        preUrl: '',
       
    })

    async function downloadPokemons() {





        setPokemonListState({ ...pokemonListState, isLoading: true })

        const response = await axios.get(pokemonListState.pokedexUrl) // this downloads list of 20 pokemons
        // console.log(response.data)

        const pokemonResults = response.data.results  // we get the array of pokemons from results
        console.log("response is ", response.data.pokemon)

        setPokemonListState(state => ({
            ...state,
            nextUrl: response.data.next,
            preUrl: response.data.previous
        }))




        const pokemonResultPromise = pokemonResults.map((pokemon => axios.get(pokemon.url)))

        const pokemonData = await axios.all(pokemonResultPromise)  // array of 20 pokemon detailed data
       




        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data

            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types
            }
        })

     

        setPokemonListState(state => ({
            ...state,
            pokemonList: pokeListResult,  // Fixed typo: was pokemonlist
            isLoading: false
        })
        )


    }


    useEffect(() => {
        downloadPokemons()
    }, [pokemonListState.pokedexUrl])

    return [pokemonListState, setPokemonListState]
}
