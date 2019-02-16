import * as React from "react";
import { Text, View } from "react-native";

export interface IDummy {
  title: string;
}

export default class DummyComponent extends React.Component<IDummy,{}> {
  public render() {
    return (
      <View>
        <Text>{this.props.title}</Text>
      </View>
    );
  }
}
