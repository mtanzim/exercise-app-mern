import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import {protoStyles} from "./prototypeStyles"


export interface HeaderComponent {
  title: string;
}

export default class Header extends React.Component<HeaderComponent, {}> {
  public render() {
    return (
      <View style={[styles.header, protoStyles.border]}>
        <Text>{this.props.title}</Text>
        {/* <Text>{this.props.pageTitle}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "8%",
    paddingHorizontal: "2%",
    top: 2,
    position: "absolute",
    backgroundColor: "#fff"
  }
});
