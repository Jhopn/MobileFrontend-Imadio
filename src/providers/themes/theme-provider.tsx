import { ReactNode, useState, useMemo, useEffect } from "react";
import { ThemeContext } from './theme-context';
import { defaultTheme, ThemeColors } from "./interfaces/schemas";
import { getSettingsUser } from "@/src/server/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorSchemes } from "@/src/components/screens/configuration/interfaces/schemas";


export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [colors, setColors] = useState<ThemeColors>(defaultTheme);
  const [fontSize, setFontSize] = useState<number>(16);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = await AsyncStorage.getItem('@auth_token');
        
        if (token) {
          const response = await getSettingsUser();
          console.log(response)
          
          if (response && response.data) {
            // Atualiza o tema com as configurações do usuário
            if (response.data.theme) {
              const themeStored = response.data.theme;
              let foundTheme = colorSchemes.find(scheme => 
                scheme.colors.value === themeStored
              );
              setColors(foundTheme?.colors)
            }
            
            // Atualiza o tamanho da fonte se disponível
            if (response.data.fontSize) {
              const fontSizeStored = Number(response.data.fontSize)
              setFontSize(fontSizeStored);
            }

          }
        }
      } catch (error) {
        console.error('Erro ao carregar configurações do usuário:', error);
      } 
    };

    fetchSettings();
  }, []);

  const value = useMemo(
    () => ({ colors, fontSize, setColors, setFontSize }),
    [colors, fontSize] 
  );
  
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
