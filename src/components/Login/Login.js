import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import firebaseConfig from './firebase.Config';
import "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import './Login.css';


const Login = () => {
    const [newUser, setNewUser]=useState(false);
    const[loggedInUser, setLoggedInUser]=useContext(UserContext);
    const[validForm, setValidForm]= useState({
        confirm:'',
        password:'',
        fieldPassword:true,
        validEmailField:true,
        validPasswordField:true
    })
    console.log(validForm);
    const[user,setUser]=useState({
        isSignedIn:false,
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        error:'',
        success:false,
        login:false,
    })
    
    const history = useHistory();
    const location= useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
     }
   
     var provider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn=()=>{
        
        firebase.auth().signInWithPopup(provider)
            .then(res=>{
                const{displayName,email}=res.user;
                const signedInUser={
                    isSignedIn:true,
                    name:displayName,
                    email:email,
                   
                }
                setUser(signedInUser);
                updateUserInfo(user.name);
                setLoggedInUser(signedInUser);
                history.replace(from);
                console.log(displayName,email);
            })
            .catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
            });
        }
       
    //    login form

    const handleOnBlur = (e) =>{
        let isFormValid = true;
        if(e.target.name === 'email'){
            isFormValid = /^\S+@\S+\.\S+$/.test(e.target.value);
            const newFieldValid ={...validForm};
            newFieldValid.validEmailField = isFormValid;
            setValidForm(newFieldValid);
        }
        if(e.target.name === 'password'){
            const isPasswordValid = e.target.value.length > 6;
            const passwordNumber = /\d{1}/.test(e.target.value)
            isFormValid = isPasswordValid && passwordNumber;
            const newFieldValid ={...validForm};
            newFieldValid.password=e.target.value;
            newFieldValid.validPasswordField=isFormValid;
            setValidForm(newFieldValid);
        }
        if(e.target.name === 'confirmPassword'){
            const newFieldValid ={...validForm};
            newFieldValid.confirm=e.target.value;
            newFieldValid.fieldPassword = e.target.value === newFieldValid.password;
            setValidForm(newFieldValid);
            
        }
       
        if(isFormValid){
            const newUserInfo ={...user}
            newUserInfo[e.target.name]=e.target.value;
            setUser(newUserInfo);
        }
       
    }
    const handleFormSubmit = (e)=>{
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
            .then(res=>{
                const newUserInfo = {...user}
                newUserInfo.error = '';
                newUserInfo.success = true;
                newUserInfo.login=true;
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                updateUserInfo(user.name);
                history.replace(from);
            })    
            .catch((error) => {
                const newUserInfo = {...user}
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
            });
        }

        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res=>{
                    const newUserInfo = {...user}
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    newUserInfo.login=true;
                    setLoggedInUser(newUserInfo);
                    updateUserInfo(user.name);
                    setUser(newUserInfo); 
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = {...user}
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
             });
        }

        e.preventDefault();
    }
    const updateUserInfo = name =>{
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
           
          }).then(function() {
              console.log('updated your name')
          }).catch(function(error) {
            console.log(error);
          });
    }
    return (
        <div className="login-background">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 login-area1 mt-5">
                        <div className="login-area">
                            <h1 style={{color:'#3CBCC3'}}>{newUser?'Create an Account' : 'Login'}</h1> 
                            
                            <form className ="loginForm" onSubmit={handleFormSubmit}>
                                {newUser && <input type="text" name ="name" onBlur={handleOnBlur} placeholder=" Your name.."/>}
                                <br/>
                                <input type="text" name="email" onBlur={handleOnBlur} placeholder="Your Email address" required/>
                                {
                                    !validForm.validEmailField && <p>Your Email is not matched</p>
                                }
                                
                                <br/>
                                <input type="password" name="password" onBlur={handleOnBlur} placeholder=" Your password" required/>
                                {
                                    !validForm.validPasswordField && <p>password not Matched</p>
                                }
                                <br/>
                                {newUser && <input type="password" name="confirmPassword" onBlur={handleOnBlur} placeholder=" Confirm Your password" required/>}
                                {
                                    !validForm.fieldPassword && <p>Confirm password not matched</p>
                                }
                                <input className="loginSubmitButton" type="submit" value={newUser ? 'Create an account' : 'Log In'}/>
                            </form>
                            <p style={{fontSize:'20px'}}>{newUser ?'Already have an account ?' : 'Dont have an account ?'} <span style={{color:'blue',fontSize:'15px'}} onClick={()=>setNewUser(!newUser)}>{newUser ?' log in':'Create an Account'}</span></p>
                            <p style={{color:'red'}}>{user.error}</p>
                            {user.success && <p style={{color:'Green'}}>You account {newUser ? 'created' : 'logged in'}  successfully </p> }
                        
                        
                            <button onClick={handleGoogleSignIn}> Google sign in</button>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;