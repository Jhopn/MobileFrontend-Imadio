import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
} from 'react-native';
import { Info } from 'react-native-feather';
import * as ImagePicker from 'expo-image-picker';

const HomeScreen: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    // Request permissions first
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('É necessário permissão para acessar a galeria de imagens');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleConvert = () => {
    if (!selectedImage) {
      alert('Por favor, selecione uma imagem primeiro');
      return;
    }
    console.log('Converting image to audio...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.infoButton}
          accessibilityRole="button"
          accessibilityLabel="Informações"
          accessibilityHint="Toque para ver informações sobre o aplicativo"
        >
          <Info width={24} height={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title} accessibilityRole="header">Início</Text>
          <Text style={styles.subtitle}>Converta a imagem em audio</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View 
          style={styles.imageContainer}
          accessibilityRole="image"
          accessibilityLabel={selectedImage ? "Imagem selecionada" : "Área para selecionar imagem"}
        >
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.selectedImage}
              accessibilityLabel="Imagem selecionada para conversão"
            />
          ) : (
            <View style={styles.placeholderImage} />
          )}
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={pickImage}
          accessibilityRole="button"
          accessibilityLabel="Escolher Imagem"
          accessibilityHint="Toque para selecionar uma imagem da galeria"
        >
          <Text style={styles.buttonText}>Escolher Imagem</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, !selectedImage && styles.buttonDisabled]}
          onPress={handleConvert}
          disabled={!selectedImage}
          accessibilityRole="button"
          accessibilityLabel="Converter"
          accessibilityHint="Toque para converter a imagem selecionada em áudio"
          accessibilityState={{ disabled: !selectedImage }}
        >
          <Text style={[styles.buttonText, !selectedImage && styles.buttonTextDisabled]}>
            Converter
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e6ff',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoButton: {
    padding: 8,
  },
  titleContainer: {
    marginLeft: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    maxWidth: 400,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#333',
    marginBottom: 32,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    flex: 1,
    backgroundColor: '#333',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 30,
    width: '100%',
    maxWidth: 400,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#000',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonTextDisabled: {
    color: '#666',
  },
});

export default HomeScreen;