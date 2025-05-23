import { TrainingW, TrainingR } from "../dtos/dtos";
import api from "./apiClient";

export class TrainingService {
    /**
     * Create a new training.
     * @param trainingW Data for the new training.
     * @returns Created training details.
     */
    public static async createTraining(trainingW: TrainingW): Promise<TrainingR> {
        const response = await api.post<TrainingR>('/trainings', trainingW);
        return response.data;
    }

    /**
     * Fetch training details by ID.
     * @param trainingId Training ID.
     * @returns Training details.
     */
    public static async getTraining(trainingId: Number): Promise<TrainingR> {
        const response = await api.get<TrainingR>(`/trainings/${trainingId}`);
        return response.data;
    }

    /**
     * Fetch trainings by day ID.
     * @param dayId Day ID.
     * @returns Trainings for the specified day.
     */
    public static async getTrainingsByDay(dayId: Number): Promise<TrainingR[]> {
        const response = await api.get<TrainingR[]>(`/trainings/byDay/${dayId}`);
        return response.data;
    }

    public static async getTrainingsByUser(userId: number): Promise<TrainingR[]> {
        const response = await api.get<TrainingR[]>(`/trainings/byUser/${userId}`);
        return response.data;
    }

    public static async getTrainings(): Promise<TrainingR[]> {
        const response = await api.get<TrainingR[]>(`/trainings`);
        return response.data;
    }

    public static async AppendToUser(trainingId : number): Promise<Boolean> {
        const response = await api.patch<Boolean>(`/trainings/appendToUser`, null, {
            params: {
                trainingId: trainingId.toString()
            }
        });
    
        return response.data;
    }

    public static async getTrainingsByName(text: string): Promise<TrainingR[]> {
        const response = await api.get<TrainingR[]>(`/trainings/search`, {params: {
            name : text
        }});
        return response.data;
    }
}