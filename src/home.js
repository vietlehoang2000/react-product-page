import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import ItemList from "./components/item-list";
import PaginationShow from "./components/pagination";

import { AiFillApple, AiOutlineShopping } from "react-icons/ai";
import {FaRegUserCircle} from "react-icons/fa"

import {
  LocalStorageDataProvider,
  UseLocalStorageData,
  UpdateLocalStorageData,
} from "./components/LocalStorageContext";

import { BrowserRouter as Router, Link } from "react-router-dom";

import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/esm/Button";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const url = "https://product-list-fake-rest-server.herokuapp.com";

const ItemsPageLimit = 3;
function Home({ setproductNavStatus }) {
  const [notebookProduct, setNotebookProduct] = useState([]);

  const [desktopProduct, setdesktopProduct] = useState([]);

  const [category, setCategory] = useState("Notebook");

  const [orderSort, setOrderSort] = useState("");

  const [sortCategory, setSortCategory] = useState("");

  const [searchKeyWord, setSearchKeyWord] = useState("");

  const [btnNotebookStatus, setNotebookStatus] = useState("btn-active");

  const refSpinnerLoading = useRef(true);

  const [btnDesktopStatus, setDesktopStatus] = useState();

  const [totalCount, setTotalCount] = useState({ Notebook: 0, Desktop: 0 });

  const [currentPage, setCurrentPage] = useState(1);

  let localStorageData = UseLocalStorageData();

  const[ userLocalStorage,setUserLocalStorage]  = useState([]);

 

  let localStorageDataQuantity = localStorageData.reduce(function (
    previousValue,
    currentValue
  ) {
    return previousValue + currentValue.quantity;
  },
  0);

  const token = localStorage.getItem("token");
  //get data from heroku server
  useEffect(() => {
    let refTotalCount = { ...totalCount };

    async function fetchCategory() {
      const [noteBookResponse, desktopResponse] = await Promise.all([
        fetch(
          `${url}/Notebook?_sort=${sortCategory}&_order=${orderSort}&q=${searchKeyWord}&_page=${currentPage}&_limit=${ItemsPageLimit}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + token,
              // 'Content-Type': 'application/json'
            },
          }
        ),
        fetch(
          `${url}/Desktop?_sort=${sortCategory}&_order=${orderSort}&q=${searchKeyWord}&_page=${currentPage}&_limit=${ItemsPageLimit}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + token,
              // 'Content-Type': 'application/json'
            },
          }
        ),
      ]);

      const noteBooks = await noteBookResponse.json();
      const desktops = await desktopResponse.json();

      setNotebookProduct(noteBooks);
      setdesktopProduct(desktops);

      return [noteBookResponse, desktopResponse];
    }
    fetchCategory()
      .then(([noteBookResponse, desktopResponse]) => {
        refTotalCount.Notebook = noteBookResponse.headers.get("X-Total-Count");
        refTotalCount.Desktop = desktopResponse.headers.get("X-Total-Count");
        refSpinnerLoading.current = true;
        setTotalCount(refTotalCount);
        setproductNavStatus("");
        setUserLocalStorage (JSON.parse(localStorage.getItem("user") || "[]"));
        console.log(userLocalStorage);
      })
      .catch((error) => console.log(error));
  }, [orderSort, searchKeyWord, currentPage, refSpinnerLoading]);

  function changeCategory(category) {
    if (category === "Notebook") {
      setNotebookStatus("btn-active");
      setDesktopStatus("btn-nonactive");
    } else {
      setNotebookStatus("btn-nonactive");
      setDesktopStatus("btn-active");
    }
    refSpinnerLoading.current = true;
    setCurrentPage(1);
    setCategory(category);
  }

  function sortDescending() {
    setSortCategory("price");
    setOrderSort("desc");
  }

  function sortAscending() {
    setSortCategory("price");
    setOrderSort("asc");
  }

  function searchKeyword(keyword) {
    if (category === "Notebook") {
      fetch(`${url}/Notebook?q=${keyword}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
          // 'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setNotebookProduct(data);
          refSpinnerLoading.current = false;
        })
        .catch((error) => console.log(error));
    } else {
      fetch(`${url}/Desktop?q=${keyword}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
          // 'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setdesktopProduct(data);
          refSpinnerLoading.current = false;
        })
        .catch((error) => console.log(error));
    }
  } 

  function logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  const avatarStyle ={fontSize:"24px",marginRight:"5px"}
  const iconStyle = { color: "black", fontSize: "1.8rem" };
  console.log(userLocalStorage)
  return (
    <>
      <Navbar
        className="nav--home pb-2"
        sticky="top"
        bg="light"
        expand="md"
        variant="light"
      >
        <Container className="nav__container--home">
          <Navbar.Brand className="apple-icon--home mx-auto" href="/">
            <AiFillApple style={iconStyle}></AiFillApple>
          </Navbar.Brand>
          <Navbar.Toggle
            className="burger-menu--home"
            aria-controls="navbarScroll"
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link href="/components/details/macbook-air/1">
                Macbook Air
              </Nav.Link>
              <Nav.Link href="/components/details/macbook-pro/2">
                Macbook Pro
              </Nav.Link>
              <Nav.Link href="/components/details/Mac-pro/1">iMac</Nav.Link>
              <Nav.Link href="/components/details/Mac-mini/4">MacMini</Nav.Link>
            </Nav>
            <InputGroup className="search--home col-4">
              <Button
                onClick={() => searchKeyword(searchKeyWord)}
                variant="outline-secondary"
                id="button-addon1"
              >
                Search
              </Button>
              <FormControl
                onChange={(e) => setSearchKeyWord(e.target.value)}
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Navbar.Collapse>
          <Navbar.Brand className="shopping-card--home mx-auto">
            <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
            <AiOutlineShopping style={iconStyle}></AiOutlineShopping>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Link to='./components/bag/bag-items-list'><Dropdown.Item href="#/action-2" className="d-flex justify-content-center"><Button className="mx-auto">Check Out</Button></Dropdown.Item></Link>
              {userLocalStorage.length===0?(<Link to='./components/authentication/Authenticate'><Dropdown.Item href="#/action-2" className="d-flex justify-content-center"><FaRegUserCircle style={avatarStyle}></FaRegUserCircle><span >Sign In</span></Dropdown.Item></Link>):
              (<>
                <Dropdown.Item href="#/action-2" className="d-flex justify-content-center"><img className="avatarImg" width="30px" height="24px" src={userLocalStorage.avatar}></img><span >{userLocalStorage.firstName}</span></Dropdown.Item>
                <Link to='./components/authentication/Authenticate'><Dropdown.Item href="#/action-2" className="d-flex justify-content-center" onClick={()=>logOut()}>Log Out</Dropdown.Item></Link>
                </>
              )}
              
            </Dropdown.Menu>
            {localStorageDataQuantity !== 0 ? (
              <div className="card--home-number">
                {localStorageDataQuantity}
              </div>
            ) : (
              <></>
            )}
     
            </Dropdown>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div className="container">
        <div className="header row ">
          <h1 style={{ marginTop: "30px" }} className="text-center">
            Which Mac is right for you?
          </h1>
          <div className="header__function d-flex justify-content-end">
            <DropdownButton
              className="col-4 text-end"
              id="dropdown-basic-button"
              title="Price Filter"
            >
              <Dropdown.Item onClick={() => sortDescending()}>
                Descending
              </Dropdown.Item>
              <Dropdown.Item onClick={() => sortAscending()}>
                Ascending
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>

        <div className="middle">
          <div className="middle__btn-category row justify-content-center">
            <button
              onClick={() => changeCategory("Notebook")}
              className={`btn--category ${btnNotebookStatus}  col-lg-1 col-auto`}
            >
              Notebook
            </button>
            <button
              onClick={() => changeCategory("Desktop")}
              className={`btn--category ${btnDesktopStatus}  col-lg-1 col-auto`}
            >
              Desktop
            </button>
          </div>
          {notebookProduct.length === 0 && desktopProduct.length === 0 ? (
            <div className="spiner-wrap text-center">
              {refSpinnerLoading.current === true ? (
                <Spinner
                  className="text-center"
                  animation="border"
                  role="status"
                >
                  <span className="visually-hidden text-center">
                    Loading...
                  </span>
                </Spinner>
              ) : (
                <h1 className="text-center">
                  There is no product fit your search
                </h1>
              )}
            </div>
          ) : (
            <>
              <ItemList
                category={category}
                notebookProduct={notebookProduct}
                desktopProduct={desktopProduct}
              ></ItemList>
              <PaginationShow
                category={category}
                totalCount={totalCount}
                ItemsPageLimit={ItemsPageLimit}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                refSpinnerLoading={refSpinnerLoading}
              ></PaginationShow>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
