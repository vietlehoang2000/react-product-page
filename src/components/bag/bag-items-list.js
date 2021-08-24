import { useEffect, useState } from "react"

import {UseLocalStorageData} from '../LocalStorageContext'

import Spinner from "react-bootstrap/Spinner";

import BagItems from "./bag-item";

import Receipt from "./receipt";

import { Counter } from "../counter/Counter";
import './css/bag.css'
import { Button } from "bootstrap";

import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

const url = "https://product-list-fake-rest-server.herokuapp.com";

export default function BagItemsList({
    setproductNavStatus,
    setproductNavContent,
  }){
    

    const [refSpinnerLoading, setRefSpinnerLoading] = useState(true);

    const [localStorageData,setLocalStorageData] = useState(UseLocalStorageData());

    console.log(localStorageData.length)
    useEffect(()=>{
      setproductNavStatus("light");
      setproductNavContent('Bag')
      setRefSpinnerLoading(false);
    })


    function removeItemFromBag(item){
      let removeIndex='';
      let refLocalStorageData=[...localStorageData]
      localStorageData.map((product,index)=>{
        if(product.id===item.id&&product.category===item.category)
          removeIndex = index;
      })
      if(removeIndex!==''){
        refLocalStorageData.splice(removeIndex,1)
      }
      setLocalStorageData(refLocalStorageData)
      localStorage.setItem("data", JSON.stringify(refLocalStorageData));
      
    }
  
    
    return(
    <div className="container">
    {localStorageData.length!=0 ?(<div className="bag-list">
        <h1>Review your bag</h1>
        <p>Free delivery in range and free returns</p>
        <>
        {refSpinnerLoading === true ? (
        <div
          style={{ height: "100vh" }}
          className="Mac-pro d-flex justify-content-center align-items-center"
        >
          <Spinner
            className="text-center"
            style={{ color: "#E0E2E4" }}
            animation="border"
            role="status"
          >
            <span className="visually-hidden text-center">Loading...</span>
          </Spinner>
        </div>
        ):(<div className="bag-item">
          {
            localStorageData.map(function(item){
              return <BagItems item={item} removeItemFromBag={removeItemFromBag}></BagItems>
            })
          }
            <Receipt localStorageData={localStorageData}></Receipt>
        </div>)
        }
         </>
    </div>):(
    <div className="bag-list">
    <h4>You dont have item in bag</h4>
    <Link to="../../"><button  className="btn btn-primary">Return Home</button></Link>
    </div>
    )}
   
    </div>)
    
}