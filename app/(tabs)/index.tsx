import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Info } from 'react-native-feather';
import * as ImagePicker from 'expo-image-picker';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from '@/hooks/useTheme';

const HomeScreen: React.FC = () => {
  const { colors, fontSize } = useTheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.infoButton}
          accessibilityRole="button"
          accessibilityLabel="Informações"
          accessibilityHint="Toque para ver informações sobre o aplicativo"
        >
          <Info width={RFValue(24)} height={RFValue(24)} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { fontSize: RFValue(fontSize), color: colors.text }]}>Início</Text>
          <Text style={[styles.subtitle, { fontSize: RFValue(fontSize - 5), color: colors.text }]}>
            Converta a imagem em áudio
          </Text>
        </View>
      </View>

      <View style={[styles.content, isLandscape && styles.contentLandscape]}>
        <View 
          style={[styles.imageContainer, { width: isLandscape ? '40%' : '100%', backgroundColor: colors.text }]}
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

        <View style={[styles.buttonContainer, isLandscape && styles.buttonContainerLandscape]}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.primary, width: isLandscape ? '80%' : '100%' }]}
            onPress={() => {}} // pickImage()
            accessibilityRole="button"
            accessibilityLabel="Escolher Imagem"
            accessibilityHint="Toque para selecionar uma imagem da galeria"
          >
            <Text style={[styles.buttonText, { fontSize: RFValue(fontSize -5), color: colors.text }]}>
              Escolher Imagem
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.button,
              !selectedImage && styles.buttonDisabled,
              { backgroundColor: colors.primary, width: isLandscape ? '80%' : '100%' }
            ]}
            onPress={() => {}} // handleConvert()
            disabled={!selectedImage}
            accessibilityRole="button"
            accessibilityLabel="Converter"
            accessibilityHint="Toque para converter a imagem selecionada em áudio"
            accessibilityState={{ disabled: !selectedImage }}
          >
            <Text style={[
              styles.buttonText,
              !selectedImage && styles.buttonTextDisabled,
              { fontSize: RFValue(fontSize - 5), color: colors.text }
            ]}>
              Converter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: '4%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoButton: {
    padding: '2%',
  },
  titleContainer: {
    marginLeft: '4%',
  },
  title: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  subtitle: {
    marginTop: '1%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: '6%',
  },
  contentLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageContainer: {
    aspectRatio: 1,
    maxWidth: 400,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: '8%',
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
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonContainerLandscape: {
    width: '50%',
  },
  button: {
    borderRadius: 30,
    maxWidth: 400,
    paddingVertical: '4%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4%',
    borderWidth: 2,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: '#666',
  },
});

export default HomeScreen;
