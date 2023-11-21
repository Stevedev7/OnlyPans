
import { useState } from "react"
import { Button, Col, Form, Row, Toast } from "react-bootstrap"
import ReactStars from 'react-rating-stars-component'
import { useAddReviewMutation } from "../../slices/recipeApi"
import { useSelector } from "react-redux"


interface IAddreviewProps {
    onToggle: () => void;
    id: number;
}
const AddReview = ({onToggle, id}: IAddreviewProps) => {
    const token = useSelector(state => state.auth.token)
    const [formDetails, setFormDetails] = useState({
        review: '',
        rating: 0,
        token
    })
    const [addReview, {isError}] = useAddReviewMutation()
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const onInputChange = (event) => {
        setFormDetails({
            ...formDetails,
            [event.target.name]: event.target.value
        })
    }

    const ratingChanged = (newRating) => {
        setFormDetails({
            ...formDetails,
            rating: newRating,
            token
        })
    }

    const onReviewSubmit = async (event) => {
        try {
            event.preventDefault()
            const response = await addReview({id,...formDetails})
            if(response.error){
                setToastMessage(response.error.data.error.message);
                setShowToast(true)
                return
            }
            onToggle()
            window.location.reload(false);
        } catch (error) {
            console.log(error)
        }
    }

    return <Form className="p-4" onSubmit={onReviewSubmit}>
        {/* <h2 className="mb-4 font-weight-bold">Add review</h2> */}
        <Row>
            <Col>
            <Form.Group controlId="review">
                <Form.Label title="review">
                    <Form.Control name={'review'} type="text" value={formDetails.review} onChange={onInputChange} placeholder="Enter the review" />
                </Form.Label>
            </Form.Group>
            </Col>
        </Row>
        <Row className="mb-4">
            <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
            />
        </Row>
        <Button type="submit">Submit</Button>
        <Toast
            onClose={() => {setShowToast(false); setToastMessage("");}}
            show={showToast}
            delay={4000}
            autohide
        >
            <Toast.Header>Error</Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
    </Form>
}

export default AddReview