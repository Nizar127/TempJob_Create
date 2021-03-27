import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, Animated, Dimensions, Platform, LayoutAnimation, UIManager, Slider } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet'
import {
    Container,
    Header,
    Content,
    View,
    Accordion,
    Card,
    Right,
    Label,
    Item,
    CardItem,
    Thumbnail,
    Text,
    Left,
    Body,
    List,
    ListItem,
    Separator,
    Tabs,
    Tab,
    TabHeading,
    //ActionSheet,
    Button
} from 'native-base';
//import  ActionSheet from 'react-native-actionsheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
const dataArray = [
    { title: "Personal Bio", content: "Smart, Simple, Hardworking and Easy to adapt" },
    { title: "Skills", content: "Programming, Engineering, Mechanical, Design" },
    { title: "Experience", content: "Working with Creative World, Worked With Brandpacker Solution" },
    { title: "Personal Projects", content: "Develop app for ESports, Develop personal e-wallet app" },
    { title: "Education Background", content: "UITM, UIAM, Oracle Academy" },
    { title: "Interest", content: "Love to coding, loves science" },
    { title: "Achievement", content: "3 times Deans's list award" }
];



const options = [
    'Cancel',
    <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold', fontFamily: 'montserrat' }}>Urgent</Text>,
    <Text style={{ color: 'blue', fontSize: 20, fontWeight: 'bold', fontFamily: 'montserrat' }}>Part-Time</Text>,
    <Text style={{ color: 'blue', fontSize: 20, fontWeight: 'bold', fontFamily: 'montserrat' }}>Contract</Text>,
    <Text style={{ color: 'green', fontSize: 20, fontWeight: 'bold', fontFamily: 'montserrat' }}>Milestones</Text>,
    <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold', fontFamily: 'montserrat' }}>Hire As You Need</Text>,

]
export default class UserProfile extends Component {


    constructor(props) {
        super(props);

        this.state = { expanded: false }
        // showActionSheet = () => {
        //   this.ActionSheet.show()
        // }

        // handlePress = (buttonIndex) => {
        //   this.setState({ selected: buttonIndex })
        // }
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    _maybeRenderImage = () => {
        let { url } = this.state;
        if (!url) {
          return;
        }
    
        return (
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              width: 350,
              height: 250,
              borderRadius: 3,
              elevation: 2,
            }}>
            <View
              style={{
                borderTopRightRadius: 3,
                borderTopLeftRadius: 3,
                shadowColor: '#8d8f92',
                borderColor: '#8d8f92',
                elevation: 4,
                borderWidth:5,
                shadowOpacity: 0.2,
                shadowOffset: { width: 4, height: 4 },
                shadowRadius: 5,
                overflow: 'hidden',
              }}>
              <Image source={{ uri: url }} style={{ width: null, height: 250 }} />
            </View>
          </View>
        );
    };
    // displayModal(show) {
    //     this.setState({ isVisible: show })
    // }
    // displayData(show){
    //     this.setState({expanded: show})
    // }

    setExpanded(show) {
        this.setState({ expanded: show })
    }
    render() {
        if (
            Platform.OS === "android" &&
            UIManager.setLayoutAnimationEnabledExperimental
        ) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        return (
            <Container>
                <ScrollView>
                    <Header style={{ backgroundColor: 'white' }}>
                        <View style={{ marginTop: 13, marginEnd: 350 }}>
                            <Icon style={{ color: 'black' }} size={30} name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />
                        </View>
                    </Header>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                        <CardItem style={{ marginTop: 18 }} >
                            <Thumbnail large source={require('../../img/kambing.jpg')} style={{ alignSelf: 'center' }} />
                        </CardItem>
                        <View style={Style.rating}>
                            <Icon name="star" color="rgb(255, 56, 92)" />
                            <Icon name="star" color="rgb(255, 56, 92)" />
                            <Icon name="star" color="rgb(255, 56, 92)" />
                            <Icon name="star" color="rgb(255, 56, 92)" />
                            <Text style={Style.ratingLabel}>

                            </Text>
                        </View>
                        <CardItem>
                            <Text style={{ elevation: 10, fontWeight: 'bold', fontFamily: "CerealMedium", fontSize: 20 }}>Koez 20</Text>
                        </CardItem>
                        <CardItem>
                            <Text note><Icon name="md-pin" style={{ color: 'red' }} size={30} /> Kuala Terengganu, Malaysia</Text>
                        </CardItem>
                        <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button success style={{ borderRadius: 40, marginRight: 10, elevation: 12 }} onPress={this.showActionSheet}>
                                <ActionSheet
                                    ref={o => this.ActionSheet = o}
                                    title={<Text style={{ color: '#000', fontSize: 18 }}>Which one do you like?</Text>}
                                    options={options}
                                    cancelButtonIndex={0}
                                    destructiveButtonIndex={6}
                                    onPress={(index) => { /* do something */ }}
                                />
                                <Text style={{ fontWeight: "bold", fontSize: 17, padding: 10 }}>Request</Text>
                            </Button>
                            <Button info style={{ borderRadius: 40, marginLeft: 10, elevation: 12 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 17, padding: 10 }}>Follow</Text>
                            </Button>

                        </View>
                        <Card style={{ flexDirection: 'column', marginTop: 15 }}>
                            <View style={Style.infoBoxWrapper}>
                                <View style={Style.infoBox}>
                                    <Label style={Style.text}>Job Done</Label>
                                </View>
                                <View style={Style.infoBox}>
                                    <Label style={Style.text}>Work Score</Label>
                                </View>
                                <View style={Style.infoBox}>
                                    <Label style={Style.text}>Speciality</Label>
                                </View>
                            </View>
                            <View style={Style.infoBoxWrapper}>
                                <View style={Style.infoBox}>
                                    <Label style={Style.textInfo}>100</Label>
                                </View>
                                <View style={Style.infoBox}>
                                    <Label style={Style.textInfo}>500</Label>
                                </View>
                                <View style={Style.infoBox}>
                                    <Label style={Style.textInfo}>Catering Multi-Function Staff</Label>
                                </View>
                            </View>
                        </Card>
                    </View>
                    <View>
                        <Content padder>
                            <Accordion icon="arrow-down-circle-outline" size={50} dataArray={dataArray} expandedIcon="arrow-up-circle-outline" style={{ width: 380, iconSize: 40, marginBottom: 20 }} />

                        </Content>

                    </View>
                    <View style={{padding:10, borderTopWidth: 1,}}>
                        <Text style={{padding: 15, fontSize: 20, fontWeight: 'bold', fontFamily: 'montserrat'}}>Review</Text>
                        <Content style={{padding: 5, marginBottom:10}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                            <CardItem style={{ marginTop: 18, justifyContent: 'center'}} >
                                <Thumbnail large source={require('../../img/kambing.jpg')} style={{ alignSelf: 'center' }} />
                            </CardItem>
                            <View style={{ flex: 1, flexDirection: 'column'}}>
                                <View 
                                    style=
                                    {{flex: 1, flexDirection: 'column', marginTop: 20,
                                    borderTopRightRadius: 3,
                                    borderTopLeftRadius: 3,
                                    shadowColor: '#8d8f92',
                                    borderColor: '#8d8f92',
                                    elevation: 4,
                                    borderWidth:2,
                                    shadowOpacity: 0.2,
                                    shadowOffset: { width: 3, height: 4 },
                                    shadowRadius: 5,
                                    overflow: 'hidden',}}> 
                                    <Text style={{ fontSize: 17, padding: 10, justifyContent: 'center'}}>
                                        sds
                                    </Text>
                                
                                </View>
                                <View style={{flexDirection: 'row', justifyContent:'flex-end' }}>
                                    <View style={Style.rating}>
                                        <Icon name="star" color="rgb(255, 56, 92)" />
                                        <Icon name="star" color="rgb(255, 56, 92)" />
                                        <Icon name="star" color="rgb(255, 56, 92)" />
                                        <Icon name="star" color="rgb(255, 56, 92)" />
                                    <Text style={Style.ratingLabel}>

                                    </Text>
                               </View>
                                <Button primary style={{margin:10}}>
                                    <Text>REPLY</Text>
                                </Button>
                                </View>
                         
                            </View>
                            </View>
                 
                        </Content>
                        <Content>
                            <View style={{flex: 1, flexDirection: 'row', borderTopWidth: 1, marginTop: 10, marginBottom: 10}}>
                            <CardItem style={{ marginTop: 18, justifyContent: 'center' }} >
                                <Thumbnail large source={require('../../img/kambing.jpg')} style={{ alignSelf: 'center' }} />
                            </CardItem>
                            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}> 
                                <Text style={{ fontSize: 17, padding: 10, justifyContent: 'center'}}>
                                    Tkdaskdajkdaskdjskadasdksadjkasd
                                </Text>
                               {/*  <View style={{flexDirection: 'row', marginLeft:20}}>
                                    <Text onPress={() => this.props.navigation.navigate('PastPayment')} style={{color: '#092FEC', fontWeight: 'bold', padding: 3 }}>Reply</Text>
                                    <Text onPress={() => this.props.navigation.navigate('PastPayment')} style={{color: '#092FEC', fontWeight: 'bold', padding: 3}}>Like</Text>
                                </View> */}
                            </View>

                            </View>
                 
                        </Content>
                    </View>

                </ScrollView>



            </Container>



        );
    }
}

const Style = StyleSheet.create({

    tab: {
        color: 'white',
        textShadowColor: 'black'
    },
    infoBoxWrapper: {

        borderTopColor: '#000000',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 70,
        marginBottom: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoBox: {
        width: '33%',
        alignItems: 'center',
        color: 'black',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 4
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'montserrat'
    },
    textInfo: {
        color: '#2B18FD',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'montserrat'

    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingLabel: {
        fontFamily: "CerealBook",
        marginLeft: 4,
    },
    btnWrapper: {
        margin: 25,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    requestBtn: {
        color: 'white',
        elevation: 30,
        borderRadius: 35

    },
    requestText: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'montserrat',
    },
    followBtn: {
        // color: '#1D4AEE',
        color: 'red',
        elevation: 30,
        borderRadius: 35
    },
    followText: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'montserrat',
    }
})