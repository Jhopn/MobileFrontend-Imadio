import { Theme } from "@/src/server/interfaces/schema";

export interface ThemeColors {
    background: string;
    text: string;
    primary: string;
    value: Theme;
}

export interface ThemeContextType {
    colors: ThemeColors;
    fontSize: number;
    setColors: (colors: ThemeColors) => void;
    setFontSize: (size: number) => void;
}

export const defaultTheme: ThemeColors = {
    background: "#e8e6ff",
    text: "#000000",
    primary: "#9f90ff",
    value: Theme.STANDARD
};