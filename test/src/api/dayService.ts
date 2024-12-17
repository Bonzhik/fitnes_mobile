import api from './apiClient';
import { DayW, DayR } from '../dtos/dtos';

export class DayService {
    /**
     * Create a new day.
     * @param dayW Data for the new day.
     * @returns Created day details.
     */
    public static async createDay(dayW: DayW): Promise<DayR> {
        const response = await api.post<DayR>('/days', dayW);
        return response.data;
    }

    /**
     * Fetch days by the current user.
     * @returns List of days.
     */
    public static async getDaysByUser(userId : Number): Promise<DayR[]> {
        const response = await api.get<DayR[]>(`/days/byUser/${userId}`);
        return response.data;
    }
}