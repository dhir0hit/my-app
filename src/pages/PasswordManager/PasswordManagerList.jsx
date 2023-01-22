import {Component, useState} from "react";
import {ThemedAntDesign, ThemedText, ThemedView} from "../../components/ThemedComponents";
import {Pressable, ScrollView, StyleSheet, View, Text} from "react-native";
import {AccountElement} from "../../components/AccountElement";
import {StatusBar} from "expo-status-bar";
import Accounts from "../../service/Accounts";
import Loading from "../../components/Loading";
import {LinearGradient} from "expo-linear-gradient";
import Settings from "../../service/Settings";

export default function PasswordManagerList(props) {
  const [settings, setSettings] = useState(
      {
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
      });

  /*
  * Importing settings from local storage
  * Using local service
  * */
  Settings()
      .then((value) => {
        let result = JSON.parse(value);

        let temp = {
          username: result['username'],
          pin: result['pin'],
          fontSize: result['fontSize'],
          theme: result['theme']
        }
        setSettings(temp);
        // console.log(result['pin'])
      })
  ;


  const routeName = props.route.name.split('-');

    return (
        <View style={{flex: 1}}>
          <LinearGradient
              style={styles.container}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 1}}
              colors={[settings.theme.background, settings.theme.secondary]}
          >
          <View style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 5
          }}>
            <View style={{display: "flex", alignItems: "flex-start", overflow: "visible"}}>
              <Pressable
                  onPress={() => {
                    props.navigation.goBack()
                  }}
                  style={{backgroundColor: settings.theme.secondary, padding: 10}}
              >
                <ThemedAntDesign name={"left"} size={24} color={settings.theme.text}/>
              </Pressable>
            </View>
            <Text style={{color: settings.theme.text}}>{props.route.params.filter}</Text>
          </View>
          <View style={{flex: 1}}>
            <ScrollView>
              <AccountList
                  theme={settings.theme}
                  filter={props.route.params.filter}
                  accounts={props.route.params.accounts}
                  accountService={props.route.params.accountService}
                  route={props.route}
                  navigation={props.navigation}/>
            </ScrollView>
          </View>
          <StatusBar style={"auto"}/>
          </LinearGradient>
        </View>
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
                <Text
                    key={listElement}
                    style={{opacity:0.6, backgroundColor: "rgba(255,255,255,0.2)", color: props.theme.text,
                        paddingHorizontal: 10, paddingVertical: 5, fontSize: 20, marginVertical: 5}}>
                    {listElement}
                </Text>
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
                        theme={props.theme}
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
                    theme={props.theme}
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
