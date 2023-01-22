import {Animated, Easing, StyleSheet, View, Text, Image} from "react-native";
import {useRef, useState} from "react";
import Settings from "../service/Settings";

// importing Logo
import Logo from '../../assets/adaptive-icon.png'
/**
 * Loading Screen
 * @returns ThemedView with Spinner
 * */
const Loading = () => {
  const [loading, setLoading] = useState('.');
  const [theme, setTheme] = useState({text: "#fff", background: "#000"});
  Settings()
      .then((value) => {
        let result = JSON.parse(value);

        theme['text'] = result['theme']['text'];
        theme['background'] = result['theme']['background'];

        setTheme(theme)
      });



  return <View style={{...styles.mainContainer, backgroundColor: theme.background}}>
    <Animated.View style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <Image
          style={{width: 100, height: 100}}
          source={Logo}
          contentFit={"fit"}
      />
      <Text style={{color: theme.text, paddingTop: 10}}>Loading...</Text>
    </Animated.View>
  </View>;
}

const Spinner = () => {
  return <View style={{
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.1)"
  }}>
    <Text>Spinner</Text>
  </View>
}


export default Loading;
export {Spinner};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})