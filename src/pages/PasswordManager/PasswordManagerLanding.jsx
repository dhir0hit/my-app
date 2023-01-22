import {ThemedAntDesign, ThemedButton, ThemedText, ThemedView} from "../../components/ThemedComponents";
import {StyleSheet, View, Text} from "react-native";
import {Component, useState} from "react";
import Accounts from "../../service/Accounts";
import Settings from "../../service/Settings";
import Loading from "../../components/Loading";
import {LinearGradient} from "expo-linear-gradient";

export default class PasswordManagerLanding extends Component {
    constructor(props) {
        super(props);
        // this.pinList = []
        this.state = {
            pinList: [],
            isReady: 0,
            settings: {
                username: "",
                pin: "",
                fontSize: 10,
                theme: {
                    text: "#fffcf2",
                    background: "#252422",
                    primary: "",
                    secondary: "#403d39",
                    highlight: "#d35322",
                }
            },
        }
        this.setPin = this.setPin.bind(this)

        Settings()
            .then((value) => {
                let result = JSON.parse(value);

                this.setState(
                    {
                        settings: {
                            username: result['username'],
                            pin     : result['pin'],
                            fontSize: result['fontSize'],
                            theme   : result['theme'],
                        }
                    }
                )
            })
        ;
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
        let accountService = new Accounts();
        accountService.load_data()
            .then(() =>
                this.props.navigation.navigate(
                    'Password-Manager-Home',
                    {
                        accountService: accountService,
                        name: "Rohit"
                    })
            )


    }

    checkPin(pin) {
        return pin.join('') === this.state.settings.pin;
    }

    render() {
        const { pinList, settings } = this.state;

            return (
                <LinearGradient
                    style={{flex: 1}}
                    start={{x: 0, y: 0.5}}
                    end={{x: 1, y: 1}}
                    colors={[settings.theme.background, settings.theme.secondary]}
                >
                <View style={{...styles.container}}>
                    <View style={{flex: 2, justifyContent: "flex-end"}}>
                        <Text style={{color: settings.theme.text}}>Enter The Pin</Text>
                        <View style={{...styles.flexRow}}>
                            <Text
                                style={{...styles.titleStyle, color: settings.theme.text}}>{pinList[0] === undefined ? "_" : pinList[0]}</Text>
                            <Text
                                style={{...styles.titleStyle, color: settings.theme.text}}>{pinList[1] === undefined ? "_" : pinList[1]}</Text>
                            <Text
                                style={{...styles.titleStyle, color: settings.theme.text}}>{pinList[2] === undefined ? "_" : pinList[2]}</Text>
                            <Text
                                style={{...styles.titleStyle, color: settings.theme.text}}>{pinList[3] === undefined ? "_" : pinList[3]}</Text>
                        </View>
                        {/*<ThemedText>ERROR</ThemedText>*/}
                    </View>
                    <View style={{flex: 3, padding: 2,}}>
                        <View style={{...styles.flexRow}}>
                            <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}} onPress={() => {
                                this.setPin("1")
                            }}>
                                <Text style={{color: settings.theme.text}}>1</Text>
                            </ThemedButton>
                            <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}} onPress={() => {
                                this.setPin("2")
                            }}>
                                <Text style={{color: settings.theme.text}}>2</Text>
                            </ThemedButton>
                            <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}} onPress={() => {
                                this.setPin("3")
                            }}>
                                <Text style={{color: settings.theme.text}}>3</Text>
                            </ThemedButton>
                        </View>
                        <View style={{...styles.flexRow}}>
                            <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}} onPress={() => {
                                this.setPin("4")
                            }}>
                                <Text style={{color: settings.theme.text}}>4</Text>
                            </ThemedButton>
                            <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}} onPress={() => {
                                this.setPin("5")
                            }}>
                                <Text style={{color: settings.theme.text}}>5</Text>
                            </ThemedButton>
                            <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}} onPress={() => {
                                this.setPin("6")
                            }}>
                                <Text style={{color: settings.theme.text}}>6</Text>
                            </ThemedButton>
                        </View>
                        <View style={{...styles.flexRow}}>
                            <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}} onPress={() => {
                                this.setPin("7")
                            }}>
                                <Text style={{color: settings.theme.text}}>7</Text>
                            </ThemedButton>
                            <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}} onPress={() => {
                                this.setPin("8")
                            }}>
                                <Text style={{color: settings.theme.text}}>8</Text>
                            </ThemedButton>
                            <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}} onPress={() => {
                                this.setPin("9")
                            }}>
                                <Text style={{color: settings.theme.text}}>9</Text>
                            </ThemedButton>
                        </View>
                        <View style={{...styles.flexRow}}>
                            <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}} onPress={() => {
                                this.setPin("x")
                            }}>
                                <Text style={{color: settings.theme.text}}>
                                    <ThemedAntDesign name={'close'}/>
                                </Text >
                            </ThemedButton>
                            <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}} onPress={() => {
                                this.setPin("0")
                            }}>
                                <Text style={{color: settings.theme.text}}>0</Text>
                            </ThemedButton>
                            <ThemedButton theme={"transparent"} style={{padding: 25, margin: 10}} onPress={() => {
                                this.setPin("/")
                            }}>
                                <Text style={{color: settings.theme.text}}>
                                    <ThemedAntDesign name={'check'}/>
                                </Text>
                            </ThemedButton>
                        </View>
                    </View>
                </View>
                </LinearGradient>
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
