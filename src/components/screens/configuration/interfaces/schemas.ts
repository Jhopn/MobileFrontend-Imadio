export interface ColorScheme {
    id: string;
    colors: {
        background: string;
        text: string;
        primary: string;
    };
    name: string;
    value: string;
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
    };
    name: string;
    value: string;
}

export const colorSchemes: ColorScheme[] = [
    {
        id: '1',
        colors: { background: '#e8e6ff', text: '#000000', primary: '#9f90ff' },
        name: 'Padrão',
        value: 'STANDARD'
    },
    {
        id: '2',
        colors: { background: '#FFFFFF', text: '#000000', primary: '#B8860B' },
        name: 'Dourado Noite',
        value: 'GOLDEN_EVENING'
    },
    {
        id: '3',
        colors: { background: '#CCCCCC', text: '#000000', primary: '#008B8B' },
        name: 'Ciano Aço',
        value: 'STAINLESS_STEEL_CYANO'
    },
    {
        id: '4',
        colors: { background: '#F2F2F2', text: '#000000', primary: '#E65100' },
        name: 'Laranja Caramelo',
        value: 'CARAMEL_ORANGE',
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