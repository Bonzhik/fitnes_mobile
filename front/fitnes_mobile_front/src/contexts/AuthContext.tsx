import React, {createContext, useState, ReactNode} from 'react';
import { saveRefreshToken, removeRefreshToken} from '../utils/storage';

export interface AuthContextType{
    accessToken: string | null;
    login: (accessToken: string, refreshToken: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children : ReactNode}) => {
   const [accessToken, setAccessToken] = useState<string | null>(null);

   const login = async (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    await saveRefreshToken(refreshToken);
   };

   const logout = async() => {
    setAccessToken(null);
    await removeRefreshToken();
   };

   return(
    <AuthContext.Provider value = {{accessToken, login, logout}}>
        {children}
    </AuthContext.Provider>
   );
};
