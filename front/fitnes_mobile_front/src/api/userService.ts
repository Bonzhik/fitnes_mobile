export interface UserCategoryDto {
    id: number;
    categoryName: string;
}

export interface UserDto {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    height: number;
    weight: number;
    category: UserCategoryDto;
}

import api from './apiClient';

export class UserService {
    /**
     * Fetch the currently authenticated user's details.
     * @returns {Promise<UserDto>} The user's information.
     */
    public static async getCurrentUser(): Promise<UserDto> {
        try {
            const response = await api.get<UserDto>('/api/users');
            return response.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    }
}