import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useTheme } from '../../hooks/use-theme';
import { ConfirmationModalProps } from './interfaces/schemas';



const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  const { colors, fontSize } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <Text 
            style={[
              styles.title, 
              { color: colors.text, fontSize: fontSize * 1.2 }
            ]}
            accessibilityRole="header"
          >
            Deseja salvar as alterações de configuração?
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { borderColor: colors.primary, backgroundColor: colors.primary }]}
              onPress={onConfirm}
              accessibilityRole="button"
              accessibilityLabel="Salvar Mudanças"
              accessibilityHint="Toque duas vezes para salvar as alterações"
            >
              <Text style={[styles.buttonText, { color: colors.background, fontSize: fontSize }]}>
                Salvar Mudanças
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { borderColor: colors.text }]}
              onPress={onCancel}
              accessibilityRole="button"
              accessibilityLabel="Cancelar"
              accessibilityHint="Toque duas vezes para cancelar as alterações"
            >
              <Text style={[styles.buttonText, { color: colors.text, fontSize: fontSize }]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Estilos compartilhados para ambos os modais
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  info: {
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderWidth: 2,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export { ConfirmationModal };