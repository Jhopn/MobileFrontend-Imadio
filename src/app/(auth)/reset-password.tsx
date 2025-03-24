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
  Alert,
  AccessibilityInfo,
} from "react-native"
import { useTheme } from "@/src/hooks/use-theme"
import { useRouter, useLocalSearchParams } from "expo-router"
import { resetPassword } from "@/src/server/api/api" // Ajuste conforme sua API
import WaveBalumBackground from "@/src/components/common/wave-balum"
import StatusMessage from "@/src/components/common/status-message"

const ResetPasswordScreen: React.FC = () => {
  const { colors, fontSize } = useTheme()
  const router = useRouter()
  const params = useLocalSearchParams()
  const token = params.token as string

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Estados para mensagens de status
  const [statusMessage, setStatusMessage] = useState("")
  const [statusType, setStatusType] = useState<"success" | "error" | "info">("info")
  const [showStatus, setShowStatus] = useState(false)

  // Limpa a mensagem de status quando as senhas mudam
  useEffect(() => {
    if (showStatus) {
      setShowStatus(false)
    }
  }, [password, confirmPassword])

  const handleResetPassword = async () => {
    if (!password.trim() || !confirmPassword.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos", undefined, {
        cancelable: true,
        onDismiss: () => {
          // Anuncia para leitores de tela
          if (Platform.OS === "ios") {
            AccessibilityInfo.announceForAccessibility("Erro: Por favor, preencha todos os campos")
          }
        },
      })
      return
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem", undefined, {
        cancelable: true,
        onDismiss: () => {
          if (Platform.OS === "ios") {
            AccessibilityInfo.announceForAccessibility("Erro: As senhas não coincidem")
          }
        },
      })
      return
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres", undefined, {
        cancelable: true,
        onDismiss: () => {
          if (Platform.OS === "ios") {
            AccessibilityInfo.announceForAccessibility("Erro: A senha deve ter pelo menos 6 caracteres")
          }
        },
      })
      return
    }

    try {
      setIsLoading(true)
      const response = await resetPassword(password)

      if (response.status === 200) {
        Alert.alert(
          "Senha alterada",
          "Sua senha foi alterada com sucesso",
          [
            {
              text: "OK",
              onPress: () => {
                if (Platform.OS === "ios") {
                  AccessibilityInfo.announceForAccessibility("Sucesso: Sua senha foi alterada com sucesso")
                }
                setTimeout(() => router.push("/(auth)/login"), 500)
              },
            },
          ],
          {
            cancelable: false,
            onDismiss: () => {
              if (Platform.OS === "ios") {
                AccessibilityInfo.announceForAccessibility("Sucesso: Sua senha foi alterada com sucesso")
              }
            },
          },
        )
      }
    } catch (error) {
      console.error("Erro ao redefinir senha:", error)
      Alert.alert("Erro", "Não foi possível redefinir sua senha. Tente novamente.", undefined, {
        cancelable: true,
        onDismiss: () => {
          if (Platform.OS === "ios") {
            AccessibilityInfo.announceForAccessibility("Erro: Não foi possível redefinir sua senha. Tente novamente.")
          }
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

        {/* Componente de mensagem de status */}
        <StatusMessage type={statusType} message={statusMessage} visible={showStatus} />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua nova senha..."
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            accessibilityLabel="Campo de nova senha"
            accessibilityHint="Digite sua nova senha"
            accessibilityState={{ disabled: isLoading }}
            importantForAccessibility="yes"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite a mesma senha..."
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            accessibilityLabel="Campo de confirmação de senha"
            accessibilityHint="Digite novamente sua nova senha para confirmar"
            accessibilityState={{ disabled: isLoading }}
            importantForAccessibility="yes"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary, opacity: isLoading ? 0.7 : 1 }]}
          onPress={handleResetPassword}
          disabled={isLoading}
          accessibilityLabel="Botão de alterar senha"
          accessibilityHint="Toque para confirmar a alteração de senha"
          accessibilityState={{ disabled: isLoading, busy: isLoading }}
          accessibilityLiveRegion="polite"
        >
          <Text style={styles.buttonText}>{isLoading ? "Alterando..." : "Alterar Senha"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navigateToSignup}
          style={styles.signupLink}
          accessibilityLabel="Link para cadastro"
          accessibilityHint="Toque para ir para a tela de cadastro"
          accessibilityRole="link"
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

export default ResetPasswordScreen;