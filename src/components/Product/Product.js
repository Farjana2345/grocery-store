import React from 'react';
import { Link } from 'react-router-dom';
import './Products.css';
const Product = (props) => {
    const{name,price,Weight,_id,imageUrl}=props.product;
    return (
        <div className="col-md-4">
            <div className="products-area">
            <div className="products">
                <img src={imageUrl} width="330px" height="260px" alt=""/>
                <h5>{name}-{Weight}Kg</h5>
                <p>Price : {price}Tk</p>
            </div>
            <div className="price-area">
                    
            <Link to={`/singleProduct/${_id}`}> <button >Buy Now</button></Link>
               
            </div>
            </div>
        </div>
    );
};

export default Product;