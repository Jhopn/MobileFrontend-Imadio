import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { FileText, User } from 'react-native-feather';
import { Link, router } from 'expo-router';
import { useTheme } from '@/src/hooks/use-theme';
import { useAuth } from '@/src/hooks/use-auth';

const { width } = Dimensions.get('window');

const SignupForm = () => {
  const { register } = useAuth();
  const { colors, fontSize } = useTheme();
  const [responseMessage, setResponseMessage] = useState<{ type: 'success' | 'error'; message: string; } | null>(null);
  const [errors, setErrors] = useState<{
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
  }>({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    // Validação do nome
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    // Validação do email
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    // Validação da senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }
    
    // Validação da confirmação de senha
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      console.log('Form submitted:', formData);

      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      }

      // Valida o formulário
      if (!validateForm()) {
        return;
      }

      const response = await register(userData)

      console.log(response);


      // Mostra mensagem de sucesso
      setResponseMessage({
        type: 'success',
        message: 'Conta criada com sucesso!'
      });

      // Limpa o formulário após sucesso
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

    
      setTimeout(() => {
        router.replace('/(auth)/login');
      }, 2000);

    } catch (error: any) {
      setResponseMessage({
        type: 'error',
        message: error.response.data.message || 'Ocorreu um erro ao criar sua conta. Tente novamente.'
      });
    }
  };

  return (
    <SafeAreaView style={styles.container} accessible={true} accessibilityLabel="Tela de cadastro">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          accessibilityLabel="Formulário de cadastro"
        >
          <LinearGradient
            colors={['#e8e6ff', '#e8e6ff']}
            style={styles.upperContainer}
          >
            <Text style={styles.title} accessibilityRole="header">Criar Conta</Text>

            <View style={styles.iconContainer} accessibilityLabel="Ícones do aplicativo IMADIO" importantForAccessibility="no">
              <FileText width={20} height={20} color="#000" />
              <View style={styles.line} />
              <User width={20} height={20} color="#000" />
            </View>

            <Text style={styles.logoText} accessibilityLabel="IMADIO" accessibilityRole="text">IMADIO</Text>

            <View style={styles.formContainer}>
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
            </View>

            {/* Wave SVG */}
            <View style={styles.waveContainer} importantForAccessibility="no">
              <Svg height="100%" width="100%" viewBox="0 0 1440 320" style={styles.waveSvg}>
                <Path
                  fill="#9f90ff"
                  d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                />
              </Svg>
            </View>
          </LinearGradient>

          <View style={styles.lowerContainer}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={handleSubmit}
              accessibilityRole="button"
              accessibilityLabel="Botão de cadastro"
              accessibilityHint="Toque para criar sua conta"
            >
              <Text style={styles.buttonText}>Cadastro</Text>
            </TouchableOpacity>

            <Link href="/(auth)/login" asChild>
              <TouchableOpacity
                accessibilityRole="link"
                accessibilityLabel="Ir para tela de login"
                accessibilityHint="Toque para ir para a tela de login se já tiver uma conta"
              >
                <Text style={[styles.loginText, { color: colors.background, fontSize: fontSize * 0.8 }]}>
                  Já tem conta? Faça login!
                </Text>
              </TouchableOpacity>
            </Link>

            {responseMessage && (
              <View 
                style={[
                  styles.responseContainer,
                  responseMessage.type === 'success' ? styles.successContainer : styles.errorContainer
                ]}
                accessibilityLiveRegion="assertive"
                accessibilityLabel={responseMessage.type === 'success' ? 'Mensagem de sucesso' : 'Mensagem de erro'}
              >
                <Text style={[
                  styles.responseText,
                  responseMessage.type === 'success' ? styles.successText : styles.errorText
                ]}>
                  {responseMessage.message}
                </Text>
              </View>
            )}

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e6ff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  upperContainer: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 100, // Space for the wave
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 32,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0dcff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 48,
  },
  line: {
    width: 48,
    height: 2,
    backgroundColor: '#000',
    marginHorizontal: 8,
  },
  logoText: {
    textTransform: 'uppercase',
    letterSpacing: 4,
    fontSize: 14,
    marginBottom: 48,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    marginBottom: 32,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 0,
    fontSize: 16,
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  waveSvg: {
    position: 'absolute',
    bottom: 0,
  },
  lowerContainer: {
    backgroundColor: '#9f90ff',
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 16,
    width: width * 0.8,
    maxWidth: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  loginText: {
    marginTop: 16,
    fontSize: 16,
    color: '#000',
  },
  responseContainer: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  successContainer: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  errorContainer: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
    borderWidth: 1,
    borderColor: '#F44336',
  },
  responseText: {
    textAlign: 'center',
    fontSize: 14,
  },
  successText: {
    color: '#2E7D32',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
});

export default SignupForm;