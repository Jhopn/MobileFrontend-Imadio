import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { ConfirmationModal } from '@/src/components/screens/configuration/confirmation-modal';
import Header from '@/src/components/screens/configuration/tittle'; 
import FontSizeSelector from '@/src/components/screens/configuration/font-size';
import ColorSchemeSelector from '@/src/components/screens/configuration/color-schema-selection';
import SaveButton from '@/src/components/screens/configuration/save-button'; 
import { colorSchemes, ColorScheme } from '@/src/components/screens/configuration/interfaces/schemas'

const ConfigurationScreen: React.FC = () => {
  const { colors, fontSize, setColors, setFontSize } = useTheme();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tempFontSize, setTempFontSize] = useState(fontSize);
  const [tempColors, setTempColors] = useState<ColorScheme['colors']>(colors);

  const handleConfirmSave = () => {
    setFontSize(tempFontSize);
    setColors(tempColors);
    console.log('Configurações salvas permanentemente');
    setShowConfirmModal(false);
  };

  const handleSaveChanges = () => {
    setShowConfirmModal(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Header textColor={colors.text} fontSize={fontSize} />

        <FontSizeSelector
          fontSize={fontSize}
          textColor={colors.text}
          primaryColor={colors.primary}
          onValueChange={setTempFontSize}
        />

        <ColorSchemeSelector
          schemes={colorSchemes}
          currentColors={tempColors}
          fontSize={fontSize}
          onSelectScheme={setTempColors}
        />

        <SaveButton
          onPress={handleSaveChanges}
          backgroundColor={colors.primary}
          textColor={colors.background}
          fontSize={fontSize}
        />
      </ScrollView>

      <ConfirmationModal
        visible={showConfirmModal}
        onConfirm={handleConfirmSave}
        onCancel={() => setShowConfirmModal(false)}
      />
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
});

export default ConfigurationScreen;