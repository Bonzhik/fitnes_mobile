import EncryptedStorage from 'react-native-encrypted-storage';

export const saveRefreshToken = async (refreshToken: string) => {
    try {
        await EncryptedStorage.setItem('refresh_token', refreshToken);
    } catch (error) {
        console.error('Error in saving refresh-token', error);
    }
};

export const getRefreshToken = async (): Promise<string | null> => {
    try {
        return await EncryptedStorage.getItem('refresh_token');
    } catch (error) {
        console.error('Error in getting refresh-token', error);
        return null;
    }
};

export const removeRefreshToken = async () => {
    try {
        await EncryptedStorage.removeItem('refresh_token');
    } catch (error) {
        console.error('Error in removing refresh-token', error);
    }
};

export const saveAccessToken = async (accessToken: string) => {
    try {
        await EncryptedStorage.setItem('access_token', accessToken);
    } catch (error) {
        console.error('Error in saving access-token', error);
    }
};

export const getAccessToken = async (): Promise<string | null> => {
    try {
        return await EncryptedStorage.getItem('access_token');
    } catch (error) {
        console.error('Error in getting access-token', error);
        return null;
    }
};

export const removeAccessToken = async () => {
    try {
        await EncryptedStorage.removeItem('access_token');
    } catch (error) {
        console.error('Error in removing access-token', error);
    }
};

export const saveUserId = async (userId: Number) => {
    try {
        await EncryptedStorage.setItem('userId', userId.toString());
    } catch (error) {
        console.error('Error in saving userId', error);
    }
};

export const getUserId = async (): Promise<Number | null> => {
    try {
        const userId = await EncryptedStorage.getItem('userId');
        return userId ? Number(userId) : null;
    } catch (error) {
        console.error('Error in getting userId', error);
        return null;
    }
};

export const removeUserId  = async () => {
    try {
        await EncryptedStorage.removeItem('userId');
    } catch (error) {
        console.error('Error in removing userId', error);
    }
};

