import { useState, useEffect } from "react";
import PokeCard from "./PokeCard";
import Loading from "./Loading";
import PokeButton from "./PokeButton";

export default function PokemonList({
  cardListStyle,
  search,
  selectedType,
  setPokemonData,
  pokemonData,
  loading,
  infoPokemon,
  setUrl,
  nextUrl,
  prevUrl,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}) {
  const [listMobile, setListMobile] = useState("PokeList");

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

  return (
    <div className={`${listMobile} ${cardListStyle}`}>
      <PokeButton
        prevUrl={prevUrl}
        nextUrl={nextUrl}
        setPokemonData={setPokemonData}
        setUrl={setUrl}
        onNext={onNext}
        onPrev={onPrev}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
      <div className={`card-list-pokemon container ${cardListStyle}`}>
        {loading ? (
          <Loading />
        ) : (
          pokemonData.map((pk) => {
            const spriteImg =
              pk.sprites?.front_default ||
              pk.sprites?.other?.["official-artwork"]?.front_default ||
              "";
            return (
              <PokeCard
                infoPokemon={infoPokemon}
                key={pk.id}
                name={pk.name}
                id={pk.id}
                img={spriteImg}
                types={pk.types}
                pk={pk}
              />
            );
          })
        )}
      </div>
      <PokeButton
        prevUrl={prevUrl}
        nextUrl={nextUrl}
        setPokemonData={setPokemonData}
        setUrl={setUrl}
        onNext={onNext}
        onPrev={onPrev}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
    </div>
  );
}
