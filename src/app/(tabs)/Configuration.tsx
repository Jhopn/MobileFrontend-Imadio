// ConfigurationScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useTheme } from '@/src/hooks/useTheme';  

interface ColorScheme {
  id: string;
  colors: {
    background: string;
    text: string;
    primary: string;
  };
  name: string;
}

const colorSchemes: ColorScheme[] = [
  {
    id: '1',
    colors: { background: '#e8e6ff', text: '#000000', primary: '#9f90ff' },
    name: 'Padrão',
  },
  {
    id: '2',
    colors: { background: '#ffffff', text: '#000000', primary: '#4a90e2' },
    name: 'Claro',
  },
  {
    id: '3',
    colors: { background: '#121212', text: '#ffffff', primary: '#bb86fc' },
    name: 'Escuro',
  },
];

const ConfigurationScreen: React.FC = () => {
  const { colors, fontSize, setColors, setFontSize } = useTheme();

  const handleSaveChanges = () => {
    console.log('Configurações salvas');
    // Aqui você pode adicionar lógica para salvar as configurações permanentemente
  };

  const ColorSchemeOption: React.FC<{ scheme: ColorScheme }> = ({ scheme }) => (
    <TouchableOpacity
      style={[styles.colorSchemeRow, { backgroundColor: scheme.colors.background }]}
      onPress={() => setColors(scheme.colors)}
      accessibilityRole="radio"
      accessibilityState={{ checked: colors === scheme.colors }}
      accessibilityLabel={`Esquema de cores ${scheme.name}`}
    >
      <View style={[styles.colorSquare, { backgroundColor: scheme.colors.primary }]} />
      <Text style={[styles.schemeText, { color: scheme.colors.text }]}>{scheme.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text, fontSize: fontSize * 1.5 }]}>
          Configuração
        </Text>
        <Text style={[styles.subtitle, { color: colors.text, fontSize: fontSize }]}>
          Altere as cores e os tamanhos da fonte para melhorar sua experiência com o aplicativo
        </Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontSize: fontSize * 1.2 }]}>
            Altere o tamanho da fonte
          </Text>
          <View style={styles.sliderContainer}>
            <Text style={[styles.sliderLabel, { color: colors.text, fontSize: fontSize * 0.8 }]}>min</Text>
            <Slider
              style={styles.slider}
              minimumValue={12}
              maximumValue={24}
              value={fontSize}
              onValueChange={setFontSize}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.text}
              thumbTintColor={colors.primary}
            />
            <Text style={[styles.sliderLabel, { color: colors.text, fontSize: fontSize * 0.8 }]}>max</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontSize: fontSize * 1.2 }]}>
            Altere as cores
          </Text>
          <View style={styles.colorSchemesContainer}>
            {colorSchemes.map((scheme) => (
              <ColorSchemeOption key={scheme.id} scheme={scheme} />
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={handleSaveChanges}
          accessibilityRole="button"
          accessibilityLabel="Salvar Mudanças"
          accessibilityHint="Toque duas vezes para salvar as configurações"
        >
          <Text style={[styles.saveButtonText, { color: colors.background, fontSize: fontSize * 1.2 }]}>
            Salvar Mudanças
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {
    flex: 1,
    marginHorizontal: 16,
  },
  sliderLabel: {
    fontWeight: 'bold',
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
  saveButton: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    fontWeight: 'bold',
  },
});

export default ConfigurationScreen;