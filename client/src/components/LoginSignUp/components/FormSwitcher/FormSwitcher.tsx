import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface IFormSwitcherProps {
    isLogin: boolean,
    switchForm: () => void
}

const FormSwitcher = ({ isLogin, switchForm }: IFormSwitcherProps) => (
    <Container fluid>
        <Row>
            <Col>
                {
                    isLogin
                        ? <p>Don't have an account? <Button variant="link" onClick={() => switchForm()}>Register</Button></p>
                        : <p>Already have an account? <Button variant="link" onClick={() => switchForm()}>Login</Button></p>
                }
            </Col>
        </Row>
    </Container>
);

export default FormSwitcher;