// Inbuilt components
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View, Text } from "react-native";

// Importing custom components
import {ThemedAntDesign, ThemedText, ThemedView} from "../../components/ThemedComponents";
import Loading from "../../components/Loading"; // Loading components
import NavChips from "../../components/NavChips"
import MenuItem from "../../components/MenuItem";
import Accounts from "../../service/Accounts";
import Settings from "../../service/Settings";
import {LinearGradient} from "expo-linear-gradient";

//TODO: replace accountService with props.route.param.accountService
const PasswordManagerHome = (props) => {
  /*
  * State variable containing account numbers and strength
  * */
  const [AccountsInfo, setAccountsInfo] = useState({
    TotalAccounts: 0,
    FavoriteAccounts: 0,
    RecentAccounts: 0,
    WeakAccounts: 0,
    MissingCredentialAccounts: 0,
    PlatformFilterAccounts: 0,

    OverallStrength: 0,
    StrongAccounts: 0,
    NormalAccounts: 0,
    StrengthProgressBarColor: ''
  })
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
      }
  );

  Settings()
      .then((value) => {
        let result = JSON.parse(value);

        settings['username'] = result['username'];
        settings['pin'] = result['pin'];
        settings['fontSize'] = result['fontSize'];
        settings['theme'] = result['theme'];

        setSettings(settings);
        // console.log(result['pin'])
        // setReady(1);
      })
  ;

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const [appIsReady, setAppIsReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [connectedRemotely, setConnectedRemotely] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Update();
    wait(2000).then(() => setRefreshing(false));
  }, [])


  const accountService = new Accounts();

  useEffect(() => {
    Update();
    }, [accountService.List.length])

    const Update = () => {
      console.log()
      console.log('[+] Update ...........................')
      accountService.List = [];
      setConnectedRemotely(false);

      accountService.load_data()
            .then(() => {
              /*
              * Setting data to state
              * */
              setData();

              /**
               * Getting remote data from server
               *
               * @process: Checking connection to remote server
               * if server is not connected showing
               * Toast message on screen
               * */
              // TODO: CREATE REMOTE CONNECTION HERE

              accountService.load_remote_data()
                  .then(() => {
                    // result will be return if connection successful or not
                    if (accountService.RemoteConnection) {
                      /*
                      * Setting data to state
                      * */
                      setConnectedRemotely(true);
                      console.log("[+] [Home][Update][81]Connected To Server")
                      setData();
                    }
                  });

              setAppIsReady(()=>true);
            });
    }

    /**
     * Setting data to state
     * */
    const setData = () => {
      setAccountsInfo({
        TotalAccounts: accountService.List.length,
        FavoriteAccounts: accountService.favoriteList.length,
        RecentAccounts: accountService.recentList.length,
        WeakAccounts: accountService.weakList.length,
        MissingCredentialAccounts: accountService.missingCredentialsList.length,
        PlatformFilterAccounts: accountService.platformList.length,

        OverallStrength: isNaN(accountService.OverallPasswordStrength)
            ? 0
            : accountService.OverallPasswordStrength.toFixed(2),
        StrongAccounts: accountService.StrongPasswords,
        NormalAccounts: accountService.NormalPasswords,

        StrengthProgressBarColor: () => {
          if (accountService.OverallPasswordStrength < 17) {
            return 'red';
          } else if (accountService.OverallPasswordStrength > 20) {
            return 'orange';
          } else {
            return 'green';
          }
        }
      })
    }

    if (appIsReady) {
        return (
            <View style={{...styles.mainContainer, height: 50, backgroundColor: settings.theme.background}}>
              <LinearGradient
                  style={{flex: 1}}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 1}}
                  colors={[settings.theme.background, settings.theme.secondary]}
              >
                <View style={{backgroundColor: "rgba(255,255,255,0.18)", borderRadius: 10, overflow: "hidden"}}>
                    <View style={{height: 50, width: `${AccountsInfo.OverallStrength / 20 * 100}%`, backgroundColor: `${AccountsInfo.StrengthProgressBarColor()}`}}></View>
                </View>
                <View style={{
                    display: "flex", flexDirection: "row", justifyContent: "space-between",
                    padding: 20, borderBottomWidth: 1, borderColor: settings.theme.text, borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10
                }}
                >
                    <View>
                        <Text style={{...styles.textStyle, color: settings.theme.text}}>Overall</Text>
                        <Text style={{...styles.textStyle, color: settings.theme.text}}>Strong</Text>
                        <Text style={{...styles.textStyle, color: settings.theme.text}}>Normal</Text>
                        <Text style={{...styles.textStyle, color: settings.theme.text}}>Weak</Text>
                    </View>
                    <View>
                        <Text style={{...styles.textStyle, color: settings.theme.text}}>{AccountsInfo.OverallStrength}%</Text>
                        <Text style={{...styles.textStyle, color: settings.theme.text}}>{AccountsInfo.StrongAccounts}</Text>
                        <Text style={{...styles.textStyle, color: settings.theme.text}}>{AccountsInfo.NormalAccounts}</Text>
                        <Text style={{...styles.textStyle, color: settings.theme.text}}>{AccountsInfo.WeakAccounts}</Text>
                    </View>
                </View>
              <View style={{display: connectedRemotely ? 'none' : 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: 5}}>
                <ThemedAntDesign style={{color: 'orange'}} size={15} name={'warning'} />
                <Text style={{color: 'orange', textTransform: 'uppercase', paddingLeft: 5}}>Unable to connect with Server</Text>
              </View>
                <ScrollView
                  refreshControl={
                  <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      />
                  }
                >
                    <ScrollView style={{padding: 5}} horizontal={true}>
                        <NavChips theme={settings.theme}
                                  navigation={props.navigation}
                                  accountService={props.route.params.accountService}
                                  pageName={'Generate Password'}
                                  Update={() => Update()}
                        />
                        <NavChips theme={settings.theme}
                                  navigation={props.navigation}
                                  accountService={props.route.params.accountService}
                                  pageName={'Add Account'}
                                  Update={() => Update()}
                        />
                    </ScrollView>
                    <View>
                        <MenuItem filter={"Total Accounts"}
                                  theme={settings.theme}
                                  number={AccountsInfo.TotalAccounts}
                                  accountService={props.route.params.accountService}
                                  navigation={props.navigation}
                                  Update={() => Update()}
                        />
                        <MenuItem filter={"Favorite Accounts"}
                                  theme={settings.theme}
                                  number={AccountsInfo.FavoriteAccounts}
                                  accountService={props.route.params.accountService}
                                  navigation={props.navigation}
                                  Update={() => Update()}
                        />
                        <MenuItem filter={"Recent Accounts"}
                                  theme={settings.theme}
                                  number={AccountsInfo.RecentAccounts}
                                  accountService={props.route.params.accountService}
                                  navigation={props.navigation}
                                  Update={() => Update()}
                        />
                        <MenuItem filter={"Weak Accounts"}
                                  theme={settings.theme}
                                  number={AccountsInfo.WeakAccounts}
                                  accountService={props.route.params.accountService}
                                  navigation={props.navigation}
                                  Update={() => Update()}
                        />
                        <MenuItem filter={"Missing Credentials"}
                                  theme={settings.theme}
                                  number={AccountsInfo.MissingCredentialAccounts}
                                  accountService={props.route.params.accountService}
                                  navigation={props.navigation}
                                  Update={() => Update()}
                        />
                        <MenuItem filter={"Platform Filter"}
                                  theme={settings.theme}
                                  number={AccountsInfo.PlatformFilterAccounts}
                                  accountService={props.route.params.accountService}
                                  navigation={props.navigation}
                                  Update={() => Update()}
                        />
                    </View>
                </ScrollView>
              </LinearGradient>
            </View>
        )
    }
    else {
      /**
       * If app is not ready show loading
       * */
        return <Loading />;
    }
}
export default PasswordManagerHome;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    textStyle: {
        fontSize: 18,
        paddingVertical: 2,
    },
    navChips: {
        margin: 5,
        width: 250,
        height: 100,
        backgroundColor: "#818181",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    }
})