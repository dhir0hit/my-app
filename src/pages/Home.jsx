import {ThemedButton, ThemedText, ThemedView} from "../components/ThemedComponents";
import {StatusBar} from "expo-status-bar";
import {StyleSheet} from "react-native";
import {Component} from "react";

class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ThemedView style={styles.container}>
                <ThemedText>Open up App.js to start working on your app!</ThemedText>
                <ThemedText>{this.props.route.name}</ThemedText>
                <StatusBar style="auto"/>
                <ThemedButton
                    style={{padding: 6}}
                    onPress={() => {
                        this.props.navigation.navigate('Profile', {name: 'Rohit'})
                    }}
                >
                    <ThemedText theme={'highlight'}>
                        Profile
                    </ThemedText>
                </ThemedButton>
                <ThemedButton
                    style={{...styles.titleStyle, padding: 6, margin: 5}}
                    onPress={() => {
                        this.props.navigation.navigate('Password-Manager')
                    }}
                >
                    <ThemedText theme={'highlight'}>
                        Password Manager
                    </ThemedText>
                </ThemedButton>

                <ThemedButton
                    style={{...styles.titleStyle, padding:6, margin:5}}
                    onPress={() => {this.props.navigation.navigate('Settings')}}
                >
                    <ThemedText theme={'highlight'}>
                        Settings
                    </ThemedText>
                </ThemedButton>
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
        fontSize: 50,
    }
});
