import ItemShow from "./item"; 

export default function ItemList({
category,
  notebookProduct,
  desktopProduct,
}) {
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
