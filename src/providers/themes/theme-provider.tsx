import { ReactNode, useState, useMemo } from "react";
import { ThemeContext } from './theme-context';
import { defaultTheme, ThemeColors } from "./interfaces/schemas";


export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [colors, setColors] = useState<ThemeColors>(defaultTheme);
  const [fontSize, setFontSize] = useState<number>(16);

  const value = useMemo(
    () => ({ colors, fontSize, setColors, setFontSize }),
    [colors, fontSize] 
  );
  
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
