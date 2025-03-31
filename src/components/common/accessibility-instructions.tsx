import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from "react-native"
import { useTheme } from "@/src/hooks/use-theme"

interface AccessibilityInstructionsProps {
  screenName: string
}

const AccessibilityInstructions: React.FC<AccessibilityInstructionsProps> = ({ screenName }) => {
  const { colors, fontSize } = useTheme()
  const [modalVisible, setModalVisible] = useState(false)

  // Instruções específicas para cada tela
  const getInstructions = () => {
    switch (screenName) {
      case "login":
        return [
          "Esta é a tela de login.",
          "Digite seu email no primeiro campo.",
          "Digite sua senha no segundo campo.",
          'Toque no botão "Entrar" para fazer login.',
          'Se esqueceu sua senha, toque no link "Esqueceu a senha?" abaixo do botão de login.',
          'Se não possui uma conta, toque no link "Não possui conta? Faça o cadastro!" na parte inferior da tela.',
          "Se ocorrer algum erro, uma mensagem será exibida na tela.",
        ]
      case "register":
        return [
          "Esta é a tela de cadastro.",
          "Digite seu nome no primeiro campo.",
          "Digite seu email no segundo campo.",
          "Digite sua senha no terceiro campo.",
          "Confirme sua senha no quarto campo.",
          'Toque no botão "Cadastrar" para criar sua conta.',
          'Se já possui uma conta, toque no link "Já possui conta? Faça login!" na parte inferior da tela.',
          "Se ocorrer algum erro, uma mensagem será exibida na tela.",
        ]
      case "forgotPassword":
        return [
          "Esta é a tela de recuperação de senha.",
          "Digite seu email no campo indicado.",
          'Toque no botão "Enviar Código" para receber um código de verificação no seu email.',
          "Após enviar, você será redirecionado para a tela de verificação de código.",
          'Se não possui uma conta, toque no link "Não possui conta? Faça o cadastro!" na parte inferior da tela.',
          "Se ocorrer algum erro, uma mensagem será exibida na tela.",
        ]
      case "verifyCode":
        return [
          "Esta é a tela de verificação de código.",
          "Digite o código de 4 dígitos que foi enviado para seu email.",
          "Você pode digitar cada dígito separadamente ou colar o código completo.",
          'Toque no botão "Verificar Código" para validar o código digitado.',
          'Se não recebeu o código, toque no link "Não recebeu o código? Reenviar" para solicitar um novo código.',
          "Após a verificação bem-sucedida, você será redirecionado para a tela de redefinição de senha.",
          "Se ocorrer algum erro, uma mensagem será exibida na tela.",
        ]
      case "resetPassword":
        return [
          "Esta é a tela de redefinição de senha.",
          "Digite sua nova senha no primeiro campo.",
          "Confirme sua senha digitando-a novamente no segundo campo.",
          "A senha deve ter pelo menos 6 caracteres.",
          'Toque no botão "Alterar Senha" para confirmar a alteração.',
          "Se ocorrer algum erro, uma mensagem será exibida na tela.",
          "Após alterar a senha com sucesso, você será redirecionado para a tela de login.",
        ]
      case "home":
        return [
          "Esta é a tela inicial do aplicativo.",
          'Para selecionar uma imagem, toque no botão "Escolher Imagem".',
          "Após selecionar uma imagem, ela será exibida na área central da tela.",
          'Para converter a imagem em áudio descrição, toque no botão "Converter Imagem".',
          "Após a conversão, um modal será exibido com a descrição da imagem.",
          "No modal de descrição, você pode ouvir a descrição ou traduzi-la para outro idioma.",
          'Para fechar o modal, toque no botão "Fechar" ou no X no canto superior direito.',
          "Para obter informações sobre como usar o aplicativo, toque no ícone de informação no cabeçalho.",
        ]
      case "history":
        return [
          "Esta é a tela de histórico.",
          "Aqui você pode ver todas as suas conversões anteriores.",
          "Cada item do histórico mostra a data da conversão e uma prévia da imagem.",
          "Toque em qualquer item para ver os detalhes completos da conversão.",
          "Você pode filtrar o histórico por data ou tipo de conteúdo usando os controles na parte superior.",
          "Para excluir um item do histórico, deslize-o para a esquerda e toque no botão de exclusão.",
          "Para atualizar a lista, puxe a tela para baixo.",
        ]
      case "settings":
        return [
          "Esta é a tela de configurações.",
          "Aqui você pode personalizar várias opções do aplicativo.",
          "Para alterar o tema entre claro e escuro, use o interruptor na seção de aparência.",
          "Para ajustar o tamanho da fonte, use os controles na seção de acessibilidade.",
          "Para gerenciar sua conta, toque nas opções na seção de conta.",
          "Para sair do aplicativo, toque no botão de logout na parte inferior da tela.",
          "Todas as alterações são salvas automaticamente.",
        ]
      default:
        return ["Instruções de acessibilidade não disponíveis para esta tela."]
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        accessibilityRole="button"
        accessibilityLabel="Instruções de acessibilidade"
        accessibilityHint="Toque para abrir instruções de acessibilidade para esta tela"
        style={[styles.button, { backgroundColor: colors.primary + "20" }]}
      >
        <Text style={[styles.buttonText, { color: colors.primary, fontSize: fontSize * 0.8 }]}>
          Instruções de acessibilidade
        </Text>
        <View style={[styles.iconContainer, { borderColor: colors.primary }]}>
          <Text style={[styles.iconText, { color: colors.primary }]}>?</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        accessibilityViewIsModal={true}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <Text
              style={[styles.modalTitle, { color: colors.text, fontSize: fontSize * 1.2 }]}
              accessibilityRole="header"
            >
              Instruções de Acessibilidade
            </Text>

            <ScrollView style={styles.instructionsContainer}>
              {getInstructions().map((instruction, index) => (
                <Text
                  key={index}
                  style={[styles.instruction, { color: colors.text, fontSize: fontSize }]}
                  accessibilityRole="text"
                >
                  • {instruction}
                </Text>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: colors.primary }]}
              onPress={() => setModalVisible(false)}
              accessibilityRole="button"
              accessibilityLabel="Fechar instruções"
              accessibilityHint="Toque para fechar as instruções de acessibilidade"
            >
              <Text style={[styles.closeButtonText, { fontSize: fontSize }]}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 5
  },
  iconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  iconText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  buttonText: {
    fontWeight: "bold",
    fontFamily: "MontserratAlternativesRegular"
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxHeight: "80%",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "MontserratAlternativesMedium"
  },
  instructionsContainer: {
    marginBottom: 20,
  },
  instruction: {
    marginBottom: 10,
    lineHeight: 22,
    fontFamily: "MontserratAlternativesRegular"
  },
  closeButton: {
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "MontserratAlternativesRegular"
  },
})

export default AccessibilityInstructions
