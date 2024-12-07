export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    height: number;
    weight: number;
    categoryId: number;
}

export interface AuthResponseDto {
    accessToken: string;
    refreshToken: string;
}

import api from './apiClient';
import { saveRefreshToken, saveAccessToken } from '../utils/storage';

export class AuthService {
    public static async login(loginDto: LoginDto): Promise<AuthResponseDto> {
        try {
            const response = await api.post<AuthResponseDto>('/auth/login', loginDto);
            const { accessToken, refreshToken } = response.data;

            await saveAccessToken(accessToken);
            await saveRefreshToken(refreshToken);

            return response.data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }

    public static async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
        try {
            const response = await api.post<AuthResponseDto>('/auth/register', registerDto);
            const { accessToken, refreshToken } = response.data;

            await saveAccessToken(accessToken);
            await saveRefreshToken(refreshToken);

            return response.data;
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    }
}
