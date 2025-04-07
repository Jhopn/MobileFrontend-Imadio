import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useTheme } from '@/src/hooks/use-theme';
import { useRouter } from 'expo-router';
import WaveBalumBackground from '../components/common/wave-balum';
import Button from '../components/common/button';

const HowToUseScreen: React.FC = () => {
  const { colors, fontSize } = useTheme();
  const router = useRouter();

  const handleExit = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        <View style={styles.content}>
          <Text
            style={[styles.title, { color: colors.text, fontSize: fontSize * 2 }]}
            accessibilityRole="text"
          >
            Como Usar?
          </Text>

          <Text
            style={[styles.subtitle, { color: colors.text, fontSize: fontSize * 1.1 }]}
            accessibilityRole="text"
          >
            Explicação de como utilizar o aplicativo
          </Text>

          <Text
            style={[styles.description, { color: colors.text, fontSize: fontSize }]}
            accessibilityRole="text"
          >
            O Imadio é um aplicativo que permite a conversão de imagens em audiodescrição.
            Essas audiodescrições são salvas automaticamente. Para converter uma imagem
            basta clicar em escolher imagem e logo após em converter, uma mensagem
            audiodescrita será reproduzida.{'\n\n'}
            Após isso, caso queria ouvir novamente o que foi enviado, basta ir ao
            histórico navegar através das datas. Também possuímos a página de
            personalização, onde é possível alterar o tema e o tamanho do texto.
          </Text>
        </View>

        <View style={[styles.exitButton, { borderColor: colors.text }]} >
          <Button
            onPress={handleExit} hint='Retorna para a tela anterior' role='button' label='Sair da tela de explicação' >
              Sair
          </Button>

        </View>



        <WaveBalumBackground color={colors.primary}/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    position: 'relative',
  },
  content: {
    padding: 24,
    paddingTop: 48,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: "MontserratAlternativesMedium",
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: "MontserratAlternativesRegular",
  },
  description: {
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    fontFamily: "MontserratAlternativesMedium",
  },
  exitButton: {
    marginTop: 'auto',
    marginBottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: -1,
  },
  wave: {
    position: 'absolute',
    bottom: 0,
  },
});

export default HowToUseScreen;