import React from 'react';
import { StyleSheet, Text, List, View, Slider, ScrollView, Image, Alert } from 'react-native';
import { Container, Card, CardItem, Header, Left, Body, Thumbnail, Right, Button, Icon, Title, Segment, Content, Item } from 'native-base';


export default class PaymentDetails extends React.Component {



    render() {

        return (

            <ScrollView style={{ flex: 1 }}>
                <Header style={{ backgroundColor: 'white' }}>
                    <View style={{ marginTop: 13, marginEnd: 350 }}>
                        <Icon style={{ color: 'black' }} size={30} name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />
                    </View>

                </Header>
                <Card style={{ width: 320 }}>
                    <CardItem header bordered>
                        <Text>Backend Development</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Thumbnail source={require('../../img/event.jpg')} />
                            <Body>
                                <Text style={{ padding: 4 }}>Hassan</Text>
                                <Text note style={{ padding: 2 }}>Firebase</Text>
                                <Text note>Build Realtime Database System</Text>
                            </Body>
                        </Left>
                        <CardItem style={{ paddingTop: 5, paddingBottom: 2, paddingEnd: 2 }}>
                            <Text style={{ fontWeight: 'bold' }}>$500</Text>
                        </CardItem>

                        <Right>

                            <Button success transparent>
                                <Text style={{ fontWeight: 'bold' }}>PAID</Text>
                            </Button>
                        </Right>
                    </CardItem>
                </Card>

                <Card style={{ width: 320 }}>
                    <CardItem header bordered>
                        <Text>Backend Development</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Thumbnail source={require('../../img/event.jpg')} />
                            <Body>
                                <Text style={{ padding: 4 }}>Hassan</Text>
                                <Text style={{ padding: 4 }} note>Firebase</Text>
                                <Text note>Build Realtime Database System</Text>
                            </Body>
                        </Left>
                        <CardItem style={{ paddingTop: 5, paddingBottom: 2 }}>
                            <Text style={{ fontWeight: 'bold' }}>PAID</Text>
                        </CardItem>

                        <Right>

                            <Button danger transparent>
                                <Text style={{ fontWeight: 'bold' }}>UNPAID</Text>
                            </Button>
                            <Button rounded onPress={() => this.props.navigation.navigate('PaidNow')}>
                                <Text style={{ fontWeight: 'bold' }}>PAID NOW</Text>
                            </Button>
                        </Right>
                    </CardItem>
                </Card>

                <Card style={{ width: 320 }}>
                    <CardItem header bordered>
                        <Text>Backend Development</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Thumbnail source={require('../../img/event.jpg')} />
                            <Body>
                                <Text style={{ padding: 4 }}>Hassan</Text>
                                <Text note style={{ padding: 4 }}>Firebase</Text>
                                <Text note>Build Realtime Database System</Text>
                            </Body>
                        </Left>
                        <CardItem style={{ paddingTop: 5, paddingBottom: 2, paddingEnd: 4 }}>
                            <Text style={{ fontWeight: 'bold' }}>$500</Text>
                        </CardItem>

                        <Right>

                            <Button danger transparent>
                                <Text style={{ fontWeight: 'bold' }}>UNPAID</Text>
                            </Button>
                            <Button rounded onPress={() => this.props.navigation.navigate('PaidNow')}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>PAID NOW</Text>
                            </Button>
                        </Right>
                    </CardItem>
                </Card>

                <Card style={{ width: 320 }}>
                    <CardItem header bordered>
                        <Text>Backend Development</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Thumbnail source={require('../../img/event.jpg')} />
                            <Body>
                                <Text style={{ padding: 4 }}>Hassan</Text>
                                <Text note style={{ padding: 4 }}>Firebase</Text>
                                <Text note>Build Realtime Database System</Text>
                            </Body>
                        </Left>
                        <CardItem style={{ paddingTop: 5, paddingBottom: 2, paddingEnd: 4 }}>
                            <Text style={{ fontWeight: 'bold' }}>$500</Text>
                        </CardItem>

                        <Right>

                            <Button success transparent>
                                <Text style={{ fontWeight: 'bold' }}>PAID</Text>
                            </Button>
                        </Right>
                    </CardItem>
                </Card>
            </ScrollView>
        );
    }
}