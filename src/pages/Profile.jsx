import {StyleSheet} from "react-native";
import {ThemedButton, ThemedText, ThemedView} from "../components/ThemedComponents";
import {StatusBar} from "expo-status-bar";

function Profile(props) {
    return (
        <ThemedView style={{...styles.container}}>
            <ThemedText>Open up App.js to start working on your app!</ThemedText>
            <ThemedText>{props.route.name}</ThemedText>
            <ThemedText>{props.route.params.name}</ThemedText>
            <StatusBar style="auto" />
            <ThemedButton title={"Button"} onPress={() => {
                props.navigation.goBack();
            }}/>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Profile;
