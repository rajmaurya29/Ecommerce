import React from 'react'
import { Pagination } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
function Paginate({pages,page,keyword='',isAdmin=false}) {
    const navigate=useNavigate();
    const navigateHandler= (e)=>{
        if(!isAdmin)
        navigate(`/?keyword=${keyword}&page=${e}`)
        else
        navigate(`/admin/products/?keyword=${keyword}&page=${e}`)
    }
  return (
    pages>1 &&(
        <Pagination>
            {
                [...Array(pages).keys()].map((x)=>(
                   
                   
                        <Pagination.Item active={x+1===page} onClick={()=>{navigateHandler(x+1)}}>
                            {x+1}
                        </Pagination.Item>
                    
                ))
            }
        </Pagination>
    )
  )
}

export default Paginate