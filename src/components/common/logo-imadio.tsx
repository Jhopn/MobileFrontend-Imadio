import { View, Image, StyleSheet } from "react-native"; 

const ImadioLogo = () => {
    return ( 
        <View style={styles.header} accessibilityLabel="Ícones do aplicativo IMADIO" importantForAccessibility="no">
            <Image style={styles.picture} source={require('@/src/assets/images/Logo.png')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    picture:{
        width: 180,
        height: 150
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
        width: "100%",
      }
})
export default ImadioLogo;