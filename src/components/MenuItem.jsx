import {Image, StyleSheet, View} from "react-native";
import {ThemedAntDesign, ThemedButton, ThemedText} from "../../../my-app/src/components/ThemedComponents";
import {Component, useEffect} from "react";
import Accounts from "../service/Accounts";


// TODO: NOT UPDATING
class MenuItem extends Component {
    constructor(props) {
        super(props);


        this.IconName = "";
        this.accountsList = []

        if(this.props.filter === "Total Accounts") {
            this.IconName = "bars";
            this.accountsList = this.props.accountService.List;
        } else if (this.props.filter === "Favorite Accounts") {
            this.IconName = "star";
            this.accountsList = this.props.accountService.favoriteList;
        } else if (this.props.filter === "Recent Accounts") {
            this.IconName = "clockcircleo";
            this.accountsList = this.props.accountService.recentList;
        } else if (this.props.filter === "Weak Accounts") {
            this.IconName = "exclamationcircle";
        } else if (this.props.filter === "Missing Credentials") {
            this.accountsList = this.props.accountService.missingCredentialsList;
            this.IconName = "warning";
        }else if (this.props.filter === "Platform Filter") {
            this.IconName = "idcard";
            this.accountsList = this.props.accountService.platformList;
        }
    }

    render() {
        return (
            <ThemedButton onPress={() => {this.props.navigation.navigate('Password-Manager-List',
                {
                    update: this.props.Update,
                    accountService: this.props.accountService,
                    accounts: this.accountsList,
                    filter: this.props.filter
                }
            )}} style={{...styles.menuitem}}>
                <ThemedAntDesign size={30} name={this.IconName} />
                <View style={{margin: 15}}>
                    <ThemedText style={{...styles.heading}}>{this.props.number}</ThemedText>
                    <ThemedText style={{...styles.heading}}>{this.props.filter}</ThemedText>
                </View>
            </ThemedButton>
        )
    }
}

const styles = StyleSheet.create({
    menuitem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.18)",
        marginVertical: 5,
        paddingHorizontal: 20
    },
    heading: {
        fontSize: 20
    }
})

export default MenuItem;
