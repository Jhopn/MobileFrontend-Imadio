import type React from "react"
import { useState, useEffect } from "react"
import { Text, StyleSheet, SafeAreaView, Platform, KeyboardAvoidingView, ScrollView, View } from "react-native"
import { useTheme } from "@/src/hooks/use-theme"
import { useRouter } from "expo-router"
import { requestPasswordReset } from "@/src/server/api/api"
import StatusMessage from "@/src/components/common/status-message"
import AuthLayout from "@/src/components/common/auth-layout"
import FormInput from "@/src/components/common/form-input"
import FormContainer from "@/src/components/common/form-container"
import LinkButton from "@/src/components/common/link-button"
import Button from "@/src/components/common/button"
import AccessibilityInstructions from "@/src/components/common/accessibility-instructions"
import ImadioLogo from "@/src/components/common/logo-imadio"

const ForgotPasswordScreen: React.FC = () => {
  const { colors, fontSize } = useTheme()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [statusMessage, setStatusMessage] = useState("")
  const [statusType, setStatusType] = useState<"success" | "error" | "info">("info")
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {
    if (showStatus) {
      setShowStatus(false)
    }
    if (error) {
      setError("")
    }
  }, [email])

  const handleSendCode = async () => {
    if (!email.trim()) {
      setError("Por favor, digite seu email")
      return
    }

    try {
      setIsLoading(true)
      await requestPasswordReset(email)

      setStatusMessage("Email enviado! Verifique sua caixa de entrada para o código de verificação.")
      setStatusType("success")
      setShowStatus(true)

      setTimeout(() => {
        router.push({
          pathname: "/(auth)/verify-code",
          params: { email },
        })
      }, 2000)
    } catch (error) {
      console.error("Erro ao enviar email de redefinição:", error)

      setStatusMessage("Não foi possível enviar o email de redefinição. Verifique seu email e tente novamente.")
      setStatusType("error")
      setShowStatus(true)
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
        style={[styles.keyboardAvoid, , { backgroundColor: colors.background }]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          accessibilityLabel="Formulário de recuperação de senha"
          accessibilityRole="text"
        >
          <View accessible={true} style={styles.container}>

            <View
              accessible={true}
              accessibilityLabel="Tela de redefinição de senha"
              accessibilityRole="text"
            >
              <Text
                style={[styles.title, {fontSize: fontSize * 2 }]}
                accessibilityRole="text"
                accessibilityLabel="Redefinir Senha"
              >
                Redefinir Senha
              </Text>

              <ImadioLogo />
            </View>


            <View accessible={true} style={styles.content} >

              <Text
                style={styles.description}
                accessibilityLabel="Adicione um email para que um código chegue ao seu email para redefinir a senha da sua conta"
                accessibilityRole="text"
                importantForAccessibility="yes"
              >
                Um email será enviado com um link para redefinir a senha da sua conta
              </Text>


              <AccessibilityInstructions screenName="forgotPassword" />

              <StatusMessage type={statusType} message={statusMessage} visible={showStatus} />

            </View>
            <FormContainer
              accessibilityLabel="Formulário de recuperação de senha"
            >
              <FormInput
                placeholder="Digite seu email..."
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                accessibilityLabel="Campo de email"
                accessibilityHint="Digite seu email para receber o link de redefinição de senha"
                error={error}
                accessible={true}
                importantForAccessibility="yes"
              />

              <Button
                role="button"
                label="Enviar código"
                hint="Toque para enviar o código de redefinição de senha para seu email"
                onPress={handleSendCode}
              >
                {isLoading ? "Enviando..." : "Enviar Código"}
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
  safeArea: {
    flex: 1,
  },
  headerMargin: {
    marginBottom: 40
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
  content: {
    alignItems: 'center',
  },
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
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  description: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    fontFamily: "MontserratAlternativesRegular",
    paddingHorizontal: 20,
  },
})

export default ForgotPasswordScreen