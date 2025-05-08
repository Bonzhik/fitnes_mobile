export interface DayW {
    dayDate: string;
    productIds: number[][];
    trainingIds: number[];
}

export interface DayR {
    id: number;
    dayDate: string;
}

export interface ExerciseR {
    id: number;
    name: string;
    description: string;
}

export interface ProfileCommentW {
    text: string;
    rating: number;
    commentTo: number;
}

export interface ProfileCommentR {
    id: number;
    text: string;
    userR: UserDto;
    rating: number;
}

export interface TrainingCommentW {
    text: string;
    rating: number;
    commentTo: number;
}

export interface TrainingCommentR {
    id: number;
    text: string;
    userR: UserDto;
    rating: number;
}

export interface TrainingW {
    name: string;
    description: string;
    exerciseIds: number[];
    categoryId: number;
}

export interface TrainingR {
    id: number;
    name: string;
    description: string;
    rating: number;
    createdBy: UserDto;
}

export interface PlannerR {
    id: number;
}

export interface UserCategoryDto {
    id: number;
    categoryName: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    height: number;
    weigth: number;
    description: string;
    gender: Gender;
    categoryId: number;
}

export interface AuthResponseDto {
    accessToken: string;
    refreshToken: string;
}

export interface UserCategoryDto {
    id: number;
    categoryName: string;
}

export interface UserDto {
    id: number;
    email: string;
    imageUrl: string;
    firstName: string;
    lastName: string;
    height: number;
    weigth: number;
    rating: number;
    description: string;
    gender: Gender;
    categoryR: UserCategoryDto;
}

export enum Gender {
    MALE,
    FEMALE
}
export interface ProductR{
    id : number;
    imageUrl: string;
    name: string;
    proteins: number;
    fats: number;
    carbohydrates: number;
    kcals: number;
}

export interface ProductItemR{
    product: ProductR;
    count: number;
}