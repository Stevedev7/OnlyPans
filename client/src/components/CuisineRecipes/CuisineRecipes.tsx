import { useParams } from 'react-router';
import { useLazyAllCuisineRecipesQuery } from '../../slices/recipeApi'
import InfiniteScrollList from '../InfiniteScrollList'
import { Container, Spinner } from 'react-bootstrap';
import { useGetCuisineQuery } from '../../slices/cuisineApi';
import Error from '../Error';

const CuisineRecipes = () => {
  const { id } = useParams();
  const [allRecipes] = useLazyAllCuisineRecipesQuery();
  const {data, isLoading, error} = useGetCuisineQuery(id);
  const loadRecipes = async (page, limit) => {
    try {
      return await allRecipes({ id, page, limit }).unwrap();
    }catch(error){
      console.log("Failed to fetch Recipes.");
    }
  }
  if(error){
    return <Error status={error.status} message={error.data.error.message}/>
  }
  if(isLoading){
    return(
      <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status"/>
      </div>
    )
  }
  return (
    <Container>
      <h1 className='text-center'>All {data.data.name} Recipes</h1>
      <InfiniteScrollList recipe loadData={loadRecipes} />
    </Container>
  )
}

export default CuisineRecipes