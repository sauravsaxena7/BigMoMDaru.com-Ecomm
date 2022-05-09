

import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./dashboard.css";

import SideBar from "./SideBar.js"

import { Line,Doughnut } from "react-chartjs-2";

import { Chart as ChartJS } from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userActions";

import MetaData from "../layout/MetaData";




  



  


const DashBoard= ()=>{


    let outOfStock =0;
    const dispatch = useDispatch();

    const { error, products } = useSelector(
        (state) => state.products
    );

    const { orders } = useSelector(
        (state) => state.allOrders
    );

    const {users} = useSelector((state)=>state.allUsers);



    

    products && products.forEach((item) => {

        if(item.stock === 0){
            outOfStock=outOfStock+ 1;
        }
        
    });

    useEffect(()=>{
        
        dispatch(getAdminProducts());
        dispatch(getAllOrders());
        dispatch(getAllUsers());

    },[dispatch]);

    let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });





    const lineState = {
        labels:["Initial Amount","Amount Earned"],
        datasets:[
            {
                label:"TOTAL AMOUNT",
                backgroundColor:['tomato'],
                hoverBackgroundColor:['rgb(197,72,49'],
                data:[0,totalAmount],
            },
        ],
    }

    const doughnutState={
        labels:["Out Of Stock","InStock"],
        datasets:[
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, products.length-outOfStock],
            },
        ]
    }

    return(
        <div className="dashboard">
            <MetaData title="BigMoMDaru.com DASHBOARD"/>
            <SideBar/>
            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> ₹{totalAmount}
                        </p>
                    </div>

                    <div className="dashboardSummaryBox2">

                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products && products.length}</p>

                        </Link>

                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>

                    </div>

                </div>


                <div className="lineChart">
                    <Line data={lineState} />
                </div>

                <div className="doughnutChart">
                    <Doughnut data={doughnutState}/>

                </div>



            </div>
        </div>
    )

}

export default DashBoard;