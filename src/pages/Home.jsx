import {ThemedButton, ThemedText, ThemedView} from "../components/ThemedComponents";
import {StatusBar} from "expo-status-bar";
import {StyleSheet} from "react-native";
import {AccountDao} from "../dao/AccountDao";

function Home(props) {

    let account= new AccountDao();
    return (
        <ThemedView style={styles.container}>
            <ThemedText>Open up App.js to start working on your app!</ThemedText>
            <ThemedText>{props.route.name}</ThemedText>
            <StatusBar style="auto" />
            <ThemedButton
                style={{padding: 6}}
                onPress={() => {props.navigation.navigate('Profile', {name: 'Rohit'})}}
            >
                <ThemedText theme={'highlight'}>
                    Profile
                </ThemedText>
            </ThemedButton>
            <ThemedButton
                style={{...styles.titleStyle, padding: 6, margin: 5}}
                onPress={() => {props.navigation.navigate('Password-Manager')}}
            >
                <ThemedText theme={'highlight'}>
                    Password Manager
                </ThemedText>
            </ThemedButton>
        </ThemedView>
    )
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
