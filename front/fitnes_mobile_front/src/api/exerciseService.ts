import api from "./apiClient";
import { ExerciseR } from "../dtos/dtos";

export class ExerciseService {
    /**
     * Fetch exercise details by ID.
     * @param exerciseId Exercise ID.
     * @returns Exercise details.
     */
    public static async getExercise(exerciseId: number): Promise<ExerciseR> {
        const response = await api.get<ExerciseR>(`/api/exercises/${exerciseId}`);
        return response.data;
    }

    /**
     * Fetch exercises by training ID.
     * @param trainingId Training ID.
     * @returns Exercises for the specified training.
     */
    public static async getExercisesByTraining(trainingId: number): Promise<ExerciseR[]> {
        const response = await api.get<ExerciseR[]>(`/api/exercises/byTraining/${trainingId}`);
        return response.data;
    }
}