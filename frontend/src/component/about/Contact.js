import React, { useRef } from 'react'

import "./contact.css"

import MailOutlineIcon from "@material-ui/icons/MailOutline";

import PersonIcon from "@material-ui/icons/Person";


import { Button} from "@material-ui/core";

import {FiPhoneCall} from "react-icons/fi";

import {BsInstagram,BsGithub} from "react-icons/bs"

import {GrFacebook} from "react-icons/gr"

import {FaLinkedin} from "react-icons/fa"

import {RiMessage2Line} from "react-icons/ri"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
import {MdSubject} from "react-icons/md";

import emailjs from "emailjs-com";

 



const Contact = () => {

  localStorage.setItem("refresh",false);


  const formRef = useRef();

  

  let updateLoading=false;

  const SubmitHandler = (e) =>{
    e.preventDefault();
    updateLoading=true;

    emailjs
      .sendForm(
        "service_2b90bq5",
        "template_85rfyum",
        formRef.current,
        "0nL3oMKXrtmdgPK1I"
      )
      .then(
        (result) => {

          const msg=result.text+" "+"done! I will reach you soon";

          toast.success(msg);
          updateLoading=false;
          
        },
        (error) => {

          toast.error(error.text);
          updateLoading=false;
          
        }
      );
  }




  return (
    <div className='contact'>

        <div className='left'>

          <div className='left-wrapper'>
            
            <div className='title'><p>Now it's time to discuss about your Question And Opinions.</p></div>
            <div className='call-me'><p>{<FiPhoneCall className='p-color'/>} 8271113231</p></div>

            <div className='icons-wrapper'><a href="https://www.linkedin.com/in/saurav-saxena-8059541b9/">{<FaLinkedin className='link'/>}</a>

            <a href='https://www.instagram.com/saurav.saxena_/'>{<BsInstagram className='insta'/>} </a>

            <a href='https://m.facebook.com/profile.php?id=100007532081967'>{<GrFacebook className='face'/>} </a>


            <a href='https://github.com/sauravsuman7'>{<BsGithub className='git'/>}</a>
            
            </div>

            <div className='get'><p>Get in touch, Always available for <span className='getspan' >Freelancing</span> If the right work comes along me.</p></div>

          </div>

          

        </div>

        <div className='right'>

        <form
            className="createProductForm cpr"
            onSubmit={SubmitHandler}
            ref={formRef}
          >
            <h1 className='con'>Contact Me</h1>

            <div>
              <PersonIcon />
              <input
                type="text"
                placeholder="Name"
                name='user_name'
                required
               
              />
            </div>
            <div>
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                name='user_email'
                required
               
              />
            </div>

            <div>
              <MdSubject />
              <input
                type="text"
                placeholder="Subject"
                required
                name='user_subject'
                
              />
            </div>

            <div>
            <RiMessage2Line/>

            <textarea
              placeholder="Message"
              
              cols="2"
              rows="3"
              name='message'
            ></textarea>
          </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                updateLoading ? true : false ? true : false
              }
            >
              Submit
            </Button>
          </form>

        </div>

        <ToastContainer
            position="bottom-center"
            theme="dark"
            draggable={false}
            />

    </div>
  )
}

export default Contact