// components/WaveSkateBackground.jsx
import { useTheme } from '@react-navigation/native';
import { View, Image } from 'react-native';

const WaveSkateBackground = () => {
  const { colors } = useTheme();
  
  return (
    <View style={{ 
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: '100%',
      height: '100%',
      zIndex: -1
    }}>
          <Image source={require("../../assets/images/background/skate.png")}/>
    </View>
  );
};

export default WaveSkateBackground;