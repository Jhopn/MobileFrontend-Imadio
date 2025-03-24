import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderProps } from './interfaces/schemas';


const HeaderConfiguration: React.FC<HeaderProps> = ({ textColor, fontSize }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.title, { color: textColor, fontSize: fontSize * 1.5 }]}>
        Configuração
      </Text>
      <Text style={[styles.subtitle, { color: textColor, fontSize }]}>
        Altere as cores e os tamanhos da fonte para melhorar sua experiência com o aplicativo
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 24,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
});

export default HeaderConfiguration;