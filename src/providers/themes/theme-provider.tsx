import { ReactNode, useState, useMemo, useEffect } from "react";
import { ThemeContext } from './theme-context';
import { defaultTheme, ThemeColors } from "./interfaces/schemas";
import { getSettingsUser } from "@/src/server/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorSchemes, Configuration } from "@/src/components/configuration/interfaces/schemas";


export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [colors, setColors] = useState<ThemeColors>(defaultTheme);
  const [fontSize, setFontSize] = useState<number>(16);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = await AsyncStorage.getItem('@auth_token');
        
        if (token) {
          const response = await getSettingsUser();
          
          if (response && response.data) {
            const configurationData = response.data as Configuration
            if (configurationData.theme) {
              const themeStored = configurationData.theme;
              let foundTheme = colorSchemes.find(scheme => 
                scheme.colors.value === themeStored
              );
              setColors(foundTheme!.colors)
            }
            
            if (configurationData.fontSize) {
              const fontSizeStored = Number(configurationData.fontSize)
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
