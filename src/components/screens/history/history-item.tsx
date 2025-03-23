import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { HistoryItemPropsOnPress } from './interfaces/schemas';
import { useTheme } from '@/src/hooks/use-theme';
import { Trash2 } from 'react-native-feather'; // Importando ícone de lixeira

// Atualizar a interface para incluir a função onDelete
interface HistoryItemProps extends HistoryItemPropsOnPress {
  onDelete: (id: string) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item, onPress, onDelete }) => {
  const { colors, fontSize } = useTheme();

  // Função para formatar a data (remover o horário)
  const formatDate = (dateString: string) => {
    try {
      // Verifica se a string de data contém um formato reconhecível
      if (!dateString) return '';
      
      // Se for uma data ISO ou similar, podemos usar o Date
      if (dateString.includes('T') || dateString.includes('-') || dateString.includes('/')) {
        const date = new Date(dateString);
        
        // Verifica se a data é válida
        if (isNaN(date.getTime())) {
          // Se não for uma data válida, tenta extrair apenas a parte da data usando regex
          const dateMatch = dateString.match(/(\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2})/);
          return dateMatch ? dateMatch[0] : dateString;
        }
        
        // Formata a data como DD/MM/YYYY
        return date.toLocaleDateString('pt-BR');
      }
      
      // Se não conseguir processar, retorna a string original
      return dateString;
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return dateString;
    }
  };

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
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.historyItem, { backgroundColor: colors.background, borderColor: colors.primary }]}
        onPress={() => onPress(item)}
        accessible
        accessibilityRole="button"
        accessibilityLabel={`Histórico do dia ${formatDate(item.createdAt)}`}
        accessibilityHint={`Toque para ver detalhes. Descrição: ${item.convertedText}`}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.thumbnail}
          defaultSource={require('../../../assets/images/icon.png')}
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
      
      {/* Botão de excluir */}
      <TouchableOpacity
        style={[styles.deleteButton, { backgroundColor: colors.primary }]}
        onPress={handleDelete}
        accessible
        accessibilityRole="button"
        accessibilityLabel="Excluir item"
        accessibilityHint="Toque para excluir este item do histórico"
      >
        <Trash2 width={16} height={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 16,
  },
  historyItem: {
    borderRadius: 20,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    marginRight: 30, // Espaço para o botão de excluir
  },
  date: {
    marginBottom: 4,
  },
  convertedText: {
    lineHeight: 22,
  },
  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default HistoryItem;