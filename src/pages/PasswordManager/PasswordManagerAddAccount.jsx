import {
    ThemedAntDesign,
    ThemedButton,
    ThemedText,
    ThemedTextInput,
    ThemedView
}
    from "../../components/ThemedComponents";
import {ScrollView, View, StyleSheet, Text} from "react-native";
import Account from "../../model/Account";
import Accounts from "../../service/Accounts";
import {Component} from "react";

export default class PasswordManagerAddAccount extends Component{
    constructor(props) {
        super(props)

        this.state = {
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

            this.setUsernameError("");
            this.setPasswordError("");
            this.setPlatformError("");

            this.props.navigation.goBack()
            /*
            *
            * Updating Home after making account
            *
            * */
            this.props.route.params.Update()
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
        const {Username,
            Password,
            Platform,
            Website,
            AdditionalInfo,
            Favorite,
            UsernameError,
            PasswordError,
            PlatformError} = this.state;

        return (
            <ThemedView style={{flex:1, paddingTop: 50}}>
                <View style={{padding: 5, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <ThemedButton
                        onPress={()=>{this.props.navigation.goBack()}}
                        style={{backgroundColor: 'rgba(101,101,101,0.4)', padding: 10}}>
                        <ThemedAntDesign name={"left"} />
                    </ThemedButton>
                    <ThemedText>Create New Account</ThemedText>
                    <ThemedButton theme={"transparent"}>
                        <ThemedAntDesign name={"scan1"} />
                    </ThemedButton>
                </View>

                <ScrollView>
                    <View style={{marginHorizontal: 10}}>
                        <View style={{...styles.label}}>
                            <Text style={{...styles.labelFont, color: "#b60e0e"}}>{UsernameError}</Text>
                            <ThemedText style={{...styles.labelFont}}>Username</ThemedText>
                        </View>
                        <ThemedTextInput
                            onChangeText={(_username) => {this.setUsername(_username)}}
                            placeholder={"username"}
                            autoComplete={"username"}
                        />

                        <View style={{...styles.label}}>
                            <Text style={{...styles.labelFont, color: "#b60e0e"}}>{PasswordError}</Text>
                            <ThemedText style={{...styles.labelFont}}>Password</ThemedText>
                        </View>
                        <ThemedTextInput
                            onChangeText={(_password) => {this.setPassword(_password)}}
                            placeholder={"password"}
                            autoComplete={"password"}
                            secureTextEntry={true}
                            keyboardType={"default"}
                        />

                        <View style={{...styles.label}}>
                            <Text style={{...styles.labelFont, color: "#b60e0e"}}>{PlatformError}</Text>
                            <ThemedText style={{...styles.labelFont}}>Platform</ThemedText>
                        </View>
                        <ThemedTextInput
                            onChangeText={(_platform) => {this.setPlatform(_platform)}}
                            placeholder={"ex. google, instagram"}
                        />

                        <View style={{...styles.label}}>
                            <ThemedText style={{...styles.labelFont}}>Website</ThemedText>
                        </View>
                        <ThemedTextInput
                            onChangeText={(_website) => {this.setWebsite(_website)}}
                            placeholder={"www.example.website.com"}
                            keyboardType={"url"}
                        />

                        <View style={{...styles.label}}>
                            <ThemedText style={{...styles.labelFont}}>Additional Info</ThemedText>
                        </View>
                        <ThemedTextInput
                            onChangeText={(_additional_info) => {this.setAdditionalInfo(_additional_info)}}
                            placeholder={"info"}
                        />


                        <ThemedButton style={{...styles.label, display: "flex", flexDirection: "row", alignItems: "center"}}
                                      theme={"transparent"}
                                      onPress={() => {this.setFavorite(!Favorite)}}
                        >
                            <ThemedAntDesign style={{marginHorizontal: 5}} name={Favorite ? "star" : "staro"} />
                            <ThemedText style={{...styles.labelFont}}>Favorite</ThemedText>
                        </ThemedButton>



                    </View>
                </ScrollView>
                <View style={{ marginBottom: 40, display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                    <ThemedButton onPress={()=>{this.props.navigation.goBack()}} style={styles.buttons}>
                        <ThemedText style={styles.buttons_font_style} theme={"reverse"}>Cancel</ThemedText>
                    </ThemedButton>

                    <ThemedButton onPress={this.Submit} style={styles.buttons}>
                        <ThemedText style={styles.buttons_font_style} theme={"reverse"}>Create</ThemedText>
                    </ThemedButton>
                </View>
            </ThemedView>
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
        paddingVertical: 10,
        width: 120,
        display: "flex",
        alignItems: "center"

    },
    buttons_font_style: {
        fontWeight: "600"
    },
    labelFont: {
        fontSize: 20
    }
})