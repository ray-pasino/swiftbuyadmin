import React, {useState, useEffect } from 'react'
import './List.css'
import axios from 'axios'
import {toast} from "react-toastify"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons"


const List = ({url}) => {


  const [list, setList] = useState([])
  const [deleting, setDeleting] = useState({})
  const [listLoading, setListLoading] = useState(true)

    const fetchList = async ()=> {
      const response = await axios.get(`${url}/api/item/list`)

      if(response.data.success){
        setList(response.data.data)
        setListLoading(false)
      }else{
        toast.error("Error")
        setListLoading(false)
      }
    }

    const removeItem = async (itemId)=>{
      setDeleting((prev) => ({ ...prev, [itemId]: true }))
      const response = await axios.post(`${url}/api/item/remove`, {id:itemId})
      await fetchList()
      if(response.data.success){
        toast.success(response.data.message)
      }else{
        setDeleting(false)
        toast.error("Error")
      }
      setDeleting(prev => ({ ...prev, [itemId]: false }))
    }

    useEffect(()=>{
      fetchList()
    },[])


    if(listLoading){
      return(
    <div className='verify'>
        <div className="spinner"></div>
    </div>
      )
    }

  return (
    <div className='list add flex-col'>
      <p>All Items List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item ,index)=>{
          return(
            <div key={index}  className='list-table-format'>
                <img src={`${url}/images/` + item.image}/>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>GH₵{item.price}</p>
                {deleting[item._id] ?
                  <FontAwesomeIcon icon={faCircleNotch} spin/>
                 :
                <FontAwesomeIcon onClick={()=>removeItem(item._id)} icon={faTrash} className='cursor'/>
                }
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
