import {
    ThemedAntDesign,
    ThemedButton,
    ThemedText,
    ThemedTextInput,
    ThemedView
} from "../../components/ThemedComponents";
import {Alert, ScrollView, StyleSheet, Text, TextInput, Vibration, View} from "react-native";
import {ProgressBar} from "react-native-paper";
import {AccountDetailInfoComponent} from "../../components/AccountDetailInfoComponent";
import {Component, useEffect, useRef, useState} from "react";
import PasswordStrength from "../../utils/PasswordStrength";
import Settings from "../../service/Settings";
import Loading from "../../components/Loading";


/*
* TODO: have to go to home page to reload things
* */
const FontHexColor = "66";
export default class PasswordManagerDetail extends Component {
    constructor(props) {
        super(props);

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
            isEditMode: false,
            username: this.props.route.params.account.Username,
            userPassword: this.props.route.params.account.Password,
            userPlatform: this.props.route.params.account.Platform,
            userWebsite: this.props.route.params.account.Website,
            additionalInfo: this.props.route.params.account.AdditionalInfo,

            isFavorite: this.props.route.params.account.Favorite,
            accountStrength: 0
        }

        this.setUsername = this.setUsername.bind(this)
        this.setUserPassword = this.setUserPassword.bind(this)
        this.setUserPlatform = this.setUserPlatform.bind(this)
        this.setUserWebsite = this.setUserWebsite.bind(this)
        this.setAdditionalInfo = this.setAdditionalInfo.bind(this)
        this.setFavorite = this.setFavorite.bind(this)

        this.DeleteAccount = this.DeleteAccount.bind(this)
        this.Submit = this.Submit.bind(this)

        this.setPasswordStrength();
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

    setPasswordStrength() {
        const { userPassword } = this.state;
        let _passwordStrength = new PasswordStrength(userPassword);
        this.setState({
            accountStrength:  (_passwordStrength.StrengthPercentage / 20)
        })

        console.log(this.state.accountStrength);

    }

    setEditMode(value) {
        this.setState({isEditMode: value})
    }
    setUsername(value) {
        // this.setState({})
        this.setState({username: value})
    }
    setUserPassword(value) {
        this.setState({userPassword: value})
    }
    setUserPlatform(value) {
        this.setState({userPlatform: value})
    }
    setUserWebsite(value) {
        this.setState({userWebsite: value})
    }
    setAdditionalInfo(value) {
        this.setState({additionalInfo: value})
    }
    async setFavorite(value) {
        await this.setState({isFavorite: value})
        console.log(value)
    }



    DeleteAccount() {
        Alert.alert(
            "Alert",
            "Are you sure, you want to delete.",
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: 'cancel'
                },
                {
                    text: "OK, Delete",
                    onPress: () => {
                        // TODO: delete account
                        this.props.route.params.accountService.DeleteAccount(this.props.route.params.account.Id)
                            .then(() => {
                                this.props.route.params.update();
                                // go back to home-page
                                this.props.navigation.goBack();
                                this.props.navigation.goBack();
                            })
                    },
                    style: 'destructive'
                }
            ],
            {
                cancelable: true,
                onDismiss: () => {
                    console.log("dismissed")
                }
            }
        )
    }

    Submit() {
        const account = this.props.route.params.account
        const {username, userPassword, userPlatform, userWebsite, additionalInfo, isFavorite, accountStrength} = this.state;
        /*
        * If Account is changed update the account
        * */
        if (
            username !== account.Username ||
            userPassword !== account.Password ||
            userPlatform !== account.Platform ||
            userWebsite !== account.Website ||
            additionalInfo !== account.AdditionalInfo ||
            isFavorite !== account.Favorite
        ) {
            console.log("[+] Account Changed");

            account.Username = username;
            account.Password = userPassword;
            account.Platform = userPlatform;
            account.Website = userWebsite;
            account.AdditionalInfo = additionalInfo;
            account.Favorite = isFavorite;

            // TODO: update project
            console.log(account);

            this.props.route.params.accountService.UpdateAccount(account);
        }
    }

    render() {
        const {isReady, settings, isEditMode, username, userPassword, userPlatform, userWebsite, additionalInfo, isFavorite, accountStrength} = this.state;

        if (isReady) {
            return (
                <View style={{...styles.container, backgroundColor: settings.theme.background}}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <ThemedButton onPress={() => {
                            this.props.navigation.goBack()
                        }} style={{backgroundColor: settings.theme.secondary+FontHexColor, padding: 10, marginLeft: 7}}>
                            <ThemedAntDesign name={"left"}/>
                        </ThemedButton>
                        <View style={{display: "flex", flexDirection: "row"}}>
                            <ThemedButton onPress={() => {
                                /*Edit or Not*/
                                this.setEditMode(!isEditMode)
                                this.Submit();
                            }} style={{backgroundColor: settings.theme.secondary+FontHexColor, padding: 10, marginRight: 7}}>
                                <ThemedAntDesign color={settings.theme.text} name={isEditMode ? "close" : "edit"}/>
                            </ThemedButton>
                            <ThemedButton onPress={this.DeleteAccount} style={{
                                backgroundColor: settings.theme.secondary+FontHexColor,
                                padding: 10,
                                marginRight: 7
                            }}>
                                <ThemedAntDesign color={settings.theme.text} name={"delete"}/>
                            </ThemedButton>
                            <ThemedButton onPress={() => {
                                this.setFavorite(!isFavorite)
                                    .then(() => {
                                        this.Submit()
                                    });
                            }} style={{backgroundColor: settings.theme.secondary+FontHexColor, padding: 10, marginRight: 7}}>
                                <ThemedAntDesign color={isFavorite ? settings.theme.highlight : settings.theme.text} name={"star"}/>
                            </ThemedButton>
                        </View>
                    </View>
                    <ProgressBar style={{marginVertical: 7}} progress={0} color={settings.theme.highlight}/>
                    <ScrollView>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            paddingBottom: 7,
                            alignItems: "center",
                            borderBottomWidth: 1,
                            borderBottomColor: settings.theme.text
                        }}>
                            <ThemedAntDesign color={settings.theme.text} style={{marginLeft: 5}} name={userPlatform} size={100}/>
                            <View style={{marginLeft: 15, width: "65%"}}>
                                {
                                    isEditMode ?
                                        <>
                                            <Text style={{color: settings.theme.text}}>Platform</Text>
                                            <TextInput value={userPlatform}
                                                       style={{color: settings.theme.text, borderBottomColor: settings.theme.text, ...styles.input}}
                                                       onChangeText={text => this.setUserPlatform(text)}/>
                                        </>
                                        :
                                        <ThemedText style={{fontSize: 40, color: settings.theme.text}}>{userPlatform}</ThemedText>

                                }
                                <Text style={{color: settings.theme.text}}>{this.props.route.params.account.Id}</Text>
                            </View>
                        </View>
                        <View style={{margin: 15}}>
                            {
                                isEditMode ?
                                    <>
                                        <Text style={{color: settings.theme.text}}>Username</Text>
                                        <TextInput value={username}
                                                   style={{color: settings.theme.text, borderBottomColor: settings.theme.text, ...styles.input}}
                                                   onChangeText={text => this.setUsername(text)}/>
                                    </>
                                    :
                                    <AccountDetailInfoComponent theme={settings.theme} head={"Username"} info={username}/>
                            }
                            {
                                isEditMode ?
                                    <>
                                        <Text style={{color: settings.theme.text}}>Password</Text>
                                        <TextInput value={userPassword}
                                                   style={{color: settings.theme.text, borderBottomColor: settings.theme.text, ...styles.input}}
                                                   onChangeText={text => this.setUserPassword(text)}/>
                                    </>
                                    :
                                    <AccountDetailInfoComponent theme={settings.theme} head={"Password"} info={userPassword}/>
                            }
                            {
                                isEditMode ?
                                    <>
                                        <Text style={{color: settings.theme.text}}>Website</Text>
                                        <TextInput value={userWebsite}
                                                   style={{color: settings.theme.text, borderBottomColor: settings.theme.text, ...styles.input}}
                                                   onChangeText={text => this.setUserWebsite(text)}/>
                                    </>
                                    :
                                    <AccountDetailInfoComponent theme={settings.theme} head={"Website"} info={userWebsite}/>
                            }
                        </View>
                        <View style={{margin: 5}}>
                            <Text style={{color: settings.theme.text}}>Additional Info</Text>
                            {
                                isEditMode ?
                                    <TextInput value={additionalInfo}
                                               style={{color: settings.theme.text, borderBottomColor: settings.theme.text, ...styles.input}}
                                               onChangeText={text => this.setAdditionalInfo(text)}/>
                                    :
                                    <Text style={{color: settings.theme.text}}>{additionalInfo}</Text>
                            }
                        </View>

                    </ScrollView>
                </View>
            )
        } else {
            return <Loading />
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    titleStyle: {
        fontSize: 50,
    }, input: {
        borderStyle: "solid",
        borderBottomWidth: 1,
        padding: 5,
        marginBottom: 10
    }
});
