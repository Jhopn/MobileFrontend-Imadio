import type React from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { useTheme } from "@/src/hooks/use-theme"
import ImadioLogo from "./logo-imadio"

interface HeaderProps {
  title: string
  description?: string
  showLogo?: boolean
  titleAccessibilityLabel?: string
  descriptionAccessibilityLabel?: string
}

const Header: React.FC<HeaderProps> = ({
  title,
  description,
  showLogo = true,
  titleAccessibilityLabel,
  descriptionAccessibilityLabel,
}) => {
  const { colors, fontSize } = useTheme()

  return (
    <View style={styles.header} accessibilityRole="header" accessible={true}>
      <Text
        style={[styles.title, { color: "#000", fontSize: fontSize * 1.8 }]}
        accessibilityRole="header"
        accessibilityLabel={titleAccessibilityLabel || title}
        accessible={true}
      >
        {title}
      </Text>
      {showLogo && (
        <ImadioLogo/>
      )}

      {description && (
        <Text
          style={styles.description}
          accessibilityLabel={descriptionAccessibilityLabel || description}
          accessibilityRole="text"
          accessible={true}
        >
          {description}
        </Text>
      )}

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
  description: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    fontFamily: "MontserratAlternativesRegular"
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  }
})

export default Header;