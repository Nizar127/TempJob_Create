import React, { useState } from 'react';
import { Dimensions, Platform, Alert, LayoutAnimation, UIManager, StyleSheet, Text, View, Slider, ScrollView, Image } from 'react-native';
import { Container, Card, CardItem, List, ListItem, Header, Left, Body, Thumbnail, Right, Button, Title, Content, Item } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
const { width } = Dimensions.get("window");


//export default class CurrentJob extends React.Component {
const CurrentJob = () => {
    const [expanded, setExpanded] = useState(false);



    // render() {

    if (
        Platform.OS === "android" &&
        UIManager.setLayoutAnimationEnabledExperimental
    ) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    return (

        <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>

                <Container>
                    <ScrollView>
                        <Content>
                            <Card style={{ flex: 1, flexDirection: 'column', marginTop: 30 }}>
                                <CardItem button onPress={() => { LayoutAnimation.configureNext(LayoutAnimation.Presets.spring); setExpanded(!expanded); }}>
                                    <Left onPress={() => { expanded ? "collapse" : "expand" }}>
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
                                        <Text>40%</Text>

                                    </Right>
                                </CardItem>
                            </Card>
                            {expanded && (
                                <Container>
                                    <Content>
                                        <List >
                                            <ListItem avatar style={styles.listitem}>
                                                <Left>
                                                    <Thumbnail source={require('../../img/coding.jpg')} style={{ padding: 10 }} />
                                                </Left>
                                                <Body>
                                                    <Text>Android Front-End Developer for Car Feature on GetFar App</Text>
                                                    <Text>GetFar, Inc. </Text>
                                                    <Text note>Developed Basic UI/UX for the System</Text>
                                                </Body>
                                                <Right>
                                                    <Icon name="md-checkmark-circle" size={40} color="#00FF1D" />
                                                    <Icon name="md-close-circle" size={40} color="#FF0E01" />
                                                </Right>
                                            </ListItem>
                                            <ListItem avatar style={styles.listitem}>
                                                <Left>
                                                    <Thumbnail source={require('../../img/coding.jpg')} style={{ padding: 10 }} />
                                                </Left>
                                                <Body>
                                                    <Text>Android Back-End Developer for Foot Massage System on ForRest App</Text>
                                                    <Text>ForRest, Inc. </Text>
                                                    <Text note>Developed Basic Database Integration for the System</Text>
                                                </Body>
                                                <Right>
                                                    <Icon name="md-checkmark-circle" size={40} color="#00FF1D" />
                                                    <Icon name="md-close-circle" size={40} color="#FF0E01" />
                                                </Right>
                                            </ListItem>
                                            <ListItem avatar style={styles.listitem}>
                                                <Left>
                                                    <Thumbnail source={require('../../img/coding.jpg')} style={{ padding: 10 }} />
                                                </Left>
                                                <Body>
                                                    <Text>Android Front-End Developer for Foot Massage System on GetMusic App</Text>
                                                    <Text>GetMusic, Inc. </Text>
                                                    <Text note>Developed Basic UI/UX for the System</Text>
                                                </Body>
                                                <Right>
                                                    <Icon name="md-checkmark-circle" size={40} color="#00FF1D" />
                                                    <Icon name="md-close-circle" size={40} color="#FF0E01" />
                                                </Right>
                                            </ListItem>
                                            <ListItem avatar style={styles.listitem}>
                                                <Left>
                                                    <Thumbnail source={require('../../img/coding.jpg')} style={{ padding: 10 }} />
                                                </Left>
                                                <Body>
                                                    <Text>Web App Front-End Developer for Car Feature on GetFar App</Text>
                                                    <Text>GetFar, Inc. </Text>
                                                    <Text note>Developed Basic UI/UX for the System in Web Application</Text>
                                                </Body>
                                                <Right>
                                                    <Icon name="md-checkmark-circle" size={40} color="#00FF1D" />
                                                    <Icon name="md-close-circle" size={40} color="#FF0E01" />
                                                </Right>
                                            </ListItem>
                                        </List>
                                    </Content>
                                </Container>
                            )}

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
                                        <Text>60%</Text>
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
                                        <Text>10%</Text>
                                    </Right>
                                </CardItem>
                            </Card>






                        </Content>
                    </ScrollView>
                </Container>

            </View>
        </ScrollView>
    );
    // }
}

const styles = StyleSheet.create({
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

export default CurrentJob;