import {Component} from "react";
import {ThemedAntDesign, ThemedText, ThemedView} from "../../components/ThemedComponents";
import {Pressable, ScrollView, StyleSheet, View} from "react-native";
import {AccountElement} from "../../components/AccountElement";
import {StatusBar} from "expo-status-bar";
import Accounts from "../../service/Accounts";

export default function PasswordManagerList(props) {

    const routeName = props.route.name.split('-');
    return (
        <ThemedView style={styles.container}>
            <View style={{display: "flex",
                flexDirection:"row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 5}}>
                <View style={{display: "flex", alignItems: "flex-start", overflow: "visible"}}>
                    <Pressable
                        onPress={() => {props.navigation.goBack()}}
                        style={{backgroundColor: "rgba(101,101,101,0.4)", padding: 10}}
                    >
                        <ThemedAntDesign name={"left"} size={24} color={"white"} />
                    </Pressable>
                </View>
                <ThemedText>{props.route.params.filter}</ThemedText>
            </View>
            <View style={{flex: 1}}>
                <ScrollView >
                    <AccountList
                        filter={props.route.params.filter}
                        accounts={props.route.params.accounts}
                        accountService={props.route.params.accountService}
                        route={props.route}
                        navigation={props.navigation}/>
                </ScrollView>
            </View>
            <StatusBar style={"auto"} />
        </ThemedView>
    )
}

function AccountList(props) {
    let _List = [];
    // console.log("platform", props.filter);
    let accounts = []

    if(props.filter === "Total Accounts") {
        accounts = props.accountService.List;
    } else if (props.filter === "Favorite Accounts") {
        accounts = props.accountService.favoriteList;
    } else if (props.filter === "Recent Accounts") {
        accounts = props.accountService.recentList;
    } else if (props.filter === "Weak Accounts") {
        accounts = props.accountService.weakList;
    } else if (props.filter === "Missing Credentials") {
        accounts = props.accountService.missingCredentialsList;
    }else if (props.filter === "Platform Filter") {
        accounts = props.accountService.platformList
    }

    if (props.filter === "Platform Filter") {
        // console.log("list", Object.keys(props.accounts))
        for (const listElement of Object.keys(accounts)) {
            // console.log("platform", Object.keys(props.accounts))
            // console.log("pl", props.accounts)
            // "Goolo";

            _List.push(
                <ThemedText
                    key={listElement}
                    style={{opacity:0.6, backgroundColor: "rgba(255,255,255,0.2)",
                        paddingHorizontal: 10, paddingVertical: 5, fontSize: 20, marginVertical: 5}}>
                    {listElement}
                </ThemedText>
            )
            for (let i = 0; i < accounts[listElement].length; i++) {
                _List.push(
                    <AccountElement
                        key={i}
                        Details={() => {
                            props.navigation.navigate(
                                'Password-Manager-Detail',
                                {
                                    id: accounts[listElement][i].Id,
                                    account: accounts[listElement][i],
                                    accountService: props.route.params.accountService
                                })
                        }}
                        Platform={accounts[listElement][i].Platform}
                        UserName={accounts[listElement][i].Username}
                        favorite={accounts[listElement][i].Favorite}
                    />
                )
            }
        }
    } else {
        for (let i = 0; i < accounts.length; i++) {
            _List.push(
                <AccountElement
                    key={i}
                    Details={() => {
                        props.navigation.navigate(
                            'Password-Manager-Detail',
                            {
                                id: accounts[i].Id,
                                account: accounts[i],
                                accountService: props.route.params.accountService,
                                update: props.route.params.update
                            })
                    }}
                    Platform={accounts[i].Platform}
                    UserName={accounts[i].Username}
                    favorite={accounts[i].Favorite}
                />
            )
        }
    }
    return _List;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        paddingTop: 50,
    }
});
