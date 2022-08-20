import React from 'react'
import './SearchResult.css'

import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { resetSearchResults } from '../../../Redux/Actions';
import ResultCard from '../../Atoms/ResultCard/ResultCard';

function SearchResult() {
    const searchResult = useSelector(state => state.SearchResult)
    const dispatch = useDispatch()

    function ResetResults() {
        dispatch(resetSearchResults())
    }
    return (
        <div className='SearchResult'>
           <div className='SearchResultHeader'><i class="fas fa-search"></i> Top Anime</div>
            <div className='SearchResultBar'>
                {searchResult.map((option) => (
                    <>
                        <Link
                            key={option.mal_id}
                            to={`/details/${option.mal_id}`}
                        >
                            <ResultCard
                                onClick={ResetResults}
                                image_url={option.image_url}
                                title={option.title}
                                mal_id={option.mal_id}
                            />
                        </Link>
                    </>
                ))}
            </div>
        </div>
    )
}

export default SearchResult
