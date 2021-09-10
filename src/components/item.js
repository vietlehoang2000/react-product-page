import { useContext, useEffect, useState } from "react";
import { IncreaseBagQuantity} from './LocalStorageContext'


import Button from "react-bootstrap/Button";
import { IoHardwareChipOutline } from "react-icons/io5";
import { SiIntel } from "react-icons/si";
import {
  BsSubtract,
  BsSquare,
  BsBatteryFull,
  BsCameraVideo,
  BsFillCircleFill,
} from "react-icons/bs";


import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

const standardNotebookDisplay = 13;

const M1Chip = "Apple M1 chip";

const styleIcon = { fontSize: "2.5rem" };



export default function ItemShow({ product,category }) {

  

  const addItemToBag = IncreaseBagQuantity(product,category);
  
  let routeLink ='';
  function changeRouteLink(){
    if(category==="Notebook"){
      if(product.name==="MacBook Air"){
        routeLink=`/components/details/macbook-air/${product.id}`;
      }
      else{
        routeLink=`/components/details/macbook-pro/${product.id}`;
      }
    }
    else{
      if(product.name==="Mac mini"){
        routeLink=`/components/details/Mac-mini/${product.id}`;
      }
      else{
        routeLink=`/components/details/Mac-pro/${product.id}`;
      }
    }
  }

  changeRouteLink();

  function ItemColorShow() {
    return (
      <div className="item__color">
        {product.color.map(function (colorItem) {
          return (
            <BsFillCircleFill
              key={colorItem}
              className="color--block"
              style={{ fill: colorItem }}
            ></BsFillCircleFill>
          );
        })}
      </div>
    );
  }



  return (
    <div className="item col-12 col-lg-4 col-sm-6 text-center">
      
      
      <img alt="" src={product.image}></img>
      <Link to={`${routeLink}`}>
        <h4>
        {product.name}
        <span> ({product.version})</span>
      </h4></Link>
      <p>from {product.price}$</p>
      <ItemColorShow></ItemColorShow>
      <Button size="sm" onClick={()=>addItemToBag(product,category)}>Add to Bag</Button>
      <hr />
      {product.display !== "" ? (
        <div className="item--display">
          {product.display >= standardNotebookDisplay ? (
            <h5>{product.display}"</h5>
          ) : (
            <h5>{product.display}K</h5>
          )}
          <p>
            Retina display <br></br> <span>218ppi</span>
          </p>
        </div>
      ) : (
        <div className="item--display d-flex justify-content-center align-items-center">
          <h3>-</h3>
        </div>
      )}

      {product.chip === M1Chip ? (
        <div className="item__chip--M1">
          <IoHardwareChipOutline style={styleIcon}></IoHardwareChipOutline>
          <p>{product.chip}</p>
        </div>
      ) : (
        <div className="item__chip--intel">
          <SiIntel style={styleIcon}></SiIntel>
          <p>Up to {product.chip} processor</p>
        </div>
      )}

      {product.chip === M1Chip ? (
        <div className="item_ram--M1">
          <BsSubtract style={styleIcon}></BsSubtract>
          <h5>Up to {product.ram} unified memory</h5>
          <p>For increased performance and power efficiency</p>
        </div>
      ) : (
        <div className="item_ram--intel">
          <BsSquare style={styleIcon}></BsSquare>
          <h5>Up to {product.ram} memory</h5>
        </div>
      )}

      <div className="item__storage">
        <h4>{product.storage}</h4>
        <p>Maximum configurable storage</p>
      </div>

      {product.battery !== "" ? (
        <div className="item__battery">
          <BsBatteryFull style={styleIcon}></BsBatteryFull>
          <p>Up to {product.battery} hours battery life3</p>
        </div>
      ) : (
        <></>
      )}

      {product.camera !== "" ? (
        <div className="item__camera">
          <BsCameraVideo style={styleIcon}></BsCameraVideo>
          <h4>{product.camera} FaceTime HD camera</h4>
          <p>
            With the image signal processor of M1 for drastically improved
            performance
          </p>
        </div>
      ) : (
        <div className="item__camera d-flex justify-content-center align-items-center">
          <h3>-</h3>
        </div>
      )}
      {product.weight !== "" ? (
        <div className="item__weight">
          <h4>{product.weight}lb</h4>
          <p>Weight</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
