import {ThemedText, ThemedView} from "../../components/ThemedComponents";
import {View} from "react-native";

export default class PasswordManagerAddAccount {
    constructor(props) {
    }

    render() {
        return (
            <ThemedView>
                <View>
                    <ThemedText>Enter The Pin</ThemedText>
                    <View>
                        <ThemedText>_</ThemedText>
                        <ThemedText>_</ThemedText>
                        <ThemedText>_</ThemedText>
                        <ThemedText>_</ThemedText>
                    </View>
                    <ThemedText>ERROR</ThemedText>
                </View>
                <View>
                    <ThemedText>Pin</ThemedText>
                </View>
            </ThemedView>
        )
    }
}