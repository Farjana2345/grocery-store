import React from 'react';
import './NotMatched.css';
import sad from '../../images/sad.png';
const NotMatched = () => {
    return (
        <div className="NotMatched">
            <h1>Not Matched!!! Please Try again...</h1>
            <img src={sad} alt=""/>
        </div>
    );
};

export default NotMatched;