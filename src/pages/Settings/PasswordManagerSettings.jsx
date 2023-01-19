import {
  ThemedAntDesign,
  ThemedButton,
  ThemedText,
  ThemedTextInput,
  ThemedView
} from "../../components/ThemedComponents";
import {Pressable, ScrollView, StyleSheet, TextInput, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";

export default function PasswordManagerSettings(props) {
  const [editPin, SetEditPin] = useState(false);
  const [pin, setPin] = useState("1234");

  return (
      <ThemedView style={{flex: 1, paddingHorizontal: 10}}>
        <View style={{...styles.TopBar, marginTop: 45}}>
          <View style={{display: "flex", alignItems: "flex-start", overflow: "visible"}}>
            <Pressable
                onPress={() => {props.navigation.goBack()}}
                style={{backgroundColor: "rgba(101,101,101,0.4)", padding: 10}}
            >
              <ThemedAntDesign name={"left"} size={24} color={"white"} />
            </Pressable>
          </View>
          <ThemedText>Settings</ThemedText>
        </View>

        <ScrollView>
          <StatusBar style="auto"/>

          <View style={styles.container}>
            <View>
              <ThemedText style={styles.label}>Pin</ThemedText>

              <View style={styles.inputContainer}>
                {
                  editPin
                      ? <TextInput
                          style={styles.input}
                          value={pin}
                      />
                      : <ThemedText style={styles.input}>{pin}</ThemedText>
                }

                <ThemedButton
                    theme={'transparent'}
                    onPress={(value) => {
                      SetEditPin(!editPin)

                      if (editPin) {
                        console.log("pin")
                      }
                    }}
                >
                  <ThemedAntDesign name={editPin ? 'close' : 'edit'} />
                </ThemedButton>
              </View>
            </View>
          </View>
        </ScrollView>
      </ThemedView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  TopBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  container: {
    marginVertical: 10
  },
  label: {
    fontSize: 20,
    textTransform: "uppercase",
  },
  input: {
    fontSize: 15,
    height: 40,
    padding: 6,
    margin: 0,
    color: "#fff",
    minWidth: '80%'
    // borderColor: 'transparent'
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#fff"
  }
})
