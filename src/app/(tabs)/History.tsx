import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import History from '@/src/components/history/history'; 
import { HistoryItem } from '@/src/components/history/interfaces/schemas';
import { getConversionUser, deleteConversionUser } from '@/src/server/api/api';


const HistoryScreen: React.FC = () => {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchConversions = async () => {
    try {
      setIsLoading(true);
      const response = await getConversionUser();
      
      if (response && response.data) {
        const historyData = response.data as HistoryItem[];
        setHistoryData(historyData);
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

  useEffect(() => {
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

  // Função para excluir um item do histórico
  const handleDeleteItem = async (id: string) => {
    try {
      setIsLoading(true);
      
      // Chama a API para excluir o item
      await deleteConversionUser(id);
      
      // Atualiza o estado local removendo o item excluído
      setHistoryData(prevData => prevData.filter(item => item.id !== id));
      
      // Feedback para o usuário
      Alert.alert("Sucesso", "Item excluído com sucesso!");
    } catch (error) {
      console.error('Erro ao excluir item:', error);
      Alert.alert("Erro", "Não foi possível excluir o item. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <History
      historyData={historyData}
      handleItemPress={handleItemPress}
      modalVisible={modalVisible}
      selectedItem={selectedItem}
      handleCloseModal={handleCloseModal}
      isLoading={isLoading}
      error={error}
      handleDeleteItem={handleDeleteItem}
    />
  );
};

export default HistoryScreen;