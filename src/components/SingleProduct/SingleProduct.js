import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';



const SingleProduct = () => {
    const{_id}=useParams();
    const[product,setProduct]=useState({});
    const[loggedInUser, setLoggedInUser]=useContext(UserContext);
    useEffect(()=>{
        fetch(`https://lit-peak-38680.herokuapp.com/product/${_id}`)
        .then(res=>res.json())
        .then(data=>setProduct(...data))
    },[_id])
   const{name,price,imageUrl}=product;
   const handleOrder = ()=>{
       const orderInfo={...loggedInUser,date:new Date(),name,price,imageUrl};
       const url = `https://lit-peak-38680.herokuapp.com/orderProduct`;
       fetch(url,{
        method:'POST',
            headers:{
                    'Content-Type':'application/json'
                },
             body:JSON.stringify(orderInfo)
            })
               .then(res=>{
                    if(res){
                   alert('successfully');
                  }
                 });
   }
    return (
        <div className="container mt-5"> 
          <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{product.name}</td>
                    
                    <td>1</td>
                    <td>{product.price}Tk</td>
                    </tr>
                    
                    <tr>
                    <td colSpan="2">Total</td>
                    <td>{product.price}Tk</td>
                    </tr>
                </tbody>
            </Table> 
           {/* <CheckOut></CheckOut> */}
           <button onClick={handleOrder}>CheckOut</button>  

        </div>
    );
};

export default SingleProduct;