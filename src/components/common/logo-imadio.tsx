import { View, Image, StyleSheet } from "react-native"; 

const ImadioLogo = () => {
    return ( 
        <View accessibilityLabel="Ícones do aplicativo IMADIO" importantForAccessibility="no">
            <Image style={styles.picture} source={require('@/src/assets/images/Logo.png')}/>
        </View>

    );
}

const styles = StyleSheet.create({
    picture:{
        width: 180,
        height: 150
    }
})
export default ImadioLogo;