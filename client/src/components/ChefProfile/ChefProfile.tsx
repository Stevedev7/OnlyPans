import { useParams } from "react-router"
import { useLazyUserRecipesQuery, useProfileQuery } from "../../slices/usersApi";
import Error from "../Error";
import { Card, Container, Image, Spinner } from "react-bootstrap";
import profileImageUrl from '../../../assets/img/profileImage.jpg'
import InfiniteScrollList from "../InfiniteScrollList";

const ChefProfile = () => {
  const {id} = useParams();
  const { data, isLoading, error } = useProfileQuery(Number(id));
  const [userRecipes] = useLazyUserRecipesQuery();


  const loadRecipe = async (page, limit, searchValue=userId, token) => {
    try {
      const response = await userRecipes({page, limit, id:searchValue}).unwrap();
      return response
    } catch (error) {
      console.log("Failed to get recipes");
    }
  }

  if (isLoading) {
    return <Spinner />; 
  }
  
  return (
    <>
        {error && <Error status={error.status as number} message={error.data.error.message} /> }
    {data && 
      <div className="container mt-5" >
        <Container>
          <Card className="user-profile-card">
          <div className="text-center">
            <Image
              src={profileImageUrl}
              alt={isLoading ? 'Loading' : `${data.emailId}'s profile`}
              roundedCircle
              className="profile-image"
              />
          </div>
          <Card.Body>
            <Card.Title className="text-center profile-title">
              {data.firstName} {data.lastName}
            </Card.Title>
            <Card.Text className="text-center profile-username">{data.emailId}</Card.Text>
          </Card.Body>
        </Card>
          <InfiniteScrollList loadData={loadRecipe} recipe searchValue={id} />
        </Container>

      </div>
    }
    </>
  )
}

export default ChefProfile