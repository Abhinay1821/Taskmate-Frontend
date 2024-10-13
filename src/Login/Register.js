import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { useAuth } from './AuthProvider';

const RegisterForm = () => {
    const { setAuthToken } = useAuth();
    const [message, setMessage] = React.useState(null);
    const [name, setName] = React.useState('');  
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate(); 

    const handleRegister = async (event) => {
        event.preventDefault(); 
        try {
            const result = await fetch('https://abhinay-backend-dvazccevfsavezaq.centralindia-01.azurewebsites.net/api/auth/register', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    name: name,      
                    email: email,      
                    password: password 
                }),
            });
            const resp = await result.json();
            if (resp['token'] !== undefined) {
                setAuthToken(resp.token);
                navigate('/dashboards');  
            } else {
                setMessage(resp.message);
            }
        } catch (error) {
            console.log(error);
            setMessage(error.toString());
        }
    };

    return (
        <div className="register-form">
            <h2>Create Your Account</h2>
            <form onSubmit={handleRegister}>
                <label>Name</label> 
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <button className="register-btn" type="submit">Register</button>
                {message && <p style={{ color: 'red' }}>{message}</p>}
            </form>
            <p>Already have an account? <a href="#" onClick={() => navigate('/')}>Login</a></p> {/* Redirect back to login */}
        </div>
    );
};

export default RegisterForm;
