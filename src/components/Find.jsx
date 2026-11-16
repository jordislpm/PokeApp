export default function Find({
  submitFind,
  handleFind,
  find,
  clear,
  clearSearch,
}) {
  return (
    <div className="mx-0 row justify-content-center align-items-center">
      <div className="col-12 col-md-8 pt-2">
        <h3 className="text-center text-md-start">Who do you Want to catch?</h3>
        <form
          onSubmit={submitFind}
          className="d-flex align-items-center gap-2 mt-2"
          role="search"
        >
          <input
            value={find}
            className="form-control"
            type="text"
            placeholder="Ex: Gengar"
            aria-label="Buscar"
            onChange={handleFind}
          />
          <button
            id="button"
            className="btn btn-outline-primary flex-shrink-0"
            type="submit"
            title="Buscar"
          >
            <i className="bi bi-search"></i>
          </button>
          {clear && (
            <button
              type="button"
              className="btn btn-danger flex-shrink-0 text-nowrap"
              onClick={clearSearch}
              title="Limpiar búsqueda"
            >
              <i className="bi bi-x-circle me-1"></i> Clear
            </button>
          )}
        </form>
      </div>
      <div className="col-12 col-md-3 d-flex justify-content-center py-2">
        <img
          src="https://es.calcuworld.com/wp-content/uploads/sites/2/2016/07/Pokeball-150x150.png"
          alt="Pokeball"
          style={{ maxWidth: "90px", height: "auto" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/pokeIcon.svg";
          }}
        />
      </div>
    </div>
  );
}
