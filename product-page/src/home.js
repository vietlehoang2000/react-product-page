import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import ItemList from "./components/item-list";
import PaginationShow from "./components/pagination";

import {AiFillApple,AiOutlineShopping} from "react-icons/ai"

import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/esm/Button";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import  Container  from "react-bootstrap/Container";

const url = "https://product-list-fake-rest-server.herokuapp.com";

const ItemsPageLimit = 3;
function Home({setproductNavStatus}) {
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

  const [currentPage,setCurrentPage] = useState(1);
  
  //get data from heroku server
  useEffect(() => {
    let refTotalCount = { ...totalCount };
    
    fetch(
      `${url}/Notebook?_sort=${sortCategory}&_order=${orderSort}&q=${searchKeyWord}&_page=${currentPage}&_limit=${ItemsPageLimit}`
    )
      .then((response) => {
        refTotalCount.Notebook = response.headers.get("X-Total-Count");
        return response.json();
      })
      .then((data) => {
        setNotebookProduct(data);
        refSpinnerLoading.current = false;
      })
      .catch((error) => console.log(error));

    fetch(
      `${url}/Desktop?_sort=${sortCategory}&_order=${orderSort}&q=${searchKeyWord}&_page=${currentPage}&_limit=${ItemsPageLimit}`
    )
      .then((response2) => {
        refTotalCount.Desktop = response2.headers.get("X-Total-Count");
        return response2.json();
      })
      .then((data2) => {
        setdesktopProduct(data2);
        refSpinnerLoading.current = false;
      })
      .catch((error2) => console.log(error2));
      refSpinnerLoading.current= true;
      setTotalCount(refTotalCount);
      setproductNavStatus('');
  }, [orderSort, searchKeyWord,currentPage,refSpinnerLoading]);

  function changeCategory(category) {
    if (category === "Notebook") {
      setNotebookStatus("btn-active");
      setDesktopStatus("btn-nonactive");
    } else {
      setNotebookStatus("btn-nonactive");
      setDesktopStatus("btn-active");
    }
    refSpinnerLoading.current=true;
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
      fetch(`${url}/Notebook?q=${keyword}`)
        .then((response) => response.json())
        .then((data) => {
          setNotebookProduct(data);
          refSpinnerLoading.current = false;
        })
        .catch((error) => console.log(error));
    } else {
      fetch(`${url}/Desktop?q=${keyword}`)
        .then((response) => response.json())
        .then((data) => {
          setdesktopProduct(data);
          refSpinnerLoading.current = false;
        })
        .catch((error) => console.log(error));
    }
  }

  const iconStyle ={color:"black",fontSize:"1.8rem"};
  return (<>
  <Navbar className="nav--home pb-2" sticky="top" bg="light" expand="md" variant="light">
    
    <Container className="nav__container--home">
    
    <Navbar.Brand className="apple-icon--home mx-auto" href="/"><AiFillApple style={iconStyle}></AiFillApple></Navbar.Brand>
    <Navbar.Toggle className="burger-menu--home" aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
    <Nav className="me-auto">
      <Nav.Link href="/components/details/macbook-air/1">Macbook Air</Nav.Link>
      <Nav.Link href="/components/details/macbook-pro/2">Macbook Pro</Nav.Link>
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
          <Navbar.Brand className="shopping-card--home mx-auto" href="/"><AiOutlineShopping style={iconStyle}></AiOutlineShopping></Navbar.Brand>
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
            <Dropdown.Item onClick={() => sortDescending()}>Descending</Dropdown.Item>
            <Dropdown.Item onClick={() => sortAscending()}>Ascending</Dropdown.Item>
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
              <Spinner className="text-center" animation="border" role="status">
                <span className="visually-hidden text-center">Loading...</span>
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
