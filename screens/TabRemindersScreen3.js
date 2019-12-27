import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Alert
} from 'react-native';
import { WebBrowser, Notifications, Permissions} from 'expo';
import { ListView } from '@shoutem/ui';

import { Tab, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem} from 'native-base';
import firebase from 'firebase';
import PushNotification from 'react-native-push-notification';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
// import Permissions from 'react-native-permissions'

// import RNCalendarReminders from 'react-native-calendar-reminders';


const window = Dimensions.get('window');

const idR = "";


  const m = null;

export default class RemindersScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  constructor(props)
  {
      super(props);

      this.state = {idR: "", eventS: {}};
      this.onDayPress = this.onDayPress.bind(this);
  }
  async componentWillMount() {

    PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );

        // process the notification

        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "YOUR GCM (OR FCM) SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
});
  }

  handlePress = () => {
    PushNotification.localNotificationSchedule({
  //... You can use all the options from localNotifications
  /* Android Only Properties */
id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
ticker: "My Notification Ticker", // (optional)
autoCancel: true, // (optional) default: true
largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
subText: "This is a subText", // (optional) default: none
color: "red", // (optional) default: system default
vibrate: true, // (optional) default: true
vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
tag: 'some_tag', // (optional) add tag to message
group: "group", // (optional) add group to message
ongoing: false, // (optional) set whether this is an "ongoing" notification

/* iOS and Android properties */
title: "My Notification Title", // (optional)
message: "My Notification Message", // (required)
playSound: false, // (optional) default: true
soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
  message: "My Notification Message", // (required)
  date: new Date(Date.now() + (60 * 1000)) // in 60 secs
});
  }


  render() {

    return (
      <Container>
        <Header>
          <Text> Reminders </Text>
        </Header>
        <Content>
          <Button onPress={this.handlePress}>
            <Text>Press Me</Text>
          </Button>

        </Content>
      </Container>
    );
  }
  //
  // <Button onPress={this.clearAll}>
  //   <Text>Clear All</Text>
  // </Button>
  // <Button onPress={this.handleDelete}>
  //   <Text>Delete latest</Text>
  // </Button>

onDayPress(day) {
  this.setState({
    selected: day.dateString
  });
}
}


const styles = StyleSheet.create({
calendar: {
  borderTopWidth: 1,
  paddingTop: 5,
  borderBottomWidth: 1,
  borderColor: '#eee',
  height: 350
},
text: {
  textAlign: 'center',
  borderColor: '#bbb',
  padding: 10,
  backgroundColor: '#eee'
},
container: {
  flex: 1,
  backgroundColor: 'gray'
}
});
