import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Check } from 'react-native-feather'; // Importando ícone de verificação
import { ColorSchemeOptionProps, ColorSchemeSelectorProps } from './interfaces/schemas';

const ColorSchemeSelector: React.FC<ColorSchemeSelectorProps> = ({
  schemes,
  currentColors,
  fontSize,
  onSelectScheme,
}) => {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: currentColors.text, fontSize: fontSize * 1.2 }]}>
        Altere as cores
      </Text>
  
      <View style={styles.currentThemeContainer}>
        <Text style={[styles.currentThemeLabel, { color: currentColors.text, fontSize: fontSize * 0.9 }]}>
          Tema atual:
        </Text>
        <View style={[styles.themePreview, { backgroundColor: currentColors.background }]}>
          <View style={[styles.previewColorSquare, { backgroundColor: currentColors.primary }]} />
          <View style={[styles.previewTextSample, { backgroundColor: currentColors.text }]} />
        </View>
      </View>
      
      <View style={styles.colorSchemesContainer}>
        {schemes.map((scheme) => (
          <ColorSchemeOption
            key={scheme.id}
            scheme={scheme}
            isSelected={
              currentColors.background === scheme.colors.background &&
              currentColors.text === scheme.colors.text &&
              currentColors.primary === scheme.colors.primary
            }
            onSelect={onSelectScheme}
            textColor={currentColors.text}
          />
        ))}
      </View>
    </View>
  );
};

const ColorSchemeOption: React.FC<ColorSchemeOptionProps> = ({
  scheme,
  isSelected,
  textColor,
  onSelect,
}) => (
  <TouchableOpacity
    style={[
      styles.colorSchemeRow, 
      { backgroundColor: scheme.colors.background },
      isSelected && styles.selectedRow,
    ]}
    onPress={() => onSelect(scheme.colors)}
    accessibilityRole="radio"
    accessibilityState={{ checked: isSelected }}
    accessibilityLabel={`Esquema de cores ${scheme.name}`}
  >
    <View style={styles.optionLeftSection}>
      <View style={[styles.colorSquare, { backgroundColor: scheme.colors.primary }]} />
      <Text style={[styles.schemeText, { color: scheme.colors.text }]}>{scheme.name}</Text>
    </View>
    
    {isSelected && (
      <View style={[styles.checkContainer, { backgroundColor: scheme.colors.primary }]}>
        <Check width={16} height={16} color="#fff" />
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: "MontserratAlternativesMedium",
  },
  currentThemeContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currentThemeLabel: {
    fontWeight: 'bold',
    fontFamily: "MontserratAlternativesRegular"
  },
  themePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    width: 100,
    justifyContent: 'space-between',
  },
  previewColorSquare: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  previewTextSample: {
    width: 40,
    height: 8,
    borderRadius: 4,
  },
  colorSchemesContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  colorSchemeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  optionLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  colorSquare: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 16,
  },
  selectedRow: {
    borderLeftWidth: 4,
    borderLeftColor: '#4a90e2',
  },
  schemeText: {
    flex: 1,
    fontFamily: "MontserratAlternativesRegular",
  },
  checkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ColorSchemeSelector;