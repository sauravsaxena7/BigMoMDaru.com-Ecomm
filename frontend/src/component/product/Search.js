
import React, { Fragment, useState } from "react";
import MetaData from "../layout/MetaData";

import "./Search.css"

import { useNavigate } from "react-router-dom";



const Search=({ history })=>{

    localStorage.setItem("refresh",false);

    const [keyword,setKeyword] = useState("");

    let navigate = useNavigate();

    const searchSubmitHandler = (e) => {

        e.preventDefault();

        if(keyword.trim()){ 
            navigate(`/products/${keyword}`);
            
        } else {
            navigate("/products")
        }

    };



    return(

        <Fragment>

<MetaData title="BigMoMDaru.com SEARCH"/>
            <form className="searchBox" onSubmit={searchSubmitHandler}>

                <input type="text" 
                placeholder="Search A Product...." 
                onChange={(e)=>setKeyword(e.target.value)}

                
                />

                <input type="submit" value="search" />

            </form>
        </Fragment>

    )
}

export default Search;