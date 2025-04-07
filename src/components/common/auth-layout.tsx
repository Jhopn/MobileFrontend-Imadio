// src/components/auth/auth-layout.tsx
import type React from "react"
import { Platform, ScrollView, StyleSheet, View, type ViewStyle } from "react-native"
import { useTheme } from "@/src/hooks/use-theme"
import WaveBalumBackground from "@/src/components/common/wave-balum"
import WaveSkateBackground from "@/src/components/common/wave-skate"

interface AuthLayoutProps {
  children?: React.ReactNode
  waveType?: "balum" | "skate"
  contentStyle?: ViewStyle
  accessibilityLabel?: string
  testID?: string
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  waveType = "balum",
  contentStyle,
  accessibilityLabel = "Tela de autenticação",
  testID,
}) => {
  const { colors } = useTheme()

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background }]}
      accessibilityLabel={accessibilityLabel}
      accessible={false}
      importantForAccessibility="no"
      testID={testID}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        accessibilityElementsHidden={false}
        importantForAccessibility="no"
      >
        <View 
          style={[styles.content, contentStyle]}
          accessibilityElementsHidden={false}
          importantForAccessibility="no"
        >
          {children}
        </View>
      </ScrollView>

      {waveType === "balum" ? (
        <WaveBalumBackground/>
      ) : (
        <WaveSkateBackground/>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -10
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: '14%',
  },
})

export default AuthLayout