import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native';
import {
  Info,
  RefreshCcw,
  Clock,
  Settings,
} from 'react-native-feather';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
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
    console.log('Converting image to audio...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.infoButton}>
          <Info width={24} height={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Início</Text>
          <Text style={styles.subtitle}>Converta a imagem em audio</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={[styles.imagePlaceholder, selectedImage && styles.imageSelected]}>
          {/* Image preview would go here */}
        </View>

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Escolher Imagem</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, !selectedImage && styles.buttonDisabled]} 
          onPress={handleConvert}
          disabled={!selectedImage}
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
  imagePlaceholder: {
    width: width - 48,
    height: width - 48,
    backgroundColor: '#333',
    borderRadius: 20,
    marginBottom: 32,
  },
  imageSelected: {
    borderWidth: 2,
    borderColor: '#9f90ff',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 30,
    width: '100%',
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#9f90ff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    marginTop: 4,
    fontSize: 12,
  },
});

export default HomeScreen;