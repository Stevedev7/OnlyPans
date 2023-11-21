import { Button, Card, Container, Image, Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useLazyUserRecipesQuery, useProfileQuery } from '../../../../slices/usersApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import profileImageUrl from '../../../../../assets/img/profileImage.jpg'

import './UserProfile.css';
import InfiniteScrollList from '../../../InfiniteScrollList';
import AddEditRecipe from '../../../AddEditRecipe';
import { useEffect, useState } from 'react';
import { resetImages } from '../../../../slices/images';

const AddRecipeModal = ({onToggle, isVisible}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if(!isVisible){
      dispatch(resetImages());
    }
  }, [isVisible])
  return <Modal size={"lg"} show={isVisible} onHide={onToggle}>
    <AddEditRecipe onToggle={onToggle} />
  </Modal>
}

const UserProfile = () => {
  const {  userId } = useSelector((state: RootState) => state.auth);
  const { data, isLoading } = useProfileQuery(userId)
  const [isAddModalVisible,setAddModalVisible] = useState(false)

  const [userRecipes] = useLazyUserRecipesQuery();
  
  if (isLoading) {
    return <Spinner />; 
  }

  const onAddModalToggle = () => {
    setAddModalVisible(!isAddModalVisible)
  }

  const loadRecipe = async (page, limit, searchValue=userId, token) => {
    try {
      const response = await userRecipes({page, limit, id:searchValue}).unwrap();
      return response
    } catch (error) {
      console.log("Failed to get recipes");
    }
  }

  return (
    <Container>
      <Card className="user-profile-card">
        <div className="edit-icon-container">
          <FontAwesomeIcon icon={faEdit} className="edit-icon" />
        </div>
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
          <div className="profile-buttons">
            <Link to="/favorites" className="profile-button">
              Favorites
            </Link>
            <Link to="/shopping-list" className="profile-button">
              Shopping List
            </Link>
          </div>
        </Card.Body>
      </Card>
          <Button className="m-2" onClick={onAddModalToggle} >Add recipe</Button>
          <AddRecipeModal onToggle={onAddModalToggle} isVisible={isAddModalVisible} />
      <InfiniteScrollList loadData={loadRecipe} recipe searchValue={userId} />
    </Container>
  );
};

export default UserProfile;

