import {ThemedButton, ThemedText, ThemedView} from "../../components/ThemedComponents";
import {StyleSheet, View} from "react-native";
import {Component, useState} from "react";
import Accounts from "../../service/Accounts";

export default class PasswordManagerLanding extends Component {
    constructor(props) {
        super(props);
        // this.pinList = []
        this.state = {
            pinList: []
        }
        this.setPin = this.setPin.bind(this)
    }

    setPin(value) {
        let _temp_pin_ = this.state["pinList"];
        if (value === "x" || value === "/") {
            _temp_pin_ = []
        } else if(_temp_pin_.length >= 4) {
            _temp_pin_ = [value]
        } else {
            _temp_pin_ = _temp_pin_.concat(value)
        }

        if (this.checkPin(_temp_pin_)) {
            _temp_pin_ = []
            console.log("open")
            this.openApp();
        }

        this.setState(
            {pinList: _temp_pin_}
        )
    }

    openApp() {
        console.log("correct")
        let accountService = new Accounts()
        this.props.navigation.navigate('Password-Manager-Home', {accountService: accountService, name: "Rohit"})

    }

    checkPin(pin) {
        return pin.join('') === "1234";
    }

    render() {
        const { pinList } = this.state;
        return (
            <ThemedView style={styles.container}>
                <View style={{flex: 2, justifyContent: "flex-end"}}>
                    <ThemedText>Enter The Pin</ThemedText>
                    <View style={{...styles.flexRow}}>
                        <ThemedText style={{...styles.titleStyle}}>{pinList[0] === undefined ? "_" : pinList[0]}</ThemedText>
                        <ThemedText style={{...styles.titleStyle}}>{pinList[1] === undefined ? "_" : pinList[1]}</ThemedText>
                        <ThemedText style={{...styles.titleStyle}}>{pinList[2] === undefined ? "_" : pinList[2]}</ThemedText>
                        <ThemedText style={{...styles.titleStyle}}>{pinList[3] === undefined ? "_" : pinList[3]}</ThemedText>
                    </View>
                    <ThemedText>ERROR</ThemedText>
                </View>
                <View style={{flex: 3, padding: 2,}}>
                    <View style={{...styles.flexRow}}>
                        <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}} onPress={() => {this.setPin("1")}}>
                            <ThemedText theme={"highlight"}>1</ThemedText>
                        </ThemedButton>
                        <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}}  onPress={() => {this.setPin("2")}}>
                            <ThemedText theme={"highlight"}>2</ThemedText>
                        </ThemedButton>
                        <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}}  onPress={() => {this.setPin("3")}}>
                            <ThemedText theme={"highlight"}>3</ThemedText>
                        </ThemedButton>
                    </View>
                    <View style={{...styles.flexRow}}>
                        <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}}  onPress={() => {this.setPin("4")}}>
                            <ThemedText theme={"highlight"}>4</ThemedText>
                        </ThemedButton>
                        <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}}  onPress={() => {this.setPin("5")}}>
                            <ThemedText theme={"highlight"}>5</ThemedText>
                        </ThemedButton>
                        <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}}  onPress={() => {this.setPin("6")}}>
                            <ThemedText theme={"highlight"}>6</ThemedText>
                        </ThemedButton>
                    </View>
                    <View style={{...styles.flexRow}}>
                        <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}}  onPress={() => {this.setPin("7")}}>
                            <ThemedText theme={"highlight"}>7</ThemedText>
                        </ThemedButton>
                        <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}}  onPress={() => {this.setPin("8")}}>
                            <ThemedText theme={"highlight"}>8</ThemedText>
                        </ThemedButton>
                        <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}}  onPress={() => {this.setPin("9")}}>
                            <ThemedText theme={"highlight"}>9</ThemedText>
                        </ThemedButton>
                    </View>
                    <View style={{...styles.flexRow}}>
                        <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}}  onPress={() => {this.setPin("x")}}>
                            <ThemedText theme={"highlight"}>X</ThemedText>
                        </ThemedButton>
                        <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}}  onPress={() => {this.setPin("0")}}>
                            <ThemedText theme={"highlight"}>0</ThemedText>
                        </ThemedButton>
                        <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}}  onPress={() => {this.setPin("/")}}>
                            <ThemedText theme={"highlight"}>/</ThemedText>
                        </ThemedButton>
                    </View>
                </View>
            </ThemedView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleStyle: {
        fontSize: 30,
    },
    flexRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    flexColumn: {
        flexDirection: "column",
        justifyContent: "space-around",
    }
});
