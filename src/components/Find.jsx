export default function Find ( {submitFind, handleFind, find} ){
    return(
        <div className="mx-0 row justify-content-center">
            <div className="col-xs-10 col-sm-8 justify-content-center me-2 pt-3">
                
                    <h3>Who do you Want to catch?</h3>
                    <form onSubmit={submitFind} className="d-flex" role="search">
                        <input 
                        value={find}
                        className="form-control me-2" 
                        type="text" 
                        placeholder="Ex: Gengar" 
                        aria-label="Buscar"
                        onChange={handleFind}/>
                        <button id="button" className="btn btn-outline-primary" type="submit"><i className="bi bi-search"></i></button>
                    </form >
                
                </div>
            <div className="col-xs-10 col-sm-2 m-2 flex justify-content-center pb-2">
                <img src="https://es.calcuworld.com/wp-content/uploads/sites/2/2016/07/Pokeball-150x150.png"/>
            </div>
        </div>
    )
}


                