import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SaveButtonProps } from './interfaces/schemas';
import ButtonPrimary from '../common/button-primary';


const SaveButton: React.FC<SaveButtonProps> = ({
  onPress,
}) => {
  return (
    <View style={[styles.saveButton]} >
      <ButtonPrimary onPress={onPress} label='Salvar Mudanças' role='button' hint='Toque duas vezes para confirmar as configurações'>
        Salvar Mudanças
      </ButtonPrimary>
    </View>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
});

export default SaveButton;