import React from 'react'
import './Header.css'

import { Link } from "react-router-dom";
import UserSignButton from '../UserSign/UserSignButton/UserSignButton';
import SearchBar from '../SearchBar/SearchBar';

function Header() {
    return (
        <div className='Header'>
            <div className='HeaderLogo'>
                <Link to='/'>
                    {/* <img src={process.env.PUBLIC_URL + '/Images/mal.png'}></img> */}
                    <i class="fab fa-autoprefixer"></i>
                    {/* <img src={process.env.PUBLIC_URL + '/Images/otaku.svg'}></img> */}
                </Link>
            </div>
            <SearchBar />
            <UserSignButton />
        </div>
    )
}

export default Header
