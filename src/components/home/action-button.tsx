import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { ActionButtonsProps } from "./interfaces/schemas"


const ActionButtons: React.FC<ActionButtonsProps> = ({
  onPickImage,
  onConvert,
  selectedImage,
  isLandscape,
  primaryColor,
  backgroundColor,
  fontSize,
}) => {
  return (
    <View style={[styles.buttonContainer, isLandscape && styles.buttonContainerLandscape]}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: primaryColor, width: isLandscape ? "80%" : "100%" }]}
        onPress={onPickImage}
        accessibilityRole="button"
        accessibilityLabel="Escolher Imagem"
        accessibilityHint="Toque para selecionar uma imagem da galeria"
      >
        <Text style={[styles.buttonText, { fontSize, color: backgroundColor }]}>Escolher Imagem</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          !selectedImage && styles.buttonDisabled,
          { backgroundColor: primaryColor, width: isLandscape ? "80%" : "100%" },
        ]}
        onPress={onConvert}
        disabled={!selectedImage}
        accessibilityRole="button"
        accessibilityLabel="Converter"
        accessibilityHint="Toque para converter a imagem selecionada em áudio"
        accessibilityState={{ disabled: !selectedImage }}
      >
        <Text
          style={[styles.buttonText, !selectedImage && styles.buttonTextDisabled, { fontSize, color: backgroundColor }]}
        >
          Converter
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  buttonContainerLandscape: {
    width: "50%",
  },
  button: {
    borderRadius: 30,
    maxWidth: 400,
    paddingVertical: "4%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "4%",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: "bold",
    fontFamily: "MontserratAlternativesMedium"
  },
  buttonTextDisabled: {
    color: "#666",
  },
})

export default ActionButtons;

