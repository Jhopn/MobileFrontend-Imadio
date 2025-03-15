// ThemeContext.tsx
import { ThemeContext } from '../providers/themes/theme-context'; 
import { useContext } from 'react';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};