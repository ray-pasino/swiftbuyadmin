 import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons"

const Add = ({url}) => {
    
    const [image, setImage] = useState(false)
    const [Loading, setLoading] = useState(false)

    const [data, setData] = useState({
        name : "",
        description : "",
        price : "",
        category : "Electronics"

    })
    

    const onChangeHandler = (event)=>{
        const name = event.target.name 
        const value = event.target.value 
        setData(data => ({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) =>{
        setLoading(true)
        event.preventDefault()
        const formData = new FormData()
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)
        const response = await axios.post(`${url}/api/item/add`, formData)
        setLoading(false)
        if (response.data.success){
            setData({
                name : "",
                description : "",
                price : "",
                category : "Electronics"
            })
            setImage(false)
            toast.success(response.data.message)
        }else{
            toast.error(response.data.message)
        }
    }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className='add-img-upload flex-col'>
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src={image ? URL.createObjectURL(image) : assets.upload_area}/>
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
        </div>
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={onChangeHandler}  value={data.name} type="text" name="name" placeholder='Type here' required/>
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required/>
            </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="Electronics">Electronics</option>
                            <option value="Phones & Accessories">Phones & Accessories</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Home Appliances">Home Appliances</option>
                            <option value="Lighting">Lighting</option>
                            <option value="Apparel & Clothing">Apparel & Clothing</option>
                            <option value="Jewelries">Jewelries</option>
                            <option value="Beauty & Cosmetics">Beauty & Cosmetics</option>
                            <option value="Bugs & Luggages">Bugs & Luggages</option>
                            <option value="Health Care">Health Care</option>
                            <option value="Personal Care">Personal Care</option>
                            <option value="Gifts & Craft">Gifts & Craft</option>
                            <option value="Packaging & Printing">Packaging & Printing</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='GH₵20'/>
                    </div>
            </div>
            {
                Loading ?
                <button type='submit' className='add-btn'><FontAwesomeIcon icon={faCircleNotch} spin/></button>
                :
                <button type='submit' className='add-btn'>ADD</button>
            }
      </form>
    </div>
  )
}

export default Add
