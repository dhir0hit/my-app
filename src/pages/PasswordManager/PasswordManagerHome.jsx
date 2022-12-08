import {Component, useEffect} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {ThemedButton, ThemedText, ThemedView} from "../../components/ThemedComponents";
import NavChips from "../../components/NavChips"
import MenuItem from "../../components/MenuItem";
export default class PasswordManagerHome extends Component{
    constructor(props) {
        super(props);

        this.state = {
            TotalAccounts: 0,
            FavoriteAccounts: 0,
            RecentAccounts: 0,
            WeakAccounts: 0,
            MissingCredentialAccounts: 0,
            PlatformFilterAccounts: 0,
            OverallStrength: 0,// %
            StrongAccounts: 0,
            NormalAccounts: 0,
        }

        this.Update = this.Update.bind(this)
    }

    componentDidMount() {
        this.Update();
    }

    Update() {
        console.log("[+] Update")
        this.setState(
            {
                TotalAccounts: this.props.route.params.accountService.List.length,
                FavoriteAccounts: this.props.route.params.accountService.favoriteList.length,
                RecentAccounts: this.props.route.params.accountService.recentList.length,
                WeakAccounts: this.props.route.params.accountService.weakList.length,
                MissingCredentialAccounts: this.props.route.params.accountService.missingCredentialsList.length,
                PlatformFilterAccounts: this.props.route.params.accountService.platformList.length,

                OverallStrength: 0,// %
                StrongAccounts: 0,
                NormalAccounts: 0,
            }
        )
    }

    render() {
        const {TotalAccounts,
            FavoriteAccounts,
            RecentAccounts,
            WeakAccounts,
            MissingCredentialAccounts,
            PlatformFilterAccounts,
            OverallStrength,
            StrongAccounts,
            NormalAccounts} = this.state;
        return (
            <ThemedView style={{...styles.mainContainer, height: 50}}>
                <View style={{backgroundColor: "rgba(255,255,255,0.18)", borderRadius: 10, overflow: "hidden"}}>
                    <View style={{height: 50, width: '50%', backgroundColor: 'red'}}></View>
                </View>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between",
                    padding: 20, borderBottomWidth: 1, borderColor: '#fff', borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10}}
                >
                    <View>
                        <ThemedText style={styles.textStyle}>Overall</ThemedText>
                        <ThemedText style={styles.textStyle}>Strong</ThemedText>
                        <ThemedText style={styles.textStyle}>Normal</ThemedText>
                        <ThemedText style={styles.textStyle}>Weak</ThemedText>
                    </View>
                    <View>
                        <ThemedText style={styles.textStyle}>99%</ThemedText>
                        <ThemedText style={styles.textStyle}>99%</ThemedText>
                        <ThemedText style={styles.textStyle}>99%</ThemedText>
                        <ThemedText style={styles.textStyle}>99%</ThemedText>
                    </View>
                </View>
                <ScrollView>
                    <ScrollView style={{padding: 5}} horizontal={true}>
                        <NavChips navigation={this.props.navigation}
                                  accountService={this.props.route.params.accountService}
                                  pageName={'Generate Password'}
                                  Update={() => this.Update()}
                        />
                        <NavChips navigation={this.props.navigation}
                                  accountService={this.props.route.params.accountService}
                                  pageName={'Add Account'}
                                  Update={() => this.Update()}
                        />
                    </ScrollView>
                    <View>
                        <MenuItem filter={"Total Accounts"}
                                  number={TotalAccounts}
                                  accountService={this.props.route.params.accountService}
                                  navigation={this.props.navigation}
                        />
                        <MenuItem filter={"Favorite Accounts"}
                                  number={FavoriteAccounts}
                                  accountService={this.props.route.params.accountService}
                                  navigation={this.props.navigation}
                        />
                        <MenuItem filter={"Recent Accounts"}
                                  number={RecentAccounts}
                                  accountService={this.props.route.params.accountService}
                                  navigation={this.props.navigation}
                        />
                        <MenuItem filter={"Weak Accounts"}
                                  number={WeakAccounts}
                                  accountService={this.props.route.params.accountService}
                                  navigation={this.props.navigation}
                        />
                        <MenuItem filter={"Missing Credentials"}
                                  number={MissingCredentialAccounts}
                                  accountService={this.props.route.params.accountService}
                                  navigation={this.props.navigation}
                        />
                        <MenuItem filter={"Platform Filter"}
                                  number={PlatformFilterAccounts}
                                  accountService={this.props.route.params.accountService}
                                  navigation={this.props.navigation}
                        />
                    </View>
                </ScrollView>
            </ThemedView>
        )
    }
}

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