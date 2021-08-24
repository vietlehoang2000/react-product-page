import "bootstrap/dist/css/bootstrap.min.css";

import MacbookAir from "./components/details/macbook-air";
import MacbookPro from "./components/details/macbook-pro";
import MacMini from "./components/details/Mac-mini";
import MacPro from "./components/details/Mac-pro";
import ProductNav from "./components/details/product-nav";
import BagItemsList from "./components/bag/bag-items-list";
import Authenticate from "./components/authentication/Authenticate";
import Home from "./home";

import {
  LocalStorageDataProvider,
  UseLocalStorageData,
  UpdateLocalStorageData,
  IncreaseBagQuantity,
} from "./components/LocalStorageContext";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [productNavStatus, setproductNavStatus] = useState("");
  const [productNavContent, setproductNavContent] = useState("");

  return (
    <LocalStorageDataProvider>
      <Router>
        <div
          className="app-container"
          style={
            productNavStatus === ""
              ? { backgroundColor: "#FAFAFA" }
              : { backgroundColor: "unset" }
          }
        >
          <ProductNav
            productNavStatus={productNavStatus}
            productNavContent={productNavContent}
          ></ProductNav>
          <Switch>
            <Route path="/components/details/macbook-air/:id">
              <MacbookAir
                setproductNavStatus={setproductNavStatus}
                setproductNavContent={setproductNavContent}
              />
            </Route>
            <Route path="/components/details/macbook-pro/:id">
              <MacbookPro
                setproductNavStatus={setproductNavStatus}
                setproductNavContent={setproductNavContent}
              />
            </Route>
            <Route path="/components/details/Mac-pro/:id">
              <MacPro
                setproductNavStatus={setproductNavStatus}
                setproductNavContent={setproductNavContent}
              />
            </Route>
            <Route path="/components/details/Mac-mini/:id">
              <MacMini
                setproductNavStatus={setproductNavStatus}
                setproductNavContent={setproductNavContent}
              />
            </Route>
            <Route path="/components/bag/bag-items-list/">
              <BagItemsList
                setproductNavStatus={setproductNavStatus}
                setproductNavContent={setproductNavContent}
              />
            </Route>
            <Route path="/components/authentication/authenticate">
              <Authenticate></Authenticate>
            </Route>
            <Route path="/">
              <Home setproductNavStatus={setproductNavStatus} />
            </Route>
          </Switch>
        </div>
      </Router>
    </LocalStorageDataProvider>
  );
}

export default App;
