import React, { Fragment, useState } from "react";
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ListAltIcon from "@material-ui/icons/ListAlt";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { useNavigate } from "react-router-dom";


import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import "./Header.css"
import { logout } from "../../../actions/userActions";

import { useDispatch, useSelector} from "react-redux";

import Backdrop from "@material-ui/core/Backdrop";




const UserOptions = ( {user} ) =>{

    const [open,setOpen] = useState(false);

    const {cartItems} = useSelector((state)=>state.cart);


    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
            icon: (
              <ShoppingCartIcon
                style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
              />
            ),
            name: `Cart(${cartItems.length})`,
            func: cart,
          },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];

    if(user.User.role === "admin"){
        options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard })

    }

    
    const dispatch = useDispatch();

   

    let navigate = useNavigate();

    function dashboard(){

        navigate("/admin/dashboard");

    }

    function orders(){
        navigate("/orders");
    }

    function logoutUser() {
        dispatch(logout());
        navigate("/products");
        toast.success("Logout Successfully");
      }

    function account(){
        navigate("/account");
    }

    function cart() {
       navigate("/cart");
      }


    return (

        <Fragment>

         <Backdrop open={open} style={{ zIndex: "10" }} />

           <SpeedDial 
           className="speedDial"

           ariaLabel="SpeedDial tooltip example"
           onClose={()=>setOpen(false)}
           onOpen={()=>setOpen(true)}
           open={open}
           direction="down"
           icon={
               <img 
               className="speedDialIcon"
               src={user.User.avatar.url ? user.User.avatar.url : "/Profile.png"}
               alt="Profile"/>
           }
           >

               {options.map((item)=>(
                   <SpeedDialAction 
                   key={item.name}
                   icon={item.icon} 
                   tooltipTitle={item.name} 
                   onClick={item.func}
                   tooltipOpen={window.innerWidth<=600?true:false}
                   
                   />
               ))}

           </SpeedDial>


           <ToastContainer
            position="bottom-center"
            theme="dark"
            draggable={false}
            />


        </Fragment>

    )
};

export default UserOptions;