"use client"
import React, { useState, useEffect } from "react"
import { AuthContext } from "./auth-context" 
import { type Credentials, type User, type AuthContextType } from "./interfaces/schemas"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createUser, loginUser } from "@/src/server/api/api"
import { router } from "expo-router"

const api = {
  login: async (data: Credentials): Promise<User> => {
    try {
      const response = await loginUser(data);

      if (!response || !response.data) {
        throw new Error('Resposta inválida do servidor');
      }
      
      // Assumindo que a resposta contém os dados do usuário e o token
      const user: User = {
        ...response.data,
      };
    
      return user;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  register: async (data: User): Promise<User> => {
    try {
      const response = await createUser(data);
      
      if (!response || !response.data) {
        throw new Error('Resposta inválida do servidor');
      }
      
      // Assumindo que a resposta contém os dados do usuário
      const user: User = response.data.user || response.data;
    
      return user;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      throw error;
    }
  },
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userJson = await AsyncStorage.getItem("@auth_user")
        const tokenJson = await AsyncStorage.getItem("@auth_token")
        
        if (userJson) 
          setUser(JSON.parse(userJson))
        
        if (tokenJson) 
          setToken(JSON.parse(tokenJson))
        
      } catch (error) {
        console.error("Erro ao carregar usuário:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (data: Credentials): Promise<User> => {
    try {
      setIsLoading(true)
      
      const userData = await api.login(data)
      
      // Extrair o token se existir
      const userToken = userData.access_token || null
      
      // Remover o token do objeto de usuário antes de salvar
      const { access_token: _, ...userWithoutToken } = userData
      
      setUser(userWithoutToken)
      setToken(userToken)
      
      await AsyncStorage.setItem("@auth_user", JSON.stringify(userWithoutToken))
      
      if (userToken) 
        await AsyncStorage.setItem("@auth_token", JSON.stringify(userToken))
      
      
      router.replace('/(tabs)')
      
      return userData;
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: User): Promise<User> => {
    try {
      setIsLoading(true)
      
      const userData = await api.register(data)
    
      return userData
    } catch (error) {
      console.error("Erro ao registrar:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      setUser(null)
      setToken(null)
      
      await AsyncStorage.removeItem("@auth_user")
      await AsyncStorage.removeItem("@auth_token")
      
      router.replace('/(auth)/login')
  
      return true
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}