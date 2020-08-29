
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import { useTheme } from '@react-navigation/native';
console.disableYellowBox = true;


const SplashScreen = ({ navigation }) => {
    //const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('./img/icon.png')}
                    style={styles.logo}
                    resizeMode="stretch"
                />
                <Animatable.Text
                    animation="fadeIn"
                    style={styles.Maintext}>
                    TempJob for Job Creators
                </Animatable.Text>

            </View>
            <Animatable.View
                style={styles.footer}
                animation="fadeInUpBig"
            >
                <Text style={styles.title}>Find Temporary Worker Here</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => navigation.navigate('Loading')}>
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Let's Go!</Text>
                            <MaterialIcons
                                name="navigate-next"
                                color="#fff"
                                size={20}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => navigation.navigate('OnBoard')}>
                        <LinearGradient
                            colors={['#FF570E', '#FFC40E']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Watch Tutorial</Text>
                            <MaterialIcons
                                name="navigate-next"
                                color="#fff"
                                size={20}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5
    },
    Maintext: {
        color: 'white',
        marginTop: 10,
        fontWeight: 'bold',
        fontFamily: 'montserrat',
        fontSize: 20
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
});