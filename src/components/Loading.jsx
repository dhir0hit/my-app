import {ThemedText, ThemedView, ThemedAntDesign} from "./ThemedComponents";
import {Animated, Easing, StyleSheet} from "react-native";
import {useRef, useState} from "react";

/**
 * Loading Screen
 * @returns ThemedView with Spinner
 * */
const Loading = () => {
  const [loading, setLoading] = useState('.');

  let loadingInterval = setInterval(() => {
    setLoading((prevState) =>  {
      if (prevState === '...') {
        return '.'
      }
      return prevState + '.';
    })
    clearInterval(loadingInterval);
  }, 3000);



  return <ThemedView style={{...styles.mainContainer}}>
    <Animated.View>
      <ThemedText style={styles.spinner}>Loading{loading}</ThemedText>
    </Animated.View>
  </ThemedView>;
}

export default Loading;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    position: "absolute",
    marginLeft: -30,
  }
})