import type React from "react"
import { View, Image, StyleSheet, Platform } from "react-native"
import { ImageSelectorProps } from "./interfaces/schemas"


const ImageSelector: React.FC<ImageSelectorProps> = ({ selectedImage, isLandscape, height, backgroundColor }) => {
  return (
    <View
      style={[
        styles.imageContainer,
        {
          width: isLandscape ? "40%" : "100%",
          maxHeight: isLandscape ? height * 0.7 : height * 0.4,
          backgroundColor,
        },
      ]}
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
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    aspectRatio: 1,
    maxWidth: 360,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: "8%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
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
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderImage: {
    flex: 1,
  },
})

export default ImageSelector

