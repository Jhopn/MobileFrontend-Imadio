import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
      <View style={styles.colorSchemesContainer}>
        {schemes.map((scheme) => (
          <ColorSchemeOption
            key={scheme.id}
            scheme={scheme}
            isSelected={currentColors === scheme.colors}
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
    style={[styles.colorSchemeRow, { backgroundColor: scheme.colors.background }]}
    onPress={() => onSelect(scheme.colors)}
    accessibilityRole="radio"
    accessibilityState={{ checked: isSelected }}
    accessibilityLabel={`Esquema de cores ${scheme.name}`}
  >
    <View style={[styles.colorSquare, { backgroundColor: scheme.colors.primary }]} />
    <Text style={[styles.schemeText, { color: scheme.colors.text }]}>{scheme.name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  colorSchemesContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  colorSchemeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  colorSquare: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 16,
  },
  schemeText: {
    flex: 1,
  },
});

export default ColorSchemeSelector;