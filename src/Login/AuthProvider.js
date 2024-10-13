import React from 'react'
import { createContext, useContext } from 'react'
import { auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const authContext = createContext()
export function useAuth() {
    return useContext(authContext)
}

export default function AuthProvider({children}) {
    const [userInfo,setUserInfo] = React.useState({})
    const [authToken,setAuthToken] = React.useState(null)
    const navigate = useNavigate()

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            setUserInfo(result.user)
            navigate('/dashboards')
            localStorage.setItem('token',result.user.accessToken)
        } catch (error) {
            navigate('/error')
            console.error("Error logging in with Google:", error)
        }
    }

    React.useEffect(() => {
        if (authToken) {
            localStorage.setItem('authToken', authToken); // Store token when updated
        } 
    }, [authToken]);

    const handleLogout = () => {
        setAuthToken(null);
        localStorage.removeItem('authToken');
    };

    // React.useEffect(()=>{
    //     async function fetchAuth(){
    //         try {
    //             const result = await signInWithPopup(auth, provider)
    //             setUserInfo(result.user)
    //             navigate('/dashboards')
    //             localStorage.setItem('token',result.user.accessToken)
    //             console.log(result.user); // You can handle the user data here
    //         } catch (error) {
    //             navigate('/error')
    //             console.error("Error logging in with Google:", error)
    //         }
    //     }
    //     fetchAuth()
    // },[])

    // React.useEffect(()=>{
    //     const token = localStorage.getItem('token')
    //     if(token){
    //         navigate('/dashboards')
    //     }
    //     else navigate('/')
    // },[navigate])
    return (
        <authContext.Provider value={{userInfo,handleGoogleLogin,authToken,setAuthToken,handleLogout}}>
            {children}
        </authContext.Provider>
    )
}
