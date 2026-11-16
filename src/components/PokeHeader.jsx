import Find from "./Find";

export default function PokeHeader(props) {
  return (
    <header className="search container-fluid py-2">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-md-3 text-center text-md-start p-2">
          <img
            className="img-fluid"
            style={{ maxHeight: "65px", objectFit: "contain" }}
            src="/pokemon-logo.svg"
            alt="Pokemon Logo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg";
            }}
          />
        </div>
        <div className="col-12 col-md-9">
          <Find
            handleFind={props.handleFind}
            find={props.find}
            submitFind={props.submitFind}
            clear={props.clear}
            clearSearch={props.clearSearch}
          />
        </div>
      </div>
    </header>
  );
}
