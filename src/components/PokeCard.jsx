export default function PokeCard({ id, name, img, types, infoPokemon, pk }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 550;
  const cardClass = isMobile ? "cardMobile" : "card-pokemon";
  const displayName = name ? name.charAt(0).toUpperCase() + name.slice(1) : "";

  return (
    <button
      className={cardClass}
      onClick={() => {
        if (infoPokemon) infoPokemon(pk);
      }}
    >
      <div className="card-info">
        <span className="pokemon-id">No.{id}</span>
        <h3>{displayName}</h3>
      </div>
      <div className="card-img">
        <img
          src={img}
          alt={name || "pokemon"}
          onError={(e) => {
            e.target.onerror = null;
            if (pk?.sprites?.other?.["official-artwork"]?.front_default) {
              e.target.src = pk.sprites.other["official-artwork"].front_default;
            }
          }}
        />
      </div>
      <div className="card-types-container">
        {types &&
          types.map((type, i) => {
            const typeName = type.type.name;
            const displayTypeName =
              typeName.charAt(0).toUpperCase() + typeName.slice(1);
            return (
              <span key={i} className={`card-type ${typeName}`}>
                {displayTypeName}
              </span>
            );
          })}
      </div>
    </button>
  );
}
