import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  TouchableOpacity, // Adicione esta importação
} from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { RFValue } from 'react-native-responsive-fontsize';
import HistoryItemModal from '@/src/components/modal/conversion-history';

const { width } = Dimensions.get('window');

// Define a interface para o item de histórico
interface HistoryItem {
  id: string;
  date: string;
  description: string;
  imageUrl: string;
}

// Dados de exemplo
const historyData: HistoryItem[] = [
  {
    id: '1',
    date: '01/12/2024',
    description: 'Há um teclado de computador e um mouse em uma mesa',
    imageUrl: 'https://example.com/keyboard-image.jpg',
  },
  {
    id: '2',
    date: '01/12/2024',
    description: 'Há um teclado de computador e um mouse em uma mesa',
    imageUrl: 'https://example.com/keyboard-image.jpg',
  },
  {
    id: '3',
    date: '01/12/2024',
    description: 'Há um teclado de computador e um mouse em uma mesa',
    imageUrl: 'https://example.com/keyboard-image.jpg',
  },
];

// Modificado para receber a função onPress
const HistoryItem: React.FC<{ 
  item: HistoryItem; 
  onPress: (item: HistoryItem) => void; // Nova prop
}> = ({ item, onPress }) => {
  const { colors, fontSize } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.historyItem, { backgroundColor: colors.background, borderColor: colors.primary }]}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Histórico do dia ${item.date}`}
      accessibilityHint={`Toque para ver detalhes. Descrição: ${item.description}`}
      onPress={() => onPress(item)} // Chama a função onPress com o item
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.thumbnail}
        defaultSource={require('../../assets/images/favicon.png')}
        accessible={true}
        accessibilityLabel={`Imagem relacionada à descrição: ${item.description}`}
      />
      <View style={styles.itemContent}>
        <Text
          style={[styles.date, { color: colors.text, fontSize: RFValue(fontSize - 10) }]}
          accessible={true}
          accessibilityRole="text"
        >
          {item.date}
        </Text>
        <Text
          style={[styles.description, { color: colors.text, fontSize: RFValue(fontSize - 5) }]}
          accessible={true}
          accessibilityRole="text"
        >
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const HistoryScreen: React.FC = () => {
  const { colors, fontSize } = useTheme(); 
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemPress = (item: HistoryItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text
          style={[styles.title, { color: colors.text, fontSize: RFValue(fontSize) }]}
          accessible={true}
          accessibilityRole="header"
        >
          Histórico
        </Text>
        <Text
          style={[styles.subtitle, { color: colors.text, fontSize: RFValue(fontSize - 5) }]}
          accessible={true}
          accessibilityRole="text"
        >
          Aqui você encontrará as imagens que já foram convertidas
        </Text>
      </View>

      <FlatList<HistoryItem>
        data={historyData}
        renderItem={({ item }) => (
          <HistoryItem 
            item={item} 
            onPress={handleItemPress} // Passa a função handleItemPress
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        accessibilityLabel="Lista de histórico de imagens"
        accessible={true}
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
  header: {
    padding: 24,
    paddingTop: 48,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
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
  description: {
    lineHeight: 22,
  },
});

export default HistoryScreen;