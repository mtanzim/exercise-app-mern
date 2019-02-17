import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { BottomPanelButton } from "./BottomPanelButton";
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import {protoStyles} from "./prototypeStyles";

interface iconProps {
  size: number,
  color?: string,
} 

export default class BottomPanel extends React.Component {
  // public panelInfo: string = "bottomPanel";
  private numButtons: number = 5;
  private btnWidth: string = `${(100/this.numButtons)-2}%`;
  private btnId:number=0;


  private iconDef: iconProps = {
    size: 40,
    color: 'red',
  };

  private buttonComponentArr: React.ReactChild[] = [
    (<BottomPanelButton btnWidth={this.btnWidth} title={`Stats`} key={this.btnId++}>
      <MaterialCommunityIcons color={this.iconDef.color} size={this.iconDef.size} name="thermostat"/>
    </BottomPanelButton>),
    (<BottomPanelButton btnWidth={this.btnWidth} title={`History`} key={this.btnId++} >
      <FontAwesome  color={this.iconDef.color}size={this.iconDef.size} name="history"/>
    </BottomPanelButton>),
    (<BottomPanelButton btnWidth={this.btnWidth} title={`Workout`} key={this.btnId++}>
      <FontAwesome   color={this.iconDef.color}size={this.iconDef.size}name="plus"/>
    </BottomPanelButton>),
    (<BottomPanelButton btnWidth={this.btnWidth} title={`Routines`} key={this.btnId++}>
      <FontAwesome   color={this.iconDef.color}size={this.iconDef.size}name="repeat"/>
    </BottomPanelButton>),
    (<BottomPanelButton btnWidth={this.btnWidth} title={`Exercises`} key={this.btnId++} >
      <MaterialCommunityIcons color={this.iconDef.color} size={this.iconDef.size} name="dumbbell"/>
    </BottomPanelButton>),
  ]

  public render() {
    return (
      <View style={[styles.panelContainer, protoStyles.border]}>
        {this.buttonComponentArr}
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
