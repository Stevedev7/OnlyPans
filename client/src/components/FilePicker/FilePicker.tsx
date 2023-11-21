import { PickerOverlay } from 'filestack-react-18';
import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setImageUrls } from '../../slices/images';
import { RootState } from '../../store';

const FilePicker = () => {
  const fileStackKey = import.meta.env.VITE_REACT_FILESTACK_KEY

  const images = useSelector((state: RootState) => state.images.imageUrls);
  const dispatch = useDispatch();
  
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true)
  }

  const handleHide = () => {
    setShow(false)
  }

  const handleUploadDone = (res) => {
    dispatch(setImageUrls(res.filesUploaded.map(({ url }) => url)))
    handleHide()
  }

  return (
    <Container>
      <Button type= 'button' onClick={handleShow}>Choose Images</Button>
      {
        show &&(
          <PickerOverlay
            apikey={fileStackKey}
            onSuccess={handleUploadDone}
          />
        )
      }
    </Container>
  )
}

export default FilePicker