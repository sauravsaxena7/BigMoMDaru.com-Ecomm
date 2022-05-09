
import React, { Fragment, useState,useEffect } from "react";
import "./ForgotPassword.css";

import Loader from "../loader/loader";



import { clearErrors, forgotPassword} from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";



import MetaData from "../layout/MetaData";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ForgotPassword = () =>{

    const dispatch = useDispatch();

    
    const {error,message,loading} = useSelector((state)=>state.forgotPasswordR);


    const [email,setEmail] = useState("");

    
    const forgotPasswordSubmit = (e) =>{


        e.preventDefault();
        const myForm = new FormData();
  
     
      myForm.append("email", email);
     

  
  
      dispatch(forgotPassword(myForm));
  
  
      };


      useEffect(()=>{

        
  
        if(error){
          toast.error(error);
          dispatch(clearErrors);
        }
  
        if(message){
            toast.success(message);
        }
  
      },[dispatch,error,message]);



    return(
        <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}

<ToastContainer
            position="bottom-center"
            theme="dark"
            draggable={false}
            />
    </Fragment>
    )

};

export default ForgotPassword;