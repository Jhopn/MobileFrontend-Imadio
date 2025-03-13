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

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    console.log('Login attempted:', formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Text style={styles.title}>Login</Text>

            <View style={styles.iconContainer}>
              <FileText width={20} height={20} color="#000" />
              <View style={styles.line} />
              <User width={20} height={20} color="#000" />
            </View>

            <Text style={styles.logoText}>IMADIO</Text>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Digite seu email..."
                  placeholderTextColor="#000"
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={(text) => setFormData(prev => ({...prev, email: text}))}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Digite sua senha..."
                  placeholderTextColor="#000"
                  secureTextEntry
                  value={formData.password}
                  onChangeText={(text) => setFormData(prev => ({...prev, password: text}))}
                />
              </View>

              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.signupText}>
                  Não possue conta? Faça o cadastro!
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Wave shape at bottom */}
          <View style={styles.waveContainer}>
            <Svg height="100%" width="100%" viewBox="0 0 1440 320" style={styles.waveSvg}>
              <Path
                fill="#9f90ff"
                d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,165.3C672,160,768,96,864,74.7C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </Svg>
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
    borderBottomWidth: 2,
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
});

export default LoginScreen;