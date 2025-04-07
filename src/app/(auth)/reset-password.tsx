import type React from "react"
import { useState, useEffect } from "react"
import { Text, StyleSheet, Alert, AccessibilityInfo, Platform, SafeAreaView, KeyboardAvoidingView, ScrollView, View } from "react-native"
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
import ImadioLogo from "@/src/components/common/logo-imadio"

const ResetPasswordScreen: React.FC = () => {
  const { colors, fontSize } = useTheme()
  const router = useRouter()
  const params = useLocalSearchParams()

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
    <SafeAreaView
      accessible={false}
      accessibilityLabel="Tela de recuperação de senha"
      accessibilityRole="text"
      style={styles.safeArea}
    >
      <KeyboardAvoidingView
        style={[styles.keyboardAvoid, { backgroundColor: colors.background }]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          accessibilityLabel="Formulário de troca de senha"
          accessibilityRole="text"
        >
          <View accessible={true} style={styles.container}>

            <View
              accessible={true}
              accessibilityLabel="Formulário de troca de senha"
              accessibilityRole="text"
            >
              <Text
                style={[styles.title, { fontSize: fontSize * 2 }]}
                accessibilityRole="text"
                accessibilityLabel="Redefinir Senha"
              >
                Redefinir Senha
              </Text>

              <ImadioLogo/>
            </View>
            
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
                {isLoading ? "Alterando..." : "Alterar Senha"}
              </Button>

              <LinkButton
                role="link"
                label="Não possui conta? Faça o cadastro!"
                hint="Toque para ir para a tela de cadastro"
                onPress={navigateToSignup}
              >
                Não possui conta? Faça o cadastro!
              </LinkButton>
            </FormContainer>
          </View>
          <AuthLayout waveType="balum" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "MontserratAlternativesMedium",
  },
  signupText: {
    color: "#000",
    fontSize: 14,
    fontFamily: "MontserratAlternativesRegular",
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingTop: '13%',
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 40,
    fontFamily: "MontserratAlternativesRegular"
  },
})

export default ResetPasswordScreen