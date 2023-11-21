import React from 'react';
import Modal from 'react-bootstrap/Modal';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import FormSwitcher from './components/FormSwitcher';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface ILoginSignUpProps {
    show: boolean,
    onClose: () => void
}

const LoginSignUp = ({ show, onClose }: ILoginSignUpProps) => {

    const [isLogin, setIsLogin] = React.useState(true);
    const title = isLogin
        ? 'Login'
        : 'Register';

    return (
        <Modal show={show} onHide={onClose} size="mb">
            <Modal.Header closeButton>
                <Modal.Title>
                    <Container fluid>
                        <Row>
                            <Col>
                                {title}
                            </Col>
                        </Row>
                    </Container>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {isLogin ? <LoginForm onClose={onClose} /> : <SignUpForm onClose={onClose} switchForm={() => setIsLogin(!isLogin)} />}
                <FormSwitcher isLogin={isLogin} switchForm={() => setIsLogin(!isLogin)} />
            </Modal.Body>
        </Modal>
    );
}

export default LoginSignUp;