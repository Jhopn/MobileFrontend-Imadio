import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { RefreshCcw, Clock, Settings } from 'react-native-feather';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useTheme } from '@/hooks/useTheme';


export default function TabLayout() {
  const {colors, fontSize} = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.background,
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
