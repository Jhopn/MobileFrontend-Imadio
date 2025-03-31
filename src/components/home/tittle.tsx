import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Info } from "react-native-feather"
import { HeaderProps } from "./interfaces/schemas"


const HeaderHome: React.FC<HeaderProps> = ({ onInfoPress, textColor, fontSize }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.infoButton}
        accessibilityRole="button"
        accessibilityLabel="Informações"
        accessibilityHint="Toque para ver informações sobre o aplicativo"
        onPress={onInfoPress}
      >
        <Info width={24} height={24} color={textColor} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { fontSize: fontSize * 1.5, color: textColor }]}>Início</Text>
        <Text style={[styles.subtitle, { fontSize, color: textColor }]}>Converta a imagem em áudio</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: "4%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center'
  },
  infoButton: {
    position: 'absolute',
    left: '5%',
    padding: "2%",
  },
  titleContainer: {
    marginLeft: "4%",
  },
  title: {
    fontWeight: "bold",
    textAlign: 'center',
    fontFamily: "MontserratAlternativesMedium"
  },
  subtitle: {
    textAlign: 'center',
    marginTop: "1%",
    fontFamily: "MontserratAlternativesRegular"
  },
})

export default HeaderHome;

