import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SaveButtonProps } from './interfaces/schemas';


const SaveButton: React.FC<SaveButtonProps> = ({
  onPress,
  backgroundColor,
  textColor,
  fontSize,
}) => {
  return (
    <TouchableOpacity
      style={[styles.saveButton, { backgroundColor }]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Salvar Mudanças"
      accessibilityHint="Toque duas vezes para confirmar as configurações"
    >
      <Text style={[styles.saveButtonText, { color: textColor, fontSize: fontSize * 1.2 }]}>
        Salvar Mudanças
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default SaveButton;