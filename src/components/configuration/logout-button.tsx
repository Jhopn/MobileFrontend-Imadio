import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert, ViewStyle, TextStyle } from 'react-native';
import { LogOut } from 'react-native-feather';
import { useAuth } from '@/src/hooks/use-auth';

interface LogoutButtonProps {
  primaryColor: string;
  textColor?: string;
  fontSize: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  primaryColor,
  textColor,
  fontSize,
  style,
  textStyle
}) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Sair da conta",
      "Tem certeza que deseja sair da sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Sair", 
          onPress: () => {
            logout();
            // O redirecionamento para a tela de login deve ser tratado pelo AuthProvider
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <TouchableOpacity 
      style={[
        styles.logoutButton, 
        { 
          borderColor: primaryColor,
        },
        style
      ]} 
      onPress={handleLogout}
      accessibilityRole="button"
      accessibilityLabel="Sair da conta"
      accessibilityHint="Toque para deslogar da sua conta"
    >
      <LogOut width={20} height={20} color={primaryColor} style={styles.logoutIcon} />
      <Text 
        style={[
          styles.logoutText, 
          { 
            color: textColor || primaryColor,
            fontSize: fontSize * 0.9
          },
          textStyle
        ]}
      >
        Sair da conta
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    fontWeight: '600',
    fontFamily: "MontserratAlternativesMedium",
  }
});

export default LogoutButton;