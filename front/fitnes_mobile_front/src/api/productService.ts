import { ProductR } from "../dtos/dtos";
import api from "./apiClient";

export class ProductService {
    /**
     * Fetch all products.
     * @returns List of all products.
     */
    public static async getAllProducts(): Promise<ProductR[]> {
        const response = await api.get<ProductR[]>('/api/products');
        return response.data;
    }

    /**
     * Fetch products by day ID.
     * @param dayId Day ID.
     * @returns Products for the specified day.
     */
    public static async getProductsByDay(dayId: Number): Promise<ProductR[]> {
        const response = await api.get<ProductR[]>(`/api/products/byDay/${dayId}`);
        return response.data;
    }

    /**
     * Create a new product.
     * @param productR Data for the new product.
     * @returns Created product details.
     */
    public static async createProduct(productR: ProductR): Promise<ProductR> {
        const response = await api.post<ProductR>('/api/products', productR);
        return response.data;
    }
}
