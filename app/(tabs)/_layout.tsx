import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { RefreshCcw, Clock, Settings } from 'react-native-feather';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <RefreshCcw width={size} height={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="History"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color, size }) => <Clock width={size} height={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Configuration"
        options={{
          title: 'Personalizar',
          tabBarIcon: ({ color, size }) => <Settings width={size} height={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
});