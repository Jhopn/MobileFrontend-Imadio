import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { RefreshCcw, Clock, Settings } from 'react-native-feather';
import { HapticTab } from '@/src/components/HapticTab';
import TabBarBackground from '@/src/components/ui/TabBarBackground';
import { useTheme } from '@/src/hooks/useTheme';

export default function TabLayout() {
  const { colors, fontSize } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.background,
          height: 50,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: fontSize * 0.7,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <RefreshCcw width={size} height={size} color={color} />
          ),
          // accessibilityLabel: 'Ir para a tela inicial',
          // accessibilityRole: 'button',
        }}
      />
      <Tabs.Screen
        name="History"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Clock width={size} height={size} color={color} />
          ),
          // accessibilityLabel: 'Ver histórico de conversões',
          // accessibilityRole: 'button',
        }}
      />
      <Tabs.Screen
        name="Configuration"
        options={{
          title: 'Personalizar',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Settings width={size} height={size} color={color} />
          ),
          // accessibilityLabel: 'Ir para configurações',
          // accessibilityRole: 'button',
        }}
      />
    </Tabs>
  );
}
