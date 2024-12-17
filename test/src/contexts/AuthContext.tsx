import React, { createContext, ReactNode, useState } from 'react';
import { saveRefreshToken, removeRefreshToken, saveAccessToken, removeAccessToken } from '../utils/storage';

export interface AuthContextType {
    login: () => Promise<void>;
    logout: () => Promise<void>;
    isAuth: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const login = async () => {
        setIsAuth(true);
    };

    const logout = async () => {
        setIsAuth(false);
    };

    return (
        <AuthContext.Provider value={{ login, logout, isAuth}}>
            {children}
        </AuthContext.Provider>
    );
};
