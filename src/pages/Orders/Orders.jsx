import React from 'react'
import './Orders.css'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import axios from "axios"
import { assets } from '../../assets/assets'

const Orders = ({url}) => {

  const [orders, setOrders] = useState([])
  const [orderListLoading, setOrderListLoading] = useState(true)


  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list")

    if (response.data.success){
      setOrders(response.data.data)
      setOrderListLoading(false)
    }else{
      toast.error("Error")
      setOrderListLoading(false)
    }
  }

    const statusHandler = async (event, orderId) =>  {
      const response = await axios.post(url+"/api/order/status", {
        orderId,
        status:event.target.value
      })
      if(response.data.success){
        await fetchAllOrders()
      }
    }


  useEffect(()=>{
    fetchAllOrders()
  },[])
  return (
    <div className='order add'>
        <h3>Order Page</h3>
        { orderListLoading ?

          <div className='verify'>
            <div className="spinner"></div>
          </div> :
        <div className="order-list">
          {orders.map((order,index)=>{
            return(
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon}/>
              <div>
                <p className='order-item-item'>
                  {order.items.map((item,index)=>{
                    if(index === order.items.length-1){
                      return item.name + " x " + item.quantity
                    }else{
                      return item.name + " x " + item.quantity + ", "
                    }
                  })}
                </p>
                <p className='order-item-name'>{order.address.firstName+" "+order.address.lastname}</p>
                <div className="order-item-address">
                  <p>{order.address.street+","}</p>
                  <p>{order.address.city+", "+order.address.region+", "+order.address.country+", "+order.address.zipcode}</p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p className='qty'>Qty : {order.items.length}</p>
              <p>GH₵{order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                <option value="Processing Order">Processing Order</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            )
          })}
        </div>
        }
    </div>
  )
}

export default Orders
