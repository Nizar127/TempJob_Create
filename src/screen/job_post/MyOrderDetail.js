import React, { Component } from 'react';
//import { removeStudent } from '../services/DataService';
import { Alert, View, Image, StyleSheet, Dimensions } from 'react-native';
import { Container, auto, Content, Footer, FooterTab, Body, Button, Icon, Text, List, Header, Card, CardItem } from 'native-base';
import { db } from '../../config/firebase';
//import JobList from '../../components/chat/JobList';
import MapView,
{ PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle }
    from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS } from 'react-native-permissions';

const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.0922
const LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO


// async function requestLocationPermission() {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'GetJob Location Permission',
//         message:
//         'GetJob needs access to your device location' +
//         'so you can find nearby mosques.',
//         buttonNegative:'Cancel',
//         buttonPositive: 'OK'
//       },      
//     );

//     if (granted === PermissionsAndroid.RESULTS.GRANTED){
//       console.log('You can use the device location');
//     }
//     else {
//       console.log('Device location permission denied');
//     }
//   }
//   catch (err){
//     console.warn(err);
//   }
// }

export default class MyOrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            uniqueId: null,
            jobname: null,
            jobdesc: null,
            salary: null,
            peoplenum: null,
            chosenDate: null,
            lat: 0,
            lng: 0,
            worktype: null,
            location: { description: '' },
            url: null,
            mapRegion: null,
            initialLocation: null,
            gpsAccuracy: null,
            markers: [],
            dynamicAddress: [],
            item: {},
            items: [],
            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            },
            markerPosition: {
                latitude: 0,
                longitude: 0
            }
        }

    }

    componentDidMount() {
        const detailRef = firestore().collection('Job_list').doc(this.props.navigation.state.params.userkey);
        detailRef.get().then((res) => {
            if (res.exists) {
                const job = res.data();
                this.setState({
                    key: res.id,
                    jobname: job.jobname,
                    jobdesc: job.jobdesc,
                    salary: job.salary,
                    peoplenum: job.peoplenum,
                    chosenDate: job.chosenDate,
                    worktype: job.worktype,
                    lat: job.lat,
                    lng: job.lng,
                    location: job.location,
                    url: job.url
                });
                console.log("state", this.state)
            } else {
                console.log("Whoops! Document does not exists");
            }
        })
        // detailRef.onSnapshot(function (querySnapshot) {
        //   var markerIDs = [];
        //   var i = 1;
        //   querySnapshot.forEach(function (doc) {
        //     var data = doc.val;
        //     dynamicAddress.push({
        //       'key': 1,
        //       'address': {
        //         latitude: data.lat,
        //         longitude: data.lng
        //       }
        //     });
        //   });
        //   console.log(data.val().lat)
        //   markerIDs.push("Marker" + i);
        //   this.setState({ dynamicAddress: dynamicAddress });
        // })


        // setTimeout(() => {
        //   self.focusMap(markerIDs, true)
        // }, 3200);

        // requestLocationPermission = async () => {
        //   if (Platform.OS === 'ios') {
        //     var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        //     console.log('iPhone: ' + response);

        //     if (response === 'granted') {
        //       this.locateCurrentPosition();
        //     }
        //   } else {
        //     var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        //     console.log('Android: ' + response);

        //     if (response === 'granted') {
        //       this.locateCurrentPosition();
        //     }
        //   }
        // }

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

                    this.setState({ ...this.state, initialPosition });
                    console.log("state", state)

                },

                error => Alert.alert(error.message),
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
            )
        }

        // Geolocation.getCurrentPosition((position) => {
        //   var lat = parseFloat(position.coords.latitude)
        //   var lng = parseFloat(position.coords.longitude)

        //   var initialRegion = {
        //     latitude: lat,
        //     longitude: lng,
        //     latitudeDelta: LATTITUDE_DELTA,
        //     longitudeDelta: LONGTITUDE_DELTA
        //   }

        //   this.setState({ initialPosition: initialRegion })
        //   this.setState({ markerPosition: initialRegion })
        // },
        //   (error) => alert(JSON.stringify(error)),
        //   { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 })

        // this.watchID = Geolocation.watchPosition((position) => {
        //   var lat = parseFloat(position.coords.latitude)
        //   var lng = parseFloat(position.coords.longitude)
        //   var lastRegion = {
        //     latitude: lat,
        //     longitude: lng,
        //     longitudeDelta: LONGTITUDE_DELTA,
        //     latitudeDelta: LATTITUDE_DELTA
        //   }

        //   this.detailRef.push({
        //     lat: lat,
        //     lng: lng
        //   }).then(function () {
        //     // Clear message text field and SEND button state.
        //     this.setState({ initialPosition: lastRegion })
        //     this.setState({ markerPosition: lastRegion })
        //   }.bind(this)).catch(function (error) {
        //     console.error('Error writing new message to Firebase Database', error);
        //   });



        // })



    }

    focusMap(markers, animated) {
        this.map.fitToSuppliedMarkers(markers, animated);
    }

    setInitialLocation(region) {
        this.setState({
            initialLocation: region
        })
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.watchID);
    }

    onRegionChange = (region, gpsAccuracy) => {
        this.setState({
            mapRegion: region,
            gpsAccuracy: gpsAccuracy
        });
    }

    setUniqueId = (value) => {
        this.setState({ uniqueId: value });
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <View style={{ marginTop: 13, marginEnd: 350 }}>
                        <Icon style={{ color: 'black' }} size={30} name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />
                    </View>
                </Header>

                <Content padder>
                    <Card style={{ height: 300 }}>
                        <Image source={{ uri: this.state.url }} style={{ height: 300 }} />
                    </Card>

                    <Card>
                        <CardItem bordered header>
                            <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }} >{this.state.jobname}</Text>

                        </CardItem>
                        <CardItem bordered>

                            <Text style={{ height: 30, fontWeight: "bold", marginTop: 20, marginBottom: 20 }}>{this.state.uniqueId}</Text>

                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem bordered header>

                            <Text style={{ justifyContent: "center", fontWeight: "bold" }}>Job Description</Text>

                        </CardItem>
                        <CardItem bordered cardBody>
                            <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.jobdesc}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    {/* <CardItem>   
                     <Text style={{marginTop: 5, marginBottom: 5}}>Creative World Industries</Text>
                </CardItem> */}



                    <Card style={{ height: 200 }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Requirement</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.worktype}</Text>
                            </Body>
                        </CardItem>
                        <CardItem cardBody style={{ marginTop: 20 }}>
                            <Body>
                                <Text>Number of People Required: {this.state.peoplenum}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={{ height: auto }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Salary</Text>
                        </CardItem>
                        <CardItem cardBody style={{ height: 40, marginTop: 10, marginLeft: 20 }}>
                            <Body><Text>RM {this.state.salary}</Text></Body>
                        </CardItem>
                    </Card>
                    <Card style={{ height: 200 }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Date</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <Text>{this.state.chosenDate}</Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card style={{ height: 500 }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>LOCATION</Text>
                        </CardItem>
                        <CardItem header >
                            <Text style={{ fontWeight: "bold" }}>{this.state.location.description}</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Container style={styles.container}>

                                <MapView
                                    provider={PROVIDER_GOOGLE}
                                    ref={map => this._map = map}
                                    initialRegion={{
                                        latitude: this.state.lat,
                                        longitude: this.state.lng,
                                        latitudeDelta: 0.09,
                                        longitudeDelta: 0.035

                                    }}
                                    // onRegionChange={this.onRegionChange.bind(this)}
                                    // ref={map => this._map = map}
                                    showsUserLocation={true}
                                    liteMode={true}
                                    style={styles.map}
                                    moveOnMarkerPress={false}
                                    userLocationPriority="low"
                                    followsUserLocation={true}
                                    showsMyLocationButton={true}
                                    showsBuildings={true}
                                    zoomEnabled={true}

                                >

                                    <Marker
                                        coordinate={{ latitude: this.state.lat, longitude: this.state.lng }}
                                    >

                                    </Marker>
                                    {/* {this.state.dynamicAddress.map(marker => (
                    <Marker
                      key={marker.key}
                      coordinate={marker.address}
                      identifier={"Marker" + marker.key}
                    />
                  ))} */}


                                </MapView>
                            </Container>
                        </CardItem>
                    </Card>
                </Content>




            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    },
    map: {
        height: 300,
        // disabledwidth: 100,
        width: 370,
        //...StyleSheet.absoluteFillObject
    },
});

//this is for realtime db
//<Container>
//<Header>
//   <View style={{ marginTop: 25, marginEnd: 350 }}>
//     <Icon style={{ color: 'white' }} name="md-menu" onPress={() => this.props.navigation.openDrawer()} />
//   </View>
// </Header>

//<Content padder>
  //<Card>
    //<CardItem bordered header>
      //<Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }} uniqueId={uniqueId}>{this.state.jobname}</Text>

    //</CardItem>
    //<CardItem bordered>

      //<Text style={{ height: 30, fontWeight: "bold", marginTop: 20, marginBottom: 20 }}>{this.state.uniqueId}</Text>

    //</CardItem>
  //</Card>
  //<Card>
    //<CardItem bordered header>

      //<Text style={{ justifyContent: "center", fontWeight: "bold" }}>Job Description</Text>

    //</CardItem>
    //<CardItem bordered cardBody>
      //<Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
        //<Text>{this.state.jobdesc}</Text>
      //</Body>
    //</CardItem>
  //</Card>
  // <CardItem>   
    //         <Text style={{marginTop: 5, marginBottom: 5}}>Creative World Industries</Text>
      //  </CardItem> 



 // <Card style={{ height: 200 }}>
    //<CardItem header bordered>
    //  <Text style={{ fontWeight: "bold" }}>Requirement</Text>
  //  </CardItem>
   // <CardItem cardBody>
   //   <Body>
      //  <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.worktype}</Text>
    //  </Body>
   // </CardItem>
  //  <CardItem cardBody style={{ marginTop: 20 }}>
     // <Body>
     //   <Text>Number of People Required: {this.state.peoplenum}</Text>
    //  </Body>
   // </CardItem>
 // </Card>
  //<Card style={{ height: auto }}>
    //<CardItem header bordered>
      //<Text style={{ fontWeight: "bold" }}>Salary</Text>
   // </CardItem>
  //  <CardItem cardBody style={{ height: 40, marginTop: 10, marginLeft: 20 }}>
     // <Body><Text>RM {this.state.salary}</Text></Body>
  //  </CardItem>
  //</Card>
  //<Card style={{ height: 200 }}>
    //<CardItem header bordered>
     // <Text style={{ fontWeight: "bold" }}>Date</Text>
   // </CardItem>
    //<CardItem cardBody>
     // <Body>
      //  <Text>{this.state.chosenDate}</Text>
     // </Body>
   // </CardItem>
 // </Card>
 // <Card style={{ height: 250 }}>
   // <CardItem header bordered>
     // <Text>DATE AND LOCATION</Text>
   // </CardItem>
   // <CardItem cardBody>
   //   <Text>{chosenDate}</Text>
    //  <Text>{location}</Text>
   // </CardItem>
 // </Card>
//</Content>



//<Footer>
  //<FooterTab>
  //  <Button vertical onPress={() => { this.props.navigation.navigate('UploadJob') }}>
   //   <Icon name="md-briefcase" />
   //   <Text>New Job</Text>
  //  </Button>
 // </FooterTab>
//</Footer>

//</Container>
  //  );
  //}
//}