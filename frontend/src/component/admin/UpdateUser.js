import React, { Fragment, useEffect, useState } from 'react'




import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

import SideBar from "./SideBar";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import { clearErrors, getUserDetails, updateUser } from '../../actions/userActions';

import MailOutlineIcon from "@material-ui/icons/MailOutline";

import PersonIcon from "@material-ui/icons/Person";

import Loader from '../loader/loader';

const UpdateUser = () => {

    const dispatch = useDispatch();

    const {loading,error,user} = useSelector((state)=>state.userDetails);

    const {loading:updateLoading,error:updateError,isUpdated} = useSelector((state)=>state.profile);

    const navigate = useNavigate();

    const {id} = useParams();


    const [name,setName] = useState("");
    
    const [email,setEmail] = useState("");

    const [role,setRole]=useState("");


    

    


    useEffect(()=>{

        if(user && user._id !== id){
            dispatch(getUserDetails(id));
        }else{

            setEmail(user.email)
            setName(user.name);
            setRole(user.role);

        }

        if(error){
            toast.error(error);

            dispatch(clearErrors());
        }

        if(updateError){
            toast.error(updateError);

            dispatch(clearErrors());
        }

        if(isUpdated){
            toast.success("User Updated Successfully");
            navigate("/admin/users");
            dispatch({type:UPDATE_USER_RESET});
            
        }

    },[dispatch,error,navigate,isUpdated,id,updateError,user]);


    const updateUserSubmitHandler = (e) =>{

        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("role",role);
        myForm.set("email",email);
        

       

        dispatch(updateUser(id,myForm));




    };

    





  return (
    <Fragment>
    <MetaData title="Update User" />
    <div className="dashboard">
      <SideBar />
      <div className="newProductContainer">
        {loading ? (
          <Loader />
        ) : (
          <form
            className="createProductForm"
            onSubmit={updateUserSubmitHandler}
          >
            <h1>Update User</h1>

            <div>
              <PersonIcon />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <VerifiedUserIcon />
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                updateLoading ? true : false || role === "" ? true : false
              }
            >
              Update
            </Button>
          </form>
        )}
      </div>
    </div>


    <ToastContainer
            position="bottom-center"
            theme="dark"
            draggable={false}
            />
  </Fragment>


    

  )
}


export default UpdateUser;