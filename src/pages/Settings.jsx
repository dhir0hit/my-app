import React from "react";
import {ThemedText, ThemedView} from "../components/ThemedComponents";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings() {


  return (
      <ThemedView
          style={{flex: 1, alignItems: "center", justifyContent: "center"}}
      >
        <ThemedText>Settings</ThemedText>
      </ThemedView>
  )
}