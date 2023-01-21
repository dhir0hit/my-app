import {
    ThemedAntDesign,
    ThemedButton,
    ThemedText,
    ThemedTextInput,
    ThemedView
}
    from "../../components/ThemedComponents";
import {ScrollView, View, StyleSheet, Text, TextInput} from "react-native";
import Account from "../../model/Account";
import Accounts from "../../service/Accounts";
import {Component} from "react";
import Settings from "../../service/Settings";

const FadeHexColor = "66";
export default class PasswordManagerAddAccount extends Component{
    constructor(props) {
        super(props)

        this.state = {
            isReady: 0,
            settings: {
                username: "",
                pin: "",
                fontSize: 10,
                theme: {
                    text: "",
                    background: "",
                    primary: "",
                    secondary: "",
                    highlight: "",
                }
            },
            Username: "",
            Password: "",
            Platform: "",
            Website: "",
            AdditionalInfo: "",
            Favorite: false,
            UsernameError: "",
            PasswordError: "",
            PlatformError: "",
        }

        this.setUsername = this.setUsername.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.setPlatform = this.setPlatform.bind(this)
        this.setWebsite = this.setWebsite.bind(this)
        this.setAdditionalInfo = this.setAdditionalInfo.bind(this)
        this.setFavorite = this.setFavorite.bind(this)

        this.setUsernameError = this.setUsernameError.bind(this)
        this.setPasswordError = this.setPasswordError.bind(this)
        this.setPlatformError = this.setPlatformError.bind(this)



        this.Submit = this.Submit.bind(this)
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
                this.setState(
                    {
                        isReady: 1
                    }
                )
                // console.log(result['pin'])
            })
        ;
    }

    setUsernameError(value) {
        this.setState(
            {UsernameError: value}
        )
    }

    setPasswordError(value) {
        this.setState(
            {PasswordError: value}
        )
    }

    setPlatformError(value) {
        this.setState(
            {PlatformError: value}
        )
    }

    setUsername(value) {
        if (value === "") {
            this.setUsernameError("Please Enter ")
        } else{
            this.setUsernameError("")
        }
        this.setState(
            {Username: value}
        )
    }

    setPassword(value) {
        if (value === "") {
            this.setPasswordError("Please Enter ")
        } else {
            this.setPasswordError("")
        }
        this.setState(
            {Password: value}
        )
    }

    setPlatform(value) {
        if (value === "") {
            this.setPlatformError("Please Enter ")
        } else {
            this.setPlatformError("")
        }
        this.setState(
            {Platform: value}
        )
    }

    setWebsite(value) {
        this.setState(
            {Website: value}
        )
    }

    setAdditionalInfo(value) {
        this.setState(
            {AdditionalInfo: value}
        )
    }

    setFavorite(value) {
        this.setState(
            {Favorite: value}
        )
    }

    Submit() {
        const {Username,
            Password,
            Platform,
            Website,
            AdditionalInfo,
            Favorite,
            UsernameError,
            PasswordError,
            PlatformError} = this.state;

        if (Username !== "" &&
            Password !== "" &&
            Platform !== "") {

            let account = new Account(Username,
                Password,
                Platform,
                Website,
                AdditionalInfo,
                Favorite);
            this.props.route.params.accountService.CreateAccount(account)
                .then(() => {
                    this.setUsernameError("");
                    this.setPasswordError("");
                    this.setPlatformError("");

                    this.props.navigation.goBack()
                    /*
                    *
                    * Updating Home after making account
                    *
                    * */
                    this.props.route.params.Update();
                })
        }
        if (Username === "") {
            this.setUsernameError("Please Enter ");
        }
        if (Password === "") {
            this.setPasswordError("Please Enter ");
        }
        if (Platform === "") {
            this.setPlatformError("Please Enter ");
        }
    }

    render() {
        const {isReady,
            settings,
            Username,
            Password,
            Platform,
            Website,
            AdditionalInfo,
            Favorite,
            UsernameError,
            PasswordError,
            PlatformError} = this.state;

        return (
            <View style={{flex:1, paddingTop: 50, backgroundColor: settings.theme.background}}>
                <View style={{padding: 5, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <ThemedButton
                        onPress={()=>{this.props.navigation.goBack()}}
                        style={{backgroundColor: settings.theme.secondary+FadeHexColor, padding: 10}}>
                        <ThemedAntDesign name={"left"} />
                    </ThemedButton>
                    <Text style={{color: settings.theme.text}}>Create New Account</Text>
                    <ThemedButton theme={"transparent"}>
                        <ThemedAntDesign color={settings.theme.text} name={"scan1"} />
                    </ThemedButton>
                </View>

                <ScrollView>
                    <View style={{marginHorizontal: 10}}>
                        <View style={{...styles.label}}>
                            <Text style={{...styles.labelFont, color: "#720000"}}>{UsernameError}</Text>
                            <Text style={{...styles.labelFont, color: settings.theme.text}}>Username</Text>
                        </View>
                        <TextInput
                            style={{...styles.input, borderBottomColor: settings.theme.text, color: settings.theme.text}}
                            onChangeText={(_username) => {this.setUsername(_username)}}
                            placeholder={"Username"}
                            autoComplete={"username"}
                        />

                        <View style={{...styles.label}}>
                            <Text style={{...styles.labelFont, color: "#720000"}}>{PasswordError}</Text>
                            <Text style={{...styles.labelFont, color: settings.theme.text}}>Password</Text>
                        </View>
                        <TextInput
                            style={{...styles.input, borderBottomColor: settings.theme.text, color: settings.theme.text}}
                            onChangeText={(_password) => {this.setPassword(_password)}}
                            placeholder={"password"}
                            autoComplete={"password"}
                            secureTextEntry={true}
                            keyboardType={"default"}
                        />

                        <View style={{...styles.label}}>
                            <Text style={{...styles.labelFont, color: "#720000"}}>{PlatformError}</Text>
                            <Text style={{...styles.labelFont, color: settings.theme.text}}>Platform</Text>
                        </View>
                        <TextInput
                            style={{...styles.input, borderBottomColor: settings.theme.text, color: settings.theme.text}}
                            onChangeText={(_platform) => {this.setPlatform(_platform)}}
                            placeholder={"ex. google, instagram"}
                        />

                        <View style={{...styles.label}}>
                            <Text style={{...styles.labelFont, color: settings.theme.text}}>Website</Text>
                        </View>
                        <TextInput
                            style={{...styles.input, borderBottomColor: settings.theme.text, color: settings.theme.text}}
                            onChangeText={(_website) => {this.setWebsite(_website)}}
                            placeholder={"www.example.website.com"}
                            keyboardType={"url"}
                        />

                        <View style={{...styles.label}}>
                            <Text style={{...styles.labelFont, color: settings.theme.text}}>Additional Info</Text>
                        </View>
                        <TextInput
                            style={{...styles.input, borderBottomColor: settings.theme.text, color: settings.theme.text}}
                            onChangeText={(_additional_info) => {this.setAdditionalInfo(_additional_info)}}
                            placeholder={"info"}
                        />


                        <ThemedButton style={{...styles.label, display: "flex", flexDirection: "row", alignItems: "center"}}
                                      theme={"transparent"}
                                      onPress={() => {this.setFavorite(!Favorite)}}
                        >
                            <ThemedAntDesign style={{marginHorizontal: 5}} name={Favorite ? "star" : "staro"} />
                            <Text style={{...styles.labelFont, color: settings.theme.text}}>Favorite</Text>
                        </ThemedButton>



                    </View>
                </ScrollView>
                <View style={{ marginBottom: 40, display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                    <ThemedButton onPress={()=>{this.props.navigation.goBack()}} style={{...styles.buttons, backgroundColor: settings.theme.highlight+FadeHexColor}}>
                        <Text style={{...styles.buttons_font_style, color: settings.theme.text}} theme={"reverse"}>Cancel</Text>
                    </ThemedButton>

                    <ThemedButton onPress={this.Submit} style={{...styles.buttons, backgroundColor: settings.theme.highlight+FadeHexColor}}>
                        <Text style={{...styles.buttons_font_style, color: settings.theme.text}} theme={"reverse"}>Create</Text>
                    </ThemedButton>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    label: {
        display: "flex",
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 5,
    },
    buttons: {
        paddingVertical: 15,
        width: 140,
        display: "flex",
        alignItems: "center",
        borderRadius: 4,

    },
    buttons_font_style: {
        fontWeight: "600"
    },
    labelFont: {
        fontSize: 20
    }, input: {
        borderStyle: "solid",
        borderBottomWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 10
    }
})