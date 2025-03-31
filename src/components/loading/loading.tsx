import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/use-theme';
import ImadioLogo from '../common/logo-imadio';
import WaveBalumBackground from '../common/wave-balum';

const { width } = Dimensions.get('window');

const LoadingScreen: React.FC = () => {
  const { colors, fontSize } = useTheme();
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(20, { duration: 1000 }),
      -1,
      true
    );

    return () => {
      cancelAnimation(translateX);
    };
  }, []);

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text 
          style={[styles.loadingText, { color: colors.text, fontSize: fontSize * 1.5 }]}
          accessibilityRole="text"
        >
          Carregando...
        </Text>
        
        <ImadioLogo/>

        <Text 
          style={[styles.waitText, { color: colors.text, fontSize: fontSize * 1.2 }]}
          accessibilityRole="text"
        >
          Por favor aguarde!
        </Text>
      </View>

      <WaveBalumBackground/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loadingText: {
    fontWeight: 'bold',
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(159, 144, 255, 0.2)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  arrow: {
    marginHorizontal: 12,
    width: 48,
    height: 24,
    justifyContent: 'center',
  },
  arrowLine: {
    height: 2,
    width: '100%',
  },
  logoText: {
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginBottom: 24,
  },
  waitText: {
    fontWeight: '500',
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  wave: {
    position: 'absolute',
    bottom: 0,
  },
});

export default LoadingScreen;