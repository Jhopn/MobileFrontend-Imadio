import { useFonts } from "expo-font"
import { Slot, SplashScreen } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import "react-native-reanimated"
import { ThemeProvider } from "../providers/themes/theme-provider"
import { AuthProvider } from "../providers/auth/auth-provider" 

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    MontserratAlternativesRegular: require("../assets/fonts/MontserratAlternates-Regular.ttf"),
    MontserratAlternativesLight: require("../assets/fonts/MontserratAlternates-Light.ttf"),
    MontserratAlternativesMedium: require("../assets/fonts/MontserratAlternates-Medium.ttf"),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <Slot />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  )
}

