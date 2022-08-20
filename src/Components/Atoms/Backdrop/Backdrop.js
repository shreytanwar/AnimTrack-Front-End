import React,{useEffect} from 'react'
import './Backdrop.css'

function Backdrop(props) {
    
    let trailerUrl = null
    if(props.trailer_url !=null)
        trailerUrl = props.trailer_url
    else{
        console.log(props.trailer_url)
    }

    return (
        <div className='Backdrop'>
            {trailerUrl && 
            <div className='BackdropContainer'>
                <div className='DetailsTrailerVignette'></div> 
                <iframe id="DetailsTrailer" 
                src={trailerUrl}
                allow="autoplay"
                ></iframe>
            </div>
           
            }
        </div>
    )
}

export default Backdrop
