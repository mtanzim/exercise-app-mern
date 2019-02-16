import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { BottomPanelButton } from "./BottomPanelButton";
import {protoStyles} from "./prototypeStyles"

export default class BottomPanel extends React.Component {
  // public panelInfo: string = "bottomPanel";
  private numButtons: number = 4;
  private buttonIds: number[] = Array.from(
    { length: this.numButtons },
    (_x, i) => i
  );

  public render() {
    return (
      <View style={[styles.panelContainer, protoStyles.border]}>
        {this.buttonIds.map(id => (
          <BottomPanelButton btnWidth={`${(100/this.numButtons)-2}%`} title={`test${id}`} key={id} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panelContainer: {
    alignItems: "center",
    width: "100%",
    height: "12%",
    // marginHorizontal: 10,
    bottom: 2,
    opacity: 0.7,
    position: "absolute",
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  }
});
