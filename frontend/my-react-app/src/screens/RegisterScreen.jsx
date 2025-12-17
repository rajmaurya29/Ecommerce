import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { fetchUser } from '../redux/slices/UserSlice'

function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector(state => state.user);
    const { userInfo, loading, error } = userLogin;
    const modeSelector = useSelector(state => state.darkMode.Mode);


    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else if (!passwordRegex.test(password)) {
            setMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
        } else {
            setMessage('');
            try {
                await axios.post("https://ecommerce-1-pt17.onrender.com/api/users/register/", { "name": name, "email": email, "password": password }, { withCredentials: true });
                dispatch(fetchUser({ "username": email, "password": password }));
            } catch (error) {
                setMessage(error.response && error.response.data.detail ? error.response.data.detail : error.message);
            }
        }
    };

    return (
        <FormContainer>
            <h1 className={modeSelector ? 'text-white' : ''}>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                    <Form.Text className="text-muted">
                        Must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character.
                    </Form.Text>
                </Form.Group>

                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3'>
                    Register
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account?{' '}
                    <Link to={'/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default RegisterScreen