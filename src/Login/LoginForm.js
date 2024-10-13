import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Login.css';
import { useAuth } from './AuthProvider';

const LoginForm = () => {
    const { handleGoogleLogin, setAuthToken } = useAuth();
    const [error, setError] = React.useState(null);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault(); 
        try {
            const result = await fetch('https://taskmate-fqgyd3egdbfccvh7.centralindia-01.azurewebsites.net/api/auth/login', {
                method: 'POST',  
                headers: {
                    'Content-Type': 'application/json',  
                },
                body: JSON.stringify({
                    email: email,  
                    password: password,  
                }),
            });
            const resp = await result.json();
            if (resp['token'] !== undefined) {
                setAuthToken(resp.token);
                navigate('/dashboards'); 
            } else {
                setError('Please Register first!');
            }
        } catch (error) {
            console.log(error);
            setError(error.toString());
        }
    };

    return (
        <div className="login-form">
            <h2>Welcome to TaskMate</h2>
            {/* <button className="google-btn" onClick={handleGoogleLogin}>Login with Google</button>
            <p>or login with email</p> */}
            <form onSubmit={handleLogin}> 
                <label>Email address</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="form-options">
                    <input type="checkbox" /> Remember me
                    <a href="#">Forgot Password?</a>
                </div>
                <button className="login-btn" type="submit">Login</button> {/* No need for onClick here */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            {/* On clicking "Register", the user will be redirected to the Register page */}
            <p>Don’t have an account? <a href="#" onClick={() => navigate('/register')}>Register</a></p>
        </div>
    );
};

export default LoginForm;
