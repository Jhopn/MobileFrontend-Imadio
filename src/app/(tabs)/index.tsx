import type React from "react"
import { useState } from "react"
import { View, StyleSheet, SafeAreaView, useWindowDimensions, ScrollView } from "react-native"
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "@/src/hooks/use-theme"
import { AudioDescriptionModal } from "@/src/components/home/audio-description"
import { Redirect, useRouter } from "expo-router"
import HeaderHome from "@/src/components/home/tittle" 
import ImageSelector from "@/src/components/home/image-selector" 
import ActionButtons from "@/src/components/home/action-button" 
import { useAuth } from "@/src/hooks/use-auth"
import LoadingScreen from "@/src/components/loading/loading"
import { postConversionUser } from "@/src/server/api/api"
import { Conversion } from "@/src/components/home/interfaces/schemas";

const HomeScreen: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const { colors, fontSize } = useTheme()
  const [showAudioModal, setShowAudioModal] = useState(false)
  const [audioDescription, setAudioDescription] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { width, height } = useWindowDimensions()
  const [error, setError] = useState('');
  const [isLoadingConversion, setIsLoadingConversion] = useState(false);


  if (isLoading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />
  } 
  

  const isLandscape = width > height

  const handleConversion = async () => {
    try {
      if (!selectedImage) {
        console.error('Nenhuma imagem selecionada');
        return;
      }
  
      setIsLoadingConversion(true);
  
      const formData = new FormData();
      formData.append('file', {
        uri: selectedImage,
        type: 'image/jpeg',
        name: 'image.jpg',
      } as any);
      
  
      const response = await postConversionUser(formData);
      console.log('Resposta da API:', response);
      
      if (response && response.data) {
        const conversionData = response.data as Conversion
        setAudioDescription(conversionData.convertedText);
        setShowAudioModal(true);
      } else {
        throw new Error('Resposta da API não contém o texto convertido');
      }
    } catch (error) {
      console.error('Erro ao converter imagem:', error);
      setError('Não foi possível converter a imagem. Tente novamente.');
    } finally {
      setIsLoadingConversion(false);
    }
  };
  

  const handleInfoPress = () => {
    router.push({
      pathname: "/how-use" as any,
    })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setSelectedImage(result.assets[0].uri)
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        <HeaderHome onInfoPress={handleInfoPress} textColor={colors.text} fontSize={fontSize} />

        <View style={[styles.content, isLandscape && styles.contentLandscape]}>
          <ImageSelector
            selectedImage={selectedImage}
            isLandscape={isLandscape}
            height={height}
            backgroundColor={colors.text}
          />

          <ActionButtons
            onPickImage={pickImage}
            onConvert={handleConversion}
            selectedImage={selectedImage}
            isLandscape={isLandscape}
            primaryColor={colors.primary}
            backgroundColor={colors.background}
            fontSize={fontSize}
          />
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <AudioDescriptionModal
        visible={showAudioModal}
        description={audioDescription}
        onClose={() => setShowAudioModal(false)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: "7%",
  },
  content: {
    alignItems: "center",
    padding: "6%",
  },
  contentLandscape: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bottomPadding: {
    height: 40,
  },
})

export default HomeScreen;