import React, { useContext, createContext, useState } from "react";

const LocalStorageDataContext = React.createContext();

const UpdateLocalStorageDataContext = React.createContext();

const IncreaseBagQuantityContext = React.createContext();

export function UseLocalStorageData() {
  return useContext(LocalStorageDataContext);
}

export function UpdateLocalStorageData() {
  return useContext(UpdateLocalStorageDataContext);
}

export function IncreaseBagQuantity() {
  return useContext(IncreaseBagQuantityContext);
}

export function LocalStorageDataProvider({ children }) {
  let data = JSON.parse(localStorage.getItem("data") || "[]");

  const [products, setProducts] = useState(data);

  function increaseBagQuantity(product, category) {
    let refProducts = [...products];
    let newProduct = {};
    if(refProducts.some(function(duplicateItems){
      return (duplicateItems.id ===product.id && duplicateItems.category === category)
    })){
      refProducts[refProducts.findIndex(item=>(item.id===product.id,item.category===category))].quantity+=1;
    }
    else{
      newProduct={id:product.id,category:category,name:product.name,version:product.version,quantity:1,imageUrl:product.image,price:product.price}
      refProducts.push(newProduct);
    }
    console.log(product,category);
    setProducts(refProducts);
  }

  function updateLocalStorageData(e,id,category) {

    let refProducts = [...products];
    refProducts.map(function(item,index){
      if(item.id===id&&item.category===category)
       item.quantity=parseInt(e.target.value)
    })
    setProducts(refProducts);
  }

  localStorage.setItem("data", JSON.stringify(products));

  return (
    <LocalStorageDataContext.Provider value={products}>
      <UpdateLocalStorageDataContext.Provider value={updateLocalStorageData}>
        <IncreaseBagQuantityContext.Provider value={increaseBagQuantity}>
          {children}
        </IncreaseBagQuantityContext.Provider>
      </UpdateLocalStorageDataContext.Provider>
    </LocalStorageDataContext.Provider>
  );
}
