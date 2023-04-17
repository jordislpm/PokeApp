import { useState, useEffect , useLayoutEffect} from "react"
import "./pokeStyles.css"
import PokemonList from "./PokemonList";
import PokeHeader from "./PokeHeader";
import PokemonPage from "./PokemonPage";
import DontFind from "./DontFind";
import Footer from "./Footer";
import Loading from "./Loading";



//funtions data
import useGetPokemon from "../services/useGetPokemon.mjs";
import useAllPokemons from "../services/useAllPokemons.mjs";






function PokemonApp(){
//states
    const [value, setValue] = useState(null)
    const [uniquePokemon, setUniquePokemon]= useGetPokemon(value)
    const page20 = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;
    const allpage= `https://pokeapi.co/api/v2/pokemon?limit=905&offset=0`;
    const [cardListStyle, setCardListStyle] = useState(`card-list-normal`)
    const[pokemonData, setPokemonData] = useState([]);
    const[pokeDex,setPokeDex]=useState();
    const[url,setUrl]= useState(page20)
    const[loading,setLoading]=useState(false)
    const [modal, setModal] = useState(false);
    const[fondo, setFondo] = useState("https://wallpaper.dog/large/749981.jpg")
    const [busqueda, setBusqueda] = useState(false)
    const [find, setFind] = useState("");
    const[clear, setClear]= useState(false)
    const [search, setSearch] = useState(false)
    const [findit,setFindit] = useState(true)
    const [pokemonsData, setPokemonsData,nextUrl,prevUrl,ready,setReady] = useAllPokemons(url,search,find)
// end states


// start funtions
    
    function getUniqueData(valor){
        setValue(valor)
       
   }

   function nextUniqueData(valor){
       setValue(valor+1)
      
  }

  function prevUniqueData(valor){
   setValue(valor-1)
  
}

function handleFind(e){
        

    if(e.target.value == ""){
        setBusqueda(false)
        setFind(e.target.value.trim())
        setUrl(page20)
        setSearch(false)
    }
    else  if(e.target.value != ""){
        setBusqueda(true)
        setFind(e.target.value.trim())
    }
  };


function submitFind(e){
    
    e.preventDefault()
    setLoading(true)
    if(busqueda == false){
        alert("debes escribir algo para hacer la busqueda")
    }else if (busqueda ==true){
        
        
        setUrl(allpage)
        setSearch(true)
        setClear(true)
        setBusqueda(false)
        
    }

}




function toggleModal(){
setModal(!modal);
};

function clearSearch (){
    setUrl(page20)  
    setFind("");
    setBusqueda(false);
    setSearch(false)
    
   setClear(false)
   setReady(false)
   console.log(url)
   console.log(pokemonData)


}

useEffect(()=>{
console.log(`url es:${url}`)

},[url])

// end funtions

// start effects

useEffect(()=>{
       setPokeDex(uniquePokemon)
       
   },[uniquePokemon])

useEffect(()=>{

setPokemonData(pokemonsData)
setFind("")

if(pokemonsData.length < 20 && pokemonsData.length > 10){
    setCardListStyle()
}

console.log("activado")

    },[pokemonsData])


useEffect(()=>{
   
   if (ready ){

        if(pokemonData.length >= 1){
            setFindit(true) 
        }
        else if(pokemonData.length <= 0){
            setFindit(false)

        }  
        setLoading(false)   
    }
},[pokemonData,ready])


// end effects

    return(
        
        <div id="pokeBody" className="pokeBody" style={{ background: `url(${fondo})`}}>
        <PokeHeader 
        handleFind={handleFind}
        submitFind={submitFind}
        find={find}
        busqueda={busqueda}
        clearSearch={clearSearch}
        clear={clear}
        />
        {!modal ? <>



{loading ?  <Loading/> : <>
      { findit && <PokemonList 
        pokemonData={pokemonData} 
        cardListStyle={cardListStyle}
        loading={loading} 
        infoPokemon={poke=>{
         toggleModal()
         getUniqueData(poke.id)}
        } 
        pokeDex={pokeDex}
        setUrl={setUrl}
        prevUrl={prevUrl}
        nextUrl={nextUrl}
        setPokemonData={setPokemonData}
        search={search}/>
        }
        {!findit && ready ? <DontFind/> : <></>}
           
</>}

        </>: 
        <PokemonPage data={pokeDex} setPokeDex={()=>{
            setPokeDex("")
            toggleModal()}}
            prevUrl={setPokeDex}
            nextUrl={setPokeDex}
            setPokemonData={setPokemonData}
            setUrl={setUrl}
            nextUniqueData={nextUniqueData}
            prevUniqueData={prevUniqueData}
            value={value}
            setValue={setValue}
            />}
        <Footer/>
        </div>
        
    )
}



export default PokemonApp


