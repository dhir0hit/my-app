import {Component, Suspense, useEffect, useMemo, useState} from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedButton, ThemedText, ThemedView } from "../../components/ThemedComponents";
import NavChips from "../../components/NavChips"
import MenuItem from "../../components/MenuItem";
import Accounts from "../../service/Accounts";



/*
* TODO: TO many renders causing it to create multiple accounts 
* */

const PasswordManagerHome = (props) => {
//    console.log("HOME")
    const [TotalAccounts, setTotalAccounts] = useState(0)
    const [FavoriteAccounts, setFavoriteAccounts] = useState(0)
    const [RecentAccounts, setRecentAccounts] = useState(0)
    const [WeakAccounts, setWeakAccounts] = useState(0)
    const [MissingCredentialAccounts, setMissingCredentialAccounts] = useState(0)
    const [PlatformFilterAccounts, setPlatformFilterAccounts] = useState(0)

    const [OverallStrength, setOverallStrength] = useState(0)
    const [StrongAccounts, setStrongAccounts] = useState(0)
    const [NormalAccounts, setNormalAccounts] = useState(0)
    const [StrengthProgressBarColor, setStrengthProgressBarColor] = useState(0)

    const [appIsReady, setAppIsReady] = useState(false);

    const accountService = new Accounts();

    const Update = () => {
        console.log('[+] Update ...........................')

        accountService.load_data()
            .then(() => {

                console.log('[HOME][52]', accountService.List.length)
                setTotalAccounts(() => accountService.List.length);
                setFavoriteAccounts(() => accountService.favoriteList.length);
                setRecentAccounts(() => accountService.recentList.length);
                setWeakAccounts(() => accountService.weakList.length);
                setMissingCredentialAccounts(() => accountService.missingCredentialsList.length);
                setPlatformFilterAccounts(() => accountService.platformList.length);
                setOverallStrength(() =>
                    isNaN(accountService.OverallPasswordStrength)
                        ? 0
                        : accountService.OverallPasswordStrength.toFixed(2));
                setStrongAccounts(() => accountService.StrongPasswords);
                setNormalAccounts(() => accountService.NormalPasswords);

                if (OverallStrength > 70) {
                    setStrengthProgressBarColor(() =>'green')
                } else if (OverallStrength > 50) {
                    setStrengthProgressBarColor(() =>'orange')
                } else {
                    setStrengthProgressBarColor(() =>'red')
                }

                setAppIsReady(()=>true);
            });
    }
    Update();

    if (appIsReady) {
        return (
            <ThemedView style={{...styles.mainContainer, height: 50}}>
                <View style={{backgroundColor: "rgba(255,255,255,0.18)", borderRadius: 10, overflow: "hidden"}}>
                    <View style={{height: 50, width: `${OverallStrength}%`, backgroundColor: `${StrengthProgressBarColor}`}}></View>
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
                        <ThemedText style={styles.textStyle}>{OverallStrength}%</ThemedText>
                        <ThemedText style={styles.textStyle}>{StrongAccounts}</ThemedText>
                        <ThemedText style={styles.textStyle}>{NormalAccounts}</ThemedText>
                        <ThemedText style={styles.textStyle}>{WeakAccounts}</ThemedText>
                    </View>
                </View>
                <ScrollView>
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
                                  number={TotalAccounts}
                                  accountService={props.route.params.accountService}
                                  navigation={props.navigation}
                                  Update={() => Update()}
                        />
                        <MenuItem filter={"Favorite Accounts"}
                                  number={FavoriteAccounts}
                                  accountService={props.route.params.accountService}
                                  navigation={props.navigation}
                                  Update={() => Update()}
                        />
                        <MenuItem filter={"Recent Accounts"}
                                  number={RecentAccounts}
                                  accountService={props.route.params.accountService}
                                  navigation={props.navigation}
                                  Update={() => Update()}
                        />
                        <MenuItem filter={"Weak Accounts"}
                                  number={WeakAccounts}
                                  accountService={props.route.params.accountService}
                                  navigation={props.navigation}
                                  Update={() => Update()}
                        />
                        <MenuItem filter={"Missing Credentials"}
                                  number={MissingCredentialAccounts}
                                  accountService={props.route.params.accountService}
                                  navigation={props.navigation}
                                  Update={() => Update()}
                        />
                        <MenuItem filter={"Platform Filter"}
                                  number={PlatformFilterAccounts}
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
        return <ThemedView style={{...styles.mainContainer, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <ThemedText>Loading...</ThemedText>
        </ThemedView>;
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