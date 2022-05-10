import React, { Fragment, useEffect } from "react";


import { DataGrid } from "@material-ui/data-grid";

import "./productList.css";

import { Button, Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, deleteOrder, getAllOrders } from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";



const AdminOrders = () =>{
    const dispatch = useDispatch();

    const { error, orders } = useSelector(
        (state) => state.allOrders
    );
    


    const {error:deleteError,isDeleted}=useSelector((state)=>state.order);

    const navigate = useNavigate();

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
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
          toast.success("One Order Deleted SuccessFully!");
          navigate("/admin/orders");
          dispatch({type:DELETE_ORDER_RESET})

            

        }

        dispatch(getAllOrders());
    },[dispatch,error,deleteError,isDeleted]);


    








    const columns = [
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
            field:"action",
            headerName:"Action",
            minWidth:350,
            type:"number",
            flex:0.5,
            sortable:false,

            renderCell: (params) => {
                return(
                <Fragment>
                    <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                        <EditIcon />
                    </Link>

                    <Button
                        onClick={() =>
                            deleteOrderHandler(params.getValue(params.id, "id"))
                        }>
                            <DeleteIcon />
                    </Button>
                </Fragment>
                    

                );

            }

        }

    ];


    const rows = [];

    orders && orders.forEach((item) => {

      rows.push({
          id:item._id,
          itemQty:item.orderItems.length,
          amount:`₹${item.totalPrice}`,
          status:item.orderStatus,
          
      });
      
  });

    return (
        <Fragment>
            <MetaData title={`ALL ORDERS - ADMIN`}/>

            <div className="dashboard">
                <SideBar/>

                <div className="productListContainer">
                    <h1 id="productListHeading">ALL ORDERS</h1>

                    <div className="myOrdersPage">

                    <DataGrid
                       rows={rows}
                       columns={columns}
                       pageSize={10}
                       disableSelectionOnClick
                       className="myOrdersTable"
                       autoHeight
                    />
                    
                    <Typography id="myOrdersHeading">Admin's Orders</Typography>


                    </div>

                    




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

export default AdminOrders