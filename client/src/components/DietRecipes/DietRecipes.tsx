import { useParams } from 'react-router';
import { useLazyAllDietRecipesQuery } from '../../slices/recipeApi'
import InfiniteScrollList from '../InfiniteScrollList'
import { useGetDietQuery } from '../../slices/dietApi';
import { Container, Spinner } from 'react-bootstrap';
import Error from '../Error';

const DietRecipes = () => {
  const { id } = useParams();
  const {data, isLoading, error} = useGetDietQuery(id);
  const [allRecipes] = useLazyAllDietRecipesQuery();

  const loadRecipes = async (page, limit) => {
    try {
      return await allRecipes({ id, page, limit }).unwrap();
    }catch(error){
      console.log("Failed to fetch Recipes.");
    }
  }
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
    <Container>
      <h1 className='text-center'>All {data.data.name} Recipes</h1>
      <span><h3>About: </h3><p>{data.data.description}</p></span>
      
      <InfiniteScrollList recipe loadData={loadRecipes} />
    </Container>
  )
}

export default DietRecipes