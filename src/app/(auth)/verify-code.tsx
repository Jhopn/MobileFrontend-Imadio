import type React from "react"
import { useState, useRef, useEffect } from "react"
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
} from "react-native"
import { useTheme } from "@/src/hooks/use-theme"
import { useRouter, useLocalSearchParams } from "expo-router"
import { verifyCode } from "@/src/server/api/api" 
import WaveBalumBackground from "@/src/components/common/wave-balum"
import StatusMessage from "@/src/components/common/status-message"

const VerifyCodeScreen: React.FC = () => {
  const { colors, fontSize } = useTheme()
  const router = useRouter()
  const params = useLocalSearchParams()
  const email = (params.email as string) || ""

  // Estado para os 4 dígitos
  const [code, setCode] = useState(["", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)

  // Estados para mensagens de status
  const [statusMessage, setStatusMessage] = useState("")
  const [statusType, setStatusType] = useState<"success" | "error" | "info">("info")
  const [showStatus, setShowStatus] = useState(false)

  // Refs para os inputs
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null])

  // Limpa a mensagem de status quando o código muda
  useEffect(() => {
    if (showStatus) {
      setShowStatus(false)
    }
  }, [code])

  // Função para atualizar o código e mover o foco
  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) {
      // Se o usuário colar um código completo
      const pastedCode = text.slice(0, 4).split("")
      const newCode = [...code]

      pastedCode.forEach((digit, i) => {
        if (i < 4) {
          newCode[i] = digit
        }
      })

      setCode(newCode)

      // Mover para o último input
      if (pastedCode.length === 4 && inputRefs.current[3]) {
        inputRefs.current[3]?.focus()
      }
    } else {
      // Atualização normal de um dígito
      const newCode = [...code]
      newCode[index] = text
      setCode(newCode)

      // Mover para o próximo input se houver texto
      if (text && index < 3 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  // Função para lidar com a tecla de backspace
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      // Se backspace for pressionado em um campo vazio, volte para o anterior
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerifyCode = async () => {
    const fullCode = code.join("")

    if (fullCode.length !== 4) {
      setStatusMessage("Por favor, digite o código completo de 4 dígitos")
      setStatusType("error")
      setShowStatus(true)
      return
    }

    try {
      setIsLoading(true)
      // Substitua pela sua chamada de API real
      const response = await verifyCode(fullCode)

      // Exibe mensagem de sucesso
      setStatusMessage("Código verificado com sucesso!")
      setStatusType("success")
      setShowStatus(true)

      // Redireciona após um breve atraso para que o usuário possa ler a mensagem
      setTimeout(() => {
        // Se a verificação for bem-sucedida, redirecione para a página de redefinição de senha
        router.push({
          pathname: "/(auth)/reset-password"
        })
      }, 1500)
    } catch (error) {
      console.error("Erro ao verificar código:", error)

      // Exibe mensagem de erro
      setStatusMessage("O código digitado é inválido ou expirou. Tente novamente.")
      setStatusType("error")
      setShowStatus(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    router.push({
      pathname: "/(auth)/forgot-password"
    })
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: "#f0f0f7" }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={50}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: "#000", fontSize: fontSize * 1.8 }]}>Verificar Código</Text>
        </View>

        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/Logo.png")}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="Logo IMADIO"
          />
        </View>

        <Text style={styles.description}>Digite o código de 4 dígitos enviado para {email || "seu email"}</Text>

        <StatusMessage type={statusType} message={statusMessage} visible={showStatus} />

        <View style={styles.codeContainer}>
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
                },
              ]}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              accessibilityLabel={`Dígito ${index + 1} do código`}
              accessibilityHint={`Digite o dígito ${index + 1} do código de verificação`}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary, opacity: isLoading ? 0.7 : 1 }]}
          onPress={handleVerifyCode}
          disabled={isLoading}
          accessibilityLabel="Botão de verificar código"
          accessibilityHint="Toque para verificar o código e prosseguir para redefinição de senha"
        >
          <Text style={styles.buttonText}>{isLoading ? "Verificando..." : "Verificar Código"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleResendCode}
          style={styles.resendLink}
          accessibilityLabel="Reenviar código"
          accessibilityHint="Toque para receber um novo código por email"
          disabled={isLoading}
        >
          <Text style={[styles.resendText, { color: colors.primary }]}>Não recebeu o código? Reenviar</Text>
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
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
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
  resendLink: {
    alignItems: "center",
    marginTop: 10,
  },
  resendText: {
    fontSize: 14,
    textDecorationLine: "underline",
  },
})

export default VerifyCodeScreen;