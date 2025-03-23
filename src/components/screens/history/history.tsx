import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import HistoryItem from './history-item';
import HistoryItemModal from './conversion-history-modal'; 
import { HistoryItem as HistoryItemType } from './interfaces/schemas';
import { useTheme } from '@/src/hooks/use-theme';
import HeaderHistory from './tittle';

interface HistoryProps {
  historyData: HistoryItemType[];
  handleItemPress: (item: HistoryItemType) => void;
  modalVisible: boolean;
  selectedItem: HistoryItemType | null;
  handleCloseModal: () => void;
  isLoading?: boolean;
  error?: string | null;
  handleDeleteItem: (id: string) => void; // Nova prop para exclusão
}

const History: React.FC<HistoryProps> = ({
  historyData,
  handleItemPress,
  modalVisible,
  selectedItem,
  handleCloseModal,
  isLoading = false,
  error = null,
  handleDeleteItem,
}) => {
  const { colors, fontSize } = useTheme();

  if (isLoading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.text, marginTop: 16 }}>Carregando histórico...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>{error}</Text>
      </View>
    );
  }

  if (historyData.length === 0) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Nenhum item no histórico</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderHistory 
        textColor={colors.text} 
        backgroundColor={colors.background}
        fontSize={fontSize} 
      />

      <FlatList
        data={historyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HistoryItem 
            item={item} 
            onPress={handleItemPress} 
            onDelete={handleDeleteItem} 
          />
        )}
        contentContainerStyle={styles.listContent}
      />
      
      <HistoryItemModal
        visible={modalVisible}
        item={selectedItem}
        onClose={handleCloseModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
});

export default History;