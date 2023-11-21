import { useState, FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { setAuthenticated, setToken } from '../../../../slices/auth';
import { useLoginMutation } from '../../../../slices/usersApi';

import { FloatingLabel, Toast } from 'react-bootstrap';

interface ILoginFormProps {
    onClose: () => void;
}
const LoginForm = ({onClose}: ILoginFormProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [login] = useLoginMutation();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const formSubmit = (e: FormEvent) => {
        e.preventDefault();
        login({ email, password })
            .then((res) => res)
                .then((data: any) => {
                    if(data.error){
                        throw (data.error.data)
                    }
                    dispatch(setToken(data.data.token))
                    dispatch(setAuthenticated(true))
                    onClose()
                })
                    .catch(({error}: {error: {message: string}}) => {
                        setToastMessage(error.message);
                        setShowToast(true)
                    })
    }
    return (
    <>
        <Form onSubmit={formSubmit}>
            <Form.Group className="mb-3" controlId="email">
                <FloatingLabel label={"Email address"}>
                <Form.Control type="email"placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <FloatingLabel label={"Password"}>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FloatingLabel>
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
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
)};

export default LoginForm;