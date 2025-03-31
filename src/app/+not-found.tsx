import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/src/hooks/use-theme";
import { Home } from "react-native-feather";
import ButtonComponent from "@/src/components/common/button";

export default function NotFoundScreen() {
  const router = useRouter();
  const { colors, fontSize } = useTheme();

  const navigateToHome = () => {
    router.replace("/");
  };

  return (
    <View 
      style={[styles.container, { backgroundColor: colors.background }]}
      accessible={true}
      accessibilityRole="alert"
      accessibilityLabel="Página não encontrada"
    >
      <View style={styles.content}>
        <Text 
          style={[styles.errorCode, { color: colors.primary }]}
          accessibilityRole="header"
        >
          404
        </Text>
        
        <Text 
          style={[styles.title, { color: colors.text, fontSize: fontSize * 1.5 }]}
          accessibilityRole="header"
        >
          Página não encontrada
        </Text>
        
        <Text 
          style={[styles.description, { color: colors.text, fontSize: fontSize }]}
          accessibilityRole="text"
        >
          A página que você está procurando não existe ou foi removida.
        </Text>
        
        <ButtonComponent
          role="button"
          label="Voltar para a página inicial"
          hint="Navega de volta para a tela inicial do aplicativo"
          onPress={navigateToHome}
        >
          <View style={styles.buttonContent}>
            <Home width={20} height={20} stroke="#000000" style={styles.buttonIcon} />
            <Text style={[styles.buttonText, { fontSize: fontSize }]}>
              Voltar para o início
            </Text>
          </View>
        </ButtonComponent>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  errorCode: {
    fontSize: 72,
    fontWeight: "bold",
    marginBottom: 16,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#000000",
    fontWeight: "bold",
  },
});