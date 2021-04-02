import React from 'react';

const ProductOrder = (props) => {
    const{name,email,price,date}=props.order;
    return (
        <tr>
               
                <td>{email}</td>
                <td>{name}</td>
                <td>{price}Tk</td>
                <td>{date}</td>
            </tr>
    );
};

export default ProductOrder;