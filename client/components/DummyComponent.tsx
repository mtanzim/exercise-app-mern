import * as React from "react";
import { Text, View } from "react-native";
import Clock from "../assets/icons/Clock";
import Data from "../assets/icons/Data";

export default class DummyComponent extends React.Component {
  public dummyString: string = "dummyString";
  public render() {
    return (
      <View>
        {/* <Text>{this.dummyString}</Text> */}
        <Data height={40} width={40}/>
      </View>
    );
  }
}
