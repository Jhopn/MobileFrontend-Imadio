import {
  TouchableOpacity,
  StyleSheet,
  AccessibilityRole,
  Dimensions,
  Text,
} from "react-native";
import React from "react";
import { GestureResponderEvent } from "react-native";
import { useTheme } from "@/src/hooks/use-theme";

interface PropsButtonPrimary {
  children?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  role: AccessibilityRole;
  label: string;
  hint: string;
  disabled?: boolean;
}

const { width } = Dimensions.get("window");

const ButtonPrimary: React.FC<PropsButtonPrimary> = ({
  children,
  onPress,
  role,
  label,
  hint,
  disabled = false,
}) => {
  const { colors, fontSize } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.buttonPrimary,
        {
          backgroundColor: disabled ? colors.text : colors.primary || colors.primary,
          borderColor: colors.text,
        },
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole={role}
      accessibilityLabel={label}
      accessibilityHint={hint}
      accessibilityState={{ disabled }}
    >
      <Text
        style={[
          styles.buttonText,
          { fontSize, color: colors.background },
          disabled && styles.buttonTextDisabled,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonPrimary: {
    borderRadius: 30,
    paddingVertical: 16,
    maxWidth: 300,
    width: width * 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: "bold",
    fontFamily: "MontserratAlternativesMedium",
  },
  buttonTextDisabled: {
    color: "#999",
  },
});

export default ButtonPrimary;