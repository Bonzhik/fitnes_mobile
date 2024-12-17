import api from './apiClient';
import { UserDto } from '../dtos/dtos';
import { saveUserId } from '../utils/storage';

export class UserService {
    /**
     * Fetch the currently authenticated user's details.
     * @returns {Promise<UserDto>} The user's information.
     */
    public static async getCurrentUser(): Promise<UserDto> {
        try {
            const response = await api.get<UserDto>('/users');
            await saveUserId(response.data.id);
            return response.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    }

    public static async getFilteredUsers(): Promise<UserDto[]>{
        try{
            const response = await api.get<UserDto[]>('/users/filtered');
            return response.data;
        } catch(error){
            console.error('Error fetching user data:', error);
            throw error;
        }
    }
}