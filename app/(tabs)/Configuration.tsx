import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  AccessibilityInfo,
} from 'react-native';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

interface ColorScheme {
  id: string;
  colors: string[];
  name: string; 
}

const colorSchemes: ColorScheme[] = [
  {
    id: '1',
    colors: ['#000000', '#FFFFFF', '#DAA520'],
    name: 'Preto, Branco e Dourado',
  },
  {
    id: '2',
    colors: ['#000000', '#E0E0E0', '#008B8B'],
    name: 'Preto, Cinza e Azul-petróleo',
  },
  {
    id: '3',
    colors: ['#000000', '#FFFFFF', '#FF4500'],
    name: 'Preto, Branco e Laranja',
  },
];

const ConfigurationScreen: React.FC = () => {
  const [fontSize, setFontSize] = useState<number>(16);
  const [selectedScheme, setSelectedScheme] = useState<string>('1');

  const handleSaveChanges = () => {
    console.log('Saving changes:', { fontSize, selectedScheme });
    AccessibilityInfo.announceForAccessibility('Configurações salvas com sucesso');
  };

  const ColorSchemeOption: React.FC<{ scheme: ColorScheme }> = ({ scheme }) => (
    <TouchableOpacity
      style={styles.colorSchemeRow}
      onPress={() => setSelectedScheme(scheme.id)}
      accessibilityRole="radio"
      accessibilityState={{ checked: selectedScheme === scheme.id }}
      accessibilityLabel={`Esquema de cores ${scheme.name}`}
    >
      <View style={styles.radioContainer}>
        <View
          style={[
            styles.radioOuter,
            selectedScheme === scheme.id && styles.radioOuterSelected,
          ]}
        >
          {selectedScheme === scheme.id && <View style={styles.radioInner} />}
        </View>
      </View>
      <View style={styles.colorContainer}>
        {scheme.colors.map((color, index) => (
          <View
            key={index}
            style={[styles.colorSquare, { backgroundColor: color }]}
            accessibilityLabel={`Cor ${index + 1}: ${color}`}
          />
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title} accessibilityRole="header">Configuração</Text>
        <Text style={styles.subtitle}>
          Altere as cores e os tamanhos da fonte para melhorar sua experiência com o aplicativo
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} accessibilityRole="header">Altere o tamanho da fonte</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>min</Text>
            <Slider
              style={styles.slider}
              minimumValue={12}
              maximumValue={24}
              value={fontSize}
              onValueChange={(value) => {
                setFontSize(value);
                AccessibilityInfo.announceForAccessibility(`Tamanho da fonte alterado para ${Math.round(value)}`);
              }}
              minimumTrackTintColor="#000"
              maximumTrackTintColor="#000"
              thumbTintColor="#000"
              accessibilityLabel="Ajustar tamanho da fonte"
              accessibilityHint="Deslize para a direita para aumentar, para a esquerda para diminuir"
            />
            <Text style={styles.sliderLabel}>max</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} accessibilityRole="header">Altere as cores</Text>
          <View style={styles.colorSchemesContainer}>
            {colorSchemes.map((scheme) => (
              <ColorSchemeOption key={scheme.id} scheme={scheme} />
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSaveChanges}
          accessibilityRole="button"
          accessibilityLabel="Salvar Mudanças"
          accessibilityHint="Toque duas vezes para salvar as configurações"
        >
          <Text style={styles.saveButtonText}>Salvar Mudanças</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e6ff',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  colorSchemesContainer: {
    backgroundColor: '#f0f0ff',
    borderRadius: 20,
    padding: 16,
  },
  colorSchemeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  radioContainer: {
    marginRight: 16,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#000',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  colorSquare: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
  },
  saveButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000',
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfigurationScreen;