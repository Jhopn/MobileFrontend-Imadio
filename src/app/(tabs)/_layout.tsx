import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, AccessibilityInfo, Pressable, GestureResponderEvent } from 'react-native';
import { RefreshCcw, Clock, Settings } from 'react-native-feather';
import { useTheme } from '@/src/hooks/use-theme';

export default function TabLayout() {
  const { colors, fontSize } = useTheme();

  const announceScreenChange = (screenName: string) => {
    if (Platform.OS === 'ios') {
      AccessibilityInfo.announceForAccessibility(`Navegou para ${screenName}`);
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.background,
          height: 70,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontFamily: "MontserratAlternativesMedium",
          fontSize: fontSize * 0.7,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <RefreshCcw width={size} height={size} stroke={color} />
          ),
          tabBarAccessibilityLabel: 'Tela inicial',
          // Removido tabBarTestID que estava causando erro
          tabBarLabelPosition: 'below-icon',
          tabBarItemStyle: {
            paddingTop: 8,
          },
          // Propriedades de acessibilidade
          tabBarButton: (props) => (
            <Pressable
              {...props}
              accessibilityRole="tab"
              accessibilityLabel="Tela inicial"
              accessibilityHint="Navega para a tela inicial do aplicativo"
              accessibilityState={{ selected: props.accessibilityState?.selected }}
              onPress={(event: GestureResponderEvent) => {
                // Corrigido para passar o evento para props.onPress
                if (props.onPress) {
                  props.onPress(event);
                }
                announceScreenChange('Tela inicial');
              }}
            >
              {props.children}
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Clock width={size} height={size} stroke={color} />
          ),
          tabBarAccessibilityLabel: 'Histórico de conversões',
          // Removido tabBarTestID que estava causando erro
          tabBarLabelPosition: 'below-icon',
          tabBarItemStyle: {
            paddingTop: 8,
          },
          // Propriedades de acessibilidade
          tabBarButton: (props) => (
            <Pressable
              {...props}
              accessibilityRole="tab"
              accessibilityLabel="Histórico de conversões"
              accessibilityHint="Mostra o histórico de conversões realizadas"
              accessibilityState={{ selected: props.accessibilityState?.selected }}
              onPress={(event: GestureResponderEvent) => {
                // Corrigido para passar o evento para props.onPress
                if (props.onPress) {
                  props.onPress(event);
                }
                announceScreenChange('Histórico de conversões');
              }}
            >
              {props.children}
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="configuration"
        options={{
          title: 'Personalizar',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Settings width={size} height={size} stroke={color} />
          ),
          tabBarAccessibilityLabel: 'Configurações e personalização',
          // Removido tabBarTestID que estava causando erro
          tabBarLabelPosition: 'below-icon',
          tabBarItemStyle: {
            paddingTop: 8,
          },
          // Propriedades de acessibilidade
          tabBarButton: (props) => (
            <Pressable
              {...props}
              accessibilityRole="tab"
              accessibilityLabel="Configurações e personalização"
              accessibilityHint="Acessa as configurações e opções de personalização"
              accessibilityState={{ selected: props.accessibilityState?.selected }}
              onPress={(event: GestureResponderEvent) => {
                // Corrigido para passar o evento para props.onPress
                if (props.onPress) {
                  props.onPress(event);
                }
                announceScreenChange('Configurações e personalização');
              }}
            >
              {props.children}
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}