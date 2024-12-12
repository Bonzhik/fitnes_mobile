import api from './apiClient';
import { saveRefreshToken, saveAccessToken } from '../utils/storage';
import { LoginDto, RegisterDto, AuthResponseDto } from '../dtos/dtos';
import { UserService } from './userService';

export class AuthService {
    public static async login(loginDto: LoginDto): Promise<AuthResponseDto> {
        try {
            const response = await api.post<AuthResponseDto>('/auth/login', loginDto);
            const { accessToken, refreshToken } = response.data;

            await saveAccessToken(accessToken);
            await saveRefreshToken(refreshToken);

            await UserService.getCurrentUser();

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
