import {Image, StyleSheet, View, Text} from "react-native";
import {ThemedAntDesign, ThemedButton, ThemedText} from "./ThemedComponents";
import {Component, useEffect} from "react";
import Accounts from "../service/Accounts";
import Loading from "./Loading";


// TODO: NOT UPDATING
const FontHexColor = '66';
class MenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isReady: 0,
        }


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
        const { isReady } = this.state;
        if (isReady) {
            return (
                <ThemedButton onPress={() => {
                    this.props.navigation.navigate('Password-Manager-List',
                        {
                            update: this.props.Update,
                            accountService: this.props.accountService,
                            accounts: this.accountsList,
                            filter: this.props.filter
                        }
                    )
                }} style={{...styles.menuitem, backgroundColor: this.props.theme.secondary+FontHexColor}}>
                    <ThemedAntDesign size={30} name={this.IconName}/>
                    <View style={{margin: 15}}>
                        {
                            this.props.filter !== "Platform Filter"
                                ? <Text
                                    style={{...styles.heading, color: this.props.theme.text}}>{this.props.number}</Text>
                                : ""
                        }
                        <Text style={{...styles.heading, color: this.props.theme.text}}>{this.props.filter}</Text>
                    </View>
                </ThemedButton>
            )
        } else {
            if (this.props.theme) {
                this.setState({isReady: 1})
            }
            return <Loading/>
        }
    }
}

const styles = StyleSheet.create({
    menuitem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 4,
        paddingHorizontal: 20
    },
    heading: {
        fontSize: 20
    }
})

export default MenuItem;
