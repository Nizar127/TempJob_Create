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
import storage from '@react-native-firebase/storage';
import ImgToBase64 from 'react-native-image-base64'
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

console.disableYellowBox = true;

export default class Keyplayer extends Component {


    constructor() {
        super();

        //firebase.firestore().collection('Users').doc(user.uid).set(user).collection('Job_Creator');
        this.state = {
            users: [],
            textInput: [],
            inputData: [],
            keyplayers: [],
            inputDataName: [],
            inputDataRole: [],
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
                            <TextInput style={styles.startRouteBtn} placeholder="Name of your keyplayer" onChangeText={(text) => this.addValuesName(text, index)} />
                        </CardItem>
                        <CardItem cardBody>
                            <TextInput style={styles.startRouteBtn} placeholder="Role of your keyplayer" onChangeText={(text) => this.addValuesRole(text, index)} />
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
    addValuesName = (text, index) => {
        let dataArray = this.state.inputDataName;
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
                inputDataName: dataArray
            });
        }
        else {
            dataArray.push({ 'text': text, 'index': index });
            this.setState({
                inputDataName: dataArray
            });
        }
    }

    addValuesRole = (text, index) => {
        let dataArray = this.state.inputDataRole;
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
                inputDataRole: dataArray
            });
        }
        else {
            dataArray.push({ 'text': text, 'index': index });
            this.setState({
                inputDataRole: dataArray
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

    //Pick Image from camera or library
    pickImage() {
        ImagePicker.openPicker({
            width: 300,
            height: 180,
            cropping: true
        }).then(image => {
            console.log(image, 'image')
            this.setState({
                url: image.path,
                imageType: image.mime

            })
        }).catch((error) => {
            console.log(error)
        })
    }


    uploadImage() {
        return new Promise((resolve, reject) => {
            const appendIDToImage = new Date().getTime();
            const storageRef = storage().ref('thumbnails_job').child(`${appendIDToImage}`);

            // [anas]
            const task = ImgToBase64.getBase64String(this.state.url)
                .then(base64String => {
                    console.log("[uploadImage] Start upload image to firebase storage");
                    console.log("[uploadImage] base64String", !!base64String);

                    // .put accept blob, putString accept string
                    // https://firebase.google.com/docs/reference/js/firebase.storage.Reference#put
                    storageRef.putString(base64String, 'base64')
                        .then((imageSnapshot) => {
                            console.log('[uploadImage] Image Upload Successfully');

                            storage()
                                .ref(imageSnapshot.metadata.fullPath)
                                .getDownloadURL()
                                .then((downloadURL) => {
                                    console.log("[uploadImage] downloadURL", downloadURL);
                                    // setAllImages((allImages) => [...allImages, downloadURL]);
                                    //this.dbRef.doc(this).update({ imageURL: downloadURL });
                                    resolve(downloadURL);
                                });

                        }).catch(e => {
                            console.error("[uploadImage] Put storageRef failed");
                            console.error(e);
                            reject("");
                        });

                }).catch(e => {
                    console.error("[uploadImage] Get base 64 string failed");
                    console.error(e);
                    reject("");
                });
        });
    }


    updateUser = () => {

        let keyplayers = [];
        for (let index = 0; index < this.state.inputDataName.length; index++) {
            const elementName = this.state.inputDataName[index];
            const elementRole = this.state.inputDataRole[index];
            keyplayers.push({
                name: elementName.text, role: elementRole.text
            });

        }
        console.log('keyplayers', keyplayers);


        const updateDBRef = firebase.firestore().collection('Users').doc(auth().currentUser.uid);
        updateDBRef.update({
            keyplayers: keyplayers
        }).then((docRef) => {

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
                                    {/* <TextInput
                                        placeholder={'Notable Project'}
                                        value={this.state.project}
                                        style={styles.startRouteBtn}
                                        onChangeText={(val) => this.inputValueUpdate(val, 'project')}
                                    /> */}
                                    <Icon android name="md-add" size={30} onPress={() => this.addTextInput(this.state.textInput.length)} />
                                    {this.state.textInput.map((value) => {
                                        return value
                                    })}

                                </View>

                            </Content>
                        </CardItem>
                    </Card>

                    <Card>

                        <Button block success last style={{ marginTop: 20, marginBottom: 5 }} onPress={() => this.updateUser()}>
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


