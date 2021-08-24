import React,{ useEffect, useState } from "react";

import Button from "react-bootstrap/Button";

import {
  UseLocalStorageData,
  UpdateLocalStorageData,
} from "../LocalStorageContext";


export default function BagItems({ item ,removeItemFromBag}) {

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleQuantityInput = UpdateLocalStorageData();

  return (
    <div className="bag--checkout-item row">
      <div className={item.category==='Notebook'?`checkout-item--image col-3 `:`checkout-item--image--desktop col-3 `}>
        <img src={`${item.imageUrl}`} />
      </div>
      <div className="checkout-item--details col-3 text-center">
        <h3 className="mt-4">{item.name}</h3>
        <h5>({item.version})</h5>
      </div>
      <div className="checkout-item--quantity col-3 text-center">
        <select
          class="mt-4 form-select col-1 mx-auto"
          aria-label="Default select example"
          onChange={(e) => handleQuantityInput(e,item.id,item.category)}
        >
          <option selected>{item.quantity}</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <div className="checkout-item--price col-3 text-center d-flex flex-column justify-content-between">
        <h3 className="mt-4">{formatter.format(item.price*item.quantity)}</h3>
        <Button className="col-auto mx-auto" onClick={()=>removeItemFromBag(item)}>remove</Button>
      </div>
      <hr></hr>
    </div>
  );
}
