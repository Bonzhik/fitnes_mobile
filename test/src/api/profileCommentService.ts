import { ProfileCommentW, ProfileCommentR } from "../dtos/dtos";
import api from "./apiClient";


export class ProfileCommentService {
    /**
     * Create a new profile comment.
     * @param profileCommentW Data for the new comment.
     * @returns Created comment details.
     */
    public static async createProfileComment(profileCommentW: ProfileCommentW): Promise<boolean> {
        const response = await api.post<boolean>('/profileComments', profileCommentW);
        return response.data;
    }

    /**
     * Fetch profile comments for the current user.
     * @returns List of profile comments.
     */
    public static async getComments(userId : Number): Promise<ProfileCommentR[]> {
        const response = await api.get<ProfileCommentR[]>(`/users/${userId}/comments`);
        return response.data;
    }
}