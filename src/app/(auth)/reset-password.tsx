import type React from "react"
import { useState, useEffect } from "react"
import { Text, StyleSheet, Alert, AccessibilityInfo, Platform } from "react-native"
import { useTheme } from "@/src/hooks/use-theme"
import { useRouter, useLocalSearchParams } from "expo-router"
import { resetPassword } from "@/src/server/api/api"
import StatusMessage from "@/src/components/common/status-message"
import AuthLayout from "@/src/components/common/auth-layout" 
import Header from "@/src/components/common/header" 
import FormInput from "@/src/components/common/form-input" 
import FormContainer from "@/src/components/common/form-container" 
import AccessibilityInstructions from "@/src/components/common/accessibility-instructions" 
import LinkButton from "@/src/components/common/link-button"
import Button from "@/src/components/common/button"

const ResetPasswordScreen: React.FC = () => {
  const { colors } = useTheme()
  const router = useRouter()
  const params = useLocalSearchParams()
  const token = params.token as string

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")

  // Estados para mensagens de status
  const [statusMessage, setStatusMessage] = useState("")
  const [statusType, setStatusType] = useState<"success" | "error" | "info">("info")
  const [showStatus, setShowStatus] = useState(false)

  // Limpa a mensagem de status quando as senhas mudam
  useEffect(() => {
    if (showStatus) {
      setShowStatus(false)
    }
    if (passwordError) {
      setPasswordError("")
    }
    if (confirmPasswordError) {
      setConfirmPasswordError("")
    }
  }, [password, confirmPassword])

  // Função para anunciar mensagens para leitores de tela
  const announceMessage = (message: string) => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      AccessibilityInfo.announceForAccessibility(message)
    }
  }

  const validateForm = () => {
    let isValid = true

    if (!password.trim()) {
      setPasswordError("Por favor, digite sua nova senha")
      isValid = false
    } else if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres")
      isValid = false
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Por favor, confirme sua senha")
      isValid = false
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("As senhas não coincidem")
      isValid = false
    }

    return isValid
  }

  const handleResetPassword = async () => {
    if (!validateForm()) {
      return
    }

    try {
      setIsLoading(true)
      announceMessage("Processando sua solicitação, por favor aguarde...")

      const response = await resetPassword(password)

      if (response.status === 200) {
        setStatusMessage("Sua senha foi alterada com sucesso")
        setStatusType("success")
        setShowStatus(true)

        Alert.alert(
          "Senha alterada",
          "Sua senha foi alterada com sucesso",
          [
            {
              text: "OK",
              onPress: () => {
                announceMessage("Redirecionando para a tela de login")
                setTimeout(() => router.push("/(auth)/login"), 500)
              },
            },
          ],
          {
            cancelable: false,
            onDismiss: () => {
              announceMessage("Sucesso: Sua senha foi alterada com sucesso")
            },
          },
        )
      }
    } catch (error) {
      console.error("Erro ao redefinir senha:", error)

      setStatusMessage("Não foi possível redefinir sua senha. Tente novamente.")
      setStatusType("error")
      setShowStatus(true)

      announceMessage("Erro: Não foi possível redefinir sua senha. Tente novamente.")

      Alert.alert("Erro", "Não foi possível redefinir sua senha. Tente novamente.", undefined, {
        cancelable: true,
        onDismiss: () => {
          announceMessage("Erro: Não foi possível redefinir sua senha. Tente novamente.")
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  const navigateToSignup = () => {
    router.push("/(auth)/register")
  }

  return (
    <AuthLayout accessibilityLabel="Tela de redefinição de senha">
      <Header title="Redefinir Senha" titleAccessibilityLabel="Redefinir Senha" />

      <AccessibilityInstructions screenName="resetPassword" />

      <StatusMessage type={statusType} message={statusMessage} visible={showStatus} />

      <FormContainer accessibilityLabel="Formulário de redefinição de senha">
        <FormInput
          placeholder="Digite sua nova senha..."
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          accessibilityLabel="Campo de nova senha"
          accessibilityHint="Digite sua nova senha com pelo menos 6 caracteres"
          accessibilityState={{ disabled: isLoading }}
          importantForAccessibility="yes"
          error={passwordError}
        />

        <FormInput
          placeholder="Digite a mesma senha..."
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          accessibilityLabel="Campo de confirmação de senha"
          accessibilityHint="Digite novamente sua nova senha para confirmar"
          accessibilityState={{ disabled: isLoading }}
          importantForAccessibility="yes"
          error={confirmPasswordError}
        />

        <Button
          role="button"
          label="Alterar senha"
          hint="Toque para confirmar a alteração de senha"
          onPress={handleResetPassword}
        >
          <Text style={[styles.buttonText, {color: colors.text}]}>{isLoading ? "Alterando..." : "Alterar Senha"}</Text>
        </Button>

        <LinkButton
          role="link"
          label="Não possui conta? Faça o cadastro!"
          hint="Toque para ir para a tela de cadastro"
          onPress={navigateToSignup}
        >
          <Text style={styles.signupText}>Não possui conta? Faça o cadastro!</Text>
        </LinkButton>
      </FormContainer>
    </AuthLayout>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupText: {
    color: "#000",
    fontSize: 14,
  },
})

export default ResetPasswordScreen