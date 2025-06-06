import React, { useEffect } from 'react'
import {Form,Button,Row,Col,Container,Table} from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import { UserList} from '../redux/slices/UserListSlice'
import { UserDelete } from '../redux/slices/userDeleteSlice';
import { GetUser } from '../redux/slices/GetUserSlice';
import { useNavigate } from 'react-router-dom';
import { fetchproducts } from '../redux/slices/ProductSlice';
import { orderAdmin } from '../redux/slices/OrderAdminSlice';


function AdminOrderScreen() {
  const orderListSelector=useSelector(state=>state.allOrdersAdmin.Orders);
  const userSelector=useSelector(state=>state.user.userInfo)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(()=>{
    dispatch(orderAdmin())
  },[])
  const orderHandler=(e)=>{
    navigate(`/order/${e}`)
  }
  const modeSelector = useSelector(state => state.darkMode.Mode);
  useEffect(()=>{
    if(userSelector && !userSelector.isAdmin) navigate("/");
  },[])
  return (
    <div>
        <h1 className={modeSelector ? 'text-white' : ''}>all orders</h1>
       
        <Table striped bordered hover variant={modeSelector ? 'dark' : 'light'}>
          <thead>
            <tr>
              <th>ID</th>
              <th>user</th>
              <th>date</th>
              <th>total</th>
              <th>paid</th>
              <th>delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
                orderListSelector.length && orderListSelector.map((order,index)=>(
                <tr key={index}>
                    <td>{order["_id"]}</td>
                    <td>{order.user["username"]}</td>
                    <td>{order["createdAt"].substring(0,10)}</td>
                    <td>${order["totalPrice"]}</td>
                    {order["isPaid"]?<td>{order["paidAt"].substring(0,10)}</td>:<td>❌</td>}
                    {order["isDelivered"]?<td>{order["deliveredAt"].substring(0,10)}</td>:<td>❌</td>}
                    <td><Button onClick={()=>orderHandler(order["_id"])}>Details</Button></td>
                </tr>
                ))
            }
          </tbody>
        </Table>
    </div>
  )
}

export default AdminOrderScreen