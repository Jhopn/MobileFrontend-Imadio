import type React from "react"
import { View, Text, StyleSheet, AccessibilityProps } from "react-native"
import { useTheme } from "@/src/hooks/use-theme"
import ImadioLogo from "./logo-imadio"
import { useRef } from "react"

interface HeaderProps extends AccessibilityProps {
  title: string
  showLogo?: boolean
  titleAccessibilityLabel?: string
}

const Header: React.FC<HeaderProps> = ({
  title,
  showLogo = true,
  titleAccessibilityLabel,
  ...accessibilityProps
}) => {
  const { colors, fontSize } = useTheme()
  const titleRef = useRef(null)

  return (
<View 
  style={styles.header}
  accessible={false}
  importantForAccessibility="no"
  {...accessibilityProps}
>
  <Text
    ref={titleRef}
    style={[styles.title, { color: "#000", fontSize: fontSize * 1.8 }]}

  >
    {title}
  </Text>

  {showLogo && <ImadioLogo />}
</View>

  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 40,
    fontFamily: "MontserratAlternativesRegular"
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  }
})

export default Header