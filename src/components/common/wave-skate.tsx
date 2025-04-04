// components/WaveSkateBackground.jsx
import { useTheme } from '@react-navigation/native';
import { View, Image, AccessibilityProps } from 'react-native';

interface PropsButton extends AccessibilityProps {
  color?: string;
}

const WaveSkateBackground: React.FC<PropsButton>  = ({color = '#9f90ff'}) => {
  
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
      }} source={require("../../assets/images/background/skate.png")} />
    </View>
  );
};

export default WaveSkateBackground;