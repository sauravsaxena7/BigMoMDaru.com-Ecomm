import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../loader/loader";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const MyOrders = () =>{

    const dispatch = useDispatch();


    const {loading,error,orders}= useSelector((state)=>state.myOrders);

    const {user} = useSelector((state)=>state.user);



    const columns=[
        {field:"id",headerName:"Order ID",minWidth:300,flex:1},
        {
            field:"status",
            headerName:"Status",
            minWidth:300,
            flex:0.5,
            cellClassName:(params) =>{
              return params.getValue(params.id,"status") === "Delivered"
              ?"greenColor":"redColor"

            },
        },
        {
            field:"itemQty",
            headerName:"Items Quantity",
            type:"number",
            minWidth:300,
            flex:0.3,
        },
        {
            field:"amount",
            headerName:"Amount",
            type:"number",
            minWidth:300,
            flex:0.5,
        },
        {
          field:"actions",
          flex:0.3,
          headerName:"Actions",
          type:"number",
          sortable:false,
          renderCell:(params)=>{
            return(
              <Link to={`/order/${params.getValue(params.id,"id")}`}>

                    <LaunchIcon/>

              </Link>
              
            );
          },
          
        },


    ];


    const rows=[];


    

    orders && orders.forEach((item)=>{
      rows.push({
        itemQty:item.orderItems.length,
        id:item._id,
        status:item.orderStatus,
        amount:`₹${item.totalPrice}`,
    });

    });

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

        dispatch(myOrders());
        


    },[dispatch,error])

    return (
      <Fragment>
        <MetaData title={`${user.User.name} - Orders`} />
  
        {loading ? (
          <Loader />
        ) : (
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />
  
            <Typography id="myOrdersHeading">{user.User.name}'s Orders</Typography>
          </div>
        )}

           <ToastContainer
            position="bottom-center"
            theme="dark"
            draggable={false}
            />

      </Fragment>
    );

}

export default MyOrders;
