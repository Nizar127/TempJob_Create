import React, { Component } from 'react';
import {
    StyleSheet, ScrollView, Image, FlatList,
    UIManager, Animated,
    LayoutAnimation, TextInput, Modal, TouchableHighlight
} from 'react-native';
import {
    Container,
    Header,
    Content,
    View,
    Card,
    Right,
    auto,
    CardItem,
    Thumbnail,
    Text,
    Left,
    Body,
    List,
    ListItem,
    Separator,
    Item,
    Label,
    Button
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
//import firebase from '../config/firebase'
//import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import { Alert } from 'react-native';

console.disableYellowBox = true;

export default class Keyplayer extends Component {


    constructor() {
        super();

        //firebase.firestore().collection('Users').doc(user.uid).set(user).collection('Job_Creator');
        this.state = {
            users: [],
            textInput: [],
            inputData: [],
            username: '',
            phonenumber: '',
            profileImage: '',
            keyplayer: '',
            description: '',
            uniqueId: '',
            jobdesc: '',
            photo: '',
            url: '',
            imageType: '',
            worktype: '',
            salary: '',
            peoplenum: '',
            time: 0,
            lat: 0,
            lng: 0,
            location: '',
            show: true,
            project: ''
            //listViewData: data,


        };

    }


    // componentDidMount() {
    //     const profileRef = firestore().collection('User').doc(this.props.navigation.state.params.userkey);
    //     profileRef.get().then((res) => {
    //         if (res.exists) {
    //             const user = res.data();
    //             this.setState({
    //                 key: res.id,
    //                 username: user.username,
    //                 phonenumber: user.phonenumber,
    //                 profileImage: user.profileImage,
    //                 description: user.description,
    //                 keyplayer: user.keyplayer,
    //                 project: user.project,
    //             });
    //             console.log("state", this.state)
    //         } else {
    //             console.log("Whoops! Document does not exists");
    //         }
    //     })


    // }

    //function to add TextInput dynamically
    addTextInput = (index) => {
        let textInput = this.state.textInput;
        textInput.push(
            <ScrollView horizontal={true}>
                <View key={index} style={{ flexDirection: 'row', margin: 5 }}>

                    <Card style={styles.keyplayer}>
                        <Icon android name="md-remove" size={30} style={{ marginTop: 30 }} onPress={() => this.removeTextInput()} />

                        <CardItem style={{ flex: 1, flexDirection: 'column' }}>
                            <Button block iconLef style={{ backgroundColor: '#1B6951' }}
                                onPress={this.pickImage}>
                                <Icon name="md-image" />
                                <Text style={{ textAlign: 'center' }}>Change Thumbnail</Text>
                            </Button>
                            <Thumbnail large source={{ uri: this.state.url }} style={{ height: 200, width: null, flex: 1, padding: 10 }} />
                            <TextInput style={styles.startRouteBtn} placeholder="Name of your keyplayer" onChangeText={(text) => this.addValues(text, index)} />
                        </CardItem>
                        <CardItem cardBody>
                            <TextInput style={styles.startRouteBtn} placeholder="Role of your keyplayer" onChangeText={(text) => this.addValues(text, index)} />
                        </CardItem>
                    </Card>

                </View>
            </ScrollView>

        );
        this.setState({ textInput });
    }

    //function to remove TextInput dynamically
    removeTextInput = () => {
        let textInput = this.state.textInput;
        let inputData = this.state.inputData;
        textInput.pop();
        inputData.pop();
        this.setState({ textInput, inputData });
    }

    //function to add text from TextInputs into single array
    addValues = (text, index) => {
        let dataArray = this.state.inputData;
        let checkBool = false;
        if (dataArray.length !== 0) {
            dataArray.forEach(element => {
                if (element.index === index) {
                    element.text = text;
                    checkBool = true;
                }
            });
        }
        if (checkBool) {
            this.setState({
                inputData: dataArray
            });
        }
        else {
            dataArray.push({ 'text': text, 'index': index });
            this.setState({
                inputData: dataArray
            });
        }
    }

    //function to console the output
    getValues = () => {
        console.log('Data', this.state.inputData);
    }


    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    updateUser = () => {

        const updateDBRef = firebase.firestore().collection('Users').doc(this.state.key);
        updateDBRef.set({
            username: this.state.usernamename,
            profileimage: this.state.profileImage,
            description: this.state.description,
            keyplayer: this.state.keyplayer,
            project: this.state.project
        }).then((docRef) => {
            this.setState({
                key: '',
                username: '',
                profileImage: '',
                description: '',
                keyplayer: '',
                project: ''
            });
            this.props.navigation.navigate('Profile');
        })

    }

    render() {
        return (

            // this.props.users.map((item, index) => {

            <View style={{ flex: 1 }} /* key={index} */  >
                <Header style={{ backgroundColor: 'white' }}>
                    <View style={{ marginTop: 13, marginEnd: 350 }}>
                        <Icon style={{ color: 'black' }} size={30} name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />
                    </View>

                </Header>
                <ScrollView>

                    <Card style={{ height: auto }}>
                        <CardItem header bordered>

                            <Text style={styles.MainText}>Keyplayer</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Content>
                                <View style={styles.inputGroup}>
                                    <TextInput
                                        placeholder={'Notable Project'}
                                        value={this.state.project}
                                        style={styles.startRouteBtn}
                                        onChangeText={(val) => this.inputValueUpdate(val, 'project')}
                                    />
                                    <Icon android name="md-add" size={30} onPress={() => this.addTextInput(this.state.textInput.length)} />
                                    {this.state.textInput.map((value) => {
                                        return value
                                    })}

                                </View>

                            </Content>
                        </CardItem>
                    </Card>





                    <Card>

                        <Button block success last style={{ marginTop: 20, marginBottom: 5 }} onPress={() => this.updateUser}>
                            <Text>Update</Text>
                        </Button>
                    </Card>
                </ScrollView>

            </View>


            //})
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    keyplayer: {
        padding: 20,
        marginLeft: 20,
        marginRight: 25,
        borderRadius: 35,

    },
    // startRouteBtn: {
    //   backgroundColor: 'white',
    //   height: 70,
    //   borderRadius: 35,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   marginHorizontal: 20
    // },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 100,
        backgroundColor: '#E91E63',
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    MainText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'montserrat',
        elevation: 5,
        padding: 5,
        margin: 7,
        color: 'red'
    },
    AddNewBtn: {
        backgroundColor: 'green',
        height: 70,
        width: 200,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 30,
        marginLeft: 100
    },
    startRouteBtn: {
        backgroundColor: 'white',
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        shadowColor: 'black',
        margin: 20,
        elevation: 10
    },
    buttonView: {
        flexDirection: 'row'
    },
    textInput: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        margin: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        marginTop: 5
    },
    button: {
        backgroundColor: "#4EB151",
        paddingVertical: 11,
        paddingHorizontal: 17,
        borderRadius: 3,
        marginVertical: 50
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "300"
    },
    header: {
        height: 60,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    contentContainer: {
        backgroundColor: 'white',
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        alignItems: 'center',
    },
    marginLeft: {
        marginLeft: 5,
    },
    menu: {
        width: 20,
        height: 2,
        backgroundColor: '#111',
        margin: 2,
        borderRadius: 3,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    text: {
        marginVertical: 30,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    button: {
        marginBottom: 7
    },
    textInput: {
        width: '90%',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
        borderColor: 'gray',
        borderBottomWidth: 2,
        fontSize: 16,
    },
    modalView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableHighlight: {
        backgroundColor: 'white',
        marginVertical: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
    }
})


