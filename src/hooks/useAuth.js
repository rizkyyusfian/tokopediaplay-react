import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        // You can perform API calls here to authenticate the user
        // For example:
        try {
            const response = await fetch('https://tokopediaplay.up.railway.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                setError(null);
                console.log(userData);
                sessionStorage.setItem('user', JSON.stringify(userData));
            } else {
                setError('Invalid credentials');
                console.log(error);
            }
        } catch (error) {
            setError('An error occurred');
            console.log(error);
        }
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('user');
        navigate('/');

    };

    return { user, error, login, logout };
};

export default useAuth;
