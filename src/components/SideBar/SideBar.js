import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SideBar.css';
const SideBar = () => {
    return (
        
                    <div className="sideBar">
                    <Link style={{color:'#659DBD',fontWeight:'bold'}} class="navbar-brand" to="/"><h2>Grosery Store</h2></Link>
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <Link style={{fontWeight:'800px',fontSize:'18px'}} class="nav-link active" aria-current="page" to="/manageProduct">Manage Product</Link>
                        </li>
                        <li class="nav-item">
                            <Link style={{fontWeight:'800px',fontSize:'18px'}} class="nav-link" to="/addProduct">Add Product</Link>
                        </li>
                        <li class="nav-item">
                            <Link style={{fontWeight:'800px',fontSize:'18px'}} class="nav-link" to="#">Edit</Link>
                        </li>
                    </ul>
                    </div>
        

    );
};

export default SideBar;



