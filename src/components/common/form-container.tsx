import type React from "react"
import { View, StyleSheet, type ViewStyle } from "react-native"

interface FormContainerProps {
  children: React.ReactNode
  style?: ViewStyle
  accessibilityLabel?: string
}

const FormContainer: React.FC<FormContainerProps> = ({ children, style, accessibilityLabel = "Formulário" }) => {
  return (
    <View
      style={[styles.formContainer, style]}
      accessibilityLabel={accessibilityLabel}
      accessible={true}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
})

export default FormContainer

