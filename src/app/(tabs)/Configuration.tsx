import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@/src/hooks/use-theme';
import { ConfirmationModal } from '@/src/components/configuration/confirmation-modal';
import HeaderConfiguration from '@/src/components/configuration/tittle'; 
import FontSizeSelector from '@/src/components/configuration/font-size';
import ColorSchemeSelector from '@/src/components/configuration/color-schema-selection';
import SaveButton from '@/src/components/configuration/save-button'; 
import { colorSchemes, ColorScheme } from '@/src/components/configuration/interfaces/schemas'
import { updateSettingsUser } from '@/src/server/api/api';
import LogoutButton from '@/src/components/configuration/logout-button';

const ConfigurationScreen: React.FC = () => {
  const { colors, fontSize, setColors, setFontSize } = useTheme();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tempFontSize, setTempFontSize] = useState(fontSize);
  const [tempColors, setTempColors] = useState<ColorScheme['colors']>(colors);

  const handleConfirmSave = async () => {
    setFontSize(tempFontSize);
    setColors(tempColors);
    
    const updateSettings = {
      theme: tempColors.value,
      fontSize: String(fontSize),
    }

    const response = await updateSettingsUser(updateSettings)
    console.log(response)
    setShowConfirmModal(false);
  };

  const handleSaveChanges = () => {
    setShowConfirmModal(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <HeaderConfiguration textColor={colors.text} fontSize={fontSize} />

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

        <LogoutButton
          primaryColor={colors.primary}
          fontSize={fontSize}
          style={{ marginTop: 30 }}
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