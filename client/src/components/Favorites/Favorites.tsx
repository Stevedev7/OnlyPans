import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Error from "../Error";
import { Container } from "react-bootstrap";
import InfiniteScrollList from "../InfiniteScrollList";
import { useLazyGetFavoritesQuery } from "../../slices/favoritesApi";

const Favorites = () => {
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const [getFavorites] = useLazyGetFavoritesQuery();
  const loadRecipe = async (page, limit, searchValue="", token="") => {
    try {
      const response = await getFavorites({page, limit, searchValue, token}).unwrap();
      return response
  } catch (error) {
      console.log("Failed to get recipes");
  }
}

  return (<>
  
    {
        isAuthenticated ? 
        <Container>
            <h1>Favorites</h1>
        <InfiniteScrollList loadData={loadRecipe} recipe searchValue={""} token={token}/>
        </Container>
        : <Error status={401} message={"Please Login"}/>
    }
  </>
  )
}

export default Favorites