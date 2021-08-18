import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import  Container  from "react-bootstrap/Container";

export default function ProductNav({productNavStatus, productNavContent}){

  // function scroll(){
  //   var element = document.getElementsByClassName("Mac-pro__details")[0];
  //   element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  // }

    return(<>
    {productNavStatus!==''?( <Navbar className={`nav--product ${productNavStatus}`} collapseOnSelect expand="md" fixed="top" bg={productNavStatus} variant={productNavStatus}>
  <Container>
  <Navbar.Brand href="">{productNavContent}</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link >Features</Nav.Link>
      <Nav.Link href="">Pricing</Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link href="../../../">home</Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>):(<></>)}
</>
    )
}