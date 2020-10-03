import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import { Root, Thumbnail } from 'native-base';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import SplashScreen from './src/SplashScreen';
import Hire from './src/screen/main/Hire';
import Profile from './src/screen/main/Profile';
import Search from './src/screen/main/Search';
import Payment from './src/screen/drawer/payment';
import Notification from './src/screen/drawer/notifications';
import GoogleLogin from './src/screen/auth/googlelogin';
import Loading from './src/Loading';
import EditProfile from './src/screen/profile/EditProfile';
import OnBoard from './src/OnBoard';
import MyOrderDetail from './src/screen/job_post/MyOrderDetail';
import MyJob from './src/screen/job_post/MyJob';
import UploadJob from './src/screen/job_post/UploadJob';
import AddButton from './src/component/addbtn';
import UserProfile from './src/screen/profile/UserProfile';
import Keyplayer from './src/screen/profile/keyplayer';
import PaymentMain from './src/screen/main/PaymentMain';
import JobProgress from './src/screen/main/JobProgress';
import PastPayment from './src/screen/payment/PastPayment';
import PaymentDetails from './src/screen/payment/PaymentDetails';
import PaidNow from './src/screen/payment/PaidNow';
import auth from '@react-native-firebase/auth';

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Hire: Hire,
    JobProgress: JobProgress,
    // UploadJob:
    //  UploadJob,
    UploadJob: UploadJob,
    PaymentMain: PaymentMain,
    Profile: Profile
  },

  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  }
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator,
    OnBoard: OnBoard,
    Loading: Loading,
    GoogleLogin: GoogleLogin,
    EditProfile: EditProfile,
    MyJob: MyJob,
    Search: Search,
    MyOrderDetail: MyOrderDetail,
    UserProfile: UserProfile,
    Keyplayer: Keyplayer,
    PaymentDetails: PaymentDetails,
    PaidNow: PaidNow,
    PastPayment: PastPayment

  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: () =>
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />

      };
    }
  }
);

const CustomDrawerContentComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
      <Thumbnail source={{ uri: auth().currentUser.photoURL }} style={{ height: 80, width: 80, margin: 10, padding: 10 }} />
      {/* <Thumbnail source={require('./src/img/chef.png')} style={{ height: 120, width: 120, borderRadius: 60 }} /> */}


    </View>
    <View style={{ justifyContent: 'center', alignItems: 'center', fontSize: 20, fontWeight: 'bold' }}>
      <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 20, fontWeight: 'bold' }}>
        {auth().currentUser.displayName}


      </Text>
      {/* <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 20, fontWeight: 'bold' }}>
     
        Kerol
      </Text> */}
    </View>
    <View>
      <DrawerItems {...props} />
    </View>
  </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  },
  Notification: {
    screen: Notification
  },
  Payment: {
    screen: Payment
  },
  // Messaging:{
  //   screen: Inbox
  // },



},
  {
    contentComponent: CustomDrawerContentComponent
  });



const AppSwitchNavigator = createSwitchNavigator({
  //Login: { screen: Login},
  //Welcome: { screen: WelcomeScreen },
  SplashScreen: { screen: SplashScreen },
  //GoogleLogin: { screen: GoogleLogin },
  //NewStartScreen: { screen: NewStartScreen },
  Dashboard: { screen: AppDrawerNavigator }
});

export default AppContainer = createAppContainer(AppSwitchNavigator);