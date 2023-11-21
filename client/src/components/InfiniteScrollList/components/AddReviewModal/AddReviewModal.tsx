import { Modal } from "react-bootstrap";
import AddReview from "../../../AddReview";

interface IAddReviewModalProps {
    onToggle: () => void;
    isVisible: boolean;
    id: number;
    }
    
const AddReviewModal = ({onToggle, isVisible, id}: IAddReviewModalProps) => {
    return <Modal show={isVisible} onHide={onToggle} >
        <Modal.Header closeButton>
            <Modal.Title>Review</Modal.Title>
        </Modal.Header>
        <AddReview id={id} onToggle={onToggle} />
    </Modal>
}

export default AddReviewModal