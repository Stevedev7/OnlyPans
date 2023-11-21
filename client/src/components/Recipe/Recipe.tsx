import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDeleteRecipeMutation, useLazyGetAverageRatingsQuery, useLazyGetRecipeQuery, useLazyGetReviewsQuery } from '../../slices/recipeApi';
import { Container, Row, Col, Image, Dropdown, Modal } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import AddEditRecipe from '../AddEditRecipe';
import InfiniteScrollList from '../InfiniteScrollList';
import { FaBookmark, FaEllipsisV, FaHandPointRight, FaMinusCircle, FaPlusCircle, FaRegBookmark, FaTrash, FaUser } from 'react-icons/fa';
import { useAddToFavoritesMutation, useLazyIsFavoritesQuery, useRemoveFromFavoritesMutation } from '../../slices/favoritesApi';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import recipePlaceholderImage from '../../../assets/img/recipe-image-placeholder.jpg'
import './Recipe.css';
import Ratings from '../InfiniteScrollList/components/Ratings';
import { useAddIngredientToListMutation, useLazyGetShoppingListQuery, useRemoveIngredientFromListMutation } from '../../slices/shoppingListApi';
import { setShoppingList } from '../../slices/shoppingList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faListCheck } from '@fortawesome/free-solid-svg-icons';
import Error from '../Error';

const EditRecipeModal = ({ recipe, onToggle, isVisible}) => {
  return <Modal size={"lg"} show={isVisible} onHide={onToggle}>
    <AddEditRecipe recipe={recipe} onToggle={onToggle} />
  </Modal>
}

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [getRecipe] = useLazyGetRecipeQuery();
  const [getReviews] = useLazyGetReviewsQuery();
  const [deleteRecipe] = useDeleteRecipeMutation();
  const [editRecipeModalProps, setEditRecipeModalProps] = useState({
    visible: false
  })
  const navigate = useNavigate();
  const {token, userName, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const[favorites] = useLazyIsFavoritesQuery();
  const [isFavorite, setIsFavorite] = useState();
  const [addToFavorites] = useAddToFavoritesMutation();
  const [removeFromFavorites] = useRemoveFromFavoritesMutation();
  const [removeIngredientFromList] = useRemoveIngredientFromListMutation();
  const [addIngredientToList] = useAddIngredientToListMutation();

  const [ratings,setRatings] = useState();
  const [count, setCount] = useState();
  const [getAverageRatings] = useLazyGetAverageRatingsQuery();
  const [getShoppingList] = useLazyGetShoppingListQuery();
  const { list } = useSelector((state: RootState) => state.shoppingList);
  const dispatch = useDispatch();

  const [stepProgress, setStepProgress] = useState(0);
  const onDelete = async () => {
    const res = await deleteRecipe({id: recipe.id, token}).unwrap();
    console.log(res);
    navigate("/");
  }

  const toggleEditRecipeModal = () => {
    setEditRecipeModalProps({
      ...editRecipeModalProps,
      visible: !editRecipeModalProps.visible
    })
  }

  const loadReviews = async (page: number, limit:number, _id: number) => {
    try {
      const response = await getReviews({page, limit, id: _id}).unwrap();
      return response
    } catch (error) {
        console.log("Failed to get reviews");
    }
  }

  const onToggleFavorites = async () => {
    try{
      if(!isFavorite){
        const response = await addToFavorites({id, token})
        setIsFavorite(!isFavorite);
        return 
      }

      if(favorites){
        let response = await removeFromFavorites({id, token})
        setIsFavorite(!isFavorite);
        return
      }
    } catch(error){
      console.log("Couldn't add to favorites");
    }
  }

  const addOrRemoveToList = async (id) => {
    try{
      if(isInList(id)){
        const response = await removeIngredientFromList({id, token}).unwrap();
        dispatch(setShoppingList(response.data.ingredients));
      } else {
        const response = await addIngredientToList({ingredient: id, token}).unwrap();
        dispatch(setShoppingList(response.data.ingredients))
        console.log(response)
      }
    } catch(error){
      console.log(JSON.stringify(error))
    }
  }

  const isInList = (ingredientId) => list.some(({id}) => id === ingredientId) && isAuthenticated

  useEffect(() => {
    (async () => {
      try {
        const response = await getRecipe(id).unwrap();
        setRecipe(response.data);
        setEditRecipeModalProps({
          ...editRecipeModalProps,
          recipe: response.data
        });
        const ratingsResponse = await getAverageRatings(id).unwrap();
        setRatings(ratingsResponse.data._avg.rating);
        setCount(ratingsResponse.data._count);
        const favoritesResponse = await favorites({id, token}).unwrap();
        setIsFavorite(favoritesResponse.data);

        const shoppingListResponse = await getShoppingList(token).unwrap();
        dispatch(setShoppingList(shoppingListResponse.data.ingredients));
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    })();
  }, [id]);

  return (
    <>
      <Container className="recipe-container">
        {recipe && (
          <div className="recipe-details">
            <Row className='recipe-section'>
              <Col md={1} sm={1} xs={1} >
                <Dropdown>
                  <Dropdown.Toggle className="dropdown-toggle" variant="outline-secondary" id="dropdown-basic">
                    <FaEllipsisV />
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ minWidth: '20px' }} >
                    {
                      (recipe.chef.emailId == userName) && <Dropdown.Item onClick={onDelete}><FaTrash style={{width: "100%"}} /></Dropdown.Item>
                    }
                    {
                      (recipe.chef.emailId == userName) && <Dropdown.Item onClick={toggleEditRecipeModal}><FontAwesomeIcon style={{width: "100%"}} icon={faEdit} /></Dropdown.Item>
                    }
                    {
                      userName && <Dropdown.Item onClick={onToggleFavorites}>{isFavorite ? <FaBookmark style={{width: "100%"}} /> :<FaRegBookmark style={{width: "100%"}}/>}</Dropdown.Item>
                    }
                    <Dropdown.Item onClick={() => navigate(`/users/${recipe.chef.id}`)}><FaUser style={{width: "100%"}} /></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </Col>
                <Col md={10} sm={10} xs={10} className='recipe-section'>
                <Row>
                  <Col md={7}>
                    <Carousel>
                      {
                        recipe?.images.length !== 0 
                          ? recipe.images.map(({ url }: {url: string}, index: number) => <Image className='recipe-image' key={index} src={url} />)
                          : <Image className='recipe-image' src={recipePlaceholderImage} />
                      }
                    </Carousel>
                  </Col>
                  <Col md={5}>
                    <h1 className="text-center recipe-titile" >{recipe?.title}</h1>
                      <br />
                    <p className='recipe-description'>{recipe.description}</p>
                    <ul className="recipe-tags diet">
                      <li key={1}>{recipe.diet.name}</li>
                    </ul>
                    {
                      ratings ? <>
                      <Row>
                        <Col>
                          <Ratings rating={ratings} />
                        </Col>
                        <Col>
                        <p>Number of ratings: {count}</p>
                        </Col>
                      </Row>
                      </> : <p>No ratings yet.</p>
                    }
                    <Link className='add' to={`/users/${recipe.chef.id}`} style={{textDecoration: "none"}}>
                    <p><FaUser /> : {recipe.chef.firstName} { recipe.chef.lastName} </p>
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className='recipe-section'>
                    <div
                      style={{
                        display:'flex', justifyContent:"center", alignItems:"center"
                      }}
                    >

                      <ul className="recipe-tags">
                        {
                          recipe.tags.map(({id, text}) => (
                            <li key={id}>{text}</li>
                          ))
                        }
                      </ul>
                    </div>
                  </Col>
                  {
                    recipe.allergen.length > 0 && <Col className='recipe-section'>
                    <h3 className='text-center'>Allergens</h3>
                    <div
                      style={{
                        display:'flex', flexDirection:"row", flexWrap :"wrap", justifyContent: "center"
                      }}
                    >

                      {recipe.allergen.map(a => <p key={a.id} style={{margin: "0px 3px"}} className=' text-center allergen'>{a.name}</p>)}
                    </div>
                    </Col>
                  }
                </Row>
                <Row className='recipe-section' >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <h1 className='text-center'>Ingredients</h1>
                    <FontAwesomeIcon style={{ cursor: "pointer", marginLeft: "20px" }} onClick={() => navigate("/shopping-list")} icon={faListCheck} />
                  </div>
                  <div style={
                    {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column"
                    }
                  }>
                  {
                    recipe.ingredients && 
                    recipe.ingredients.map((ingredient)=>{
                      return (
                        <Row key={ingredient.id} style={{width: "400px"}}>
                          <Col md={2} sm={2}>
                            <a onClick={() => addOrRemoveToList(ingredient.id)} className={(isInList(ingredient.id) ? 'remove' : 'add') + ' ingredient-button'}>
                              {
                                isInList(ingredient.id) ? <FaMinusCircle /> : <FaPlusCircle />
                              }
                            </a>
                          </Col>
                          <Col md={10} sm={10}>
                            {ingredient.quantity} {`${ingredient.unit}${ingredient.quantity > 1 ? "s" : ""}`} {ingredient.name}
                          </Col>
                        </Row>
                      )
                    })
                  }
                  </div>
                </Row>
              <Row
                className='recipe-section'
              >
                <h1 className='text-center'>Steps</h1>
                  <div style={
                    {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column"
                    }
                  }>

                    {
                      recipe.steps.map((step, index) =><Row style={{cursor: "pointer"}} onClick={() => setStepProgress(index)}>
                      <p className={stepProgress === index ? "current-step step" : "step"} >{stepProgress == index && <span style={{position: "relative", left: "-30px"}}> <div className='tracker'><FaHandPointRight  className="add" /></div></span> } {index + 1}. {step}</p>
                    </Row>)
                    }
                  </div>

              </Row>
              <div style={
                    {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column"
                    }
                  }>

                <Row style={{width: "50rem"}}>
                  <Col md={12}>
                    <InfiniteScrollList loadData={loadReviews} review={true} searchValue={id} />
                  </Col>
                </Row>
                  </div>
              </Col>
              <Col md={1} sm={1} xs={1}>
              </Col>
            </Row>
            <EditRecipeModal recipe={editRecipeModalProps.recipe} onToggle={toggleEditRecipeModal} isVisible={editRecipeModalProps.visible} />
          </div>
        )}
        {
          !recipe && <Error status={404} message={"Not Found"} />
        }
      </Container>
    </>
  );
};

export default Recipe;