

import React, { Fragment, useEffect } from "react";


import { DataGrid } from "@material-ui/data-grid";

import "./productList.css";

import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, deleteProduct, getAdminProducts } from "../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";



const ProductList = () =>{
    const dispatch = useDispatch();

    const { error, products } = useSelector(
        (state) => state.products
    );

    const {error:deleteError,isDeleted}=useSelector((state)=>state.product);

    const navigate = useNavigate();

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
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
            
            navigate("/admin/dashboard");
            toast.success("One Product Deleted SuccessFully!");
            dispatch({type:DELETE_PRODUCT_RESET})

        }

        dispatch(getAdminProducts());
    },[dispatch,error,deleteError,isDeleted]);


    








    const columns = [

        {field:"id",headerName:"Product Id",minWidth:200,flex:0.5},

        {
            field:"name",
            headerName:"Name",
            minWidth:350,
            flex:1,
        },

        {
            field:"stock",
            headerName:"Stock",
            minWidth:350,
            type:"number",
            flex:0.3, 
        },

        
        {
            field:"price",
            headerName:"Price",
            minWidth:350,
            type:"number",
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
                    <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                        <EditIcon />
                    </Link>

                    <Button
                        onClick={() =>
                            deleteProductHandler(params.getValue(params.id, "id"))
                        }>
                            <DeleteIcon />
                    </Button>
                </Fragment>
                    

                );

            }

        }

    ];


    const rows = [];

    products && products.forEach((item) => {

        rows.push({
            id:item._id,
            stock:item.stock,
            price:item.price,
            name:item.name,
        });
        
    });

    return (
        <Fragment>
            <MetaData title={`ALL PRODUCTS - ADMIN`}/>

            <div className="dashboard">
                <SideBar/>

                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList;