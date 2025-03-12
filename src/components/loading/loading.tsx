import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';
import { FileText, User } from 'react-native-feather';
import { useTheme } from '../..//hooks/useTheme';
import Svg, { Path } from 'react-native-svg';

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

        <View style={styles.logoContainer}>
          <FileText 
            width={24} 
            height={24} 
            color={colors.text}
            accessibilityLabel="Ícone de documento"
          />
          <Animated.View style={[styles.arrow, arrowStyle]}>
            <View style={[styles.arrowLine, { backgroundColor: colors.text }]} />
          </Animated.View>
          <User 
            width={24} 
            height={24} 
            color={colors.text}
            accessibilityLabel="Ícone de usuário"
          />
        </View>

        <Text 
          style={[styles.logoText, { color: colors.text, fontSize: fontSize }]}
          accessibilityRole="text"
        >
          IMADIO
        </Text>

        <Text 
          style={[styles.waitText, { color: colors.text, fontSize: fontSize * 1.2 }]}
          accessibilityRole="text"
        >
          Por favor aguarde!
        </Text>
      </View>

      <View style={styles.waveContainer}>
        <Svg
          height="100%"
          width={width}
          viewBox="0 0 1440 320"
          style={styles.wave}
        >
          <Path
            fill="#9f90ff"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </Svg>
      </View>
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