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
import { useTheme } from '@/hooks/useTheme';
import { RFValue } from 'react-native-responsive-fontsize';

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

const HistoryItem: React.FC<{ item: HistoryItem }> = ({ item }) => {
  const { colors, fontSize } = useTheme();

  return (
    <View style={[styles.historyItem, { backgroundColor: colors.background, borderColor: colors.primary }]}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.thumbnail}
        defaultSource={require('../../assets/images/favicon.png')}
      />
      <View style={styles.itemContent}>
        <Text style={[styles.date, { color: colors.text, fontSize: RFValue(fontSize - 10) }]}>{item.date}</Text>
        <Text style={[styles.description, { color: colors.text, fontSize: RFValue(fontSize - 5)}]}>
          {item.description}
        </Text>
      </View>
    </View>
  );
};

const HistoryScreen: React.FC = () => {
  const { colors, fontSize } = useTheme(); // Obtém o tema global

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text, fontSize: RFValue(fontSize - 5) }]}>Histórico</Text>
        <Text style={[styles.subtitle, { color: colors.text, fontSize: RFValue(fontSize - 5) }]}>
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