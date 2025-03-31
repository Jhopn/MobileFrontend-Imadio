import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Link, router } from "expo-router";
import { FileText, User } from 'react-native-feather';
import { useTheme } from '@/src/hooks/use-theme'; 
import { useAuth } from '@/src/hooks/use-auth';
import WaveBalumBackground from '@/src/components/common/wave-balum';
import Button from '@/src/components/common/button';
import LinkButton from '@/src/components/common/link-button';
import LoginForm from '@/src/components/login/form-login'; 
import StatusMessage from '@/src/components/common/status-message';
import ImadioLogo from '@/src/components/common/logo-imadio';
import AccessibilityInstructions from '@/src/components/common/accessibility-instructions';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const { login } = useAuth();
  const { colors, fontSize } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "info">("info");
  const [showStatus, setShowStatus] = useState(false);
  const [formData, setFormData] = useState({email: '', password: ''});
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    setShowStatus(false);
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsLoading(true);
      
      const response = await login(formData);
      
      setStatusMessage('Login realizado com sucesso!');
      setStatusType('success');
      setShowStatus(true);
      
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 2000);
      
    } catch (error: any) {
      console.error('Erro no login:', error);
      
      setStatusMessage(error.response?.data?.message || 'Falha no login. Verifique suas credenciais e tente novamente.');
      setStatusType('error');
      setShowStatus(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({...prev, [field]: undefined}));
    }
  };

  return (
    <SafeAreaView style={styles.container} accessible={true} accessibilityLabel="Tela de login">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          accessibilityLabel="Formulário de login"
        >
          <View style={styles.content}>
            <Text style={styles.title} accessibilityRole="header">Login</Text>
            <AccessibilityInstructions screenName="login" />
            <ImadioLogo/>

            <View style={styles.formContainer}>
              <LoginForm 
                email={formData.email}
                password={formData.password}
                errors={errors}
                onChangeEmail={(text) => handleInputChange('email', text)}
                onChangePassword={(text) => handleInputChange('password', text)}
              />

              <Link href="/(auth)/forgot-password" asChild>
                <LinkButton
                  role="link"
                  label="Esqueceu sua senha"
                  hint="Toque para recuperar sua senha"
                  onPress={() => {}}
                >
                  <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
                </LinkButton>
              </Link>

              <StatusMessage 
                type={statusType}
                message={statusMessage}
                visible={showStatus}
              />

              <Button
                role="button"
                label="Botão de login"
                hint="Toque para fazer login"
                onPress={handleLogin}
              >
                {isLoading ? (
                  <ActivityIndicator color="#000" size="small" accessibilityLabel="Carregando" />
                ) : (
                  <Text style={styles.buttonText}>Entrar</Text>
                )}
              </Button>

              <Link href="/(auth)/register" asChild>
                <LinkButton
                  role="link"
                  label="Ir para tela de cadastro"
                  hint="Toque para ir para a tela de cadastro se não tiver uma conta"
                  onPress={() => {}}
                >
                  <Text style={[styles.signupText, { color: colors.text, fontSize: fontSize * 0.8 }]}>
                    Não possui conta? Faça o cadastro!
                  </Text>
                </LinkButton>
              </Link>
            </View>
          </View>
          <WaveBalumBackground/>
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
  content: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: "MontserratAlternativesMedium",
    marginTop: 40,
    marginBottom: 32,
  },
  line: {
    width: 48,
    height: 2,
    backgroundColor: '#000',
    marginHorizontal: 8,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 8,
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 16,
    marginBottom: 32,
    fontSize: 16,
    color: '#000',
    fontFamily: "MontserratAlternativesMedium",
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 30,
    width: width * 0.8,
    maxWidth: 300,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontFamily: "MontserratAlternativesMedium",
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  signupText: {
    marginTop: 24,
    fontSize: 18,
    color: '#000',
    fontFamily: "MontserratAlternativesRegular",
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  waveSvg: {
    position: 'absolute',
    bottom: 0,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  responseContainer: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
    maxWidth: 300,
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
});

export default LoginScreen;