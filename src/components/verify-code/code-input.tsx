"use client"

import type React from "react"
import { useRef } from "react"
import { View, TextInput, StyleSheet } from "react-native"
import { useTheme } from "@/src/hooks/use-theme"

interface CodeInputGroupProps {
  code: string[]
  onChange: (code: string[]) => void
  onComplete?: (code: string) => void
  disabled?: boolean
}

const CodeInputGroup: React.FC<CodeInputGroupProps> = ({ code, onChange, onComplete, disabled = false }) => {
  const { colors } = useTheme()
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null])

  const handleCodeChange = (text: string, index: number) => {
    if (disabled) return

    if (text.length > 1) {
      // Caso de colar um código completo
      const pastedCode = text.slice(0, 4).split("")
      const newCode = [...code]

      pastedCode.forEach((digit, i) => {
        if (i < 4) {
          newCode[i] = digit
        }
      })

      onChange(newCode)

      if (pastedCode.length === 4) {
        if (inputRefs.current[3]) {
          inputRefs.current[3]?.focus()
        }

        if (onComplete) {
          onComplete(newCode.join(""))
        }
      }
    } else {
      // Caso normal de digitar um dígito
      const newCode = [...code]
      newCode[index] = text
      onChange(newCode)

      // Mover para o próximo input se houver texto
      if (text && index < 3 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus()
      }

      // Verificar se o código está completo
      if (text && index === 3 && onComplete) {
        const fullCode = newCode.join("")
        if (fullCode.length === 4) {
          onComplete(fullCode)
        }
      }
    }
  }

  const handleKeyPress = (e: any, index: number) => {
    if (disabled) return

    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      // Se backspace for pressionado em um campo vazio, volte para o anterior
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <View
      style={styles.codeContainer}
      accessibilityLabel="Grupo de campos para código de verificação"
      accessibilityHint="Digite o código de 4 dígitos recebido por email"
    >
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={[
            styles.codeInput,
            {
              borderColor: colors.primary,
              color: "#000",
              backgroundColor: "#f5f5f5",
              opacity: disabled ? 0.7 : 1,
            },
          ]}
          value={digit}
          onChangeText={(text) => handleCodeChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
          editable={!disabled}
          accessibilityLabel={`Dígito ${index + 1} do código`}
          accessibilityHint={`Digite o dígito ${index + 1} do código de verificação`}
          accessibilityState={{ disabled }}
          accessibilityRole="text"
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    width: "100%",
  },
  codeInput: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
})

export default CodeInputGroup