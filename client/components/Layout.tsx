import * as  React from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "./Header";
import BottomPanel from "./BottomPanel";

import {protoStyles} from "./prototypeStyles"

interface ILayout {
  children:Element;
}

export default class Layout extends React.Component<ILayout,{}> {
  public render() {
    return (
      <View style={[styles.container, protoStyles.border]}>
        <Header title="exercise-app2"/>
        {this.props.children}
        <BottomPanel/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '6%',
    paddingHorizontal: 4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
});