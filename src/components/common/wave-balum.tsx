import type React from "react"
import { View, Image, StyleSheet, Dimensions } from "react-native"
import { useTheme } from "@/src/hooks/use-theme"


interface WaveBackgroundProps {
  height?: number;
  bottom?: number
}

const WaveBalumBackground: React.FC<WaveBackgroundProps> = ({ height = 150, bottom = 0 }) => {
  const { colors } = useTheme()
  const screenWidth = Dimensions.get("window").width

  return (
    <View style={[styles.waveContainer, { height, bottom }]}>
      <Image source={require("../../assets/svgs/wave-balum.svg")} style={[styles.wave, { width: screenWidth, height }]} resizeMode="stretch" />
    </View>
  )
}

const styles = StyleSheet.create({
  waveContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "flex-end",
    zIndex: -1
  },
  wave: {
    width: "100%",
  },
})

export default WaveBalumBackground; 