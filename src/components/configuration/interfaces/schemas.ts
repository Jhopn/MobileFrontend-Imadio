import { Theme } from "@/src/server/interfaces/schema";

export interface ColorScheme {
    id: string;
    colors: {
        background: string;
        text: string;
        primary: string;
        value: Theme;
    };
    name: string;
}

export interface ColorSchemeSelectorProps {
    schemes: ColorScheme[];
    currentColors: ColorScheme['colors'];
    fontSize: number;
    onSelectScheme: (colors: ColorScheme['colors']) => void;
}

export interface ColorSchemeOptionProps {
    scheme: ColorScheme;
    isSelected: boolean;
    textColor: string;
    onSelect: (colors: ColorScheme['colors']) => void;
}

export interface ColorScheme {
    id: string;
    colors: {
        background: string;
        text: string;
        primary: string;
        value: Theme;
    };
    name: string;
}

export const colorSchemes: ColorScheme[] = [
    {
        id: '1',
        colors: {
            background: '#e8e6ff',
            text: '#000000',
            primary: '#9f90ff',
            value: Theme.STANDARD
        },
        name: 'Padrão',
    },
    {
        id: '2',
        colors: {
            background: '#FFFFFF',
            text: '#000000',
            primary: '#B8860B',
            value: Theme.GOLDEN_EVENING
        },
        name: 'Dourado Noite',
    },
    {
        id: '3',
        colors: {
            background: '#CCCCCC',
            text: '#000000',
            primary: '#008B8B',
            value: Theme.STAINLESS_STEEL_CYANO
        },
        name: 'Ciano Aço',
    },
    {
        id: '4',
        colors: {
            background: '#F2F2F2',
            text: '#000000',
            primary: '#E65100',
            value: Theme.CARAMEL_ORANGE
        },
        name: 'Laranja Caramelo',
    },
];

export interface FontSizeSelectorProps {
    fontSize: number;
    textColor: string;
    primaryColor: string;
    onValueChange: (value: number) => void;
}

export interface SaveButtonProps {
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
    fontSize: number;
}

export interface HeaderProps {
    textColor: string;
    fontSize: number;
}

export interface ConfirmationModalProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export interface Configuration {
    userId: string
    theme: Theme
    fontSize: string
    createdAt: Date
}