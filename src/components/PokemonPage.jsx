import PokeButtonPage from "./PokeButtonPage";
import Loading from "./Loading";

export default function PokemonPage({
  data,
  loading,
  setPokeDex,
  value,
  setValue,
}) {
  return (
    <>
      <PokeButtonPage value={value} setValue={setValue} />
      {loading || !data ? (
        <div className="container main-pokemon" style={{ minHeight: "450px" }}>
          <button
            className="pokemon-page-button"
            onClick={() => {
              if (setPokeDex) setPokeDex("");
              if (setValue) setValue(null);
            }}
            title="Close"
          >
            <span>&times;</span>
          </button>
          <Loading />
        </div>
      ) : (
        <main id="pokemonPage" className="container main-pokemon">
          <button
            className="pokemon-page-button"
            onClick={() => {
              if (setPokeDex) setPokeDex("");
              if (setValue) setValue(null);
            }}
            title="Close"
          >
            <span>&times;</span>
          </button>

          <div className="header-main-pokemon">
            <span className="number-pokemon">
              #{String(data.id).padStart(3, "0")}
            </span>

            <div className="container-img-pokemon">
              <img
                src={
                  data.sprites?.other?.dream_world?.front_default ||
                  data.sprites?.other?.["official-artwork"]?.front_default ||
                  data.sprites?.front_default ||
                  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`
                }
                onError={(e) => {
                  e.target.onerror = null;
                  if (data.sprites?.other?.["official-artwork"]?.front_default) {
                    e.target.src =
                      data.sprites.other["official-artwork"].front_default;
                  } else if (data.sprites?.front_default) {
                    e.target.src = data.sprites.front_default;
                  }
                }}
                alt={`pokemon ${data.name}`}
              />
            </div>

            <div className="container-info-pokemon">
              <h2>
                {data.name
                  ? data.name.charAt(0).toUpperCase() + data.name.slice(1)
                  : ""}
              </h2>
              <div className="card-types">
                <span>Type:</span>
                {data.types &&
                  data.types.map((type, i) => {
                    const tName = type.type.name;
                    return (
                      <span key={i} className={`card-type ${tName}`}>
                        {tName.charAt(0).toUpperCase() + tName.slice(1)}
                      </span>
                    );
                  })}
              </div>
              <div className="info-pokemon">
                <div className="group-info">
                  <p>Height</p>
                  <span>{(data.height || 0) / 10} m</span>
                </div>
                <div className="group-info">
                  <p>Weight</p>
                  <span>{(data.weight || 0) / 10} Kg</span>
                </div>
              </div>
            </div>
          </div>

          <div className="container-stats">
            <h2>Statistics</h2>
            <div className="stats">
              {data.stats &&
                data.stats.map((poke, i) => {
                  const statPercentage = Math.min(
                    Math.max(poke.base_stat, 0),
                    100
                  );
                  return (
                    <div className="stat-group" key={i}>
                      <span className="stat_name">
                        {poke.stat.name.replace("-", " ")}
                      </span>
                      <div className="progress-bar">
                        <div
                          className="progress-bar-ch"
                          style={{ width: `${statPercentage}%` }}
                        ></div>
                      </div>
                      <span className="counter-stat">{poke.base_stat}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </main>
      )}
    </>
  );
}
