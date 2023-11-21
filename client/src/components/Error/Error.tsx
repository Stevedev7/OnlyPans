import { Container } from 'react-bootstrap'
import './Error.css'
const Error = ({ status, message }) => {
  return (
    <Container className='error-container' fluid >
      <div className='error-container-div'>
        <h1 className='error-h1' >{ status} { message }</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus itaque eos consectetur accusamus cupiditate modi nesciunt fugit pariatur. Sint a eius quo laborum quasi veniam vero quidem dolor, tenetur eveniet.</p>
      </div>
    </Container>
  )
}
export default Error