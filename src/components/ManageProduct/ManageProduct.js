import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { UserContext } from '../../App';
import Manage from '../Manage/Manage';
import SideBar from '../SideBar/SideBar';

const ManageProduct = () => {
    const[loggedInUser, setLoggedInUser]=useContext(UserContext);
    const[manageProduct, setManageProduct]=useState([]);
    useEffect(()=>{
        fetch('https://lit-peak-38680.herokuapp.com/products')
        .then(res=>res.json())
        .then(data=>setManageProduct(data))
    },[])
    console.log(manageProduct)
    
    return (
            <div className="container">
               
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} className="spinner">
                        {
                            manageProduct.length === 0 && <Spinner animation="border" variant="info" />
                        }
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <SideBar></SideBar>
                        </div>
                        <div className="col-md-9">
                        <h1 style={{color:'salmon',textAlign:'center'}}>Admin</h1>
                        <table className="table mt-5">
                            <thead>
                                <tr>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Weight</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Action</th>
                                </tr>
                             </thead>
                            <tbody>
                                {
                                    manageProduct.map(manage=><Manage manage={manage}></Manage>)
                                }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageProduct;