import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Product from '../Product/Product';

const Home = () => {
    const[products, setProducts] = useState([]);

    useEffect(()=>{
        fetch('https://lit-peak-38680.herokuapp.com/products')
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[])
    console.log(products) 
    return (
        <div className="container">
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} className="spinner">
                {
                    products.length === 0 && <Spinner animation="border" variant="info" />
                }
            </div>    
            <div className="row">
            {
                products.map(product=><Product product={product}></Product>)
            }
        </div>
        </div>
    );
};

export default Home;