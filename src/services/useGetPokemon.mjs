import axios from "axios";
import { useEffect, useState} from "react";

function useGetPokemon(unique) {
  const [onePokemon, setOnePokemon] = useState();
  const [error, setError] = useState(null);
  useEffect(()=>{
    const fetchData = async () => {
      const response = await axios
      .get(
        `https://pokeapi.co/api/v2/pokemon/${unique}/`)
      .then((response)=>{setOnePokemon(response.data)})
      .catch((error) => {
        if(error.response){
          setError(error.response)
          console.log(error)
        } else if(error.request){
          setError(error.request)
          console.log(error)
        }else {
          setError(error.message)
          console.log(error)

        }
        ;
      });   
     
    };
    fetchData();
  },
  
  [unique])
  if (!error){
    console.log(error)
    return [error, setError];
  } else if (error){
    return [onePokemon,setOnePokemon];
  }

    
  }

  export default useGetPokemon;
