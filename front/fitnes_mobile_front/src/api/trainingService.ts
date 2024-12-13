import { TrainingW, TrainingR } from "../dtos/dtos";
import api from "./apiClient";

export class TrainingService {
    /**
     * Create a new training.
     * @param trainingW Data for the new training.
     * @returns Created training details.
     */
    public static async createTraining(trainingW: TrainingW): Promise<TrainingR> {
        const response = await api.post<TrainingR>('/api/trainings', trainingW);
        return response.data;
    }

    /**
     * Fetch training details by ID.
     * @param trainingId Training ID.
     * @returns Training details.
     */
    public static async getTraining(trainingId: Number): Promise<TrainingR> {
        const response = await api.get<TrainingR>(`/api/trainings/${trainingId}`);
        return response.data;
    }

    /**
     * Fetch trainings by day ID.
     * @param dayId Day ID.
     * @returns Trainings for the specified day.
     */
    public static async getTrainingsByDay(dayId: Number): Promise<TrainingR[]> {
        const response = await api.get<TrainingR[]>(`/api/trainings/byDay/${dayId}`);
        return response.data;
    }

    public static async getTrainingsByUser(userId: number): Promise<TrainingR[]> {
        const response = await api.get<TrainingR[]>(`/api/trainings/byUser/${userId}`);
        return response.data;
    }

    public static async getTrainings(): Promise<TrainingR[]> {
        const response = await api.get<TrainingR[]>(`/api/trainings`);
        return response.data;
    }

    public static async getTrainingsByName(text: string): Promise<TrainingR[]> {
        const response = await api.get<TrainingR[]>(`/api/trainings`);
        return response.data;
    }
}