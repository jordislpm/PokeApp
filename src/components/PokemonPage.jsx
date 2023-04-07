import { useState, useEffect} from "react"
import PokeButtonPage from "./PokeButtonPage"




export default function PokemonPage ({data, setPokeDex,value,setValue}){
    //console.log(data)
   
    return(
      
        <>
        {
            
            (!data) ? "" : (
            <>
            <PokeButtonPage
            value={value}
            setValue={setValue}
            />
            <main id="pokemonPage" className="container main-pokemon">
                <button className="pokemon-page-button" onClick={()=>{
                    setPokeDex("")
                    setValue(null)}}>
                    <span>X</span>
                </button>
			<div className="header-main-pokemon">
            
				<span className="h2 number-pokemon">#{data.id}</span>
				<div className="container-img-pokemon">
					<img
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
						alt="pokemon bulbasaur"
					/>
				</div>

				<div className="container-info-pokemon">
					<h2>Name: {(data.name).charAt(0).toUpperCase() + (data.name).slice(1)}</h2>
					<div className="card-types">
                        <>
                        <span>Type: </span>
                        {data.types.map((type, i)=>{
                            return <span key={i} className={`card-type ${type.type.name}`}>"{type.type.name}" </span>
                        })}</>
						
					</div>
					<div className="info-pokemon">
						<div className="group-info">
							<p>Height</p>
							<span>{data.height/10} m</span>
						</div>
						<div className="group-info">
							<p>Weight</p>
							<span>{data.weight/10} Kg</span>
						</div>
					</div>
				</div>
			</div>

			<div className="container-stats">
                <h2>statistics</h2>
                <div className="stats">
                {
                            data.stats.map((poke,i)=>{
                                return<div className="stat-group" key={i}>
                            <span>{poke.stat.name}</span>
                            <div className="progress-bar">
                            <div className="progress-bar-ch" style={{width:`${poke.base_stat}%`}}></div>
                            </div>
                            <span className="counter-stat">{poke.base_stat}</span>
                        </div>
    
                                
                            })
                        }
                </div>
            </div>
		</main>
            </>)
}</>
     
    )
}