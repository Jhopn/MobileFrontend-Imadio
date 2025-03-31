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

const LinkButton: React.FC<PropsButton> = ({ children, onPress, role, label, hint }) => {

  return (
    <TouchableOpacity
      style={[styles.button]}
      onPress={onPress}
      accessibilityRole={role}
      accessibilityLabel={label}
      accessibilityHint={hint}
    >
      <Text style={styles.text}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  button: {
    maxWidth: 300,
    width: width * 0.8,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#000',
    fontFamily: "MontserratAlternativesMedium",
  },
})

export default LinkButton;