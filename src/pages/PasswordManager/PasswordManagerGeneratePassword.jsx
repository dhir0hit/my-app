import {Component} from "react";
import {ThemedText, ThemedView} from "../../components/ThemedComponents";
import {StyleSheet} from "react-native";


export default class PasswordManagerGeneratePassword extends Component{
    constructor(props) {
        super(props);
        this.generator = new GenerateString();
    }

    render() {
        return(
            <ThemedView style={styles.mainContainer}>
                <ThemedText>{this.generator.Password}</ThemedText>
            </ThemedView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }
})
