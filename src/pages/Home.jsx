import {ThemedButton, ThemedText, ThemedView} from "../components/ThemedComponents";
import {StatusBar} from "expo-status-bar";
import {StyleSheet, View} from "react-native";
import {Component} from "react";

class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ThemedView style={{...styles.container, paddingTop: 40}}>
                <ThemedText style={{...styles.titleStyle}}>{this.props.route.name}</ThemedText>
                <StatusBar style="auto"/>

                <View style={{flex: 1, width: '100%', paddingVertical: 20}}>
                  <ThemedButton
                      style={{...styles.button}}
                      onPress={() => {
                          this.props.navigation.navigate('Profile', {name: 'Rohit'})
                      }}
                  >
                      <ThemedText style={{...styles.titleStyle}} theme={'highlight'}>
                          Profile
                      </ThemedText>
                  </ThemedButton>
                  <ThemedButton
                      style={{...styles.button}}
                      onPress={() => {
                          this.props.navigation.navigate('Password-Manager')
                      }}
                  >
                      <ThemedText style={{...styles.titleStyle}} theme={'highlight'}>
                          Password Manager
                      </ThemedText>
                  </ThemedButton>

                  <ThemedButton
                      style={{...styles.button}}
                      onPress={() => {this.props.navigation.navigate('Settings')}}
                  >
                      <ThemedText style={{...styles.titleStyle}} theme={'highlight'}>
                          Settings
                      </ThemedText>
                  </ThemedButton>
                </View>
            </ThemedView>
        )
    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleStyle: {
        fontSize: 20,
    },
    button: {
      padding: 6,
      width: '100%',
      margin: 5,
      paddingVertical: 20,
      paddingHorizontal: 30,
      backgroundColor: 'rgba(255,255,255,0.25)',
    }
});
