import React from "react";
import { Text, View } from "react-native";

export default class TSXComponent extends React.Component {
  public myNumber: number = 1100;
  public render() {
    return (
      <View>
        <Text>{this.myNumber}</Text>
      </View>
    );
  }
}
