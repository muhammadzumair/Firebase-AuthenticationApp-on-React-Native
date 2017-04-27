import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Header,Button,CardSection, Spinner, Card}from './src/components/common';
import firebase from 'firebase';
import LoginForm from './src/components/LoginForm'

export default class App extends React.Component {
  state={
    loggedIn: null
  }

  componentWillMount(){
      firebase.initializeApp({
      apiKey: "AIzaSyBd2zFNsL5mfiyRpW-OaI8Au-t-ol1KyZ8",
      authDomain: "todoapp-26a18.firebaseapp.com",
      databaseURL: "https://todoapp-26a18.firebaseio.com",
      projectId: "todoapp-26a18",
      storageBucket: "todoapp-26a18.appspot.com",
      messagingSenderId: "304633718016"
    });

    firebase.auth().onAuthStateChanged((user)=>{
      if (user){
        this.setState({loggedIn: true});

      }
      else{
        this.setState({loggedIn: false})
      }
    })

  }

  renderContent(){
    switch (this.state.loggedIn){
      case true : 
        return <Card><CardSection><Button onPress={()=>{firebase.auth().signOut()}}>LogOut</Button></CardSection></Card>;
      case false :
        return <LoginForm/>;
      default :
        return <Spinner size="large" />
    }
  }
  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        
        {this.renderContent()}
      </View>
    );
  }
}

