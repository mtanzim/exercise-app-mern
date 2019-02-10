import * as React from "react";
// import SvgUri from 'react-native-svg-uri';
import { Text, View, StyleSheet } from "react-native";



import {BottomPanelButton} from "./BottomPanelButton";

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
        {/* <Text>{this.panelInfo}</Text> */}
        {this.buttonIds.map(id => (
          <BottomPanelButton svgLink={"assets/icons/clock.svg"} key={id} />
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
    flexDirection: 'row',
    justifyContent: "center",
    borderColor: "red",
    borderWidth: 1,
    borderStyle: "solid"
  }
});
