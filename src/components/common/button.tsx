import { TouchableOpacity, StyleSheet, AccessibilityRole, Dimensions, Text } from "react-native";
import React from 'react';
import { GestureResponderEvent } from "react-native";
import { useTheme } from "@react-navigation/native";

interface PropsButton {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  role: AccessibilityRole;
  label: string;
  hint: string;
}

const { width } = Dimensions.get('window');

const Button: React.FC<PropsButton> = ({ children, onPress, role, label, hint }) => {
  const { colors, fonts } = useTheme();


  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.background, borderColor: colors.text }]}
      onPress={onPress}
      accessibilityRole={role}
      accessibilityLabel={label}
      accessibilityHint={hint}
    >
      <Text style={styles.buttonText}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    paddingVertical: 16,
    maxWidth: 300,
    width: width * 0.8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: "MontserratAlternativesMedium",
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
})

export default Button;