import React , {Fragment,useEffect, useState} from "react";

import { useSelector } from "react-redux";

import Loader from "../loader/loader";

import { Link, useNavigate } from "react-router-dom";

import MetaData from "../layout/MetaData";

import "./Profile.css";

const Profile = () =>{

  


    const { user, loading:loadingg, isAuthenticated } = useSelector((state)=>state.user);

    const [loading, setLoading]=useState(false);

    let navigate = useNavigate();

    

    

    useEffect(()=>{

        if(isAuthenticated === false){

            navigate("/login");

        }else{
          setLoading(loadingg);
        }

    },[isAuthenticated,navigate,loadingg]);

    




    return(
        <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>

            
            <MetaData title={`${user.User && user.User.name}'s Profile`} />
            <div className="profileContainer">
              <div>
                <h1>My Profile</h1>
                <img src={user.User && user.User.avatar.url} alt={user.name} />
                <Link to="/me/update">Edit Profile</Link>
              </div>
              <div>
                <div>
                  <h4>Full Name</h4>
                  <p>{user.User && user.User.name}</p>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>{user.User && user.User.email}</p>
                </div>
                <div>
                  <h4>Joined On</h4>
                  <p>{String(user.User && user.User.createdAt).substr(0, 10)}</p>
                </div>
  
                <div>
                  <Link to="/orders">My Orders</Link>
                  <Link to="/password/update">Change Password</Link>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    )

    }  ;

    export default Profile;