import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

const API_URL = import.meta.env.VITE_API_URL;

function VerifyEmailScreen() {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [verified, setVerified] = useState(false);
    const navigate = useNavigate();
    const modeSelector = useSelector(state => state.darkMode.Mode);

    const uid = searchParams.get('uid');
    const token = searchParams.get('token');

    useEffect(() => {
        if (!uid || !token) {
            setError('Invalid verification link');
            return;
        }

        const verifyEmail = async () => {
            setLoading(true);
            try {
                const { data } = await axios.post(
                    `${API_URL}/api/users/verify-email/`,
                    { uid, token },
                    { withCredentials: true }
                );
                setMessage(data.message);
                setVerified(true);
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

        verifyEmail();
    }, [uid, token]);

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <FormContainer>
            <h1 className={modeSelector ? 'text-white' : ''}>Email Verification</h1>
            {loading && <Loader />}
            {message && <Message variant="success">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            
            {verified && (
                <div className='text-center mt-4'>
                    <p>Your email has been successfully verified. You can now login to your account.</p>
                    <Button variant='primary' onClick={handleLoginRedirect}>
                        Go to Login
                    </Button>
                </div>
            )}
            
            {error && !loading && (
                <div className='text-center mt-4'>
                    <Button variant='primary' onClick={handleLoginRedirect}>
                        Go to Login
                    </Button>
                </div>
            )}
        </FormContainer>
    );
}

export default VerifyEmailScreen;
