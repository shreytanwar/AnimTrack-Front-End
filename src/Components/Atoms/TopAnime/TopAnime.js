import React, { useState, useEffect, useRef } from 'react'
import './TopAnime.css'
import axios from "axios"
import { Link, useLocation } from "react-router-dom";

import ListItem from '../ListItem/ListItem';
import ResultCard from '../ResultCard/ResultCard';
function TopAnime() {

    const loaderRef = useRef()
    const BaseURL = "https://animtrack.herokuapp.com";
    const [topAnime, setTopAnime] = useState([])
    const [topAnimePage, setTopAnimePage] = useState(1)

    useEffect(() => {
        const fetch = async () => {
            loaderRef.current.style.display = "flex"
            const response = await axios.get(`${BaseURL}/anime/topAnime/${topAnimePage}`)
            // const response = await axios.get(`${BaseURL}/anime/topAiringAnime/${topAnimePage}`)
            console.log(response)
            const results = response.data
            setTopAnime(results)
            
        }
        function removeLoader() {
            if (document.getElementsByClassName("ResultCard") != null)
                loaderRef.current.style.display = "none"
        }

        console.log(document.getElementsByClassName("ResultCard"))
        // console.log("in top anime", topAnimePage)
        fetch().then(removeLoader)


    }, [topAnimePage])


    return (
        <div className='TopAnime'>
            <div className='TopAnimeLoader' ref={loaderRef}>
                <div class="cssloader">
                    <div class="sh1"></div>
                    <div class="sh2"></div>
                    <h4 class="lt">loading</h4>
                </div>
            </div>
            <div className='TopAnimeHeader'><i class="fas fa-fire"></i> Top Anime</div>
            <div className='TopAnimeBar'>
                {topAnime.map((option) => (
                    <Link
                        key={option.mal_id}
                        to={`/details/${option.mal_id}`}
                    >
                        <ResultCard
                            image_url={option.image_url}
                            title={option.title}
                            mal_id={option.mal_id}
                        />
                    </Link>

                ))}
            </div>
            {/* <button  type="button" onClick={
                ()=>
                {
                if(topAnimePage<5)
                    setTopAnimePage(topAnimePage+1)
                }}>+ top page</button>
            <button  type="button" onClick={
                ()=>
                {
                if(topAnimePage>0)
                    setTopAnimePage(topAnimePage-1)
                }}>- top page</button> */}
        </div>
    )
}

export default TopAnime
