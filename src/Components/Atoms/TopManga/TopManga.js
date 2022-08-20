import React, {useState, useEffect} from 'react'
import axios from "axios"

function TopManga() {

    const BaseURL = "https://animtrack.herokuapp.com";
    const [topManga, setTopManga] = useState([])
    const [topMangaPage, setTopMangaPage] = useState(1)

    useEffect(() => {
        const fetch = async() => {
            const response = await axios.get(`${BaseURL}/Manga/topManga/${topMangaPage}`)
            console.log(response)
            const results = response.data
            setTopManga(results)
        }
        console.log("in top Manga",topMangaPage)
        fetch()
    }, [topMangaPage])
        
    return (
        <div>
            <button  type="button" onClick={
                ()=>
                {
                if(topMangaPage<5)
                    setTopMangaPage(topMangaPage+1)
                }}>+ top page</button>
            <button  type="button" onClick={
                ()=>
                {
                if(topMangaPage>0)
                    setTopMangaPage(topMangaPage-1)
                }}>- top page</button>
        </div>
    )
}

export default TopManga
