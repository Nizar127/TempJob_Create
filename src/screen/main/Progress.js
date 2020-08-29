import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Container, Header, Content, TabHeading, View, Separator, H1, Card, CardItem, Tab, Tabs, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import CurrentJob from '../tab/Current_Job';
import JobDone from '../tab/Job_Done';
import Incoming_Job from '../tab/Incoming_Job';
const { width } = Dimensions.get("window");


export default class Progress extends Component {

    static navigationOptions = {
        title: 'Work Progress',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-stats" style={{ color: tintColor }} size={30} />
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

    render() {
        return (

            <Container>

                <Content>


                    <Separator>
                        <Text style={{ alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>Work Progress</Text>
                    </Separator>


                    <Tabs>

                        <Tab heading={<TabHeading><Text>Done!</Text></TabHeading>}>
                            <JobDone />
                        </Tab>
                        <Tab heading={<TabHeading><Text>Current Work</Text></TabHeading>}>
                            <CurrentJob />
                        </Tab>
                        <Tab heading={<TabHeading><Text>Incoming</Text></TabHeading>}>
                            <Incoming_Job />
                        </Tab>
                    </Tabs>
                </Content>


                <Card style={Style.progressContainer}>
                    <CardItem>


                        <Body style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', marginLeft: 40 }}>
                            <Text>Building Android Interface for GoFar Application</Text>
                            <Text note >GoFar, Inc</Text>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Icon name="md-pin" style={{ marginRight: 3 }} />
                                <Text note >Gombak</Text>

                            </View>
                        </Body>

                        <Right>
                            <Text>10%</Text>
                        </Right>
                    </CardItem>
                </Card>
            </Container>
        );
    }
}

const Style = StyleSheet.create({
    slider: {
        fontSize: 20,
        width: 50,
        textAlign: 'left'
    },
    progressContainer: {
        width: width,
        height: 40,
        padding: 10,
        backgroundColor: "#ffffff",
        borderColor: "black",
        borderWidth: 3
    }
})

