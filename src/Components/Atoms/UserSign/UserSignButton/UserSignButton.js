import React, {useState} from 'react'
import './UserSignButton.css'
import { Link } from "react-router-dom";

function UserSignButton() {

    const [openUserSignDropDown, setOpenUserSignDropDown] = useState(false)

    function SignOut() {
        localStorage.removeItem('auth-token')
        window.location.reload()
    }
    
    return (
        <div className='UserSignButton'>
            <div className='UserSignButtonOut'>
                {
                localStorage.getItem('auth-token')!==null &&
                <>
                <div className='UserSignDropDown' onClick={ () => {setOpenUserSignDropDown(prev => !prev)}}>
                    <img src={process.env.PUBLIC_URL + '/Images/otaku.svg'}></img>
                    
                </div>
                {   
                    openUserSignDropDown &&
                    <div className='UserSignDropDownItems'>
                        <div className='UserSignAvatarChooser'>
                            <div className='UserSignAvatarMale'><img src={process.env.PUBLIC_URL + '/Images/otaku.svg'}/></div>
                            <div className='UserSignAvatarFemale'><img src={process.env.PUBLIC_URL + '/Images/girl.svg'}/></div>
                        </div>
                        <div className='UserSignLists'>
                        <Link to={'/Lists'}>
                            <i class="fas fa-list"></i> Lists
                        </Link>
                        </div>
                        <div className='SignOutButton' onClick={SignOut}>
                            <i class="fa fa-sign-in-alt"></i> SignOut
                        </div>
                    </div>
                    }
                    </>
                }
            </div>
            <div className='UserSignButtonUpIn'>
            {
            localStorage.getItem('auth-token')==null &&
            <>
                <div className='SignUpButton'>
                    <Link to={'/SignUp'}>
                        <i class="fa fa-edit"></i> SignUp
                    </Link>
                </div>
                <div className='SignInButton'>
                    <Link to={'/SignIn'}>
                        <i class="fa fa-sign-in-alt"></i> Sign In
                    </Link>
                </div>
            </>
            }
            </div>
        </div>
    )
}

export default UserSignButton
