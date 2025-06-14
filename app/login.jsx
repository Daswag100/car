import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }
    
    // Here you would typically validate credentials
    // For now, we'll just navigate to the home screen
    router.replace('/(tabs)');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality coming soon!');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#304FFE" translucent={true} />
      
      <ImageBackground
        source={require('@/assets/images/image5.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <SafeAreaView style={styles.safeArea}>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
              <View style={styles.content}>
                
                {/* Logo */}
                <View style={styles.logoContainer}>
                  <Image
                    source={require('@/assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                  <Text style={styles.appName}>driveit</Text>
                </View>

                {/* Login Form */}
                <View style={styles.formContainer}>
                  
                  {/* Username Input */}
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Your Username"
                      placeholderTextColor="#666"
                      value={username}
                      onChangeText={setUsername}
                      autoCapitalize="words"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={() => {
                        // Focus on password field when user presses "next"
                      }}
                    />
                  </View>

                  {/* Password Input */}
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="****************"
                      placeholderTextColor="#666"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={true}
                      returnKeyType="done"
                      onSubmitEditing={handleLogin}
                    />
                  </View>

                  {/* Forgot Password */}
                  <TouchableOpacity 
                    style={styles.forgotPasswordContainer}
                    onPress={handleForgotPassword}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                  </TouchableOpacity>

                  {/* Login Button */}
                  <TouchableOpacity
                    style={[
                      styles.loginButton,
                      isPressed && styles.loginButtonPressed
                    ]}
                    onPress={handleLogin}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setTimeout(() => setIsPressed(false), 200)}
                    activeOpacity={0.9}
                  >
                    <Text style={styles.loginButtonText}>LOG IN</Text>
                  </TouchableOpacity>

                </View>
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#304FFE', // Ensure no white showing
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(48, 79, 254, 0.65)', // Reduced opacity from 0.85 to 0.65
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60, // Reduced from 80
  },
  logo: {
    width: 100, // Slightly smaller
    height: 100,
    marginBottom: 16, // Reduced from 20
  },
  appName: {
    fontSize: 42, // Slightly smaller
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  formContainer: {
    width: '100%',
    maxWidth: 350,
  },
  inputContainer: {
    marginBottom: 16, // Reduced from 20
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 16, // Slightly reduced
    fontSize: 16,
    color: '#333',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginBottom: 30, // Reduced from 40
    paddingVertical: 10,
  },
  forgotPasswordText: {
    color: '#FFFFFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#2D2D2D',
    borderRadius: 25,
    paddingVertical: 16, // Reduced from 18
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  loginButtonPressed: {
    backgroundColor: '#1A1A1A',
    transform: [{ scale: 0.98 }],
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});