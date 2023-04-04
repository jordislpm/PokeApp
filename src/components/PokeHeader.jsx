import Find

from "./Find"
export default function PokeHeader(props){
return(
    <div  className="search d-flex justify-content-center">
           <div className="">
                <div className="row">
                    <div className="col mx-0">
                        <div className="w-25 p-3">
                        <img className="img-fluid" src="https://seeklogo.com/images/P/Pokemon-logo-497D61B223-seeklogo.com.png"/>
                        </div>
                    </div>
                </div>
                <div>
                     <Find 
                     handleFind={props.handleFind} find={props.find}
                     submitFind={props.submitFind}/>
                </div>
           </div>
           {props.clear && <div className="btn-clear-find">
                 <button className="btn btn-danger" onClick={props.clearSearch}>Clear search</button>
            </div>}
        </div>
)
}