import type React from "react"
import { useState } from "react"
import { View, StyleSheet, SafeAreaView, useWindowDimensions, ScrollView } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { useTheme } from "@/src/hooks/use-theme"
import { AudioDescriptionModal } from "@/src/components/screens/home/audio-description"
import { Redirect, useRouter } from "expo-router"
import HeaderHome from "@/src/components/screens/home/tittle" 
import ImageSelector from "@/src/components/screens/home/image-selector" 
import ActionButtons from "@/src/components/screens/home/action-button" 
import { useAuth } from "@/src/hooks/use-auth"
import LoadingScreen from "@/src/components/loading/loading"

const HomeScreen: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const { colors, fontSize } = useTheme()
  const [showAudioModal, setShowAudioModal] = useState(false)
  const [audioDescription, setAudioDescription] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { width, height } = useWindowDimensions()

  // Mostra a tela de carregamento enquanto verifica a autenticação
  if (isLoading) {
    return <LoadingScreen />
  }

  // Redireciona com base no estado de autenticação
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />
  } 
  

  const isLandscape = width > height

  const handleConversion = () => {
    // Aqui você implementaria a lógica real de conversão
    // Por enquanto, estamos usando um texto de exemplo
    const description = "Texto de exemplo gerado a partir da imagem"
    setAudioDescription(description)
    setShowAudioModal(true)
  }

  const handleInfoPress = () => {
    router.push({
      pathname: "/how-use" as any,
    })
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [10, 10],
      quality: 1,
    })

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