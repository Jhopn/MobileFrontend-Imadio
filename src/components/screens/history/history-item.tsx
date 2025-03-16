import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { HistoryItemPropsOnPress } from './interfaces/schemas';
import { useTheme } from '@/src/hooks/use-theme';

const HistoryItem: React.FC<HistoryItemPropsOnPress> = ({ item, onPress }) => {
  const { colors, fontSize } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.historyItem, { backgroundColor: colors.background, borderColor: colors.primary }]}
      onPress={() => onPress(item)}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Histórico do dia ${item.date}`}
      accessibilityHint={`Toque para ver detalhes. Descrição: ${item.convertedText}`}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.thumbnail}
        defaultSource={require('../../../assets/images/favicon.png')}
        accessible
        accessibilityLabel={`Imagem relacionada à descrição: ${item.convertedText}`}
      />
      <View style={styles.itemContent}>
        <Text 
          style={[styles.date, { color: colors.text, fontSize: fontSize * 0.8 }]}
          accessibilityRole="text"
        >
          {item.date}
        </Text>
        <Text 
          style={[styles.convertedText, { color: colors.text, fontSize: fontSize * 0.9 }]}
          accessibilityRole="text"
        >
          {item.convertedText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  historyItem: {
    borderRadius: 20,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  },
  date: {
    marginBottom: 4,
  },
  convertedText: {
    lineHeight: 22,
  },
});

export default HistoryItem;
