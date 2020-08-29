import React, { Component } from 'react';
import { TouchableHighlight, Animated, Layouts, View, StyleSheet, ScrollView, Image, TextInput, Alert, Toast, ActivityIndicator } from 'react-native';
import {
    Container,
    Header,
    Content,
    Modal,
    Form,
    Item,
    Input,
    Label,
    Card,
    Right,
    auto,
    CardItem,
    CardBody,
    Thumbnail,
    Text,
    Icon,
    Picker,
    DatePicker,
    Footer,
    FooterTab,
    Button,
    Textarea
} from 'native-base';
//import { addJob, addApplicant } from '../../service/DataService';
//import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-crop-picker';
//import RNFetchBlob from 'rn-fetch-blob';
//import GooglePlacesAutoComplete from 'react-native-google-places-autocomplete';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//import Geocoder from 'react-native-geocoder-reborn';
import Geolocation from '@react-native-community/geolocation';
//import storage from '@react-native-firebase/storage';
import { storage } from '../../config/firebase'
import { request, PERMISSIONS } from 'react-native-permissions';
import AddButton from '../../component/addbtn';
import PropTypes from 'prop-types';
const SIZE = 80;
// const Blob = RNFetchBlob.polyfill.Blob
// const fs = RNFetchBlob.fs;
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
// window.Blob = Blob;

export default class UploadJob extends Component {
    constructor() {
        super();

        //const user = firebase.auth().currentUser;
        this.dbRef = firestore().collection('Job_list');
        this.state = {
            currentUser: null,
            userID: null,
            jobCreatorName: '',
            jobname: '',
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
            location: { description: '' },
            chosenDate: new Date(),
            date: new Date().toString().substr(4, 12),
            isLoading: false,
            //modalVisible: false
        };
        //this.state = { chosenDate: new Date() };
        this.setDate = this.setDate.bind(this);
        this.selectWorkType = this.selectWorkType.bind(this);
        this.pickImage = this.pickImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.testData = this.testData.bind(this);

        this.saveData = this.saveData.bind(this);
        // state = { ScaleAnimation: false };

        this.state.date = this.state.chosenDate.toString().substr(4, 12);
        // this.setState({ userid: user })

    }

    componentDidMount() {
        //get data first
        var user = firebase.auth().currentUser;
        var name, uid;
        if (user != null) {
            name = user.displayName;
            uid = user.uid;
        }

        const { currentUser } = firebase.auth();
        this.setState({ currentUser });
        this.state.userID = currentUser.uid;
        this.state.jobCreatorName = currentUser.displayName;
    }

    // componentWillMount() {
    //   Geolocation.setRNConfiguration(config);
    // }



    static navigationOptions = {
        title: 'Upload',

        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-add-circle-outline" size={30} style={{ color: tintColor, fontSize: 20, iconColor: 'green' }} />
            //<AddButton />
        ),

        headerTitle: {
            title: 'GET-THE-JOB'
        },

        headerStyle: {
            backgroundColor: '#f45fff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },



    }

    toggleView = () => {
        Animated.timing(this.mode, {
            toValue: this.mode._value === 0 ? 1 : 0,
            duration: 300
        }).start();
    };

    requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            console.log('iPhone: ' + response);

            if (response === 'granted') {
                this.locateCurrentPosition();
            }
        } else {
            var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            console.log('Android: ' + response);

            if (response === 'granted') {
                this.locateCurrentPosition();
            }
        }
    }

    locateCurrentPosition = () => {
        Geolocation.getCurrentPosition(
            position => {
                console.log(JSON.stringify(position));

                let initialPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.035
                }

                this.setState({ initialPosition });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
        )
    }

    setUserID = (value) => {
        this.setState({ userID: value });

    }

    setJobCreatorName = (value) => {
        this.setSalary({ jobCreatorName: value });
    }

    setJobName = (value) => {
        this.setState({ jobname: value })
    }

    setUniqueId = (value) => {
        this.setState({ uniqueId: value })
    }

    setJobDesc = (value) => {
        this.setState({ jobdesc: value })
        //console.log('job desc:',value);
    }

    selectWorkType = (value) => {
        this.setState({
            worktype: value
        })
    }

    setSalary = (value) => {
        this.setState({ salary: value })
    }

    setPeopleNum = (value) => {
        this.setState({ peoplenum: value })
    }

    selectTime = (value) => {
        this.setState({ time: value })
    }

    setDate(newDate) {
        this.setState({ date: newDate.toString().substr(4, 12) });
    }

    setLocation = (value, details) => {
        this.setState({
            ...this.state, location: value,
            lat: details.geometry.location.lat, lng: details.geometry.location.lng
        })
        console.log("value", value)
        console.log("details", details)
    }


    testData() {
        if (this.state.worktype) {
            console.log(this.state.worktype)
        }
        else {
            Alert.alert('Please enter type of work')
        }

    }

    //Return lat and long from address and update profile
    getLatLong() {
        Geocoder.geocodeAddress(this.state.location).then(res => {
            res.map((element) => {
                this.setState({
                    lat: element.position.lat,
                    long: element.position.lng
                },
                    this.saveData) //saving data
            })
            console.log(this.state.lat);
        })
            .catch(err => console.log(err))
    }






    //Pick Image from camera or library
    pickImage() {
        ImagePicker.openPicker({
            width: 300,
            height: 180,
            cropping: true
        }).then(image => {
            this.setState({
                url: image.path,
                imageType: image.mime
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    //Upload image to Firebase storage
    uploadImage() {

        return new Promise((resolve, reject) => {
            let uploadBlob = null;
            const appendIDToImage = new Date().getTime();
            const imageRef = storage.ref('thumbnails_job').child(`${appendIDToImage}`);

            fs.readFile(this.state.url, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${this.state.imageType};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(blob, { contentType: this.state.imageType })
                })
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    resolve(url)
                    console.log(url)
                    this.dbRef.doc(this).update({ url: url })
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    saveData = () => {
        console.log("state", this.state)
        if (this.state.userID && this.state.jobCreatorName && this.state.jobname && this.state.uniqueId && this.state.jobdesc && this.state.worktype && this.state.salary && this.state.peoplenum && this.state.date && this.state.location && this.state.url && this.state.lat && this.state.lng) {
            if (isNaN(this.state.salary && this.state.peoplenum)) {
                Alert.alert('Status', 'Invalid Figure!');
            }
            else {
                this.uploadImage().then(firebaseUrl => {
                    this.dbRef.add({
                        uid: this.state.userID,
                        jobCreatorName: this.state.jobCreatorName,
                        jobname: this.state.jobname,
                        uniqueId: this.state.uniqueId,
                        jobdesc: this.state.jobdesc,
                        worktype: this.state.worktype,
                        salary: this.state.salary,
                        url: firebaseUrl,
                        lat: this.state.lat,
                        lng: this.state.lng,
                        peoplenum: this.state.peoplenum,
                        chosenDate: this.state.date,
                        location: this.state.location,
                    }).then((res) => {
                        this.setState({
                            jobname: '',
                            uniqueId: '',
                            jobdesc: '',
                            worktype: '',
                            salary: '',
                            url: '',
                            peoplenum: '',
                             time: 0,
                            location: '',
                        })
                    });
                    Alert.alert('Your Job Has Been Posted', 'Please Choose',
                        [
                            {
                                text: "Return To Main Screen",
                                onPress: () => this.props.navigation.navigate('Hire')
                            },
                            {
                                text: "View Current Job Posted",
                                onPress: () => this.props.navigation.navigate('MyJob')
                            }
                        ], { cancelable: false }
                    );
                })


            }
        } else {
            Alert.alert('Status', 'Empty Field(s)!');
        }
    }

    render() {
        //const { modalVisible } = this.state;
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return (
            <Container>
                <Content padder>
                    <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }}>Details</Text>
                    <Form>

                        <Text>Location:   {this.state.location.description}</Text>
                        {/* <Input onChangeText={this.getLatLong} /> */}
                        <ScrollView keyboardShouldPersistTaps="handled">
                            <View keyboardShouldPersistTaps="handled">

                                <GooglePlacesAutocomplete
                                    placeholder='Search'
                                    minLength={2} // minimum length of text to search
                                    autoFocus={false}
                                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                                    listViewDisplayed='auto'    // true/false/undefined
                                    fetchDetails={true}
                                    renderDescription={row => row.description} // custom description render
                                    onPress={(data, details = null) => {
                                        // this.setState({
                                        //   latitude: details.geometry.location.lat,
                                        //   longitude: details.geometry.location.lng,
                                        // }).then(
                                        //   this.setLocation(data)
                                        // )
                                        console.log(data, details);
                                        this.setLocation(data, details);
                                        //console.log(data,details);
                                    }}

                                    getDefaultValue={() => ''}

                                    query={{
                                        // available options: https://developers.google.com/places/web-service/autocomplete
                                        key: 'AIzaSyDLllM - _bxchMqm1dqUIhwE54Z99EgEdqw',
                                        language: 'en', // language of the results
                                        types: 'geocode', // default: 'geocode'
                                        components: 'country:my'

                                    }}
                                    styles={{
                                        textInputContainer: {
                                            width: '100%',

                                        },
                                        listView: {
                                            color: 'black', //To see where exactly the list is
                                            zIndex: 16, //To popover the component outwards
                                            position: 'relative',
                                        },

                                        description: {
                                            fontWeight: 'bold'
                                        },
                                        predefinedPlacesDescription: {
                                            color: '#1faadb'
                                        }
                                    }}

                                    currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                                    currentLocationLabel="Current location"
                                    //nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                    nearbyPlacesAPI='GoogleReverseGeocoding'
                                    GoogleReverseGeocodingQuery={{
                                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                    }}
                                    GooglePlacesDetailsQuery={{
                                        fields: 'geometry',
                                    }}
                                    GooglePlacesSearchQuery={{
                                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                        rankby: 'distance',
                                        types: 'food'
                                    }}

                                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                                    //predefinedPlaces={[homePlace, workPlace]}

                                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                                // renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
                                // renderRightButton={() => <Text>Custom text after the input</Text>}
                                />



                            </View>
                        </ScrollView>
                        <Item style={styles.inputGroup} fixedLabel last>
                            <Label>Job Name</Label>
                            <Input style={styles.startRouteBtn} onChangeText={this.setJobName} />
                        </Item>
                        <Item style={styles.inputGroup} fixedLabel last>
                            <Label>Unique Id</Label>
                            <Input style={styles.startRouteBtn} onChangeText={this.setUniqueId} />
                        </Item>
                        <Item style={styles.inputGroup} fixedLabel last>
                            <Label>Job Description</Label>
                            <Textarea rowSpan={5} onChangeText={this.setJobDesc} bordered style={styles.startTextBtn} placeholder="Tell something about the job Here" />
                        </Item>
                        <Item fixedLabel picker last>
                            <Label>Work Type</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: undefined }}
                                placeholder="Select Type of Job"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.worktype}
                                onValueChange={this.selectWorkType.bind(this)}
                                Title="Work Type"
                            >
                                <Picker.Item label="Select Work Type" value={null} />
                                <Picker.Item label="Urgent" value="Urgent" />
                                <Picker.Item label="Part-Time" value="Part-Time" />
                                <Picker.Item label="Contract" value="Contract" />
                                <Picker.Item label="Freelance" value="Freelance" />
                                <Picker.Item label="Milestones" value="Milestones" />
                                <Picker.Item label="Hire As You Need" value="HireNeed" />
                            </Picker>
                        </Item>

                        <Item fixedLabel>
                            <Label>Add Image</Label>
                            <Button block iconLef style={{ backgroundColor: '#1B6951' }}
                                onPress={this.pickImage}>
                                <Icon name="md-image" />
                                <Text style={{ textAlign: 'center' }}>Change Thumbnail</Text>
                            </Button>
                        </Item>


                        <Image
                            source={{ uri: this.state.url }}
                            style={{
                                height: 200, width: null, flex: 1,
                                borderTopLeftRadius: 10, borderTopRightRadius: 10
                            }}
                        />

                        <Item style={styles.inputGroup} fixedLabel last>
                            <Label>Salary</Label>
                            <Input style={styles.startRouteBtn} onChangeText={this.setSalary} />
                        </Item>

                        <Item style={styles.inputGroup} fixedLabel last>
                            <Label>Number of People</Label>
                            <Input style={styles.startRouteBtn} onChangeText={this.setPeopleNum} />
                        </Item>

                        <DatePicker
                            defaultDate={new Date()}
                            minimumDate={new Date()}
                            maximumDate={new Date(2030, 12, 31)}
                            locale={"en"}
                            date={this.state.setDate}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="Select date"
                            textStyle={{ color: "green" }}
                            placeHolderTextStyle={{ color: "#d3d3d3" }}
                            onDateChange={this.setDate}
                            disabled={false}
                        />
                        <Text style={styles.inputGroup}>
                            Date: {this.state.date}
                        </Text>


                    </Form>

                    <Button block success last style={{ marginTop: 50 }} onPress={this.saveData.bind(this)}>
                        <Text style={{ fontWeight: "bold" }}>Hire Now</Text>
                    </Button>
                </Content>

            </Container>


        );
    }
}

const styles = StyleSheet.create({

    startRouteBtn: {
        backgroundColor: 'white',
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'grey',
        shadowColor: 'black',
        margin: 20,
        elevation: 10
    },
    startTextBtn: {
        backgroundColor: 'white',
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'grey',
        shadowColor: 'black',
        margin: 20,
        elevation: 10
    },
    button: {
        backgroundColor: 'white',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    textInput: {
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)'
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
