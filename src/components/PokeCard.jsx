import { useState, useEffect } from "react"


export default function PokeCard ({id,name,img,types,infoPokemon,pk,toggleModal}){

	const [cardMobile, setMobileCard] = useState("card-pokemon")

	useEffect(() => {
		const handleResize = () => {
		  if (window.innerWidth < 550) {
			setMobileCard("cardMobile");
		  } else {
			setMobileCard("card-pokemon");
		  }
		};
		window.addEventListener("resize", handleResize);
		handleResize();
		
		
		return () => {
		  window.removeEventListener("resize", handleResize);
		};
		
	  }, []);

    return (
            <button
				className={`${cardMobile}`}
                key={id} 
                onClick={()=>{
					infoPokemon(pk)}}
			>
				<div className="card-info">
					<span className="pokemon-id">No.{id}</span>
					<h3>{(name).charAt(0).toUpperCase() + (name).slice(1)}</h3>
					<div className="card-types">
					</div>
				</div>
                <div className="card-img">
					<img
						src={img}
						alt={name}
                        />
				</div>
				<div>
				{types.map((type, i)=>{
                            return <span key={i} className={`card-type ${type.type.name}`}>
								{(type.type.name).charAt(0).toUpperCase() + (type.type.name).slice(1)} </span>
                        })}
				</div>
            </button>
    )
}






