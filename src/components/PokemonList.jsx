import { useState, useEffect } from "react"
import PokeCard from "./PokeCard"
import Loading from "./Loading"
import PokeButton from "./PokeButton"



export default function PokemonList({cardListStyle, search, setPokemonData, pokemonData, loading, infoPokemon, setUrl, nextUrl, prevUrl}) {
    
    const [listMobile, setListMobile] = useState("PokeList")

    useEffect(() => {
		const handleResize = () => {
		  if (window.innerWidth < 550) {
			setListMobile("PokeList-Mobile");
		  } else {
			setListMobile("PokeList");
		  }
		};
		window.addEventListener("resize", handleResize);
		handleResize();
		
		
		return () => {
		  window.removeEventListener("resize", handleResize);
		};
		
	  }, []);

    return(
        <div className={`${listMobile} ${cardListStyle}`}>
        {!search && <PokeButton
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
        {!search && <PokeButton
            prevUrl={prevUrl}
            nextUrl={nextUrl}
            setPokemonData={setPokemonData}
            setUrl={setUrl}
            />}
        </div>
    )
}











