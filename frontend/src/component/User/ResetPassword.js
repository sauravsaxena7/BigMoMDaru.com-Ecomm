
import React, { Fragment, useState,useEffect } from "react";
import "./ResetPassword.css";

import Loader from "../loader/loader";



import { clearErrors, resetPassword} from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";


import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";


import { useParams } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = ()=>{

    const dispatch = useDispatch();


    let navigate = useNavigate();

    const { token } = useParams();




    const {error,success,loading} = useSelector((state)=>state.forgotPasswordR);


    
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");




    
    const resetPasswordSubmit = (e) =>{


        e.preventDefault();
        const myForm = new FormData();
  
      
      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);


  
  
      dispatch(resetPassword(token,myForm));
  
  
      };


     
      useEffect(()=>{

        
  
        if(error){
          toast.error(error);
          dispatch(clearErrors);
        }
  
        if(success){
            toast.success("Password Updated Successfully!");
           
          navigate("/login");

          
        }
  
      },[dispatch,error,success,navigate]);


      return (
        <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Reset Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Rest Password</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
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

export default ResetPassword;