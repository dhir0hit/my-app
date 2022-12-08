import React, {Component} from "react";
import {ThemedText, ThemedView} from "../components/ThemedComponents";

export default class Settings extends Component{
   constructor(props) {
       super(props)
   }

   render() {
       return (
           <ThemedView
               style={{flex:1, alignItems: "center", justifyContent: "center"}}
           >
               <ThemedText>Settings</ThemedText>
           </ThemedView>
       )
   }
}