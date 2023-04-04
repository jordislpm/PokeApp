import { useState, useEffect } from "react"
import PokeCard from "./PokeCard"
import Loading from "./Loading"
import PokeButton from "./PokeButton"



export default function PokemonList({cardListStyle, busqueda, setPokemonData, pokemonData, loading, infoPokemon, setUrl, nextUrl, prevUrl}) {

    return(
        <div className={`PokeList ${cardListStyle}`}>
        {!busqueda && <PokeButton
            prevUrl={prevUrl}
            nextUrl={nextUrl}
            setPokemonData={setPokemonData}
            setUrl={setUrl}
            />}
        <div className={`card-list-pokemon container ${cardListStyle}`}>

            {!loading && pokemonData.length < 1 ? <><Loading/></> : pokemonData.map((pk, i)=>{
                return <PokeCard
                     infoPokemon={infoPokemon}
                key={pk.id}
                name={pk.name}
                id={pk.id}
                img={pk.sprites.front_default}
                types={pk.types}
                pk={pk}
                />
        
            })}
        </div>
        {!busqueda && <PokeButton
            prevUrl={prevUrl}
            nextUrl={nextUrl}
            setPokemonData={setPokemonData}
            setUrl={setUrl}
            />}
        </div>
    )
}











