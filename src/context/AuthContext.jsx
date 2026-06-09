import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (storedUser) {

            setUser(JSON.parse(storedUser));
        }

    }, []);

    const login = (response) => {

        localStorage.setItem(
            "token",
            response.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(response.user)
        );

        setUser(response.user);
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>

    );
};