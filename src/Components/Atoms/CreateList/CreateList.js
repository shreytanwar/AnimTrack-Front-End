import React, {useState} from 'react'
import './CreateList.css'
import axios from "axios"

function CreateList(props) {

    const BaseURL = "https://animtrack.herokuapp.com";

    const [listName, setListName] = useState("")
    const [openCreateList, setOpenCreateList] = useState(false)
    
    function CreateList() {
        const fetch = async() =>{
            const config = {
                headers: {
                  'auth-token': localStorage.getItem('auth-token')
                }
            }
            
            if(listName.trim().length == 0) return

            const list_name = listName.trim()
            const body = { list_name }
            const response = await axios.post(`${BaseURL}/user/createList`, body, config)
            console.log(response)
            props.setUserLists(p=>[...p, {list_name}])
        }
        
        fetch()
        setOpenCreateList(prev => !prev)
    }

    function CreateListDialog() {
        setOpenCreateList(prev => !prev)
        
        console.log("clicked create list", openCreateList)
    }

    return (
        <div className='CreateList'>
            {!openCreateList &&
            <div className='CreateListItem' onClick={CreateListDialog}>
                <i class="fas fa-plus"></i> List
            </div>}
            {openCreateList &&
                <div className='CreateListForm'>
                <form onSubmit={(e) => {e.preventDefault() 
                                        CreateList()}}>
                    <input
                    className = 'CreateListFormInput'
                    type='text'
                    name='listName'
                    placeholder=' List Name'
                    onChange={(e) => {console.log('submit')
                        setListName(e.target.value)}} 
                    />
                    {listName!="" &&
                    <div className ="CreateListFormPlus" onClick={CreateList}>
                        <i  class="fas fa-plus"/>
                    </div>}
                    {listName=="" &&
                    <div className ="CreateListFormPlus" onClick={CreateList}>
                        <i class="fas fa-chevron-left"></i>
                    </div>}
                </form>  
            </div>}
        </div>
    )
}

export default CreateList
