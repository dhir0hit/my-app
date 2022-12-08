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
            accountStrength: _passwordStrength.StrengthPercentage / 20
        })

        console.log(this.state.accountStrength);

    }

    // componentDidMount() {
    //     // call all the state methods
    //     this.setUsername({username: this.props.route.params.account.Username})
    //     this.setUserPassword({userPassword: this.props.route.params.account.Password})
    //     this.setUserPlatform({userPlatform: this.props.route.params.account.Platform})
    //     this.setUserWebsite({userWebsite: this.props.route.params.account.Website})
    //     this.setAdditionalInfo({additionalInfo: this.props.route.params.account.AdditionalInfo})
    //     this.setFavorite({isFavorite: this.props.route.params.account.Favorite})
    //
    // }

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
    setFavorite(value) {
        this.setState({isFavorite: value})
        console.log(value)
    }



    DeleteAccount() {
        Alert.alert(
            "Alert Title",
            "Alert Message",
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: 'cancel'
                },
                {
                    text: "OK",
                    onPress: () => {
                        // TODO: delete account
                        this.props.navigation.goBack();
                        let accDao = new AccountDao();
                        accDao.deleteOne(account.UserName);
                        console.log(account.UserName)
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
        const {username, userPassword, userPlatform, userWebsite, additionalInfo, isFavorite} = this.state;
        /*
        * If Account is changed update the account
        * */
        if (
            username !== account.Username ||
            userPassword !== account.Password ||
            userPlatform !== account.Platform ||
            userWebsite !== account.Website ||
            additionalInfo !== account.AdditionalInfo
        ) {
            console.log("[+] Account Changed");

            account.Username = username;
            account.Password = userPassword;
            account.Platform = userPlatform;
            account.Website = userWebsite;
            account.AdditionalInfo = additionalInfo;
            account.Favorite = isFavorite;

            // TODO: update project

            this.props.route.params.accountService.UpdateAccount(account);
        }
    }

    render() {
        const {isEditMode, username, userPassword, userPlatform, userWebsite, additionalInfo, isFavorite} = this.state;
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
                        }} style={{backgroundColor: "rgba(101,101,101,0.4)", padding: 10, marginRight: 7}}>
                            <ThemedAntDesign color={isFavorite ? "#ffb400" : "#ffffff"} name={"star"}/>
                        </ThemedButton>
                    </View>
                </View>
                <ProgressBar style={{marginVertical: 7}} progress={0.5} color={"#49B5F2"}/>
                <ScrollView>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingBottom: 7,
                        alignItems: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: '#fff'
                    }}>
                        <ThemedAntDesign style={{marginLeft: 5}} name={"google"} size={100}/>
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
                                    <ThemedTextInput value={username} onChangeText={text => setUsername(text)}/>
                                </>
                                :
                                <AccountDetailInfoComponent head={"Username"} info={username}/>
                        }
                        {
                            isEditMode ?
                                <>
                                    <ThemedText>Password</ThemedText>
                                    <ThemedTextInput value={userPassword} onChangeText={text => setUserPassword(text)}/>
                                </>
                                :
                                <AccountDetailInfoComponent head={"Password"} info={userPassword}/>
                        }
                        {
                            isEditMode ?
                                <>
                                    <ThemedText>Website</ThemedText>
                                    <ThemedTextInput value={userWebsite} onChangeText={text => setUserWebsite(text)}/>
                                </>
                                :
                                <AccountDetailInfoComponent head={"Website"} info={userWebsite}/>
                        }
                    </View>
                    <View style={{margin: 5}}>
                        <ThemedText>Additional Info</ThemedText>
                        {
                            isEditMode ?
                                <ThemedTextInput value={additionalInfo} onChangeText={text => setAdditionalInfo(text)}/>
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
