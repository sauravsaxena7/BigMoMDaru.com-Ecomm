import React, { Fragment, useState,useEffect } from "react";
import "./UpdatePassword.css";

import Loader from "../loader/loader";



import { clearErrors, updatePassword} from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";


import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";

import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const UpdatePassword = () =>{

    const dispatch = useDispatch();


    let navigate = useNavigate();




    const {error,isUpdated,loading} = useSelector((state)=>state.profile);


    const [oldpassword,setoldpassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");




    
    const updatePasswordSubmit = (e) =>{


        e.preventDefault();
        const myForm = new FormData();
  
      myForm.set("oldpassword", oldpassword);
      myForm.set("newPassword", newPassword);
      myForm.set("confirmPassword", confirmPassword);


  
  
      dispatch(updatePassword(myForm));
  
  
      };


     
      useEffect(()=>{

        
  
        if(error){
          toast.error(error);
          dispatch(clearErrors);
        }
  
        if(isUpdated){
            toast.success("Password Update Successfully!");
           
          navigate("/account");

          dispatch({type:UPDATE_PASSWORD_RESET})
        }
  
      },[dispatch,error,isUpdated,navigate]);


      return (
        <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title="Change Password" />
            <div className="updatePasswordContainer">
              <div className="updatePasswordBox">
                <h2 className="updatePasswordHeading">Update Profile </h2>
  
                <form
                  className="updatePasswordForm"
                  onSubmit={updatePasswordSubmit}
                >
                  <div className="loginPassword">
                    <VpnKeyIcon />
                    <input
                      type="password"
                      placeholder="Old Password"
                      required
                      value={oldpassword}
                      onChange={(e) => setoldpassword(e.target.value)}
                    />
                  </div>
  
                  <div className="loginPassword">
                    <LockOpenIcon />
                    <input
                      type="password"
                      placeholder="New Password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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
                    value="Change"
                    className="updatePasswordBtn"
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

export default UpdatePassword;
