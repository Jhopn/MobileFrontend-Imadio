import type React from "react"
import { useState, useEffect } from "react"
import { Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, View } from "react-native"
import { useTheme } from "@/src/hooks/use-theme"
import { useRouter, useLocalSearchParams } from "expo-router"
import { verifyCode } from "@/src/server/api/api"
import StatusMessage from "@/src/components/common/status-message"
import Button from "@/src/components/common/button"
import AuthLayout from "@/src/components/common/auth-layout"
import FormContainer from "@/src/components/common/form-container"
import CodeInputGroup from "@/src/components/verify-code/code-input"
import LinkButton from "@/src/components/common/link-button"
import AccessibilityInstructions from "@/src/components/common/accessibility-instructions"
import ImadioLogo from "@/src/components/common/logo-imadio"

const VerifyCodeScreen: React.FC = () => {
  const { colors, fontSize } = useTheme()
  const router = useRouter()
  const params = useLocalSearchParams()
  const email = (params.email as string) || ""

  const [code, setCode] = useState(["", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)

  const [statusMessage, setStatusMessage] = useState("")
  const [statusType, setStatusType] = useState<"success" | "error" | "info">("info")
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {
    if (showStatus) {
      setShowStatus(false)
    }
  }, [code])

  const handleVerifyCode = async (fullCode?: string) => {
    const codeToVerify = fullCode || code.join("")

    if (codeToVerify.length !== 4) {
      setStatusMessage("Por favor, digite o código completo de 4 dígitos")
      setStatusType("error")
      setShowStatus(true)
      return
    }

    try {
      setIsLoading(true)

      const response = await verifyCode(codeToVerify)

      setStatusMessage("Código verificado com sucesso!")
      setStatusType("success")
      setShowStatus(true)

      setTimeout(() => {
        router.push({
          pathname: "/(auth)/reset-password"
        })
      })
    } catch (error) {
      console.error("Erro ao verificar código:", error)

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
    <SafeAreaView
      accessible={false}
      accessibilityLabel="Tela de recuperação de senha"
      accessibilityRole="text"
      style={styles.safeArea}
    >
      <KeyboardAvoidingView
        style={[styles.keyboardAvoid, { backgroundColor: colors.background } ]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          accessibilityLabel="Formulário de verificação de código"
          accessibilityRole="text"
        >
          <View accessible={true} style={styles.container}>

            <View
              accessible={true}
              accessibilityLabel="Formulário de verificação de código"
              accessibilityRole="text"
            >
              <Text
                style={[styles.title, { fontSize: fontSize * 2  }]}
                accessibilityRole="text"
                accessibilityLabel="Verificar Código"
              >
                Verificar Código
              </Text>

              <ImadioLogo />
            </View>


            <AccessibilityInstructions screenName="verifyCode" />

            <Text
              style={styles.description}
              accessibilityLabel={`Digite o código de 4 dígitos enviado para ${email || "seu email"}`}
              accessibilityRole="text"
            >
              Digite o código de 4 dígitos enviado para {email || "seu email"}
            </Text>

            <StatusMessage type={statusType} message={statusMessage} visible={showStatus} />

            <FormContainer accessibilityLabel="Formulário de verificação de código">
              <CodeInputGroup code={code} onChange={setCode} onComplete={handleVerifyCode} disabled={isLoading} />

              <Button
                role="button"
                label="Verificar código"
                hint="Toque para verificar o código e prosseguir para redefinição de senha"
                onPress={() => handleVerifyCode()}
              >
                {isLoading ? "Verificando..." : "Verificar"}
              </Button>

              <LinkButton
                role="link"
                label="Reenviar código"
                hint="Toque para receber um novo código por email"
                onPress={handleResendCode}
              >
                Não recebeu o código? Reenviar
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
  description: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    fontFamily: "MontserratAlternativesMedium",
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
  resendText: {
    fontSize: 14,
    fontFamily: "MontserratAlternativesRegular",
  },
})

export default VerifyCodeScreen