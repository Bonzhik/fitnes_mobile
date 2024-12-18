import { ProductR } from "../dtos/dtos";
import api from "./apiClient";

export class ProductService {
    /**
     * Fetch all products.
     * @returns List of all products.
     */
    public static async getAllProducts(): Promise<ProductR[]> {
        const response = await api.get<ProductR[]>('/products');
        return response.data;
    }

    /**
     * Fetch products by day ID.
     * @param dayId Day ID.
     * @returns Products for the specified day.
     */
    public static async getProductsByDay(dayId: Number): Promise<ProductR[]> {
        const response = await api.get<ProductR[]>(`/products/byDay/${dayId}`);
        return response.data;
    }

    public static async getProducts(): Promise<ProductR[]> {
        const response = await api.get<ProductR[]>(`/products`);
        return response.data;
    }

    public static async getProductsByName(text: string): Promise<ProductR[]> {
        const response = await api.get<ProductR[]>(`/products/search`, {params: {
            name: text
        }});
        return response.data;
    }

    /**
     * Create a new product.
     * @param productR Data for the new product.
     * @returns Created product details.
     */
    public static async createProduct(productR: ProductR): Promise<ProductR> {
        const response = await api.post<ProductR>('/products', productR);
        return response.data;
    }
}
