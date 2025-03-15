import { createContext } from "react";
import { ThemeContextType } from "./interfaces/schemas";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
