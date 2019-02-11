import * as React from "react";
import { Text, View } from "react-native";

export default class DummyComponent extends React.Component {
  public dummyString: string = "dummyString";
  public render() {
    return (
      <View>
        <Text>{this.dummyString}</Text>
      </View>
    );
  }
}
