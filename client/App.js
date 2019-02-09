import React from "react";
import { StyleSheet, Text, View } from "react-native";

import DummyComponent from "./components/DummyComponent";
import BottomPanel from "./components/BottomPanel";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <DummyComponent/>
        <BottomPanel/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '7%',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "orange",
    borderWidth: 2,
    borderStyle: "solid"
  }
});
