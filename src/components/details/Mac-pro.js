import { useState, useEffect, useRef } from "react";

import { BrowserRouter as Router, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

import Spinner from "react-bootstrap/Spinner";

import { BsFillCircleFill } from "react-icons/bs";

import "./css/MacPro.css";

const url = "https://product-list-fake-rest-server.herokuapp.com";

//chênh lệch giá storage 
const priceDif = 1.5;
export default function MacPro({ setproductNavStatus, setproductNavContent }) {
  let { id } = useParams();

  const [refSpinnerLoading, setRefSpinnerLoading] = useState(true);

  const [firstProduct,setFirstProduct] =useState([])

  const [secondProduct,setSecondProduct] =useState([])

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${url}/Desktop/${id}`,{
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token,
        // 'Content-Type': 'application/json'
      }
      })
      .then((response) => response.json())
      .then((data) => {
        setFirstProduct(data);
        setSecondProduct(data);
        setRefSpinnerLoading(false);
        setproductNavStatus("light");
        setproductNavContent(data.name);
      })
      .catch((error) => console.log(error));
  }, [refSpinnerLoading]);


  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  

  function changeColorFirstProduct(color) {

    const refDesktopProduct ={...firstProduct};

    switch(color){
      case "silver":
        refDesktopProduct.image="https://www.apple.com/v/imac-24/b/images/overview/color_front_silver__cwewcn8oo9qq_large_2x.jpg"
        break;
      case "blue":
        refDesktopProduct.image="https://www.apple.com/v/imac-24/b/images/overview/color_front_blue__x3psx2ttezmi_large_2x.jpg"
        break;
      case "red":
        refDesktopProduct.image ="https://www.apple.com/v/imac-24/b/images/overview/color_front_pink__ewotg63rfmie_large_2x.jpg"
        break;
      case "green":
        refDesktopProduct.image ="https://www.apple.com/v/imac-24/b/images/overview/color_front_green__eb8qbnemmre6_large_2x.jpg"
        break;
      }
  
      setFirstProduct(refDesktopProduct);
  }

  function changeColorSecondProduct(color) {

    const refDesktopProduct ={...secondProduct};

    switch(color){
      case "silver":
        refDesktopProduct.image="https://www.apple.com/v/imac-24/b/images/overview/color_front_silver__cwewcn8oo9qq_large_2x.jpg"
        break;
      case "blue":
        refDesktopProduct.image="https://www.apple.com/v/imac-24/b/images/overview/color_front_blue__x3psx2ttezmi_large_2x.jpg"
        break;
      case "red":
        refDesktopProduct.image ="https://www.apple.com/v/imac-24/b/images/overview/color_front_pink__ewotg63rfmie_large_2x.jpg"
        break;
      case "green":
        refDesktopProduct.image ="https://www.apple.com/v/imac-24/b/images/overview/color_front_green__eb8qbnemmre6_large_2x.jpg"
        break;
      }

      setSecondProduct(refDesktopProduct);
  }
  return (
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
      ) : (
        <>
          <div className="Mac-pro">
            <h1>
              {firstProduct.name}
              <span>({firstProduct.version})</span>
            </h1>
            <div className="Mac-pro__intro mx-auto d-flex justify-content-center">
              <img
                className="Mac-pro__image"
                width="60%"
                src="https://www.apple.com/v/imac-24/b/images/overview/colors_hero_fallback__co1mroy32piu_large.jpg"
              ></img>
            </div>
            <h2 className="text-center col-5 mx-auto">
              <span className="color-green">Say</span>{" "}
              <span className="color-yellow">hello</span>{" "}
              <span className="color-orange">to</span>{" "}
              <span className="color-pink">the</span>{" "}
              <span className="color-purple">new</span>{" "}
              <span className="color-blue">iMac.</span>
              <br></br>
              Inspired by the best of Apple. Transformed by the M1 chip. Stands
              out in any space. Fits perfectly into your life.
            </h2>
          </div>
          <div className="Mac-pro__details">
            <div className="Mac-pro__wrapper row mx-auto d-flex flex-row justify-content-center">
              <div className="product--cheaper col-md-5 col-7 text-center">
                <img src={`${firstProduct.image}`}></img>
                <div className="product-colors">
                  {firstProduct.color.map(function (item) {
                    return (
                      <button  onClick={() => changeColorFirstProduct(item)}>
                        <BsFillCircleFill
                          style={{ fill: item }}
                          className={`${item}`}
                        ></BsFillCircleFill>
                      </button>
                    );
                  })}
                </div>
                <h4 className="mx-auto">
                  Apple M1 Chip with 8-Core CPU and 8-Core GPU 256GB Storage
                </h4>
                <p>24-inch {firstProduct.display}K Retina display²</p>
                <p>Two Thunderbolt / USB 4 ports</p>
                <p>Up to {firstProduct.ram} memory</p>
                <p>-</p>
                <p>-</p>
                <p>Magic Keyboard</p>
                <h4>
                 {formatter.format(firstProduct.price)}
                </h4>
                <Button className="col-4 mx-left">Buy</Button>
              </div>

              <div className="vl "></div>

              <div className="product--more-expensive col-md-5 col-7  text-center">
                <img src={`${secondProduct.image}`}></img>
                <div className="product-colors">
                  {secondProduct.color.map(function (item) {
                    return (
                      <button  onClick={() => changeColorSecondProduct(item)}>
                        <BsFillCircleFill
                          style={{ fill: item }}
                          className={`${item}`}
                        ></BsFillCircleFill>
                      </button>
                    );
                  })}
                </div>
                <h4 className="mx-auto">
                  Apple M1 Chip with 8-Core CPU and 8-Core GPU 512GB Storage
                </h4>
                <p>24-inch {secondProduct.display}K Retina display²</p>
                <p>Two Thunderbolt / USB 4 ports</p>
                <p>Up to {secondProduct.ram} memory</p>
                <p>Gigabit Ethernet</p>
                <p>Two USB 3 ports</p>
                <p>Magic Keyboard Touch ID</p>
                <h4>
                 {formatter.format(firstProduct.price*priceDif)}
                </h4>
                <Button className="col-4 mx-left">Buy</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
