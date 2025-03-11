import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// Define a interface para o item de histórico
interface HistoryItem {
  id: string;
  date: string;
  description: string;
  imageUrl: string;
}

// Atualize o tipo dos dados de exemplo
const historyData: HistoryItem[] = [
  {
    id: '1',
    date: '01/12/2024',
    description: 'Há um teclado de computador e um mouse em uma mesa',
    imageUrl: 'https://example.com/keyboard-image.jpg', // Substitua pela URL real da imagem
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

// Atualize o componente HistoryItem para usar a interface
const HistoryItem: React.FC<{ item: HistoryItem }> = ({ item }) => (
  <View style={styles.historyItem}>
    {/* <Image
      source={{ uri: item.imageUrl }}
      style={styles.thumbnail}
      defaultSource={require('./assets/placeholder.png')} // Adicione uma imagem de placeholder
    /> */}
    <View style={styles.itemContent}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  </View>
);

const HistoryScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Histórico</Text>
        <Text style={styles.subtitle}>
          Aqui você encontrará as imagens que já foram convertidas
        </Text>
      </View>

      <FlatList<HistoryItem>
        data={historyData}
        renderItem={({ item }) => <HistoryItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e6ff',
  },
  header: {
    padding: 24,
    paddingTop: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100, // Extra padding for bottom tab bar
  },
  historyItem: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default HistoryScreen;