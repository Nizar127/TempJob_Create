import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    ImageBackground
} from 'react-native';
import { firebase } from '@react-native-firebase/auth'
import { Button, Icon } from 'react-native-elements';
import Onboarding from 'react-native-onboarding-swiper';
console.disableYellowBox = true;



export default class Loading extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {

            setTimeout(() => {
                if (user) {
                    //     Alert.alert('Status', 'You are logged in.',
                    //      [
                    //         {
                    //             text: "Start Hiring",
                    //             onPress: () => this.props.navigation.navigate('Hire')
                    //         },
                    //         {
                    //             text: "View Current Job Posted",
                    //             onPress: () => this.props.navigation.navigate('MyJob')
                    //         }
                    //     ], { cancelable: false }
                    // );
                    Alert.alert('Status', 'You are logged in.')
                    this.props.navigation.navigate('Hire');
                }
                else {
                    this.props.navigation.navigate('GoogleLogin');
                }
            }, 5000);

        })
    }

    render() {
        return (
            <Onboarding
                showDone={false}
                onSkip={() => Alert.alert('Skipped')}
                pages={[
                    {
                        title: 'Find Part-Timer Here',
                        subtitle: 'Hire Any Kind You Need',
                        backgroundColor: 'white',
                        fontColor: 'black',
                        fontFamily: 'montserrat',
                        //backgroundColor: '#003c8f',
                        image: (<Image source={require('./../src/img/waiter.jpg')} style={{ resizeMode: 'cover' }} />

                        ),
                    },
                    {
                        title: 'Hire How You Want',
                        subtitle: 'Hire Any time of temp job you need',
                        backgroundColor: 'white',
                        fontColor: 'black',
                        fontFamily: 'montserrat',
                        image: (<Image source={require('./../src/img/programmer.jpg')} style={{ resizeMode: 'cover' }} />)

                    },
                    {
                        title: 'Track Their Progress',
                        subtitle: 'We will send you notification as soon as something happened',
                        backgroundColor: 'white',
                        fontColor: 'black',
                        fontFamily: 'montserrat',
                        image: (<Image source={require('./../src/img/event.jpg')} style={{ resizeMode: 'cover' }} />)

                    },
                    {
                        title: "Let's go!",
                        subtitle: (
                            <Button
                                title={'Get Started'}
                                containerViewStyle={{ marginTop: 20 }}
                                backgroundColor={'white'}
                                borderRadius={5}
                                textStyle={{ color: '#003c8f' }}
                                onPress={() => {
                                    Alert.alert('done');
                                    StatusBar.setBarStyle('default');
                                }}
                            />
                        ),
                        backgroundColor: '#003c8f',
                        image: (
                            <Icon name="rocket" type="font-awesome" size={100} color="white" />
                        ),
                    },
                ]}
            />
        )

    }

}


//export default Loading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});


// return (
//     <View style={styles.container}>
//         <StatusBar backgroundColor='#009387' barStyle="light-content" />
//         <View style={styles.header}>
//             <Text style={styles.text_header}>Welcome!</Text>
//         </View>
//         <Animatable.View
//             animation="fadeInUpBig"
//             style={styles.footer}
//         >
//             <Text style={styles.text_footer}>Username</Text>
//             <View style={styles.action}>
//                 <FontAwesome
//                     name="user-o"
//                     //color={colors.text}
//                     size={20}
//                 />
//                 <TextInput
//                     placeholder="Your Username"
//                     placeholderTextColor="#666666"
//                     style={styles.textInput}
//                     autoCapitalize="none"
//                     onChangeText={(val) => textInputChange(val)}
//                     onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
//                 />
//                 {data.check_textInputChange ?
//                     <Animatable.View
//                         animation="bounceIn"
//                     >
//                         <Feather
//                             name="check-circle"
//                             color="green"
//                             size={20}
//                         />
//                     </Animatable.View>
//                     : null}
//             </View>
//             {data.isValidUser ? null :
//                 <Animatable.View animation="fadeInLeft" duration={500}>
//                     <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
//                 </Animatable.View>
//             }


//             <Text style={styles.text_footer}>Password</Text>
//             <View style={styles.action}>
//                 <Feather
//                     name="lock"
//                     //color={colors.text}
//                     size={20}
//                 />
//                 <TextInput
//                     placeholder="Your Password"
//                     placeholderTextColor="#666666"
//                     secureTextEntry={data.secureTextEntry ? true : false}
//                     style={styles.textInput}
//                     autoCapitalize="none"
//                     onChangeText={(val) => handlePasswordChange(val)}
//                 />
//                 <TouchableOpacity
//                     onPress={updateSecureTextEntry}
//                 >
//                     {data.secureTextEntry ?
//                         <Feather
//                             name="eye-off"
//                             color="grey"
//                             size={20}
//                         />
//                         :
//                         <Feather
//                             name="eye"
//                             color="grey"
//                             size={20}
//                         />
//                     }
//                 </TouchableOpacity>
//             </View>
//             {data.isValidPassword ? null :
//                 <Animatable.View animation="fadeInLeft" duration={500}>
//                     <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
//                 </Animatable.View>
//             }


//             <TouchableOpacity>
//                 <Text style={{ color: '#009387', marginTop: 15 }}>Forgot password?</Text>
//             </TouchableOpacity>
//             <View style={styles.button}>
//                 <TouchableOpacity
//                     style={styles.signIn}
//                     onPress={() => { loginHandle(data.username, data.password) }}
//                 >
//                     <LinearGradient
//                         colors={['#08d4c4', '#01ab9d']}
//                         style={styles.signIn}
//                     >
//                         <Text style={styles.textSign}>Sign In</Text>
//                     </LinearGradient>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     onPress={() => navigation.navigate('SignUpScreen')}
//                     style={styles.signIn}
//                 // borderColor: '#009387',
//                 // borderWidth: 1,
//                 // marginTop: 15

//                 >
//                     <Text style={styles.textSign
//                         // color: '#009387'
//                     }>Sign Up</Text>
//                 </TouchableOpacity>
//             </View>
//         </Animatable.View>
//     </View>
// );