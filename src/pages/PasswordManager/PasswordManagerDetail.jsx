import {
    ThemedAntDesign,
    ThemedButton,
    ThemedText,
    ThemedTextInput,
    ThemedView
} from "../../components/ThemedComponents";
import {Alert, ScrollView, StyleSheet, Text, Vibration, View} from "react-native";
import {ProgressBar} from "react-native-paper";
import {AccountDetailInfoComponent} from "../../components/AccountDetailInfoComponent";
import {Component, useEffect, useState} from "react";
import PasswordStrength from "../../utils/PasswordStrength";


/*
* TODO: have to go to home page to reload things
* */
export default class PasswordManagerDetail extends Component {
    constructor(props) {
        super(props);


        this.state = {
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

    }

    setPasswordStrength() {
        const { userPassword } = this.state;
        let _passwordStrength = new PasswordStrength(userPassword);
        this.setState({
            accountStrength:  ( _passwordStrength.StrengthPercentage / 20)
        })

        // console.log(_passwordStrength.StrengthPercentage / 20);

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
        const {isEditMode, username, userPassword, userPlatform, userWebsite, additionalInfo, isFavorite, accountStrength} = this.state;
        return (
            <ThemedView style={styles.container}>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <ThemedButton onPress={() => {
                        this.props.navigation.goBack()
                    }} style={{backgroundColor: "rgba(101,101,101,0.4)", padding: 10, marginLeft: 7}}>
                        <ThemedAntDesign name={"left"}/>
                    </ThemedButton>
                    <View style={{display: "flex", flexDirection: "row"}}>
                        <ThemedButton onPress={() => {
                            /*Edit or Not*/
                            this.setEditMode(!isEditMode)
                            this.Submit();
                        }} style={{backgroundColor: "rgba(101,101,101,0.4)", padding: 10, marginRight: 7}}>
                            <ThemedAntDesign name={isEditMode ? "close" : "edit"}/>
                        </ThemedButton>
                        <ThemedButton onPress={this.DeleteAccount} style={{
                            backgroundColor: "rgba(101,101,101,0.4)",
                            padding: 10,
                            marginRight: 7
                        }}>
                            <ThemedAntDesign name={"delete"}/>
                        </ThemedButton>
                        <ThemedButton onPress={() => {
                            this.setFavorite(!isFavorite)
                                .then(() => {
                                    this.Submit()
                                });
                        }} style={{backgroundColor: "rgba(101,101,101,0.4)", padding: 10, marginRight: 7}}>
                            <ThemedAntDesign color={isFavorite ? "#ffb400" : "#ffffff"} name={"star"}/>
                        </ThemedButton>
                    </View>
                </View>
                <ProgressBar style={{marginVertical: 7}} progress={accountStrength} color={"#49B5F2"}/>
                <ScrollView>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingBottom: 7,
                        alignItems: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: '#fff'
                    }}>
                        <ThemedAntDesign style={{marginLeft: 5}} name={userPlatform} size={100}/>
                        <View style={{marginLeft: 15}}>
                            {
                                isEditMode ?
                                    <>
                                        <ThemedText>Platform</ThemedText>
                                        <ThemedTextInput value={userPlatform} onChangeText={text => this.setUserPlatform(text)}/>
                                    </>
                                    :
                                    <ThemedText style={{fontSize: 40}}>{userPlatform}</ThemedText>

                            }
                            <ThemedText>{this.props.route.params.account.Id}</ThemedText>
                        </View>
                    </View>
                    <View style={{margin: 15}}>
                        {
                            isEditMode ?
                                <>
                                    <ThemedText>Username</ThemedText>
                                    <ThemedTextInput value={username} onChangeText={text => this.setUsername(text)}/>
                                </>
                                :
                                <AccountDetailInfoComponent head={"Username"} info={username}/>
                        }
                        {
                            isEditMode ?
                                <>
                                    <ThemedText>Password</ThemedText>
                                    <ThemedTextInput value={userPassword} onChangeText={text => this.setUserPassword(text)}/>
                                </>
                                :
                                <AccountDetailInfoComponent head={"Password"} info={userPassword}/>
                        }
                        {
                            isEditMode ?
                                <>
                                    <ThemedText>Website</ThemedText>
                                    <ThemedTextInput value={userWebsite} onChangeText={text => this.setUserWebsite(text)}/>
                                </>
                                :
                                <AccountDetailInfoComponent head={"Website"} info={userWebsite}/>
                        }
                    </View>
                    <View style={{margin: 5}}>
                        <ThemedText>Additional Info</ThemedText>
                        {
                            isEditMode ?
                                <ThemedTextInput value={additionalInfo} onChangeText={text => this.setAdditionalInfo(text)}/>
                                :
                                <ThemedText>{additionalInfo}</ThemedText>
                        }
                    </View>

                </ScrollView>
            </ThemedView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    titleStyle: {
        fontSize: 50,
    }
});
