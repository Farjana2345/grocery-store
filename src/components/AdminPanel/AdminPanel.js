import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import './AdminPanel.css';
const AdminPanel = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const[imageUrl, setImageUrl]=useState(null);
    const onSubmit = data => {
        const productData ={
            name : data.name,
            imageUrl : imageUrl,
            price : data.price,
            Weight : data.weight
           
        };
        const url = 'https://lit-peak-38680.herokuapp.com/addProducts';
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(productData)
        })
        .then(res=>console.log('server site response', res));
    };

    const handleImage = event =>{
        console.log(event.target.files)
        const imageData = new FormData();
        imageData.set('key', '48cdb70d449cb4acbd4362f065b671cc');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImageUrl(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <SideBar></SideBar>
                </div>
                <div className="col-md-9">
                <h1 className="admins">Admin</h1>
                    <div className="form-area">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="row">
                                
                                <div class="col-md-6">
                                    <label for="name">Product Name:</label>
                                    <input class="form-control " name="name"  ref={register} placeholder="Product name"/>
                                    <label for="weight">Weight:</label>
                                    <input name="weight"  class="form-control" ref={register} placeholder="weight"/>
                                </div>
                                <div class="col-md-6">
                                    <label for="price">Price:</label>
                                    <input class="form-control" name="price" placeholder="price" ref={register}/>
                                    <label for="file">Add Photo : </label>
                                    <input style={{backgroundColor:'white',border:'none'}} type="file"  onChange={handleImage} name="exampleRequired"/>
                                </div>
                                    
                            </div>
                            
                            <input style={{width:'150px',padding:'7px 0',marginTop:'5px',backgroundColor:'#3aafa9',color:'white'}} type="submit" value="save"/>
                            
                        </form>
                    </div>    
                </div>
            </div>      
        </div>
    
    );
};

export default AdminPanel;