import { useState, useEffect, useRef } from "react";

import { BrowserRouter as Router, useParams } from "react-router-dom";

import ReactPlayer from "react-player/lazy";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import { BsFillCircleFill } from "react-icons/bs";

import "./css/macbook.css";

const url = "https://product-list-fake-rest-server.herokuapp.com";
const priceDif = 1.5;

const token = localStorage.getItem("token");

export default function MacbookPro({setproductNavStatus, setproductNavContent}) {
  let { id } = useParams();

  const [refSpinnerLoading, setRefSpinnerLoading] = useState(true);

  const [firstProduct, setFirstProduct] = useState([]);

  const [secondProduct, setSecondProduct] = useState([]);

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    fetch(`${url}/Notebook/${id}`,{
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token,
        // 'Content-Type': 'application/json'
      }
      })
      .then((response) => response.json())
      .then((data) => {
        setproductNavStatus('dark');
        setFirstProduct(data);
        setSecondProduct(data);
        setproductNavContent(data.name);
        setRefSpinnerLoading(false);
      })
      .catch((error) => console.log(error));
  }, [refSpinnerLoading]);


  function changeColorFirstProduct(color) {
    const refDesktopProduct = { ...firstProduct };

    switch (color) {
      case "gold":
        refDesktopProduct.image =
          "https://www.apple.com/v/mac/home/bi/images/overview/compare/compare_mba__gdncw5gbxoq6_small_2x.png";
        break;
      case "silver":
        refDesktopProduct.image =
          "https://www.apple.com/v/mac/home/bi/images/overview/compare/compare_mbp13__geounnnz6oa6_small_2x.png";
        break;
      case "grey":
        refDesktopProduct.image =
          "https://www.apple.com/v/mac/home/bi/images/overview/compare/compare_mbp16__fykfvftfaeuu_small_2x.png";
        break;
    }

    setFirstProduct(refDesktopProduct);
  }

  function changeColorSecondProduct(color) {
    const refDesktopProduct = { ...secondProduct };

    switch (color) {
      case "gold":
        refDesktopProduct.image =
          "https://www.apple.com/v/mac/home/bi/images/overview/compare/compare_mba__gdncw5gbxoq6_small_2x.png";
        break;
      case "silver":
        refDesktopProduct.image =
          "https://www.apple.com/v/mac/home/bi/images/overview/compare/compare_mbp13__geounnnz6oa6_small_2x.png";
        break;
      case "grey":
        refDesktopProduct.image =
          "https://www.apple.com/v/mac/home/bi/images/overview/compare/compare_mbp16__fykfvftfaeuu_small_2x.png";
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
        <div className="macbook__air">
          <ReactPlayer
            style={{ paddingLeft: "unset" }}
            className="air--video"
            url="https://www.apple.com/105/media/us/macbook-pro-13/2020/f2b14406-42ad-405e-bfa0-71b52a0bfd67/anim/hero/large_2x.mp4"
            width="100%"
            onReady
            playing="true"
          />
          <div className="air--description text-center col-8 mx-auto">
            <h3>
              {firstProduct.name} <span>({firstProduct.version})</span>
            </h3>
            <h1>All systems Pro.</h1>
            <h4>
              The Apple M1 chip gives the 13???inch MacBook Pro speed and power
              beyond belief. With up to 2.8x CPU performance. Up to 5x the
              graphics speed. Our most advanced Neural Engine for up to 11x
              faster machine learning. And up to 20 hours of battery life ??? the
              longest of any Mac ever. It???s our most popular pro notebook, taken
              to a whole new level.
            </h4>
          </div>
          <div className="air-product__details ">
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
                  {firstProduct.chip} with 8???core CPU, 7???core GPU, and 16???core
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
                  {firstProduct.chip} with 8???core CPU, 7???core GPU, and 16???core
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
