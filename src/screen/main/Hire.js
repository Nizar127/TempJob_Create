import React, { Component } from 'react';
import { KeyboardAvoidingView, FlatList, Modal, Alert, TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import {
    Container,
    Header,
    Content,
    Right,
    View,
    Fab,
    Card,
    H1,
    CardItem,
    Thumbnail,
    Text,
    Left,
    Body,
    //Icon,
    Item,
    Label,
    Input,
    Separator,
    Button,
    DatePicker,
    Picker,
    Textarea
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
//import TimePicker from 'react-native-simple-time-picker';
import TimePicker from "react-native-24h-timepicker";
import { KeyboardAvoidingViewBase } from 'react-native';
import messaging from '@react-native-firebase/messaging';



export default class Hire extends Component {

    constructor() {
        super();
        this.applicationRef = firestore().collection('Hiring')/* .where('jobCreatorID', '==', auth().currentUser.uid) */;
        //this.applicationRef = firestore().collection('Hiring');/* .doc(auth().currentUser.uid).get().where('jobCreatorID', '==', auth().currentUser.uid); */
        this.hiringRef = firestore().collection('Job_Hired');

        this.state = {
            hire: [],
            isLoading: true,
            show: true,
            username: null,
            jobname: null,
            jobposition: null,
            isVisible: false,
            userID: '',
            jobCreatorID: '',
            jobCreatorName: '',
            jobDescription: '',
            jobName: '',
            jobWorktype: '',
            job_seekerImage: '',
            job_seekerSalary: '',
            lat: '',
            lng: '',
            ref_experienece: '',
            ref_skills: '',
            ref_selfDescribe: '',
            startDate: '',
            workingLocation: '',
            period: '',
            task: '',
            time: '',
            worktime: '',
            //selectedHours: 0,
            //selectedMinutes: 0,
            chosenDate: new Date(),
            date_start: new Date().toString().substr(4, 12),
            date_end: new Date().toString().substr(4, 12)
        };
        this.selectWorkTime = this.selectWorkTime.bind(this);
        this.setDate_Start = this.setDate_Start.bind(this);
        this.setDate_End = this.setDate_End.bind(this);

    }



    getDataOfJob = (documentSnapshot) => {
        return documentSnapshot.get('jobCreatorID')
    }

    componentDidMount() {
        this.unsubscribe = this.applicationRef.onSnapshot(this.getCollection);
        //let DataRef = firestore().collection('Hiring').doc(auth().currentUser.uid).get().then(documentSnapshot => this.getDataOfJob(documentSnapshot));
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
          });
      
          messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
              'Notification caused app to open from background state:',
              remoteMessage.notification,
            );
            navigation.navigate(remoteMessage.data.type);
          });
      
          // Check whether an initial notification is available
          messaging()
            .getInitialNotification()
            .then(remoteMessage => {
              if (remoteMessage) {
                console.log(
                  'Notification caused app to open from quit state:',
                  remoteMessage.notification,
                );
                setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
              }
              setLoading(false);
            });
            
            return unsubscribe;
    }


    componentWillUnmount() {
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const hire = [];
        querySnapshot.forEach((res) => {
            const {
                userID,
                jobCreatorID,
                jobCreatorName,
                jobDescription,
                jobName,
                jobWorkType,
                job_seekerImage,
                job_seeker_name,
                job_seekerSalary,
                lat,
                lng,
                ref_experienece,
                ref_skills,
                ref_selfDescribe,
                startDate,
                workingLocation
            } = res.data();
            hire.push({
                key: res.id,
                res,
                userID,
                jobCreatorID,
                jobCreatorName,
                jobDescription,
                jobName,
                job_seeker_name,
                jobWorkType,
                job_seekerImage,
                job_seekerSalary,
                lat,
                lng,
                ref_experienece,
                ref_skills,
                ref_selfDescribe,
                startDate,
                workingLocation
            });
        });
        this.setState({
            hire,
            isLoading: false
        })
    }

    onCancel() {
        this.TimePicker.close();
    }

    onConfirm(hour, minute) {
        this.setState({ time: `${hour}:${minute}` });
        this.TimePicker.close();
    }

    displayModal(show) {
        this.setState({ isVisible: show })
        
    }

    setPeriod = (value) => {
        this.setState({ ...this.state, period: value })
    }

    setTask = (value) => {
        this.setState({ ...this.state, task: value })
    }

    selectWorkTime = (value) => {
        this.setState({
            worktime: value
        })
    }

    setDate_Start(newDate) {
        this.setState({ date_start: newDate.toString().substr(4, 12) });
    }

    setDate_End(newDate) {
        this.setState({ date_end: newDate.toString().substr(4, 12) });
    }

    // componentDidMount() {
    //   SplashScreen.hide();
    // }

    static navigationOptions = {
        title: 'Hire',

        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-briefcase" style={{ color: tintColor, fontSize: 20 }} />
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



    HireWorking = (id) => {
        console.log("text_id", id);
        let dbref = firebase.firestore().collection('Hiring').doc(id).get();
        dbref.then(doc => {
            this.setState({
                ...this.state,
                uid: doc.get('uid'),
                //job_seeker_name: doc.get('username'),
                jobSeekerName: doc.get('job_seeker_name'),
                jobseekerID: doc.get('userID'),
                jobDescription: doc.get('jobDescription'),
                job_seekerImage: doc.get('job_seekerImage'),
                jobname: doc.get('jobName'),
                jobWorktype: doc.get('jobWorkType'),
                workingLocation: doc.get('workingLocation'),
                lat: doc.get('lat'),
                lng: doc.get('lng'),
                job_seeker_salary: doc.get('job_seekerSalary'),
                skills: doc.get('ref_skills'),
                experience: doc.get('ref_experienece'),
                selfDescribe: doc.get('ref_selfDescribe')
            }, () => {

                console.log("state", this.state)
                console.log("auth.currentUser", auth().currentUser)



                if (this.state.period && this.state.time && this.state.worktime && this.state.date_start && this.state.date_end && this.state.task) {

                    this.hiringRef.add({
                        jobCreatorID: auth().currentUser.uid,
                        job_creator_name: auth().currentUser.displayName,
                        job_creator_Image: auth().currentUser.photoURL,
                        jobSeekerName: this.state.jobSeekerName,
                        jobSeekerID: this.state.jobseekerID,
                        jobDescription: this.state.jobDescription,
                        job_seekerImage: this.state.job_seekerImage,
                        jobName: this.state.jobname,
                        job_seekerSalary: this.state.job_seeker_salary,
                        type_of_Job: this.state.jobWorktype,
                        location: this.state.workingLocation,
                        lat: this.state.lat,
                        lng: this.state.lng,
                        period: this.state.period,
                        task: this.state.task,
                        startDate: this.state.date_start,
                        endDate: this.state.date_end,
                        time: this.state.time,

                    }).then((res) => {
                        this.setState({
                            task: '',
                            period: '',
                            startDate: '',
                            endDate: '',
                            time: '',
                            worktime: ''
                        });
                        Alert.alert('Congrats!', 'Your Application Has Been Send To The Job Seeker');
                        this.displayModal(!this.state.isVisible);

                    })

                        .catch((err) => {
                            console.error("Error found: ", err);
                            // this.setState({
                            //   isLoading: false,
                            // });
                        });
                }
            });

        });

    }

    render() {

        return (
            <Container>

                <Content >
                    <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }}>List of Applicant</Text>
                    <Modal
                        animationType={"slide"}
                        transparent={false}
                        visible={this.state.isVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has now been closed.');
                        }}>
                        <ScrollView>
                            <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : null}
                                style={{ flex: 1 }}>
                                <View style={Style.inner}>
                                    <Item style={Style.inputGroup} fixedLabel last style={{ marginTop: 20 }}>
                                        <Label>Period</Label>
                                        <Input style={Style.startTextBtn} onChangeText={this.setPeriod} bordered placeholder="Working Period Required" />
                                    </Item>

                                    <Item fixedLabel picker last>
                                        <Label>Type of Time</Label>
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                                            style={{ width: undefined }}
                                            placeholder="State Working Time"
                                            placeholderStyle={{ color: "#bfc6ea" }}
                                            placeholderIconColor="#007aff"
                                            selectedValue={this.state.worktime}
                                            onValueChange={this.selectWorkTime.bind(this)}
                                            Title="Work Type"
                                        >
                                            <Picker.Item label="Select Period of Working" value={null} />
                                            <Picker.Item label="Day" value="Day" />
                                            <Picker.Item label="Hour" value="Time" />

                                        </Picker>
                                    </Item>
                                    <View>
                                        <Text style={Style.text}>Please Determine Working Time</Text>
                                        <TouchableOpacity
                                            onPress={() => this.TimePicker.open()}
                                            style={Style.button}
                                        >
                                            <Text style={Style.buttonText}>Open TimePicker</Text>
                                        </TouchableOpacity>
                                        <Text>{this.state.time}</Text>
                                        <TimePicker
                                            ref={ref => {
                                                this.TimePicker = ref;
                                            }}
                                            onCancel={() => this.onCancel()}
                                            onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                                        />
                                    </View>

                                    <DatePicker
                                        defaultDate={new Date()}
                                        minimumDate={new Date()}
                                        maximumDate={new Date(2030, 12, 31)}
                                        locale={"en"}
                                        date={this.state.setDate_Start}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        placeHolderText="Select date"
                                        textStyle={{ color: "blue" }}
                                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                                        onDateChange={this.setDate_Start}
                                        disabled={false}
                                    />
                                    <Text>
                                        Start Date: {this.state.date_start}
                                    </Text>


                                    <DatePicker
                                        defaultDate={new Date()}
                                        minimumDate={new Date()}
                                        maximumDate={new Date(2030, 12, 31)}
                                        locale={"en"}
                                        date={this.state.setDate_End}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        placeHolderText="Select date"
                                        textStyle={{ color: "blue" }}
                                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                                        onDateChange={this.setDate_End}
                                        disabled={false}

                                    />
                                    <Text style={{ marginBottom: 20 }}>
                                        End Date: {this.state.date_end}
                                    </Text>



                                    <Item style={Style.inputGroup} fixedLabel last>
                                        <Label>Task To Do</Label>
                                        <Textarea rowSpan={3} bordered onChangeText={this.setTask} style={Style.startTextBtn} placeholder="Tell something about the job Here" />
                                    </Item>


                                    <Text
                                        style={Style.closeText}
                                        onPress={() => {
                                            this.displayModal(!this.state.isVisible);
                                        }}><Icon name="md-close" size={20} />
                                    </Text>

                                    <Button success style={Style.addButton} onPress={() => this.HireWorking(this.state.key)}>
                                        <Text>Submit</Text>
                                    </Button>
                                    <View style={{ flex: 1 }}></View>
                                </View>

                            </KeyboardAvoidingView>
                        </ScrollView>
                    </Modal>
                    <View style={{ flex: 1, /* backgroundColor: '#292D5C' */ shadowColor: 'white', backgroundColor: '#242836' }}>
                        <FlatList
                            data={this.state.hire}

                            contentContainerStyle={{ flexGrow: 1 }}
                            renderItem={({ item, index }) => {
                                return (
                                    <SafeAreaView>
                                        <ScrollView>
                                            <Card key={index} style={Style.card} >
                                                <CardItem header bordered style={{ flexDirection: 'row' }}>
                                                    <Text>{item.jobName}</Text>
                                                    <Right>
                                                        <Button success onPress={() => { this.setState({ key: item.key }), this.displayModal(true) }}>

                                                            <Text style={Style.buttonHireText}>Hire</Text>
                                                        </Button>
                                                    </Right>

                                                </CardItem>
                                                <CardItem header>
                                                    <Text style={Style.text_title}>{item.job_seeker_name}</Text>

                                                </CardItem>
                                                <CardItem bordered button onPress={() => {
                                                    this.props.navigation.navigate('UserProfile', {
                                                        userkey: item.key
                                                    });
                                                }}>
                                                    <CardItem cardBody style={{ flexDirection: 'row' }}>
                                                        <Left>
                                                            <Thumbnail large source={{ uri: item.job_seekerImage }} style={{ margin: 5 }} />
                                                        </Left>
                                                        <Body>
                                                            <Text style={{ paddingBottom: 7 }}>Capability</Text>
                                                            <Text note style={{ padding: 3 }}>{item.ref_skills}</Text>
                                                            <Text style={{ padding: 3 }}>{item.ref_experienece}</Text>
                                                        </Body>

                                                    </CardItem>


                                                </CardItem>
                                            </Card>
                                        </ScrollView>
                                    </SafeAreaView>
                                )
                            }}
                        />
                    </View>

                </Content>


                <Fab style={{ backgroundColor: '#0A0E4D', borderRadius: 50 }} onPress={() => this.props.navigation.navigate('Search')}>

                    <Icon name="md-search-outline" />

                    {/* <Text style={{ fontColor: '#000000', fontSize: 9 }}>
                        Request
          </Text> */}
                </Fab>

            </Container >
        );
    }
}

const Style = StyleSheet.create({
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 220,
        backgroundColor: '#E91E63',
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    closeText: {
        fontSize: 25,
        color: '#00479e',
        textAlign: 'center',
        marginTop: 10
    },
    buttonText: {
        color: "#10BA01",
        fontSize: 22,
        shadowColor: 'black',
        elevation: 20,
        fontWeight: 'bold',
        fontFamily: "CerealMedium",
        justifyContent: 'center',
        alignItems: 'center',



    },
    card: {
        flex: 1,
        elevation: 15,
        borderRadius: 30,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10
    },
    text: {
        fontSize: 20,
        marginTop: 5
    },

    hireBtn: {
        marginLeft: 150,
        width: 75,
        textAlign: 'center',
    },

    text_title: {
        fontFamily: "CerealMedium",
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
        color: '#0A0E4D',
        alignItems: 'center',
        justifyContent: 'center'
    },
    details: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    listText: {
        fontFamily: "CerealMedium",
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

    rating: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingLabel: {
        fontFamily: "CerealBook",
        marginLeft: 4,
    },
    startRouteBtn: {
        backgroundColor: 'blue',
        height: 30,
        width: 80,
        borderRadius: 35,

    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    },
    image: {
        marginTop: 50,
        marginBottom: 10,
        width: '100%',
        height: 190,
    },
    logo: {
        width: '100%',
        height: 90
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 24,
        marginBottom: 30,
        padding: 40,
    },
    closeText: {
        fontSize: 24,
        color: '#00479e',
        textAlign: 'center',
        marginTop: 40
    },
    closeButton: {
        display: 'flex',
        height: 60,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF3974',
        shadowColor: '#2AC062',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowRadius: 25,
    },
    buttonHireText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: "CerealMedium",
        fontWeight: 'bold',

    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
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
        margin: 35,
        elevation: 10
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    text_header: {
        color: 'black',
        fontFamily: "CerealMedium",
        fontWeight: 'bold',
        fontSize: 18,
        padding: 7
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    text_price: {
        color: 'black',
        fontFamily: "CerealMedium",
        fontWeight: 'bold',
        fontSize: 20,
        padding: 7,
        elevation: 6
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
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
        borderRadius: 10,
        flexDirection: 'column'
    },
    listing: {
        marginBottom: 25,
        elevation: 10,
        borderColor: 'black',
        borderWidth: 3,
        marginHorizontal: 20,
        padding: 3,
        marginRight: 6,
        marginLeft: 6
    },
    startBtn: {
        backgroundColor: 'white',
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20
    },
    roundedBtn: {
        height: 31,
        marginEnd: 50,
        width: 200
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "flex-end",
    },
})
