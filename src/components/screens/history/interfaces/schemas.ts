export interface HistoryItem {
    id: string;
    date: string;
    description: string;
    imageUrl: string;
  }
  
  export interface HistoryItemProps {
    item: HistoryItem;
  }
  
  export interface HistoryItemPropsOnPress {
    item: HistoryItem;
    onPress: (item: HistoryItem) => void;
  }
  
  export interface HeaderProps {
    textColor: string;
    backgroundColor: string; // Adicionado para corrigir o problema de cor
    fontSize: number;
  }
  
  export interface HistoryScreenProps {
    historyData: HistoryItem[];
    handleItemPress: (item: HistoryItem) => void;
    modalVisible: boolean;
    selectedItem: HistoryItem | null;
    handleCloseModal: () => void;
  }