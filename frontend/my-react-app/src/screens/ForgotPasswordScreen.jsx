import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

const API_URL = import.meta.env.VITE_API_URL;

function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const modeSelector = useSelector(state => state.darkMode.Mode);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const { data } = await axios.post(
                `${API_URL}/api/users/forgot-password/`,
                { email },
                { withCredentials: true }
            );
            setMessage(data.message);
            setEmail('');
        } catch (err) {
            setError(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormContainer>
            <h1 className={modeSelector ? 'text-white' : ''}>Forgot Password</h1>
            {loading && <Loader />}
            {message && <Message variant="success">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-3' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Form.Text className="text-muted">
                        Enter your email address and we'll send you a link to reset your password.
                    </Form.Text>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3' disabled={loading}>
                    Send Reset Link
                </Button>
            </Form>
        </FormContainer>
    );
}

export default ForgotPasswordScreen;
