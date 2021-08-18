import Pagination from "react-bootstrap/Pagination";

export default function PaginationShow({category,totalCount,ItemsPageLimit,currentPage,setCurrentPage,refSpinnerLoading}) {
    refSpinnerLoading.current=true;
    let totalPagesNeeded=0;
    
    if(category==="Notebook"){
   totalPagesNeeded= Math.ceil(totalCount.Notebook/ItemsPageLimit);}
  else{
     totalPagesNeeded= Math.ceil(totalCount.Desktop/ItemsPageLimit)
  }
  let active = currentPage;
  let items = [];
  for (let number = 1; number <= totalPagesNeeded; number++) {
    items.push(
      <Pagination.Item onClick={()=>setCurrentPage(number)} key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
  return (<><Pagination  className="paginate d-flex justify-content-center">{items}</Pagination></>);
}
