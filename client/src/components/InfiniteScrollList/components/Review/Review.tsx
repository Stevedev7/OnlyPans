import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row } from 'react-bootstrap'
import profileImage from '../../../../../assets/img/profileImage.jpg'
import './Review.css'
import timeSince from '../../../../utils/timeSince';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { FaTrash } from 'react-icons/fa';
import { useDeleteReviewMutation } from '../../../../slices/recipeApi';
import Ratings from '../Ratings';

const Review = ({ review, reviews, setReviews }) => {
  const {token, userName} = useSelector((state: RootState) => state.auth);
  const [deleteReview] = useDeleteReviewMutation();
  const onDelete = async () => {
    try{
      const payload = {
        id: review?.recipeId,
        reviewId: review?.id,
        token
      }
      const response = await deleteReview(payload).unwrap();
      const newReviews = reviews.filter(r => r.id !== review.id)
      setReviews(newReviews);
    } catch(error){
      console.log("Error deleting review", error )
    }
  }

  return (
    <Card className="card" style={{width: "100%"}}>
      <Card.Body>
        <div className="reviews-top">
          <Row>
            <Col xs={10} md={10}>
              <img
                className="avatar"
                src={
                  profileImage
                }
                alt="user avatar"
              />
              <Card.Subtitle className="mb-2 text-muted" tag="h6">
                {review.user.firstName} {review.user.lastName}
              </Card.Subtitle>
              <Ratings rating={review.rating as number} ratingNumber={false} />
            </Col>
            <Col xs={1} md={1} >
            {
              userName === review.user.emailId &&
                <Button variant='danger' onClick={onDelete} ><FaTrash /></Button>
            }
            </Col>
            <Col xs={12} md={12}>
              <Card.Text className="review-text">
                {review.review}
              </Card.Text>
              <small className="text-muted text-bold">
                {`${timeSince(new Date(review.createdAt))} ago`}
              </small>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Review