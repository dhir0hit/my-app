// Inbuilt components
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

// Importing custom components
import {ThemedAntDesign, ThemedText, ThemedView} from "../../components/ThemedComponents";
import Loading from "../../components/Loading"; // Loading components
import NavChips from "../../components/NavChips"
import MenuItem from "../../components/MenuItem";
import Accounts from "../../service/Accounts";


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
    },
    [accountService.List.length]
  )

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
          if (accountService.OverallPasswordStrength > 70) {
            return 'green';
          } else if (accountService.OverallPasswordStrength > 50) {
            return 'orange';
          } else {
            return 'red';
          }
        }
      })
    }

    if (appIsReady) {
        return (
            <ThemedView style={{...styles.mainContainer, height: 50}}>
                <View style={{backgroundColor: "rgba(255,255,255,0.18)", borderRadius: 10, overflow: "hidden"}}>
                    <View style={{height: 50, width: `${AccountsInfo.OverallStrength}%`, backgroundColor: `${AccountsInfo.StrengthProgressBarColor()}`}}></View>
                </View>
                <View style={{
                    display: "flex", flexDirection: "row", justifyContent: "space-between",
                    padding: 20, borderBottomWidth: 1, borderColor: '#fff', borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10
                }}
                >
                    <View>
                        <ThemedText style={styles.textStyle}>Overall</ThemedText>
                        <ThemedText style={styles.textStyle}>Strong</ThemedText>
                        <ThemedText style={styles.textStyle}>Normal</ThemedText>
                        <ThemedText style={styles.textStyle}>Weak</ThemedText>
                    </View>
                    <View>
                        <ThemedText style={styles.textStyle}>{AccountsInfo.OverallStrength}%</ThemedText>
                        <ThemedText style={styles.textStyle}>{AccountsInfo.StrongAccounts}</ThemedText>
                        <ThemedText style={styles.textStyle}>{AccountsInfo.NormalAccounts}</ThemedText>
                        <ThemedText style={styles.textStyle}>{AccountsInfo.WeakAccounts}</ThemedText>
                    </View>
                </View>
              <View style={{display: connectedRemotely ? 'none' : 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: 5}}>
                <ThemedAntDesign style={{color: 'orange'}} size={15} name={'warning'} />
                <ThemedText style={{color: 'orange', textTransform: 'uppercase', paddingLeft: 5}}>Unable to connect with Server</ThemedText>
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
                        <NavChips navigation={props.navigation}
                                  accountService={props.route.params.accountService}
                                  pageName={'Generate Password'}
                                  Update={() => Update()}
                        />
                        <NavChips navigation={props.navigation}
                                  accountService={props.route.params.accountService}
                                  pageName={'Add Account'}
                                  Update={() => Update()}
                        />
                    </ScrollView>
                    <View>
                        <MenuItem filter={"Total Accounts"}
                                  number={AccountsInfo.TotalAccounts}
                                  accountService={props.route.params.accountService}
                                  navigation={props.navigation}
                                  Update={() => Update()}
                        />
                        <MenuItem filter={"Favorite Accounts"}
                                  number={AccountsInfo.FavoriteAccounts}
                                  accountService={props.route.params.accountService}
                                  navigation={props.navigation}
                                  Update={() => Update()}
                        />
                        <MenuItem filter={"Recent Accounts"}
                                  number={AccountsInfo.RecentAccounts}
                                  accountService={props.route.params.accountService}
                                  navigation={props.navigation}
                                  Update={() => Update()}
                        />
                        <MenuItem filter={"Weak Accounts"}
                                  number={AccountsInfo.WeakAccounts}
                                  accountService={props.route.params.accountService}
                                  navigation={props.navigation}
                                  Update={() => Update()}
                        />
                        <MenuItem filter={"Missing Credentials"}
                                  number={AccountsInfo.MissingCredentialAccounts}
                                  accountService={props.route.params.accountService}
                                  navigation={props.navigation}
                                  Update={() => Update()}
                        />
                        <MenuItem filter={"Platform Filter"}
                                  number={AccountsInfo.PlatformFilterAccounts}
                                  accountService={props.route.params.accountService}
                                  navigation={props.navigation}
                                  Update={() => Update()}
                        />
                    </View>
                </ScrollView>
            </ThemedView>
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