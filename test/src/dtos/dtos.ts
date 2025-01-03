export interface DayW {
    dayDate: string; // ISO string
    productIds: number[];
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
    commentTo: number;
}

export interface ProfileCommentR {
    id: number;
    text: string;
    userR: UserDto;
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
    createdBy: UserDto;
}

export interface PlannerR {
    id: number;
}

export interface UserDto {
    id: number;
    imageUrl: string;
    email: string;
    firstName: string;
    lastName: string;
    height: number;
    weigth: number;
    category: UserCategoryDto;
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
    firstName: string;
    lastName: string;
    height: number;
    weight: number;
    categoryR: UserCategoryDto;
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