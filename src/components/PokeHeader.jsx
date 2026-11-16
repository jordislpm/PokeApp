import Find from "./Find";

export default function PokeHeader(props) {
  return (
    <div className="search d-flex justify-content-center">
      <div>
        <div className="row">
          <div className="col mx-0">
            <div className="p-3" style={{ maxWidth: "300px" }}>
              <img
                className="img-fluid"
                src="/pokemon-logo.svg"
                alt="Pokemon Logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg";
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <Find
            handleFind={props.handleFind}
            find={props.find}
            submitFind={props.submitFind}
          />
        </div>
      </div>
      {props.clear && (
        <div className="btn-clear-find">
          <button className="btn btn-danger" onClick={props.clearSearch}>
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
