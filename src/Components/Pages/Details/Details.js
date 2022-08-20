import React, {useEffect, useState} from 'react'
import axios from "axios"
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'

import YouTube from 'react-youtube';

import './Details.css';
import '../../Atoms/Backdrop/Backdrop'
import Backdrop from '../../Atoms/Backdrop/Backdrop';
import ListButton from '../../Atoms/ListButton/ListButton'
import { updateMalId, updateSearchResults } from '../../../Redux/Actions';

function Details(props) {
    const [anime, setAnime] = useState([])
    const [animeGenre, setAnimeGenre] = useState([])
    const [animeScore, setAnimeScore] = useState([])
    const [backDropPresent, setBackDropPresent] = useState(false)
    let { id } = useParams();
    const dispatch = useDispatch()

    const BaseURL = "https://animtrack.herokuapp.com";

    useEffect(() => {
        const fetch = async() => {
            
            var response = await axios.get(`${BaseURL}/anime/present?id=${id}`)
            
            if(response.data == ""){                
                console.log("Adding to DB")
                response = await axios.post(`${BaseURL}/anime/add?id=${id}`)
            }

            console.log(response.data)
            //Get larger image
            response.data.image_url = response.data.image_url.substring(0, response.data.image_url.length-4)+ 'l'
                                    + response.data.image_url.substring(response.data.image_url.length-4);

            // Mute trailer video
            if(response.data.trailer_url != null)
                response.data.trailer_url = response.data.trailer_url+'&mute=1'
            
            // Trim rating
            response.data.rating = response.data.rating.split(" ")[0]
            
            //set score
            var score = []
            var responseScore = response.data.score
            for(let i=0 ; i<5; i++){
                if(responseScore < 0.4)
                    score.push(<i class="far fa-star"></i>)
                else if(responseScore <= 0.5)
                    score.push(<i class="fas fa-star-half-alt"></i>)
                else
                    score.push(<i class="fas fa-star"></i>)
                    responseScore = responseScore -2
            }
            setAnimeScore(score)

            var genre = []
            for(let i =0; i < 3; i++){
                if(i >= response.data.genres.length) break;
                    genre.push(response.data.genres[i].name)
            }
            setAnimeGenre(genre)
            SetTrailer(response.data) 
            
            setAnime(response.data)
        }

        const SetTrailer = (res) => {
            if(res && res.trailer_url && !backDropPresent)
            {
                setBackDropPresent(true) 
                setTimeout(RemoveTrailer,15000);
            }
        }
    
        function RemoveTrailer(){
            var detailsBackdrop = document.getElementsByClassName('Backdrop')[0]
            if(detailsBackdrop!=null){
                setBackDropPresent(false)
                detailsBackdrop.remove()

            }
            
        }

        dispatch(updateMalId(id))
        fetch()
        console.log("fetch done")
        
    }, [id])

    
    return (
        <div className='Details'> 
            <Backdrop trailer_url = {anime.trailer_url}/>
            <div className='DetailsText'>
                {/* <div className='DetailsTextVignette'></div> */}
                <div className='DetailsGenres'></div>
                <div className='DetailsTitle'>
                    <div className='DetailsEnglishTitle'>{anime.title}</div>
                    <div className='DetailsJapaneseTitle'>{anime.title_japanese}</div>
                </div>
               <div className='DetailsTags'>
                   <div className = 'DetailsTagsRating'>{anime.rating}</div>
                   <div className = "DetailsTagDivider">|</div>
                   <div className = 'DetailsTagsScore'>{animeScore}</div>
                   <div className = "DetailsTagDivider">|</div>
                    {animeGenre.map(option => (
                        <div className='DetailsTagsGenre'>{option}</div>
                    ))}
                </div>
                <div className='DetailsSynopsis'>
                    <div className='DetailsSynoposisText'>{anime.synopsis}</div>    
                </div>
                <div className='DetailsWatchButton'></div>
                <div className='DetailsListButton'> <ListButton/></div>
                {/* Add or remove(default = watch later) 
                with drop down for choosing other list*/}
            </div>
            {!backDropPresent &&
            <div className='DetailsAnimeImage'>
                <img src={anime.image_url} alt={anime.title} />
            </div>}
            
            <div className='Related'></div>
        </div>
    )
}

export default Details
