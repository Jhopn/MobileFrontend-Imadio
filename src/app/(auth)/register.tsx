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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FileText, User } from 'react-native-feather';
import { Link, router } from 'expo-router';
import { useTheme } from '@/src/hooks/use-theme';
import { useAuth } from '@/src/hooks/use-auth';
import WaveSkateBackground from '@/src/components/common/wave-skate';
import Button from '@/src/components/common/button';
import LinkButton from '@/src/components/common/link-button';
import SignupFormFields from '@/src/components/register/sing-in-up';
import StatusMessage from '@/src/components/common/status-message';
import ImadioLogo from '@/src/components/common/logo-imadio';
import AccessibilityInstructions from '@/src/components/common/accessibility-instructions';

const { width } = Dimensions.get('window');

const SignupForm = () => {
  const { register } = useAuth();
  const { colors, fontSize } = useTheme();
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "info">("info");
  const [showStatus, setShowStatus] = useState(false);
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }

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

      setStatusMessage('Conta criada com sucesso!');
      setStatusType('success');
      setShowStatus(true);

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
      setStatusMessage(error.response?.data?.message || 'Ocorreu um erro ao criar sua conta. Tente novamente.');
      setStatusType('error');
      setShowStatus(true);
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
          <View
            style={styles.upperContainer}
          >
            <Text style={styles.title} accessibilityRole="header">Criar Conta</Text>
            <AccessibilityInstructions screenName="register" />

            <ImadioLogo />


            <View style={styles.formContainer}>
              <SignupFormFields
                formData={formData}
                errors={errors}
                handleChange={handleChange}
              />
            </View>

          </View>

          <View style={styles.lowerContainer}>
            <Button
              role="button"
              label="Botão de cadastro"
              hint="Toque para criar sua conta"
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Cadastro</Text>
            </Button>

            <Link href="/(auth)/login" asChild>
              <LinkButton
                role="link"
                label="Ir para tela de login"
                hint="Toque para ir para a tela de login se já tiver uma conta"
                onPress={() => { }}
              >
                <Text style={[styles.loginText, { color: colors.background, fontSize: fontSize * 0.8 }]}>
                  Já tem conta? Faça login!
                </Text>
              </LinkButton>
            </Link>

            <StatusMessage
              type={statusType}
              message={statusMessage}
              visible={showStatus}
            />
            <WaveSkateBackground />

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
    paddingBottom: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    fontFamily: "MontserratAlternativesMedium",
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
    borderBottomWidth: 1,
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
    fontFamily: "MontserratAlternativesMedium",
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