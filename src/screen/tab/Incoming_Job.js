import React from 'react';
import { StyleSheet, Text, List, View, Slider, ScrollView, Image, Alert } from 'react-native';
import { Container, Card, CardItem, Header, Left, Body, Thumbnail, Right, Button, Icon, Title, Segment, Content, Item } from 'native-base';


export default class Incoming_Job extends React.Component {



    render() {

        return (

            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>

                    <Container>
                        <Content>
                            <Card style={{ flex: 1, flexDirection: 'column', marginTop: 30 }}>
                                <CardItem bordered button onPress={() => Alert.alert("Job Done!!")}>
                                    <Left>
                                        <Thumbnail source={require('../../img/dude.jpg')} />
                                        <Body style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', marginLeft: 40 }}>
                                            <Text>Hamzah</Text>
                                            <Text note >25 Years Old</Text>
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <Icon name="pin" style={{ marginRight: 3 }} />
                                                <Text note >Gombak,</Text>
                                                <Text note > Selangor, </Text>
                                                <Text note >Malaysia</Text>
                                            </View>
                                        </Body>
                                    </Left>
                                    <Right>
                                        <Text>15 December 2020</Text>
                                    </Right>
                                </CardItem>
                            </Card>

                            <Card style={{ flex: 1, flexDirection: 'column', marginTop: 30 }}>
                                <CardItem bordered button onPress={() => Alert.alert("Job Done!!")}>
                                    <Left>
                                        <Thumbnail source={require('../../img/dude.jpg')} />
                                        <Body style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', marginLeft: 40 }}>
                                            <Text>Hamzah</Text>
                                            <Text note >25 Years Old</Text>
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <Icon name="pin" style={{ marginRight: 3 }} />
                                                <Text note >Gombak,</Text>
                                                <Text note > Selangor, </Text>
                                                <Text note >Malaysia</Text>
                                            </View>
                                        </Body>
                                    </Left>
                                    <Right>
                                        <Text>15 December 2020</Text>
                                    </Right>
                                </CardItem>
                            </Card>

                            <Card style={{ flex: 1, flexDirection: 'column', marginTop: 30 }}>
                                <CardItem bordered button onPress={() => Alert.alert("Job Done!!")}>
                                    <Left>
                                        <Thumbnail source={require('../../img/dude.jpg')} />
                                        <Body style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', marginLeft: 40 }}>
                                            <Text>Hamzah</Text>
                                            <Text note >25 Years Old</Text>
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <Icon name="pin" style={{ marginRight: 3 }} />
                                                <Text note >Gombak,</Text>
                                                <Text note > Selangor, </Text>
                                                <Text note >Malaysia</Text>
                                            </View>
                                        </Body>
                                    </Left>
                                    <Right>
                                        <Text>15 December 2020</Text>
                                    </Right>
                                </CardItem>
                            </Card>






                        </Content>

                    </Container>


                </View>
            </ScrollView>
        );
    }
}

const Style = StyleSheet.create({
    slider: {
        fontSize: 20,
        width: 50,
        textAlign: 'left'
    }
})
