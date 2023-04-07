export default function PokeButtonPage ({value,setValue} ){
    return <div className="btn-group">
    { value !=1 && <button onClick={()=>{
        setValue(value-1)}}>Previous</button>}
    { <button onClick={()=>{
        setValue(value+1)}}>Next</button>}
    </div>
}