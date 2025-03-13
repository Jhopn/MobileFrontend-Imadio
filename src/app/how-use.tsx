import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme } from '@/src/hooks/use-theme';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

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
            accessibilityRole="header"
          >
            Como usar?
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

        <TouchableOpacity
          style={[styles.exitButton, { borderColor: colors.text }]}
          onPress={handleExit}
          accessibilityRole="button"
          accessibilityLabel="Sair da tela de explicação"
          accessibilityHint="Retorna para a tela anterior"
        >
          <Text style={[styles.exitButtonText, { color: colors.text, fontSize: fontSize * 1.2 }]}>
            Sair
          </Text>
        </TouchableOpacity>

        <View style={styles.waveContainer}>
          <Svg
            height="100%"
            width="100%"
            viewBox="0 0 1440 320"
            style={styles.wave}
          >
            <Path
              fill="#9f90ff"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </Svg>
        </View>
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
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 40,
  },
  description: {
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  exitButton: {
    marginTop: 'auto',
    marginBottom: 100, // Espaço para a onda
    marginHorizontal: 24,
    paddingVertical: 16,
    borderWidth: 2,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitButtonText: {
    fontWeight: 'bold',
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