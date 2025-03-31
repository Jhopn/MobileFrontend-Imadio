import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface LoginFormProps {
  email: string;
  password: string;
  errors: {
    email?: string;
    password?: string;
  };
  onChangeEmail: (text: string) => void;
  onChangePassword: (text: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  errors,
  onChangeEmail,
  onChangePassword
}) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.email && { borderBottomColor: 'red' }]}
          placeholder="Digite seu email..."
          placeholderTextColor="#000"
          keyboardType="email-address"
          value={email}
          onChangeText={onChangeEmail}
          autoCapitalize="none"
          accessibilityLabel="Campo de email"
          accessibilityHint="Digite seu endereço de email"
          accessibilityRole="text"
        />
        {errors.email && (
          <Text 
            style={styles.errorText} 
            accessibilityLabel={`Erro: ${errors.email}`}
            accessibilityLiveRegion="polite"
          >
            {errors.email}
          </Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.password && { borderBottomColor: 'red' }]}
          placeholder="Digite sua senha..."
          placeholderTextColor="#000"
          secureTextEntry
          value={password}
          onChangeText={onChangePassword}
          accessibilityLabel="Campo de senha"
          accessibilityHint="Digite sua senha"
          accessibilityRole="text"
        />
        {errors.password && (
          <Text 
            style={styles.errorText}
            accessibilityLabel={`Erro: ${errors.password}`}
            accessibilityLiveRegion="polite"
          >
            {errors.password}
          </Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default LoginForm;