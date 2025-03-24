import type React from "react"
import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, AccessibilityInfo, Platform } from "react-native"
import { useTheme } from "@/src/hooks/use-theme"
import { CheckCircle, AlertCircle } from "react-native-feather"

type StatusType = "success" | "error" | "info"

interface StatusMessageProps {
  type: StatusType
  message: string
  visible: boolean
}

const StatusMessage: React.FC<StatusMessageProps> = ({ type, message, visible }) => {
  const { colors, fontSize } = useTheme()
  const messageRef = useRef(null)

  const getColors = () => {
    switch (type) {
      case "success":
        return {
          bg: "#E6F7EF",
          border: colors.primary,
          text: "#2B7254",
          icon: <CheckCircle width={20} height={20} stroke="#2B7254" />,
        }
      case "error":
        return {
          bg: "#FEECEC",
          border: "#E53935",
          text: "#B71C1C",
          icon: <AlertCircle width={20} height={20} stroke="#B71C1C" />,
        }
      case "info":
        return {
          bg: "#E3F2FD",
          border: "#2196F3",
          text: "#0D47A1",
          icon: <AlertCircle width={20} height={20} stroke="#0D47A1" />,
        }
      default:
        return {
          bg: "#E3F2FD",
          border: colors.primary,
          text: colors.text,
          icon: <AlertCircle width={20} height={20} stroke={colors.text} />,
        }
    }
  }

  const { bg, border, text, icon } = getColors()

  useEffect(() => {
    if (visible && message) {
      const timer = setTimeout(() => {
        if (Platform.OS === "ios") {
          AccessibilityInfo.announceForAccessibility(message)
        } else {
          if (messageRef.current) {
            const reactTag = (messageRef.current as any)._nativeTag
            if (reactTag) {
              AccessibilityInfo.setAccessibilityFocus(reactTag)
            }
          }
        }
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [visible, message])

  if (!visible || !message) return null

  return (
    <View
      style={[styles.container, { backgroundColor: bg, borderColor: border }]}
      accessible={true}
      accessibilityRole="alert"
      accessibilityLabel={`${type === "success" ? "Sucesso" : type === "error" ? "Erro" : "Informação"}: ${message}`}
      ref={messageRef}
      accessibilityLiveRegion="polite"
    >
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={[styles.message, { color: text, fontSize: fontSize * 0.9 }]}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    marginBottom: 20,
  },
  iconContainer: {
    marginRight: 10,
  },
  message: {
    flex: 1,
    lineHeight: 20,
  },
})

export default StatusMessage;