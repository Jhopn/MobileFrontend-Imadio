import { useTheme } from '@react-navigation/native';
import { View, Image, StyleSheet, AccessibilityProps } from 'react-native';

interface PropsButton{
  color?: string;
}
const WaveBalumBackground: React.FC<PropsButton> = ({ color = '#9f90ff' }) => {

  return (
    <View style={{
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: '100%',
      height: '100%',
      zIndex: -1
    }}>
      <Image style={{
        tintColor: color,
      }} source={require("../../assets/images/background/balum.png")} />
    </View>
  );
};


export default WaveBalumBackground;