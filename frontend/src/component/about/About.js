import "./about.css";

import profile from "../../images/saurav_pr.png";

import React from "react";

import MetaData from "../layout/MetaData";



import TextAnim from "./textAnim.js";

import Contact from "./Contact"




const About = () => {


  return (
    <div>
        <MetaData title="BigMoMDaru.com AboutUs"/>

        <div className="c">

            <div className="c-left">

                <div className="c-left-wrapper">

                    <h1 className="c-name">SAURAV SAXENA</h1>
                    <p className="c-para">Hey! I am a <span className="ro">Software Developer</span>. I've worked as a freelancer. 
                    I look forward to hearing from you to see how we might work together.</p>

                    <div className="c-title">

                      <TextAnim/>


                    </div>

                   



                    <div className='contact-me'>
                        <a href="#cont"><button >Contact Me</button></a>
                    </div>


                  

                   


                    

                </div>

            </div>

            <div className="c-right">

                <div className="c-bg">

                    <img src={profile} className="c-img" alt="profile"/>

                </div>

            </div>
        </div>

        <div className="contactt" id="cont">
            
            <Contact/>

        </div>


        

       



            
        

  
    </div>
  );
};

export default About;