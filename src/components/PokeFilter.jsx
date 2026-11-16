const POKEMON_TYPES = [
  { value: "all", label: "Todos", className: "type-all" },
  { value: "normal", label: "Normal", className: "normal" },
  { value: "fire", label: "Fire", className: "fire" },
  { value: "water", label: "Water", className: "water" },
  { value: "grass", label: "Grass", className: "grass" },
  { value: "electric", label: "Electric", className: "electric" },
  { value: "ice", label: "Ice", className: "ice" },
  { value: "fighting", label: "Fighting", className: "fighting" },
  { value: "poison", label: "Poison", className: "poison" },
  { value: "ground", label: "Ground", className: "ground" },
  { value: "flying", label: "Flying", className: "flying" },
  { value: "psychic", label: "Psychic", className: "psychic" },
  { value: "bug", label: "Bug", className: "bug" },
  { value: "rock", label: "Rock", className: "rock" },
  { value: "ghost", label: "Ghost", className: "ghost" },
  { value: "dragon", label: "Dragon", className: "dragon" },
  { value: "dark", label: "Dark", className: "dark" },
  { value: "steel", label: "Steel", className: "steel" },
  { value: "fairy", label: "Fairy", className: "fairy" },
];

export default function PokeFilter({ selectedType, setSelectedType }) {
  return (
    <div className="poke-filter-container container">
      <div className="poke-filter-horizontal">
        {POKEMON_TYPES.map((type) => {
          const isSelected = selectedType === type.value;
          return (
            <button
              key={type.value}
              type="button"
              className={`card-type filter-type-btn ${type.className} ${
                isSelected ? "filter-type-active" : ""
              }`}
              onClick={() => setSelectedType(type.value)}
              title={`Filtrar por ${type.label}`}
            >
              {type.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
