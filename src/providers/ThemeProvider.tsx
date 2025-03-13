import { createContext, ReactNode, useState, useMemo } from "react";

interface ThemeColors {
  background: string;
  text: string;
  primary: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  fontSize: number;
  setColors: (colors: ThemeColors) => void;
  setFontSize: (size: number) => void;
}

const defaultTheme: ThemeColors = {
  background: "#e8e6ff",
  text: "#000000",
  primary: "#9f90ff",
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [colors, setColors] = useState<ThemeColors>(defaultTheme);
  const [fontSize, setFontSize] = useState<number>(16);

  const value = useMemo(
    () => ({ colors, fontSize, setColors, setFontSize }),
    [colors, fontSize] 
  );
  
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
