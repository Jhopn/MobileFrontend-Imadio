import React from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import HistoryItem from './history-item'; 
import HeaderHistory from './tittle'; 
import { HistoryScreenProps } from './interfaces/schemas'; 
import { useTheme } from '@/src/hooks/useTheme';
import HistoryItemModal from './conversion-history-modal'; 

const History: React.FC<HistoryScreenProps> = ({
  historyData,
  handleItemPress,
  modalVisible,
  selectedItem,
  handleCloseModal
}) => {
  const { colors, fontSize } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderHistory 
        textColor={colors.text} 
        backgroundColor={colors.background}
        fontSize={fontSize} 
      />
      
      <FlatList
        data={historyData}
        renderItem={({ item }) => (
          <HistoryItem item={item} onPress={handleItemPress} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        accessibilityLabel="Lista de histórico de imagens"
        accessible
      />

      <HistoryItemModal
        visible={modalVisible}
        item={selectedItem}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100, 
  },
});

export default History;