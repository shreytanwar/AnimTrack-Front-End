import React from 'react'
import axios from "axios"
import './SearchBar.css'
import {useDispatch} from 'react-redux'
import { useHistory } from "react-router-dom"
import {updateSearchResults} from '../../../Redux/Actions';

function SearchBar() {

    const BaseURL = "https://animtrack.herokuapp.com";

    const [textField, setTextField] = React.useState("")

    const dispatch = useDispatch()

    const history = useHistory();

    function SearchSubmit() {
        const fetch = async() => {
            const response = await axios.get(`${BaseURL}/anime/search?str=${textField.trim()}`)
            console.log(response)
            const results = response.data
            const filteredResults= results.filter(function (el){
                return el.rated != 'Rx'
            })
          
          dispatch(updateSearchResults(filteredResults))
          history.push('/searchResults')
        }

        fetch()
    }

    return (
        <div className='SearchBar'>
            <form onSubmit={(e) => {e.preventDefault() 
                                    SearchSubmit()}}>
                <input
                type='text'
                name='search'
                placeholder='Search Anime/Manga'
                onChange={(e) => {setTextField(e.target.value)}}
                />
                {/* className='SearchBarbutton' */}
                <button type="submit"><i class="fa fa-search fa-lg"></i></button>
            </form>
        </div>
    )
}

export default SearchBar
