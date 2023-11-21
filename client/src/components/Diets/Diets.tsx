import { useLazyAllDietQuery } from "../../slices/dietApi"
import { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import Diet from "./components/Diet";

const Diets = () => {

    const [allDiets, { error, isLoading}] = useLazyAllDietQuery();
    const [diets, setDiets] = useState();
    useEffect(() => {
        (async () => {
            try {
                const res = await allDiets().unwrap();
                setDiets(res.data);
                console.log()
            } catch(error){
                console.log("Cannot get all Diets")
            }
        })()
    }, [])
  return (
    <Container className="error-container">
        <h1 className="text-center">Diets</h1>
        {
            isLoading && 
                <div className="error-container-div">
                    <Spinner />
                </div>
        }
        {
            diets && <Row>

                {diets.map(({name, id}) => <Diet key={id} name={name} id={id} />)}
            </Row>
        }
    </Container>
  )
}

export default Diets