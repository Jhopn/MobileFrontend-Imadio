import { useTheme } from '@react-navigation/native';
import { View, Image, StyleSheet } from 'react-native';

const WaveBalumBackground = () => {
  
  return (
    <View style={{ 
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: '100%',
      height: '100%',
      zIndex: -1
    }}>
          <Image source={require("../../assets/images/background/balum.png")}/>
    </View>
  );
};


export default WaveBalumBackground;