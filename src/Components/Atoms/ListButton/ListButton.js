import React, {useState, useEffect} from 'react'
import './ListButton.css'
import axios from "axios"

import {useSelector, useDispatch} from 'react-redux'
import {increment, decrement} from './../../../Redux/Actions/index'
import ListItem from '../ListItem/ListItem'
import CreateList from '../CreateList/CreateList'


function ListButton() {
    const BaseURL = "https://animtrack.herokuapp.com";
    const malId = useSelector(state => state.MalId)
    const dispatch = useDispatch()        

    const [userLists, setUserLists] = useState([])
    const [openUserLists, setOpenUserLists] = useState(false)    
    const [presentInWatchLater, setPresentInWatchLater] = useState(false)

    useEffect(() => {
        const fetch = async() => {
            const config = {
                headers: {
                  'auth-token': localStorage.getItem('auth-token')
                }
              }              
            const response = await axios.get(`${BaseURL}/user/getAllLists`, config)
            //remove default list
            response.data.anime_list.splice(0,1);
            setUserLists(response.data.anime_list)
        }
        fetch()
        checkPresentInWatchLater()
    }, [malId])

    function checkPresentInWatchLater() {
        const fetch = async() => {
            const config = {
                headers: {
                  'auth-token': localStorage.getItem('auth-token')
                }   
            }
        
            const list_name = "Watch%20Later"
            const mal_id = malId
            const body = { list_name, mal_id}
            
            const response = await axios.post(`${BaseURL}/user/presentInList`, body, config)
            setPresentInWatchLater(response.data.present)
            
        }
        fetch()
    }



    function GetListAnime() {
        const fetch = async() => {
            const config = {
                headers: {
                  'auth-token': localStorage.getItem('auth-token')
                }
              }
            
            const list_name = 'Watch Later'.replace(" ","%20")
            const response = await axios.get(`${BaseURL}/user/getList/${list_name}`, config)
            console.log(response.data.anime_list)
        }
        console.log('login called')
        fetch()
    }

    function AddToWatchLater(e){
        const fetch = async() =>{
            const config = {
                headers: {
                  'auth-token': localStorage.getItem('auth-token')
                }
            } 
            const list_name = "Watch Later"
            const mal_id = malId
            const body = { list_name, mal_id}
            
            console.log("in AddToList", body)
            
            const response = await axios.post(`${BaseURL}/user/add`, body, config)
            console.log("response: ",response)
            setPresentInWatchLater(true)
        }
        fetch()
    }

    function DeleteFromWatchLater(){
        const fetch = async() =>{
            const config = {
                headers: {
                  'auth-token': localStorage.getItem('auth-token')
                }
            } 
            const list_name = "Watch%20Later"
            const mal_id = malId
            const body = {list_name, mal_id}
            
            console.log("in DeleteFromWL", body)
            
            const response = await axios.post(`${BaseURL}/user/delete`, body, config)
            console.log(response)
            setPresentInWatchLater(false)
        }
        
        fetch()
    }
    function AddToList(e){
        const fetch = async() =>{
            const config = {
                headers: {
                  'auth-token': localStorage.getItem('auth-token')
                }
            } 

            const list_name = "Watch Later"
            const mal_id = malId
            const body = { list_name, mal_id}
            
            console.log("in AddToList", body)
            
            const response = await axios.post(`${BaseURL}/user/add`, body, config)
            console.log("response: ",response)
        }
        fetch()
    }

    function DeleteFromList(e){
        const fetch = async() =>{
            const config = {
                headers: {
                  'auth-token': localStorage.getItem('auth-token')
                }
            } 

            const list_name = "Watch Later"
            const mal_id = malId
            const body = {list_name, mal_id}
            
            console.log("in AddToList", body)
            
            const response = await axios.post(`${BaseURL}/user/delete`, body, config)
            console.log(response)
        }
        
        fetch()
    }

    // function DeleteList(e) {
    //     const fetch = async() =>{
    //         const config = {
    //             headers: {
    //               'auth-token': localStorage.getItem('auth-token')
    //             }
    //         } 

    //         const list_name = listName
    //         const body = { list_name }
            
    //         console.log("in DeleteList", body)
    //         console.log(e)
    //         const response = await axios.post(`${BaseURL}/user/deleteList`, body, config)
    //         console.log(response)
    //         setPresentInList(false)
    //     }
        
    //     fetch()
    // }



    return (
        <div className='ListButton'> 
        {/* onClick={AddToWatchList}> */}
            {/* Watch Later
            <button type="button" onClick={GetListAnime}>get anime list</button>

            
            <button type="button" onClick={ListDropDown}>get AllList</button>
            <button type="button" onClick={AddToList}>+ anime</button>
            <button type="button" onClick={DeleteFromList}>- anime</button>
            <button type="button" onClick={CreateList}>+ list</button>
            <button type="button" onClick={DeleteList}>- list</button> */}


            
            {/* <div className='AddToList'>
                <button type="button" onClick={AddToWatchLater}>AddToWatchLater</button>
                <button type="button" onClick={ListDropDown}>🔽</button>
                {userLists.map((option) => (
                        <ListItem listName = {option.list_name}/>
                    ))}
            </div> */}
            <div className='ListButtonDefault'>
                {/* add  fab icons */}
                {presentInWatchLater &&
                <div className = 'AddToWatchLaterButton' onClick={DeleteFromWatchLater}> <i class="far fa-heart"></i> InWatchLater </div>
                }
                {!presentInWatchLater &&
                <div className = 'AddToWatchLaterButton' onClick={AddToWatchLater}> <i class="fas fa-heart"></i> WatchLater </div>
                }
                <div className = 'ListDropDownButton'  onClick={()=>{setOpenUserLists(prev=>!prev)}}>
                    {openUserLists ? <i class="fas fa-chevron-down"></i> : <i class="fas fa-chevron-up"></i>}
                </div>
            </div>
            {openUserLists && 
            <div className = 'ListDropDown'>  
                <div className='CreateListButton'>
                    <CreateList setUserLists = {setUserLists}
                    userLists = {userLists}/>
                </div>    
                <div className="ListDropDownScroll">
                    {userLists.map((option) => (
                            <ListItem listName = {option.list_name}/>
                    ))}
                </div>        
                
                         
            </div>
            }
        </div>
       
    )
}

export default ListButton
