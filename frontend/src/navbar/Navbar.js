import React, { useState, useEffect   } from "react";
import "./navbar.css";
import {AiOutlineShoppingCart} from "react-icons/ai";


import {RiLoginCircleFill} from "react-icons/ri"

import { GiHamburgerMenu } from "react-icons/gi";

import { NavLink } from "react-router-dom";

import { useSelector } from 'react-redux';

import Store from '../Store';

import { loadUser } from '../actions/userActions';

import LogoCom from "../component/carsouel/logoCom"


const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);

  const { isAuthenticated}  = useSelector(state=>state.user);



  useEffect(()=>{
    

    Store.dispatch(loadUser());

},[])


  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">

          
          <NavLink to="/"><h1><LogoCom/></h1></NavLink>
          
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li >
              <NavLink style={{ color: "tomato" }} to="/" onClick={() => setShowMediaIcons(!showMediaIcons)}>Home</NavLink>
            </li>
            <li>
              <NavLink style={{ color: "tomato" }} to="/products" onClick={() => setShowMediaIcons(!showMediaIcons)}>Products</NavLink>
            </li>
            <li>
            <NavLink style={{ color: "tomato" }} to="/search" onClick={() => setShowMediaIcons(!showMediaIcons)}>Search</NavLink>
            </li>
           

            <li>
            <NavLink style={{ color: "tomato" }} to="/about" onClick={() => setShowMediaIcons(!showMediaIcons)}>AboutUs</NavLink>

            </li>

            <li className="noo">
              
              {isAuthenticated ? (<div></div>):(<NavLink to="/login" onClick={() => setShowMediaIcons(!showMediaIcons)}>Login</NavLink>)}
               
              </li>


            <li className="noo close" onClick={() => setShowMediaIcons(!showMediaIcons)}>
            CloseMe

            </li>

            

           


          </ul>
        </div>

        {/* 3rd social media links */}
        <div className="social-media">
          <ul className="social-media-desktop">
            <li>
              
                <NavLink to="/cart"><AiOutlineShoppingCart className="facebook" /></NavLink>
             
            </li>
            <li>

            {isAuthenticated ? (<div></div>):(<NavLink to="/login"><RiLoginCircleFill className="instagram" /></NavLink>)}
            
              
            </li>

            
            
          </ul>

          {/* hamburget menu start  */}
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </a>
          </div>
        </div>
      </nav>

      {/* hero section  */}
      {/* <section className="hero-section">
        <p>Welcome to </p>
        <h1>Thapa Technical</h1>
      </section> */}
    </>
  );
};

export default Navbar;