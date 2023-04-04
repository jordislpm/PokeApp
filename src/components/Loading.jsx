import { DotSpinner } from '@uiball/loaders'


export default function Loading (){
    return <div className='loading'>
        <h1><DotSpinner/></h1>
        <h1>Loading...</h1>
    </div>
}

<DotSpinner 
className="container-loader"
 size={80}
 speed={0.9} 
 color="white" 
/>



