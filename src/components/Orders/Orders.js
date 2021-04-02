import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { UserContext } from '../../App';
import ProductOrder from '../ProductOrder/ProductOrder';
const Orders = () => {
    const[order,setorder]=useState([]);
    const[loggedInUser, setLoggedInUser]=useContext(UserContext);
    useEffect(()=>{
        fetch('https://lit-peak-38680.herokuapp.com/order?email='+loggedInUser.email)
        .then(res=>res.json())
        .then(data=>setorder(data))
    },[])
    console.log(order)
    return (
        <div className="container">
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} className="spinner">
                {
                    order.length === 0 && <Spinner animation="border" variant="info" />
                }
            </div>
                        <table className="table mt-5">
                            <thead>
                                <tr>
                                    <th scope="col">Email</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Date</th>
                                </tr>
                             </thead>
                            <tbody>
                                {
                                    order.map(orders=><ProductOrder order={orders}></ProductOrder>)
                                }
                        </tbody>
                    </table>


        </div>
    );
};

export default Orders;