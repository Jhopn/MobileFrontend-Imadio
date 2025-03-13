import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { ThemeProvider } from '../providers/ThemeProvider';
import LoadingScreen from '../components/loading/loading';

// Impede a SplashScreen de esconder antes do carregamento completo.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isLoading, setIsLoading] = useState(true); // ⬅️ MOVIDO PARA CIMA

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    // Simula um tempo de carregamento
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!loaded) { 
    return null; 
  } // ⬅️ O RETORNO AQUI NÃO AFETA A ORDEM DOS HOOKS

  return (
    <ThemeProvider>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen 
              name="how-use" 
              options={{ 
                headerShown: false,
                presentation: 'modal'
              }} 
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </>
      )}
    </ThemeProvider>
  );
}
