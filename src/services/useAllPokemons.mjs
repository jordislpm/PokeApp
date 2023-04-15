import { useState, useEffect } from "react";
import axios from "axios";

 function useAllPokemons(url, search,find){
    const [data, setData] = useState([])
    const[nextUrl,setNextUrl]=useState()
    const[prevUrl,setPrevUrl]=useState()
    const [ready, setReady] = useState(false)
  
    
    useEffect(()=>{
        if(search){
            async function loadAllDataSearch (){
                const resp = await axios.get(url)
                getAllPokemonSearch(resp.data.results);
            }
        
            async function getAllPokemonSearch(res){
                setData([])
                res.map(async(item)=>{
                    const result = await axios.get(item.url)
                    setData(state=>{
                        let hash = {};
                        state=[...state,result.data]
                        state = state.filter(o => hash[o.id] ? false : hash[o.id] = true);
                        state = state.filter(pokemon=>{
                            if(pokemon.name.includes(find.toLowerCase())){
        
                                return pokemon
                            }else if(pokemon.id == (Math.floor(find))){
                                return pokemon
                            }
                            
                        })
                        return state
                    })
                   
                })
                
            }
        
    
            loadAllDataSearch()
            setReady(true)



        } else{

        async function loadAllData (){
            const resp = await axios.get(url)
             getPokemon(resp.data.results);
            setNextUrl(resp.data.next)
            setPrevUrl(resp.data.previous) 
        }
    
        async function getPokemon(res){
            setData([])
            res.map(async(item)=>{
                const result = await axios.get(item.url)
                    setData(state=>{
                        let hash = {};
                        state=[...state,result.data]
                        state.sort((a,b)=>a.id>b.id?1:-1)
                        state = state.filter(o => hash[o.id] ? false : hash[o.id] = true);
                        return state
                   })             

            })
        }
    

        loadAllData()
    }
    },[url,search])

    return [data, setData,nextUrl,prevUrl,ready,setReady];
}

export default useAllPokemons