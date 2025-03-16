import React, { useEffect, useState } from 'react';
import History from '@/src/components/screens/history/history'; 
import { HistoryItem } from '@/src/components/screens/history/interfaces/schemas';
import { getConversionUser } from '@/src/server/api/api';

const HistoryScreen: React.FC = () => {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchConversions = async () => {
      try {
        setIsLoading(true);
        const response = await getConversionUser();
        console.log('Dados recebidos da API:', response);
        
        // Verifique se a resposta contém dados válidos
        if (response && response.data) {
          setHistoryData(response.data);
        } else {
          setHistoryData([]);
        }
        setError(null);
      } catch (error) {
        console.error('Erro ao carregar áudio descrições do usuário:', error);
        setError('Não foi possível carregar seu histórico. Tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversions();
  }, []);

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