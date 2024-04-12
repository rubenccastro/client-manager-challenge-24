import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = (token) => {
        localStorage.setItem("authToken", token);
    };

    const authenticateUser = (user) => {
        // Get the stored token from the localStorage
        const storedToken = localStorage.getItem("authToken");

        // If the token exists in the localStorage
        if (storedToken) {
            // Send a request to the server using axios
            axios.get('https://app.grupoerre.pt:1934/user/info', { headers: { Authorization: `Bearer ${storedToken}` } }).then((response) => {
                setUser(response.data.userInfo);
            }
            ).catch((error) => {
                console.error(error);
            });
            axios.get(
                `https://app.grupoerre.pt:1934/auth/check-authentication-status`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
                .then((response) => {
                    if (response.data.isUserAuthenticated === true) {
                        setIsLoggedIn(true);
                        setIsLoading(false);
                    } else {
                        setIsLoggedIn(false);
                        setIsLoading(false);
                    }
                })

        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    };

    const removeToken = () => {
        axios.get('https://app.grupoerre.pt:1934/auth/logout', { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } });
        localStorage.removeItem("authToken");
    };

    const logOutUser = () => {
        // Upon logout, remove the token from the localStorage
        removeToken();
        authenticateUser();
    };

    useEffect(() => {
        // Run this code once the AuthProviderWrapper component in the App loads for the first time.
        // This effect runs when the application and the AuthProviderWrapper component load for the first time.
        authenticateUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                user,
                storeToken,
                authenticateUser,
                logOutUser,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthProviderWrapper, AuthContext };
