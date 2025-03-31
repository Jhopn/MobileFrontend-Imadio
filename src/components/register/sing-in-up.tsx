import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface SignupFormFieldsProps {
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  errors: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  handleChange: (name: string, value: string) => void;
}

const SignupFormFields: React.FC<SignupFormFieldsProps> = ({
  formData,
  errors,
  handleChange
}) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome..."
          placeholderTextColor="#000"
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
          accessibilityLabel="Campo de nome"
          accessibilityHint="Digite seu nome completo"
          accessibilityRole="text"
        />
        {errors.name && <Text style={styles.errorText} accessibilityLabel={`Erro: ${errors.name}`} accessibilityLiveRegion="polite">{errors.name}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email..."
          placeholderTextColor="#000"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          accessibilityLabel="Campo de email"
          accessibilityHint="Digite seu endereço de email"
          accessibilityRole="text"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText} accessibilityLabel={`Erro: ${errors.email}`} accessibilityLiveRegion="polite">{errors.email}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha..."
          placeholderTextColor="#000"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleChange('password', text)}
          accessibilityLabel="Campo de senha"
          accessibilityHint="Digite sua senha com pelo menos 6 caracteres"
          accessibilityRole="text"
        />
        {errors.password && <Text style={styles.errorText} accessibilityLabel={`Erro: ${errors.password}`} accessibilityLiveRegion="polite">{errors.password}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite a mesma senha..."
          placeholderTextColor="#000"
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={(text) => handleChange('confirmPassword', text)}
          accessibilityLabel="Campo de confirmação de senha"
          accessibilityHint="Digite a mesma senha novamente para confirmar"
          accessibilityRole="text"
        />
        {errors.confirmPassword && <Text style={styles.errorText} accessibilityLabel={`Erro: ${errors.confirmPassword}`} accessibilityLiveRegion="polite">{errors.confirmPassword}</Text>}
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
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default SignupFormFields;