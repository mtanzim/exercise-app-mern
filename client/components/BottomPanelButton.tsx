import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

export default class BottomPanelButton extends React.Component {
  public buttonInfo: string = "button";
  public render() {
    return (
      <View style={styles.panelContainer}>
        <Text>{this.buttonInfo}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panelContainer: {
    alignItems: "center",
    width: "23%",
    height: "100%",
    marginHorizontal:"1%",
    // marginHorizontal: 10,
    opacity: 0.7,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderColor: "green",
    borderWidth: 1,
    borderStyle: "solid"
  }
});
