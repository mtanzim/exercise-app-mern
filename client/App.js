import React from "react";
import { StyleSheet, Text, View } from "react-native";

import DummyComponent from "./components/DummyComponent";
import BottomPanel from "./components/BottomPanel";
import Header from "./components/Header";
import Layout from "./components/Layout"

import {protoStyles} from "./components/prototypeStyles"

export default class App extends React.Component {
  render() {
    return (
        <Layout>
          <DummyComponent title="dummyString"/>
        </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '7%',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
});
