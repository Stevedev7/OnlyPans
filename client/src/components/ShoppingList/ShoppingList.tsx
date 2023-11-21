import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import Error from "../Error";
import { useRemoveIngredientFromListMutation, useGetShoppingListQuery } from "../../slices/shoppingListApi";
import { useEffect } from "react";
import { setShoppingList } from "../../slices/shoppingList";
import { Button, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import {  FaTrash } from "react-icons/fa";
import './ShoppingList.css'

const ListItem = ({name, id, token}) => {
    const [removeIngredient] = useRemoveIngredientFromListMutation();
    const dispatch = useDispatch();
    const handleDelete = async () => {
        try {
            const response = await removeIngredient({token, id});
            dispatch(setShoppingList(response.data.data.ingredients))
        } catch(error){
            console.log(error)
        }
    }

    return (
        <ListGroup.Item className="shopping-list-item">
            <div className="d-flex justify-content-between align-items-center">
                <span className="item-name">{name}</span>
                <Button variant='danger' onClick={handleDelete}>
                    <FaTrash />
                </Button>
            </div>
        </ListGroup.Item>

    )
}

const ShoppingList = () => {
  const {isAuthenticated, token} = useSelector((state: RootState) => state.auth);
  const {data, isLoading, error} = useGetShoppingListQuery(token)
  const {list} = useSelector((state: RootState) => state.shoppingList)
  const dispatch = useDispatch();
  useEffect(()=>{
    (async() => {
            dispatch(setShoppingList(data.data.ingredients))
    })()
  }, [data]);

  if(isLoading){
    return(
    
        <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status"/>
        </div>
    )
  }

  if(error){
    return <Error status={error.status} message={error.data.error.message}/>
  }

  return (
    <>
    {
        isAuthenticated ? 
        <Container className="mt-5 shopping-list-container">
            <h1 className="shopping-list-title">Shopping List</h1>
            <Row>
                <Col md={12}>
                    <ListGroup>
                        {
                            (list && list.length == 0) && <ListGroup.Item className="shopping-list-item">No ingredients</ListGroup.Item>
                        }
                        {
                            list && list.map(item => <ListItem key={item.id} name={item.name} id={item.id} token={token} />)
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Container>
            :  <><Error status={401} message={"Please Login"}/></>
    }
    </>
    
  )
}

export default ShoppingList