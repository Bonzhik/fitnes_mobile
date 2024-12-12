import { PlannerR } from "../dtos/dtos";
import api from "./apiClient";

export class PlannerService {
    /**
     * Fetch planner by the current user.
     * @returns Planner details.
     */
    public static async getPlanner(userId: Number): Promise<PlannerR> {
        const response = await api.get<PlannerR>(`/api/users/${userId}/planners`);
        return response.data;
    }
}