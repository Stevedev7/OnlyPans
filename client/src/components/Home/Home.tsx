import { Col, Container, Row } from "react-bootstrap"

import './Home.css'
import { useNavigate } from "react-router"

const Categories = ({name, id}) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/recipes/${id}`);
}
  return(
    <div style={{
      textDecoration: "none", 
      backgroundColor: "#D4F0F766",
      color: "#4f4f4f",
      cursor: "pointer",
      margin: "5px",
      textAlign: "center",
      fontSize: "50px",
      border: "2px solid grey",
      borderRadius: "15px",
      padding: "5px",
      width: "270px",
      height: "90px",
      verticalAlign: "middle"
  }}
  onClick={handleNavigate}
>
  {name}
</div>
  )
}
const Home = () => {
  return (
    <Container className="error-container home">
        <Row>
          <h1 className="text-center">OnlyPans</h1>
        </Row>
        <Row className="categories-row">
            <Categories id={""} name={"All Recipes"} />
        </Row>
        <Row className="categories-row">
          <Col className="categories-col" md={6} lg={6} sm={6}>
            <Categories id={"cuisines"} name={"Cuisines"} />
          </Col>
          <Col className="categories-col" md={6} lg={6} sm={6}>
            <Categories id={"diets"} name={"Diets"}/>
          </Col>
        </Row>
    </Container>
  )
}

export default Home