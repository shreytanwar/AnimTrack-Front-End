import React, {useState, useEffect} from 'react'
import axios from "axios"
import './ListItem.css'

import {useSelector, useDispatch} from 'react-redux'

function ListItem(props) {
    const BaseURL = "https://animtrack.herokuapp.com";

    const malId = useSelector(state => state.MalId)

    const [listAnime, setListAnime] = useState([])
    const [listName, setlistName] = useState(props.listName)

    const [presentInList, setPresentInList] = useState(false)
    
    useEffect(() => {
        checkPresentInList()
    }, [])

    function checkPresentInList() {
        const fetch = async() => {
            const config = {
                headers: {
                  'auth-token': localStorage.getItem('auth-token')
                }   
            }
            if(listName == null || listName == "") return;
        
            const list_name = listName.replace(" ","%20")
            const mal_id = malId
            const body = { list_name, mal_id}
            
            const response = await axios.post(`${BaseURL}/user/presentInList`, body, config)
            setPresentInList(response.data.present)
            
        }
        console.log("response.data")
        fetch()
    }

    function GetListAnime(e) {
        const fetch = async() => {
            const config = {
                headers: {
                  'auth-token': localStorage.getItem('auth-token')
                }   
            }
            if(listName == null || listName == "") return;
        
            const list_name = listName.replace(" ","%20")
            const response = await axios.get(`${BaseURL}/user/getList/${list_name}`, config)
            console.log(response.data)
            setListAnime(response.data)
            
        }
        fetch()
    }

    function AddToList(){
        const fetch = async() =>{
            const config = {
                headers: {
                  'auth-token': localStorage.getItem('auth-token')
                }
            }

            if(listName == null || listName == "") return;
            
            const list_name = listName.replace(" ","%20")
            const mal_id = malId
            const body = {list_name, mal_id}
            
            console.log("in AddToList", body)
            
            const response = await axios.post(`${BaseURL}/user/add`, body, config)
            console.log("response: ",response)
            setPresentInList(true)
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

            if(listName == null || listName == "") return;
            const list_name = listName.replace(" ","%20")
            const mal_id = malId
            const body = {list_name, mal_id}
            
            console.log("in DeleteFromList", body)
            
            const response = await axios.post(`${BaseURL}/user/delete`, body, config)
            console.log(response)
            setPresentInList(false)
        }
        
        fetch()
    }


    return (
        <div className='ListItem'>
                <div className='ListItemName'
                    onClick={AddToList}>
                        {props.listName}
                </div>
                {!presentInList &&
                <div className='ListItemPlus'
                onClick={AddToList}>
                    <i  class="fas fa-plus"/>
                </div>}
                {presentInList &&
                <div className='ListItemMinus'
                    onClick={DeleteFromList}>
                        <i  class="fas fa-minus"/>
                </div>
                }
        </div>
    )
}
// {listAnime.map((option) => (
//     <div className='animeInList'>
//         url: {option.image_url}
//         title: {option.title}
//     </div>
//     ))}
export default ListItem
