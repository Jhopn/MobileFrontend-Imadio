import React, { useState } from 'react';
import History from '@/src/components/screens/history/history'; 
import { HistoryItem } from '@/src/components/screens/history/interfaces/schemas';

// Dados de exemplo - em um app real, isso viria de uma API ou banco de dados local
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

const HistoryScreen: React.FC = () => {
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
    <History
      historyData={historyData}
      handleItemPress={handleItemPress}
      modalVisible={modalVisible}
      selectedItem={selectedItem}
      handleCloseModal={handleCloseModal}
    />
  );
};

export default HistoryScreen;