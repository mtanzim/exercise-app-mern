import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { protoStyles } from "./prototypeStyles";
import { ReactElement } from "react";

export interface BottomPanelButtonProp {
  title: string;
  btnWidth: string;
  children: ReactElement<any,any>,
}

export class BottomPanelButton extends React.Component<
  BottomPanelButtonProp,
  {}
> {
  public render() {
    return (
      <View
        style={[
          styles.panelContainer,
          protoStyles.borderB,
          protoStyles.protoBG,
          { width: this.props.btnWidth }
        ]}
      >
        {this.props.children}
        <Text>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panelContainer: {
    alignItems: "center",
    // width: "20%",
    height: "100%",
    marginHorizontal: "1%",
    // marginHorizontal: 10,
    opacity: 0.7,
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});
