import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css';
import AdminPanel from './components/AdminPanel/AdminPanel';
import Orders from './components/Orders/Orders';
import NotMatched from './components/NotMatched/NotMatched';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import SingleProduct from './components/SingleProduct/SingleProduct';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ManageProduct from './components/ManageProduct/ManageProduct';

export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser]=useState({});
  return (
    <UserContext.Provider value ={[loggedInUser, setLoggedInUser]}>
    <Router>
  <Switch>
        <Route path="/home">
          <Navbar></Navbar>
          <Home></Home>
        </Route>
        <Route path="/manageProduct">
          <ManageProduct></ManageProduct>
        </Route>
        <Route path="/login">
          <Navbar></Navbar>
          <Login></Login>
        </Route>
        <PrivateRoute path="/admin">
          <AdminPanel></AdminPanel>
        </PrivateRoute>
        <Route path="/addProduct">
          <AdminPanel></AdminPanel>
        </Route>
        <PrivateRoute path="/singleProduct/:_id">
        <Navbar></Navbar>
         <SingleProduct></SingleProduct>
        </PrivateRoute>
        <PrivateRoute path="/orders">
        <Navbar></Navbar>
         <Orders></Orders>
        </PrivateRoute>
        <Route exact path="/">
          <Navbar></Navbar>
          <Home></Home>
        </Route>
        <Route path="*">
        <Navbar></Navbar>
        <NotMatched></NotMatched>
        </Route>
      </Switch>
  </Router>
  </UserContext.Provider>
  );
}

export default App;
