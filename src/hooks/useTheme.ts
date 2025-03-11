// ThemeContext.tsx
import { ThemeContext } from '../providers/ThemeProvider'
import React, { createContext, useState, useContext, ReactNode } from 'react';


export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};