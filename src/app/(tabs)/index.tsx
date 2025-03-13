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
  ScrollView,
} from 'react-native';
import { Info } from 'react-native-feather';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '@/src/hooks/useTheme';
import { AudioDescriptionModal } from '@/src/components/modals/audio-description';
import { useRouter } from 'expo-router';

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { colors, fontSize } = useTheme();
  const [showAudioModal, setShowAudioModal] = useState(false);
  const [audioDescription, setAudioDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;

  const handleConversion = (description: string) => {
    setAudioDescription(description);
    setShowAudioModal(true);
  };

  const handlePress = () => {
    router.push({
      pathname: '/how-use' as any
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [10, 10],
      quality: 1,
    });

    // Verifique se o usuário selecionou uma imagem
    if (!result.canceled && result.assets && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.infoButton}
            accessibilityRole="button"
            accessibilityLabel="Informações"
            accessibilityHint="Toque para ver informações sobre o aplicativo"
            onPress={handlePress}
          >
            <Info width={24} height={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { fontSize: fontSize * 1.5, color: colors.text }]}>Início</Text>
            <Text style={[styles.subtitle, { fontSize, color: colors.text }]}>Converta a imagem em áudio</Text>
          </View>
        </View>

        <View style={[styles.content, isLandscape && styles.contentLandscape]}>
          <View
            style={[
              styles.imageContainer, 
              { 
                width: isLandscape ? '40%' : '100%', 
                maxHeight: isLandscape ? height * 0.7 : height * 0.4,
                backgroundColor: colors.text,
              }
            ]}
            accessibilityRole="image"
            accessibilityLabel={selectedImage ? 'Imagem selecionada' : 'Área para selecionar imagem'}
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
              onPress={pickImage}
              accessibilityRole="button"
              accessibilityLabel="Escolher Imagem"
              accessibilityHint="Toque para selecionar uma imagem da galeria"
            >
              <Text style={[styles.buttonText, { fontSize, color: colors.text }]}>Escolher Imagem</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button, 
                !selectedImage && styles.buttonDisabled, 
                { backgroundColor: colors.primary, width: isLandscape ? '80%' : '100%' }
              ]}
              onPress={() => handleConversion('Texto de exemplo gerado a partir da imagem')}
              disabled={!selectedImage}
              accessibilityRole="button"
              accessibilityLabel="Converter"
              accessibilityHint="Toque para converter a imagem selecionada em áudio"
              accessibilityState={{ disabled: !selectedImage }}
            >
              <Text style={[
                styles.buttonText, 
                !selectedImage && styles.buttonTextDisabled, 
                { fontSize, color: colors.text }
              ]}>
                Converter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Espaço adicional no final para garantir que tudo seja visível */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      <AudioDescriptionModal
        visible={showAudioModal}
        description={audioDescription}
        onClose={() => setShowAudioModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: '7%',
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
  },
  subtitle: {
    marginTop: '1%',
  },
  content: {
    alignItems: 'center',
    padding: '6%',
  },
  contentLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageContainer: {
    aspectRatio: 1,
    maxWidth: 360,
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
    resizeMode: 'cover', // Isso garantirá que a imagem preencha o container, mesmo que seja maior
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
  bottomPadding: {
    height: 40, // Padding menor no final
  },
});

export default HomeScreen;