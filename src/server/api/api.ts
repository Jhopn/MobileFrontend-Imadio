import { BASE_URL } from '@/src/constants/api-url';
import { Credentials, User } from '@/src/providers/auth/interfaces/schemas';
import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: BASE_URL
});

export async function createUser(user: User) {
    const response = await axiosClient.post("/user", user)
    return response;
}

export async function loginUser(data: Credentials) {
  console.log(data.password + ' asdkjasjkhdgasjhd')
    const response = await axiosClient.post("/login", data)
    return response;
}