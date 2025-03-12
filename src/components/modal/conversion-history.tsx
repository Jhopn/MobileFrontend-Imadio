import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface HistoryItem {
  id: string;
  date: string;
  description: string;
  imageUrl: string;
}

interface HistoryItemModalProps {
  visible: boolean;
  item: HistoryItem | null;
  onClose: () => void;
}

const HistoryItemModal: React.FC<HistoryItemModalProps> = ({
  visible,
  item,
  onClose,
}) => {
  const { colors, fontSize } = useTheme();
  
  if (!item) return null;

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
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
            accessibilityLabel="Imagem convertida"
            resizeMode="cover"
          />

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
              styles.date, 
              { color: colors.text, fontSize: fontSize * 0.9 }
            ]}
          >
            {item.date}
          </Text>

          <Text 
            style={[
              styles.description, 
              { color: colors.text, fontSize: fontSize }
            ]}
            accessibilityRole="text"
          >
            {item.description}
          </Text>

          <TouchableOpacity
            style={[styles.button, { borderColor: colors.text }]}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Fechar visualização"
            accessibilityHint="Toque duas vezes para fechar a visualização do item"
          >
            <Text 
              style={[
                styles.buttonText, 
                { color: colors.text, fontSize: fontSize }
              ]}
            >
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
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 20,
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
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 15,
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 10,
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

export default HistoryItemModal;