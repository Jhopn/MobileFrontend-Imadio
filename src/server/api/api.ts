import { BASE_URL } from '@/src/constants/api-url';
import { Credentials, User } from '@/src/providers/auth/interfaces/schemas';
import axios from 'axios';
import { UpdateSettings } from '../interfaces/schema';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const axiosClient = axios.create({
  baseURL: BASE_URL,
});

export async function createUser(user: User) {
    const response = await axiosClient.post("/user", user)
    return response;
}

export async function loginUser(data: Credentials) {
    const response = await axiosClient.post("/login", data)
    return response;
}

export async function updateSettingsUser(data: UpdateSettings) {
    const tokenStorage = await AsyncStorage.getItem('@auth_token');
    const tokenWithout= tokenStorage?.replaceAll('"', '')

    const response = await axiosClient.patch("/settings", data,{ 
        headers:{
            'Authorization': `Bearer ${tokenWithout}`,
        }
    })
    return response;
}

export async function getSettingsUser() {
    const tokenStorage = await AsyncStorage.getItem('@auth_token');
    const tokenWithout= tokenStorage?.replaceAll('"', '')

    const response = await axiosClient.get("/settings/one", { 
        headers:{
            'Authorization': `Bearer ${tokenWithout}`,
        }
    })
    return response;
}

export async function getConversionUser() {
    const tokenStorage = await AsyncStorage.getItem('@auth_token');
    const tokenWithout= tokenStorage?.replaceAll('"', '')

    const response = await axiosClient.get("/conversion", { 
        headers:{
            'Authorization': `Bearer ${tokenWithout}`,
        }
    })
    return response;
}

export async function postConversionUser(data: FormData) {
    try {
        const tokenStorage = await AsyncStorage.getItem('@auth_token');
        const tokenWithout = tokenStorage ? JSON.parse(tokenStorage) : null;

        if (!tokenWithout) {
            throw new Error('Token de autenticação não encontrado');
        }

        const response = await axiosClient.post("/conversion", data, { 
            headers: {
                'Authorization': `Bearer ${tokenWithout}`,
                'Content-Type': 'multipart/form-data',
            },
            timeout: 40000
        });

        return response;
    } catch (error) {
        console.error('Erro detalhado na requisição:', error.response?.data || error.message);
        throw error;
    }
}

export async function deleteConversionUser(id: string) {
    const tokenStorage = await AsyncStorage.getItem('@auth_token');
    const tokenWithout= tokenStorage?.replaceAll('"', '')

    const response = await axiosClient.delete(`/conversion/${id}`, {
        headers:{
            'Authorization': `Bearer ${tokenWithout}`,
        }
    });
    return response;
}

export async function requestPasswordReset(email: string) {
    const response = await axiosClient.post(`/token`, {email: email});
    await AsyncStorage.setItem('@token_user', response.data.passwordRedefinition.id)
    return response;
}


export async function verifyCode(code: string) {
    const tokenIdRecuperation = await AsyncStorage.getItem('@token_user');

    const data  = {
        tokenId: tokenIdRecuperation,
        token: code
    }

    const response = await axiosClient.post(`/token/confirmed`, data);
    return response;
  }

  export async function resetPassword(password: string) {
    const tokenIdRecuperation = await AsyncStorage.getItem('@token_user');

    const data  = {
        tokenId: tokenIdRecuperation,
        password: password
    }

    const response = await axiosClient.patch(`/token/new-credentials`, data);
    return response;
  }