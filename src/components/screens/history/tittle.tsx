import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderProps } from './interfaces/schemas';

const HeaderHistory: React.FC<HeaderProps> = ({ textColor, backgroundColor, fontSize }) => {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      <Text 
        style={[styles.title, { color: textColor, fontSize: fontSize * 1.5 }]}
        accessibilityRole="header"
      >
        Histórico
      </Text>
      <Text 
        style={[styles.subtitle, { color: textColor, fontSize }]}
        accessibilityRole="text"
      >
        Aqui você encontrará as imagens que já foram convertidas
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 24,
    paddingTop: 48,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default HeaderHistory;
