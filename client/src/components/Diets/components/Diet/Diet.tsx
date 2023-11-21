import { Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

interface ICuisineProps {
    name: string;
    id:number;
}

const Diet = ({name, id}: ICuisineProps) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/recipes/diets/${id}`);
    }
  return (
    <Col md={4} lg={3} sm={2}>
        <div style={{
                textDecoration: "none", 
                backgroundColor: "#D4F0F7",
                color: "#020202",
                cursor: "pointer",
                margin: "5px",
                textAlign: "center",
                fontSize: "15px",
                border: "2px solid grey",
                borderRadius: "25px",
                padding: "5px"
            }}
            onClick={handleNavigate}
        >
            {name}
        </div>
    </Col>
  )
}

export default Diet