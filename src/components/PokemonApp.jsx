import { useState, useEffect } from "react";
import "./pokeStyles.css";
import PokemonList from "./PokemonList";
import PokeHeader from "./PokeHeader";
import PokeFilter from "./PokeFilter";
import PokemonPage from "./PokemonPage";
import DontFind from "./DontFind";
import Footer from "./Footer";
import Loading from "./Loading";

// functions data
import useGetPokemon from "../services/useGetPokemon.mjs";
import useAllPokemons from "../services/useAllPokemons.mjs";

function PokemonApp() {
  // states
  const [value, setValue] = useState(null);
  const [uniquePokemon, setUniquePokemon, uniqueLoading] = useGetPokemon(value);
  const page20 = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;
  const [cardListStyle, setCardListStyle] = useState(`card-list-normal`);
  const [pokemonData, setPokemonData] = useState([]);
  const [pokeDex, setPokeDex] = useState(null);
  const [url, setUrl] = useState(page20);
  const [modal, setModal] = useState(false);
  const [fondo] = useState("https://wallpaper.dog/large/749981.jpg");
  const [busqueda, setBusqueda] = useState(false);
  const [find, setFind] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [clear, setClear] = useState(false);
  const [search, setSearch] = useState(false);
  const [findit, setFindit] = useState(true);

  const [
    pokemonsData,
    setPokemonsData,
    nextUrl,
    prevUrl,
    ready,
    setReady,
    dataLoading,
    onNextPage,
    onPrevPage,
    hasNextPage,
    hasPrevPage,
  ] = useAllPokemons(url, search, searchTerm, selectedType);

  // Sync unique Pokemon details into pokeDex
  useEffect(() => {
    if (uniquePokemon) {
      setPokeDex(uniquePokemon);
    }
  }, [uniquePokemon]);

  // Sync list data into pokemonData
  useEffect(() => {
    setPokemonData(pokemonsData);
    if (pokemonsData.length < 20 && pokemonsData.length > 0) {
      setCardListStyle("card-list-busqueda");
    } else {
      setCardListStyle("card-list-normal");
    }
  }, [pokemonsData]);

  // Evaluate if search/filter produced results or empty
  useEffect(() => {
    if (ready && !dataLoading) {
      if (pokemonData.length >= 1) {
        setFindit(true);
      } else {
        setFindit(false);
      }
    }
  }, [pokemonData, ready, dataLoading]);

  // Handlers
  function getUniqueData(valor) {
    setValue(valor);
  }

  function nextUniqueData() {
    if (value && value < 1025) {
      setValue(value + 1);
    }
  }

  function prevUniqueData() {
    if (value && value > 1) {
      setValue(value - 1);
    }
  }

  function handleFind(e) {
    const val = e.target.value;
    setFind(val);
    if (val === "") {
      setBusqueda(false);
      if (search) {
        clearSearch();
      }
    } else {
      setBusqueda(true);
    }
  }

  function submitFind(e) {
    e.preventDefault();
    const query = find.trim();
    if (!query) {
      alert("Debes escribir algo para hacer la búsqueda");
      return;
    }
    setSearchTerm(query);
    setSearch(true);
    setClear(true);
    setBusqueda(false);
  }

  function toggleModal() {
    setModal(!modal);
  }

  function clearSearch() {
    setFind("");
    setSearchTerm("");
    setBusqueda(false);
    setSearch(false);
    setSelectedType("all");
    setClear(false);
    setUrl(page20);
    setReady(false);
  }

  return (
    <div
      id="pokeBody"
      className="pokeBody"
      style={{ background: `url(${fondo})` }}
    >
      <PokeHeader
        handleFind={handleFind}
        submitFind={submitFind}
        find={find}
        busqueda={busqueda}
        clearSearch={clearSearch}
        clear={clear}
      />

      {!modal && (
        <PokeFilter
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      )}

      {!modal ? (
        <>
          {dataLoading ? (
            <Loading />
          ) : (
            <>
              {findit && (
                <PokemonList
                  pokemonData={pokemonData}
                  cardListStyle={cardListStyle}
                  loading={dataLoading}
                  infoPokemon={(poke) => {
                    toggleModal();
                    getUniqueData(poke.id);
                    window.scrollTo({ top: 0, behavior: "instant" });
                  }}
                  pokeDex={pokeDex}
                  setUrl={setUrl}
                  prevUrl={prevUrl}
                  nextUrl={nextUrl}
                  setPokemonData={setPokemonData}
                  search={search}
                  selectedType={selectedType}
                  onNext={onNextPage}
                  onPrev={onPrevPage}
                  hasNext={hasNextPage}
                  hasPrev={hasPrevPage}
                />
              )}
              {!findit && ready && <DontFind />}
            </>
          )}
        </>
      ) : (
        <PokemonPage
          data={pokeDex}
          loading={uniqueLoading}
          setPokeDex={() => {
            setPokeDex(null);
            setValue(null);
            toggleModal();
          }}
          prevUrl={setPokeDex}
          nextUrl={setPokeDex}
          setPokemonData={setPokemonData}
          setUrl={setUrl}
          nextUniqueData={nextUniqueData}
          prevUniqueData={prevUniqueData}
          value={value}
          setValue={setValue}
        />
      )}
      <Footer />
    </div>
  );
}

export default PokemonApp;
