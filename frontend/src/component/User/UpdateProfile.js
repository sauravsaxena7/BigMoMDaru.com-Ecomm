import React, { Fragment, useState,useEffect } from "react";
import "./UpdateProfile.css";

import Loader from "../loader/loader";


import MailOutlineIcon from "@material-ui/icons/MailOutline";

import FaceIcon from "@material-ui/icons/Face";
import { clearErrors, loadUser, updateProfile} from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";



import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () =>{

    const dispatch = useDispatch();


    let navigate = useNavigate();



    const {user} = useSelector((state) => state.user);

    const {error,isUpdated,loading} = useSelector((state)=>state.profile);


    const [name,setName] = useState();
    const [email,setEmail] = useState();



    const [avatar,setAvatar] = useState("/Profile.png");

    const [avatarPreview,setAvatarPreview]=useState("/Profile.png")




    
    const updateProfileSubmit = (e) =>{


        e.preventDefault();
        const myForm = new FormData();
  
      myForm.append("name", name);
      myForm.append("email", email);
      myForm.append("avatar", avatar);
      

  
  
      dispatch(updateProfile(myForm));
  
  
      };


      const updateProfileDataChange = (e) =>{
  
          const reader = new FileReader();
  
          reader.onload = () =>{
            //0 =initial
            //1=processing
            //2=done
            if(reader.readyState === 2){
  
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
  
            }
          }
  
          reader.readAsDataURL(e.target.files[0]);
  
        
      }
  
  
      useEffect(()=>{

        if(user){
            setName(user.User.name);
            setEmail(user.User.email);
            setAvatarPreview(user.User.avatar.url);

        }
  
        if(error){
          toast.error(error);
          dispatch(clearErrors);
        }
  
        if(isUpdated){
            //toast.success("Profile Update Successfully!");
            
            dispatch(loadUser());
            
            navigate("/account");
            

          dispatch({type:UPDATE_PROFILE_RESET})
        }
  
      },[dispatch,error,isUpdated,user,navigate]);


      
      return (
        <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title="Update Profile" />
            <div className="updateProfileContainer">
              <div className="updateProfileBox">
                <h2 className="updateProfileHeading">Update Profile</h2>
  
                <form
                  className="updateProfileForm"
                  encType="multipart/form-data"
                  onSubmit={updateProfileSubmit}
                >
                  <div className="updateProfileName">
                    <FaceIcon />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="updateProfileEmail">
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
  
                  <div id="updateProfileImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={updateProfileDataChange}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Update"
                    className="updateProfileBtn"
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


export default UpdateProfile;