export default function PokeButton ({prevUrl, nextUrl, setPokemonData,setUrl} ){
    return <div className="btn-group">
    { prevUrl && <button onClick={()=>{
        setPokemonData([])
        setUrl(prevUrl)}}>Previous</button>}
    { nextUrl && <button onClick={()=>{
        setPokemonData([])
        setUrl(nextUrl)}}>Next</button>}
    </div>
}