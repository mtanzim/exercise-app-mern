import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { BottomPanelButton } from "./BottomPanelButton";

export default class BottomPanel extends React.Component {
  public panelInfo: string = "bottomPanel";
  private numButtons: number = 4;
  private buttonIds: number[] = Array.from(
    { length: this.numButtons },
    (_x, i) => i
  );

  public render() {
    return (
      <View style={styles.panelContainer}>
        {this.buttonIds.map(id => (
          <BottomPanelButton svgLink="test" key={id} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panelContainer: {
    alignItems: "center",
    width: "97%",
    height: "12%",
    // marginHorizontal: 10,
    bottom: 4,
    opacity: 0.7,
    position: "absolute",
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: 1,
    borderStyle: "solid"
  }
});
