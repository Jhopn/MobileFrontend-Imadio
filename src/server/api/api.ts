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

    console.log(tokenWithout)
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