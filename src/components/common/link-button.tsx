import { TouchableOpacity, StyleSheet, AccessibilityRole, Dimensions } from "react-native";
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
  const {colors, fonts } = useTheme();
  
    return (
    <TouchableOpacity
      style={[styles.button]}
      onPress={onPress}
      accessibilityRole={role}
      accessibilityLabel={label}
      accessibilityHint={hint}
    >
      {children}
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
      }
})
 
export default LinkButton;