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
import PaymentScreen from '../payment/PaymentScreen';
import AddNewScreen from '../payment/AddNewPayment';
import PaidNow from '../payment/PaidNow';
import PaymentDetails from '../payment/PaymentDetails';
import PastPayment from '../payment/PastPayment';
const dataArray = [
    { title: "Past Payment", content: <PastPayment /> },
    { title: "Add New Payment", content: <AddNewScreen /> },
    { title: "Current Payment", content: <PaymentDetails /> },


];

export default class PaymentMain extends Component {


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
    // displayModal(show) {
    //     this.setState({ isVisible: show })
    // }
    // displayData(show){
    //     this.setState({expanded: show})
    // }

    setExpanded(show) {
        this.setState({ expanded: show })
    }


    static navigationOptions = {
        title: 'Payment',

        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-wallet" style={{ color: tintColor, fontSize: 20 }} />
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
    _renderHeader(item, expanded) {
        return (
            <View style={{
                flexDirection: "row",
                padding: 10,
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "white"
            }}>
                <Text style={{ fontWeight: "600" }}>
                    {" "}{item.title}
                </Text>
                {expanded
                    ? <Icon style={{ fontSize: 25 }} name="arrow-up-circle-outline" />
                    : <Icon style={{ fontSize: 25 }} name="arrow-down-circle-outline" />}
            </View>
        );
    }
    _renderContent(item) {
        return (
            <Text
                style={{
                    backgroundColor: "white",
                    padding: 10,

                }}
            >
                {item.content}
            </Text>
        );
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

                    <View style={{ justifyContent: 'center', backgroundColor: '#242836' }} >
                        <Card>
                            <CardItem header bordered>
                                <Left>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginRight: 10, fontFamily: 'montserrat', color: '#242836' }}>Outstanding</Text>
                                </Left>
                                <Right style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 17, padding: 10, color: 'green', fontFamily: 'montserrat' }}>RM 15,000</Text>
                                </Right>
                            </CardItem>

                        </Card>
                        <Card>
                            <CardItem>
                                <Content padder style={{ backgroundColor: 'white', marginTop: 100 }}>
                                    <Accordion
                                        //icon="arrow-down-circle-outline" 
                                        dataArray={dataArray}
                                        //expandedIcon="arrow-up-circle-outline" 
                                        //headerStyle={{ backgroundColor:''}} 
                                        animation={true}
                                        expanded={true}
                                        renderHeader={this._renderHeader}
                                        renderContent={this._renderContent}

                                    />

                                </Content>
                            </CardItem>
                        </Card>
                    </View>
                    <View>


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