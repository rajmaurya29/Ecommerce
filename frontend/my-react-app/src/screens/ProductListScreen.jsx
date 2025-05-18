import React, { useEffect } from 'react'
import {Form,Button,Row,Col,Container,Table} from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import { UserList} from '../redux/slices/UserListSlice'
import { UserDelete } from '../redux/slices/userDeleteSlice';
import { GetUser } from '../redux/slices/GetUserSlice';
import { useNavigate } from 'react-router-dom';
import { fetchproducts } from '../redux/slices/ProductSlice';
import { ProductDelete } from '../redux/slices/ProductDeleteSlice';

function ProductListScreen() {
  const productListSelector=useSelector(state=>state.products.data);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(()=>{
    dispatch(fetchproducts())
  },[])
  const deleteHandler=(e)=>{
   
    dispatch(ProductDelete(e)).then(()=>{dispatch(fetchproducts())}
    )

  }
  const editHandler=(e)=>{
    navigate(`${e}/edit`)
    
  }
  return (
    <div>
        <h1>products</h1>
        <Button onClick={()=>navigate("/admin/products/create")}>+create product</Button>
        <Table striped>
          <thead>
            <tr>
              <th>PRODUCT ID</th>
              <th>Name</th>
              <th>price</th>
              <th>category</th>
              <th>brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
                productListSelector.length && productListSelector.map((product,index)=>(
                <tr>
                    <td>{product["_id"]}</td>
                    <td>{product["name"]}</td>
                    <td>${product["price"]}</td>
                    <td>{product["category"]}</td>
                    <td>{product["brand"]}</td>
                    <td><Button onClick={()=>editHandler(product["_id"])}>Edit</Button> <Button onClick={()=>deleteHandler(product["_id"])}>Delete</Button></td>
                </tr>
                ))
            }
          </tbody>
        </Table>
    </div>
  )
}

export default ProductListScreen