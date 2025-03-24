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

interface AudioDescriptionModalProps {
  visible: boolean;
  description: string;
  onClose: () => void;
}

const AudioDescriptionModal: React.FC<AudioDescriptionModalProps> = ({
  visible,
  description,
  onClose,
}) => {
  const { colors, fontSize } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
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
            Áudio descrição:
          </Text>
          
          <Text 
            style={[
              styles.description, 
              { color: colors.text, fontSize: fontSize }
            ]}
            accessibilityRole="text"
          >
            {description}
          </Text>
          
          <Text 
            style={[
              styles.info, 
              { color: colors.text, fontSize: fontSize * 0.9 }
            ]}
          >
            Essa conversão estará disponível no histórico.
          </Text>

          <TouchableOpacity
            style={[styles.button, { borderColor: colors.text }]}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Fechar modal"
            accessibilityHint="Toque duas vezes para fechar a descrição do áudio"
          >
            <Text style={[styles.buttonText, { color: colors.text, fontSize: fontSize }]}>
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

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

export {AudioDescriptionModal};