import { useState, useEffect, useRef } from "react";

import { BrowserRouter as Router, useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";

import { BsFillCircleFill } from "react-icons/bs";

import Spinner from "react-bootstrap/Spinner";
import "animate.css";
import "./css/MacMini.css";

const url = "https://product-list-fake-rest-server.herokuapp.com";
const priceDif = 1.5;
export default function MacMini({setproductNavStatus, setproductNavContent}) {
  let { id } = useParams();

  const [refSpinnerLoading, setRefSpinnerLoading] = useState(true);

  const [firstProduct,setFirstProduct] =useState([])

  const [secondProduct,setSecondProduct] =useState([])

  useEffect(() => {
    fetch(`${url}/Desktop/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFirstProduct(data);
        setSecondProduct(data);
        setRefSpinnerLoading(false);
        setproductNavStatus('dark');
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
        refDesktopProduct.image="https://www.apple.com/v/mac/home/bi/images/overview/compare/compare_macmini__f53ds86a9eq2_small_2x.png"
        break;
      case "grey":
        refDesktopProduct.image ="https://www.apple.com/v/mac/home/bi/images/overview/compare/compare_macmini__f53ds86a9eq2_small_2x.png"
        break;
      }
  
      setFirstProduct(refDesktopProduct);
  }

  function changeColorSecondProduct(color) {

    const refDesktopProduct ={...secondProduct};

    switch(color){
      case "silver":
        refDesktopProduct.image="https://www.apple.com/v/mac/home/bi/images/overview/compare/compare_macmini__f53ds86a9eq2_small_2x.png"
        break;
      case "green":
        refDesktopProduct.image ="https://www.apple.com/v/mac/home/bi/images/overview/compare/compare_macmini__f53ds86a9eq2_small_2x.png"
        break;
      }

      setSecondProduct(refDesktopProduct);
  }

  return (
    <>
      {refSpinnerLoading === true ? (
        <div
          style={{ height: "100vh" }}
          className="macbook__air d-flex justify-content-center align-items-center"
        >
          <Spinner
            className="text-center"
            style={{ color: "white" }}
            animation="border"
            role="status"
          >
            <span className="visually-hidden text-center">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="Mac-mini">
          <div className="Mac-mini__intro animate__animated animate__fadeIn d-flex justify-content-center">
            <img
              width="1200px"
              src="https://www.apple.com/v/mac-mini/m/images/overview/hero__x8ruukomx2au_large.jpg"
            ></img>
          </div>
          <div className="intro--description text-center">
            <h3>{firstProduct.name} <span>({firstProduct.version})</span></h3>
            <h1>
              New guts.</h1>
              <h1>
              More glory.
            </h1>
            <h4 className="col-lg-7 col-9 mx-auto">
              The Apple M1 chip takes our most versatile, do-it-all desktop into
              another dimension. With up to 3x faster CPU performance. Up to 6x
              faster graphics. And our most advanced Neural Engine for up to 15x
              faster machine learning. Get ready to work, play, and create on
              Mac mini with speed and power beyond anything you ever imagined.
            </h4>
          </div>
          <div className="mini-product__details ">
            <div className="air-product__wrapper row mx-auto d-flex flex-row justify-content-center">
            <div className="product--cheaper col-md-5 col-7 text-center">
                <img src={`${firstProduct.image}`}></img>
                <div className="product-colors">
                  {firstProduct.color.map(function (item) {
                    return (
                      <button onClick={()=> changeColorFirstProduct(item)}>
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
                <p>
                  {firstProduct.chip} with 8‑core CPU, 7‑core GPU, and 16‑core
                  Neural Engine
                </p>
                <p>Two Thunderbolt / USB 4 ports</p>
                <p>{firstProduct.ram} unified memory</p>
                <p>256GB SSD storage</p>
                <p>Force Touch trackpad</p>
                <h4 className="mx-auto">
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
                      <button onClick={()=> changeColorSecondProduct(item)}>
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
                <p>
                  {firstProduct.chip} with 8‑core CPU, 7‑core GPU, and 16‑core
                  Neural Engine
                </p>
                <p>Two Thunderbolt / USB 4 ports</p>
                <p>{firstProduct.ram} unified memory</p>
                <p>512GB SSD storage</p>
                <p>Force Touch trackpad</p>
                <h4 className="mx-auto">
                  {formatter.format(firstProduct.price * priceDif)}
                </h4>
                <Button className="col-4 mx-left">Buy</Button>
              </div>
            </div>
            </div>
        </div>
      )}
    </>
  );
}
