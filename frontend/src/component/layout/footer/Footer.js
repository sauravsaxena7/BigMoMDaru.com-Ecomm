import React from "react";



import "./Footer.css"

import LogoCom from "../../carsouel/logoCom"


const Footer = () =>{
    return (

        <footer id="footer">
            

            <div className="midFooter">

                <h1 className="rx"><LogoCom/></h1>

                
                <p>High Quality Is Our First Priority</p>

                <p>Copyrights 2021 &copy; orginonature</p>


            </div>

            <div className="rightFooter">

                <h1>Follow Us</h1>
                <a href="https://www.instagram.com/orginonature/">Instagram</a>

                <a href="https://www.facebook.com/profile.php?id=100007532081967">Facebook</a>

                <a href="https://www.instagram.com/orginonature/">orginonature</a>

            </div>

            
        </footer>

    );

};


export default Footer;