import React, { useEffect } from 'react'
import {Form,Button,Row,Col,Container,Table} from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import { UserList} from '../redux/slices/UserListSlice'
import { UserDelete } from '../redux/slices/userDeleteSlice';
import { GetUser } from '../redux/slices/GetUserSlice';
import { useNavigate } from 'react-router-dom';

function UserListScreen() {
  const userListSelector=useSelector(state=>state.userList.userList);
  const dispatch=useDispatch();
  const navigate=useNavigate();
 const modeSelector = useSelector(state => state.darkMode.Mode);
  useEffect(()=>{
    dispatch(UserList());
  },[])
  const deleteHandler=(e)=>{
    // console.log(e)
    dispatch(UserDelete(e)).then(()=>{dispatch(UserList())}
    )

  }
  const editHandler=(e)=>{
    navigate(`${e}/edit`)
    
  }
  return (
    <div>
        <h1 className={modeSelector ? 'text-white' : ''}>users</h1>
        <Table striped bordered hover variant={modeSelector ? 'dark' : 'light'}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
                userListSelector.length && userListSelector.map((user,index)=>(
                <tr key={index}>
                    <td>{user["_id"]}</td>
                    <td>{user["name"]}</td>
                    <td>{user["email"]}</td>
                    {user["isAdmin"]?<td>✔️</td>:<td>❌</td>}
                    <td><Button onClick={()=>editHandler(user["_id"])}>Edit</Button> <Button onClick={()=>deleteHandler(user["_id"])}>Delete</Button></td>
                </tr>
                ))
            }
          </tbody>
        </Table>
    </div>
  )
}

export default UserListScreen