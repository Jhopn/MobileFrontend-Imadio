import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { HistoryItemPropsOnPress } from './interfaces/schemas';
import { useTheme } from '@/src/hooks/use-theme';
import { Trash2 } from 'react-native-feather'; // Importando ícone de lixeira
import { formatDate } from '@/src/util/commom';
import ButtonPrimary from '../common/button-primary';

// Atualizar a interface para incluir a função onDelete
interface HistoryItemProps extends HistoryItemPropsOnPress {
  onDelete: (id: string) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item, onPress, onDelete }) => {
  const { colors, fontSize } = useTheme();

  // Função para confirmar exclusão
  const handleDelete = () => {
    Alert.alert(
      "Excluir item",
      "Tem certeza que deseja excluir este item do histórico?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: () => onDelete(item.id),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, borderColor: colors.primary }]}>
      
      <TouchableOpacity
        style={styles.historyItem}
        onPress={() => onPress(item)}
        accessible
        accessibilityRole="button"
        accessibilityLabel={`Histórico do dia ${formatDate(item.createdAt)}`}
        accessibilityHint={`Toque para ver detalhes. Descrição: ${item.convertedText}`}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.thumbnail}
          defaultSource={require('../../assets/images/icon.png')}
          accessible
          accessibilityLabel={`Imagem relacionada à descrição: ${item.convertedText}`}
        />
        <View style={styles.itemContent}>
          <Text
            style={[styles.date, { color: colors.primary, fontSize: fontSize * 0.8 }]}
            accessibilityRole="text"
          >
            {formatDate(item.createdAt)}
          </Text>
          <Text
            style={[styles.convertedText, { color: colors.text, fontSize: fontSize * 0.9 }]}
            accessibilityRole="text"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.convertedText}
          </Text>
        </View>
      </TouchableOpacity>


      <View>
      <ButtonPrimary
        onPress={handleDelete}
        role='button'
        label='Excluir conversão'
        hint='Toque para excluir este item do histórico relacionada à descrição: ${item.convertedText}' >
        <Trash2 width={16} height={16} color="#fff" />
      </ButtonPrimary>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderRadius: 20,
    elevation: 3,
    alignItems: 'center',
    padding: '2%'
  },
  historyItem: {
    padding: 12,
    flexDirection: 'row',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  itemContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 30,
  },
  date: {
    marginBottom: 4,
    fontFamily: "MontserratAlternativesMedium",
  },
  convertedText: {
    lineHeight: 22,
    fontFamily: "MontserratAlternativesRegular",
  },
});

export default HistoryItem;