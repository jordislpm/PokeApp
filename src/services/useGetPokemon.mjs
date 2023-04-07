import axios from "axios";
import { useEffect, useState} from "react";

function useGetPokemon(unique) {
  const [onePokemon, setOnePokemon] = useState(null);
  useEffect(()=>{
    const fetchData = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${unique}/`
      )
     
     setOnePokemon(response.data)
    };
    fetchData();
  },
  
  [unique])
      
  return [onePokemon,setOnePokemon];
    
  }

  export default useGetPokemon;
