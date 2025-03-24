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
  ActivityIndicator,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from "expo-router";
import { FileText, User } from 'react-native-feather';
import { useTheme } from '@/src/hooks/use-theme'; 
import { useAuth } from '@/src/hooks/use-auth';
import WaveBackground from '@/src/components/common/wave-balum';
import WaveBalumBackground from '@/src/components/common/wave-balum';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const { login } = useAuth();
  const { colors, fontSize } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<{ type: 'success' | 'error'; message: string; } | null>(null);
  const [formData, setFormData] = useState({email: '', password: ''});
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    // Validação do email
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    // Validação da senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    // Limpa mensagens anteriores
    setResponseMessage(null);
    
    // Valida o formulário
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsLoading(true);
      
      const response = await login(formData);
      
      // Mostra mensagem de sucesso
      setResponseMessage({
        type: 'success',
        message: 'Login realizado com sucesso!'
      });
      
      // Redireciona para a tela principal após 1 segundo
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 2000);
      
    } catch (error: any) {
      console.error('Erro no login:', error);
      
      // Mostra mensagem de erro
      setResponseMessage({
        type: 'error',
        message: error.response.data.message  || 'Falha no login. Verifique suas credenciais e tente novamente.'
      });
    } finally {
      setIsLoading(false);
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

            <View style={styles.iconContainer} accessibilityLabel="Ícones do aplicativo IMADIO" importantForAccessibility="no">
              <FileText width={20} height={20} color="#000" />
              <View style={styles.line} />
              <User width={20} height={20} color="#000" />
            </View>

            <Text style={styles.logoText} accessibilityLabel="IMADIO" accessibilityRole="text">IMADIO</Text>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, errors.email && { borderBottomColor: 'red' }]}
                  placeholder="Digite seu email..."
                  placeholderTextColor="#000"
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={(text) => {
                    setFormData(prev => ({...prev, email: text}));
                    if (errors.email) setErrors(prev => ({...prev, email: undefined}));
                  }}
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
                  value={formData.password}
                  onChangeText={(text) => {
                    setFormData(prev => ({...prev, password: text}));
                    if (errors.password) setErrors(prev => ({...prev, password: undefined}));
                  }}
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

              <Link href="/(auth)/forgot-password" asChild>
              <TouchableOpacity
                accessibilityRole="link"
                accessibilityLabel="Esqueceu sua senha"
                accessibilityHint="Toque para recuperar sua senha"
              >
                <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
              </TouchableOpacity>
              </Link>

              {/* Mensagem de resposta da API */}
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

              <TouchableOpacity 
                style={[styles.button, isLoading && styles.buttonDisabled]} 
                onPress={handleLogin}
                disabled={isLoading}
                accessibilityRole="button"
                accessibilityLabel="Botão de login"
                accessibilityHint="Toque para fazer login"
                accessibilityState={{ disabled: isLoading }}
              >
                {isLoading ? (
                  <ActivityIndicator color="#000" size="small" accessibilityLabel="Carregando" />
                ) : (
                  <Text style={styles.buttonText}>Entrar</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.signupText}>
                  
                </Text>
              </TouchableOpacity>

              <Link href="/(auth)/register" asChild>
                <TouchableOpacity
                  accessibilityRole="link"
                  accessibilityLabel="Ir para tela de cadastro"
                  accessibilityHint="Toque para ir para a tela de cadastro se não tiver uma conta"
                >
                  <Text style={[styles.signupText, { color: colors.primary, fontSize: fontSize * 0.8 }]}>
                  Não possui conta? Faça o cadastro!
                  </Text>
                </TouchableOpacity>
              </Link>


              
            </View>
              <WaveBalumBackground height={150} />
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
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 32,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0dcff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  line: {
    width: 48,
    height: 2,
    backgroundColor: '#000',
    marginHorizontal: 8,
  },
  logoText: {
    fontSize: 14,
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: 48,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  signupText: {
    marginTop: 24,
    fontSize: 16,
    color: '#000',
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
  // Novos estilos para mensagens de erro e resposta
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