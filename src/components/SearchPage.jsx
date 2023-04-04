import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PokeCard from './PokeCard';
import { PokemonContext } from '../context/PokemonContext';

export const SearchPage = () => {
	const location = useLocation();

	const { globalPokemons } = useContext(PokemonContext);

	const filteredPokemons = globalPokemons.filter(pokemon =>
		pokemon.name.includes(location.state.toLowerCase())
	);

	return (
		<div className='container'>
			<p className='p-search'>
				Se encontraron <span>{filteredPokemons.length}</span>{' '}
				resultados:
			</p>
			<div className='card-list-pokemon container'>
				{filteredPokemons.map((pk, i)=>{
                return <button 
                className="card-pokemon" 
                key={pk.id} 
                onClick={()=>infoPokemon(pk)}
                data-bs-toggle="modal" data-bs-target="#exampleModal">
                     <PokeCard
                key={pk.id}
                name={pk.name}
                id={pk.id}
                img={pk.sprites.front_default}
                />
                </button>
            })}
			</div>
		</div>
	);
};