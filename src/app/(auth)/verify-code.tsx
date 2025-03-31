import type React from "react"
import { useState, useEffect } from "react"
import { Text, StyleSheet } from "react-native"
import { useTheme } from "@/src/hooks/use-theme"
import { useRouter, useLocalSearchParams } from "expo-router"
import { verifyCode } from "@/src/server/api/api"
import StatusMessage from "@/src/components/common/status-message"
import Button from "@/src/components/common/button"
import AuthLayout from "@/src/components/common/auth-layout" 
import Header from "@/src/components/common/header" 
import FormContainer from "@/src/components/common/form-container" 
import CodeInputGroup from "@/src/components/verify-code/code-input" 
import LinkButton from "@/src/components/common/link-button"
import AccessibilityInstructions from "@/src/components/common/accessibility-instructions"

const VerifyCodeScreen: React.FC = () => {
  const { colors } = useTheme()
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
    <AuthLayout accessibilityLabel="Tela de verificação de código">
      <Header title="Verificar Código" titleAccessibilityLabel="Verificar Código"/>

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
          <Text style={[styles.buttonText, {color: colors.text}]}>{isLoading ? "Verificando..." : "Verificar"}</Text>
        </Button>

        <LinkButton
          role="link"
          label="Reenviar código"
          hint="Toque para receber um novo código por email"
          onPress={handleResendCode}
        >
          <Text style={[styles.resendText, { color: colors.text }]}>Não recebeu o código? Reenviar</Text>
        </LinkButton>
      </FormContainer>
    </AuthLayout>
  )
}

const styles = StyleSheet.create({
  description: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resendText: {
    fontSize: 14,
  },
})

export default VerifyCodeScreen