import ItemShow from "./item"; 
import {UseLocalStorageData} from './LocalStorageContext'
export default function ItemList({
category,
  notebookProduct,
  desktopProduct,
}) {

  // let data = UseLocalStorageData();
  return (
    <div className="row ">
       
      {
          category==="Notebook"?
      (notebookProduct.map(function(product){ return <ItemShow key={product.id} product={product} category={category}></ItemShow>})):
      (
        desktopProduct.map(function(product){ return <ItemShow key={product.id} product={product} category={category}></ItemShow>})
      )
      }
    </div>
  );
}
