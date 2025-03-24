"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native"
import { useTheme } from "@/src/hooks/use-theme"
import { useRouter } from "expo-router"
import { requestPasswordReset } from "@/src/server/api/api"
import WaveBalumBackground from "@/src/components/common/wave-balum"
import StatusMessage from "@/src/components/common/status-message"

const { width } = Dimensions.get("window")

const ForgotPasswordScreen: React.FC = () => {
  const { colors, fontSize } = useTheme()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Estados para mensagens de status
  const [statusMessage, setStatusMessage] = useState("")
  const [statusType, setStatusType] = useState<"success" | "error" | "info">("info")
  const [showStatus, setShowStatus] = useState(false)

  // Limpa a mensagem de status quando o email muda
  useEffect(() => {
    if (showStatus) {
      setShowStatus(false)
    }
  }, [email])

  const handleSendCode = async () => {
    if (!email.trim()) {
      setStatusMessage("Por favor, digite seu email")
      setStatusType("error")
      setShowStatus(true)
      return
    }

    try {
      setIsLoading(true)
      await requestPasswordReset(email)

      // Exibe mensagem de sucesso
      setStatusMessage("Email enviado! Verifique sua caixa de entrada para o código de verificação.")
      setStatusType("success")
      setShowStatus(true)

      // Redireciona após um breve atraso para que o usuário possa ler a mensagem
      setTimeout(() => {
        router.push({
          pathname: "/(auth)/verify-code",
          params: { email },
        })
      }, 2000)
    } catch (error) {
      console.error("Erro ao enviar email de redefinição:", error)

      // Exibe mensagem de erro
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
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: "#f0f0f7" }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={50}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: "#000", fontSize: fontSize * 1.8 }]}>Redefinir Senha</Text>
        </View>

        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/Logo.png")}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="Logo IMADIO"
          />
        </View>

        <Text style={styles.description}>Um email será enviado com um link para redefinir a senha da sua conta</Text>

        {/* Componente de mensagem de status */}
        <StatusMessage type={statusType} message={statusMessage} visible={showStatus} />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email..."
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="Campo de email"
            accessibilityHint="Digite seu email para receber o link de redefinição de senha"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary, opacity: isLoading ? 0.7 : 1 }]}
          onPress={handleSendCode}
          disabled={isLoading}
          accessibilityLabel="Botão de enviar código"
          accessibilityHint="Toque para enviar o código de redefinição de senha para seu email"
        >
          <Text style={styles.buttonText}>{isLoading ? "Enviando..." : "Enviar Código"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navigateToSignup}
          style={styles.signupLink}
          accessibilityLabel="Link para cadastro"
          accessibilityHint="Toque para ir para a tela de cadastro"
        >
          <Text style={styles.signupText}>Não possui conta? Faça o cadastro!</Text>
        </TouchableOpacity>
      </ScrollView>

      <WaveBalumBackground height={150} />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 100,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  logo: {
    width: 200,
    height: 80,
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
  },
  button: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupLink: {
    alignItems: "center",
    marginTop: 10,
  },
  signupText: {
    color: "#000",
    fontSize: 14,
  },
})

export default ForgotPasswordScreen;