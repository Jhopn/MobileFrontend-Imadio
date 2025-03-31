import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { ActionButtonsProps } from "./interfaces/schemas"
import ButtonPrimary from "../common/button-primary"


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

      <ButtonPrimary onPress={onPickImage} hint="Toque para selecionar uma imagem da galeria" label="Escolher Imagem para conversão em áudio descrição" role="button">
        Escolher Imagem
      </ButtonPrimary>

      <ButtonPrimary
        onPress={onConvert}
        role="button"
        label="Converter"
        hint="Toque para converter a imagem selecionada em áudio"
        disabled={!selectedImage}
      >
        Converter
      </ButtonPrimary>

    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 25
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
  buttonText: {
    fontWeight: "bold",
    fontFamily: "MontserratAlternativesMedium"
  },
  buttonTextDisabled: {
    color: "#666",
  },
})

export default ActionButtons;

