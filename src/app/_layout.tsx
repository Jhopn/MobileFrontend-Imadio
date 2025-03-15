import { useFonts } from "expo-font"
import { Slot, SplashScreen } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import "react-native-reanimated"
import { ThemeProvider } from "../providers/themes/theme-provider"
import { AuthProvider } from "../providers/auth/auth-provider" 

// Impede a SplashScreen de esconder antes do carregamento completo.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  // Importante: Use Slot em vez de Stack no Root Layout
  return (
    <AuthProvider>
      <ThemeProvider>
        <Slot />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  )
}

