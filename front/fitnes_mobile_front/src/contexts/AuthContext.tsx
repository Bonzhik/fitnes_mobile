import React, { createContext, ReactNode, useState } from 'react';
import { saveRefreshToken, removeRefreshToken, saveAccessToken, removeAccessToken } from '../utils/storage';

export interface AuthContextType {
    login: (accessToken: string, refreshToken: string) => Promise<void>;
    logout: () => Promise<void>;
    isAuth: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const login = async (accessToken: string, refreshToken: string) => {
        await saveAccessToken(accessToken);
        await saveRefreshToken(refreshToken);
        setIsAuth(true);
    };

    const logout = async () => {
        await removeAccessToken();
        await removeRefreshToken();
        setIsAuth(false);
    };

    return (
        <AuthContext.Provider value={{ login, logout, isAuth}}>
            {children}
        </AuthContext.Provider>
    );
};
