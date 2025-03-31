import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { FontSizeSelectorProps } from './interfaces/schemas';



const FontSizeSelector: React.FC<FontSizeSelectorProps> = ({
  fontSize,
  textColor,
  primaryColor,
  onValueChange,
}) => {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: textColor, fontSize: fontSize * 1.2 }]}>
        Altere o tamanho da fonte
      </Text>
      <View style={styles.sliderContainer}>
        <Text style={[styles.sliderLabel, { color: textColor, fontSize: fontSize * 0.8 }]}>Min</Text>
        <Slider
          style={styles.slider}
          minimumValue={12}
          maximumValue={24}
          value={fontSize}
          onValueChange={onValueChange}
          minimumTrackTintColor={primaryColor}
          maximumTrackTintColor={textColor}
          thumbTintColor={primaryColor}
        />
        <Text style={[styles.sliderLabel, { color: textColor, fontSize: fontSize * 0.8 }]}>Max</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: "MontserratAlternativesMedium",
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {
    flex: 1,
    marginHorizontal: 16,
  },
  sliderLabel: {
    fontWeight: 'bold',
    fontFamily: "MontserratAlternativesRegular",
  },
});

export default FontSizeSelector;