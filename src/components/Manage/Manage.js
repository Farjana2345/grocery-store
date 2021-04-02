import React from 'react';
const Manage = ({manage}) => {
    const handleProductDelete = (id,e) =>{
        fetch(`https://lit-peak-38680.herokuapp.com/deleteItem/${id}`,{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(result=>{
            if(result){
                e.target.parentNode.parentNode.remove()
            }
         })
       
     }
    
    return (
        
            <tr>
               
                <td>{manage.name}</td>
                <td>{manage.Weight}</td>
                <td>{manage.price}Tk</td>
                <td><button onClick={(e)=>handleProductDelete(manage._id,e)}>Delete</button></td>       
            </tr>   
       
       
            
    );
};

export default Manage;