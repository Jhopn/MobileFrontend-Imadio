import type React from "react"
import { View, TextInput, Text, StyleSheet, type TextInputProps } from "react-native"
import { useTheme } from "@/src/hooks/use-theme"

interface FormInputProps extends TextInputProps {
  error?: string
  containerStyle?: object
  label?: string
}

const FormInput: React.FC<FormInputProps> = ({
  error,
  containerStyle,
  label,
  accessibilityLabel,
  accessibilityHint,
  ...props
}) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {label && (
        <Text style={styles.label} accessibilityRole="text">
          {label}
        </Text>
      )}

      <TextInput
        style={[styles.input, error && { borderBottomColor: "red" }, props.editable === false && { opacity: 0.7 }]}
        placeholderTextColor="#000000"
        accessibilityLabel={accessibilityLabel || props.placeholder}
        accessibilityHint={accessibilityHint}
        accessibilityRole="text"
        accessibilityState={{
          disabled: props.editable === false,
          selected: props.value ? true : false,
        }}
        {...props}
      />

      {error && (
        <Text
          style={styles.errorText}
          accessibilityLabel={`Erro: ${error}`}
          accessibilityLiveRegion="polite"
          accessibilityRole="alert"
          accessible={true}
        >
          {error}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
})

export default FormInput