import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

const API_URL = import.meta.env.VITE_API_URL;

function ResetPasswordScreen() {
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const modeSelector = useSelector(state => state.darkMode.Mode);

    const uid = searchParams.get('uid');
    const token = searchParams.get('token');

    useEffect(() => {
        if (!uid || !token) {
            setError('Invalid reset link');
        }
    }, [uid, token]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const { data } = await axios.post(
                `${API_URL}/api/users/reset-password/`,
                { uid, token, password },
                { withCredentials: true }
            );
            setMessage(data.message);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
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
            <h1 className={modeSelector ? 'text-white' : ''}>Reset Password</h1>
            {loading && <Loader />}
            {message && <Message variant="success">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-3' controlId='password'>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter new password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Form.Text className="text-muted">
                        Must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character.
                    </Form.Text>
                </Form.Group>

                <Form.Group className='my-3' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm new password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3' disabled={loading || !uid || !token}>
                    Reset Password
                </Button>
            </Form>
        </FormContainer>
    );
}

export default ResetPasswordScreen;
