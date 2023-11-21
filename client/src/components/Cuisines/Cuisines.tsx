import { useLazyAllCuisineQuery } from "../../slices/cuisineApi"
import { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import Cuisine from "./components/Cuisine/Cuisine";

const Cuisines = () => {

    const [allCuisine, { error, isLoading}] = useLazyAllCuisineQuery();
    const [cuisines, setCuisines] = useState();
    useEffect(() => {
        (async () => {
            try {
                const res = await allCuisine().unwrap();
                setCuisines(res.data);
                console.log()
            } catch(error){
                console.log("Cannot get all cuisines")
            }
        })()
    }, [])
  return (
    <Container className="error-container">
        <h1 className="text-center">Cuisines</h1>
        {
            isLoading && 
                <div className="error-container-div">
                    <Spinner />
                </div>
        }
        {
            cuisines && <Row>

                {cuisines.map(({name, id}) => <Cuisine key={id} name={name} id={id} />)}
            </Row>
        }
    </Container>
  )
}

export default Cuisines