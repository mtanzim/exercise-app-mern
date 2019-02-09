import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

export default class BottomPanel extends React.Component {
  public panelInfo: string = "bottomPanel";
  public render() {
    return (
      <View style={styles.panelContainer}>
        <Text>{this.panelInfo}</Text>
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
    position: 'absolute',
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    borderColor: "red",
    borderWidth: 1,
    borderStyle: "solid"
  }
});
