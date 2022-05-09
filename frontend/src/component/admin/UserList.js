

import React, { Fragment, useEffect } from "react";


import { DataGrid } from "@material-ui/data-grid";


import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";




import { clearErrors, deleteUser, getAllUsers } from "../../actions/userActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";



const UserList = () =>{
    const dispatch = useDispatch();

    
    const {error:deleteError,isDeleted,message}=useSelector((state)=>state.profile);





    const {error,users} = useSelector((state)=>state.allUsers);

    const navigate = useNavigate();

    const deleteUserHandler = (id) => {


        dispatch(deleteUser(id));
      };

      

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

        if(deleteError){
            toast.error(deleteError);
            dispatch(clearErrors());
        }

        if(isDeleted){

            toast.success(message);
            navigate("/admin/users");
            
            dispatch({type:DELETE_USER_RESET})

        }

        dispatch(getAllUsers());
    },[dispatch,error,deleteError,isDeleted,message,navigate]);


    








    const columns = [

        {field:"id",headerName:"User Id",minWidth:280,flex:0.5},

        {
            field:"email",
            headerName:"E-mail",
            minWidth:150,
            flex:1,
        },

        {
            field:"name",
            headerName:"Name",
            minWidth:150,
            flex:0.5, 
        },

        
        {
            field:"role",
            headerName:"User Role",
            minWidth:150,
            flex:0.3, 
            cellClassName: (params) =>{
                return params.getValue(params.id,"role") === "admin"
                ? "greenColor" : "redColor";
            }
        },

        {
            field:"action",
            headerName:"Action",
            minWidth:150,
            type:"number",
            flex:0.5,
            sortable:false,

            renderCell: (params) => {
                return(
                <Fragment>
                    <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                        <EditIcon />
                    </Link>

                    <Button
                        onClick={() =>
                            deleteUserHandler(params.getValue(params.id, "id"))
                        }>
                            <DeleteIcon />
                    </Button>
                </Fragment>
                    

                );

            }

        }

    ];


    const rows = [];

    users && users.forEach((item) => {

        rows.push({
            id:item._id,
            role:item.role,
            email:item.email,
            name:item.name,
        });
        
    });

    return (
        <Fragment>
            <MetaData title={`ALL PRODUCTS - ADMIN`}/>

            <div className="dashboard">
                <SideBar/>

                <div className="productListContainer">
                    <h1 id="productListHeading">ALL USERS</h1>

                    <DataGrid
                       rows={rows}
                       columns={columns}
                       pageSize={10}
                       disableSelectionOnClick
                       className="productListTable"
                       autoHeight
                    />




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

export default UserList;