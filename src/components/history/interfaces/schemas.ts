export interface HistoryItem {
    id: string;
    date: string;
    convertedText: string;
    imageUrl: string;
    createdAt: string;
  }

export interface HistoryItemModalProps {
  visible: boolean;
  item: HistoryItem | null;
  onClose: () => void;
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