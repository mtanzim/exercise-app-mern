import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import DummyComponent from "./components/DummyComponent";
import BottomPanel from "./components/BottomPanel";
import Header from "./components/Header";
import Layout from "./components/Layout";

import { createStackNavigator, createAppContainer } from "react-navigation";

import { protoStyles } from "./components/prototypeStyles";

class App extends React.Component {
  render() {
    return (
      <Layout>
        <DummyComponent title="dummyString" />
        <Button title="Details" onPress={() => this.props.navigation.navigate('Detail')}>

        </Button>
      </Layout>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: App,
    Detail: DetailsScreen
  },
  {
    initialRouteName: "Home"
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "7%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default createAppContainer(AppNavigator);
