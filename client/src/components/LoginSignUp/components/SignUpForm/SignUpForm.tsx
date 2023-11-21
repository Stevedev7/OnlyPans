import { Container, FloatingLabel, Toast } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormEvent, useState } from 'react';
import { useRegisterMutation } from '../../../../slices/usersApi';

const SignUpForm = ({onClose, switchForm }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [register] = useRegisterMutation();

    const formSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(password != confirmPassword){
            setShowToast(true);
            setToastMessage("Passwords don't match.");
        } else{
            register({ email, password, firstName, lastName })
                .then(res => res)
                    .then((data: any) => {
                        if(data.error){
                            throw(data.error.data)
                        }
                        switchForm()
                    })
                        .catch(({error}: {error: { message: string}}) => {
                            setToastMessage(error.message);
                            setShowToast(true);
                        })
        }
    }
    return<>
        <Form onSubmit={formSubmit}>
            <Container fluid>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="firstName">
                            <FloatingLabel controlId="floatingInput" label={"First Name"} >
                                <Form.Control type="text" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="lastName">
                            <FloatingLabel controlId="floatingInput" label={"Last Name"} >
                                <Form.Control type="text" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="email">
                            <FloatingLabel controlId="floatingInput" label={"Email address"} >
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="password">
                            <FloatingLabel controlId="floatingInput" label={"Password"} >
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <FloatingLabel controlId="floatingInput" label={"Confirm Password"} >
                                <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
        <Toast
            onClose={() => {setShowToast(false); setToastMessage("");}}
            show={showToast}
            delay={4000}
            autohide
        >
            <Toast.Header>Error</Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
    </>
};

export default SignUpForm;