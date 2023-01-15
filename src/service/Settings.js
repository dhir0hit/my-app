import AsyncStorage from "@react-native-async-storage/async-storage";

async function GetPin() {
  try {
    const settings = await  AsyncStorage.getItem('settings');
    if (settings !== null) {
      return parseInt(settings['pin']);
    } else {
      // Trying to create new database in local storage
      console.log("CREATING NEW SETTINGS JSON FILE")
      try {
        await AsyncStorage.setItem(
            'settings',
            JSON.stringify({
              pin: '',
            })
        )
      } catch (e) {
        console.log(e);
        return 0;
      }
    }
  } catch (e) {
    console.log(e);
    return 0;
  }
}

async function SetPin(pin) {
  try {
    await AsyncStorage.getItem('settings', async (error, result) => {
      // creating new variable for storing json
      let data = JSON.parse(result);
      // setting pin to data
      data['pin'] = `${pin}`;

      await AsyncStorage.setItem(
          'settings',
          JSON.stringify(data)
      );
    });
    return 1;
  } catch (e) {
    console.log(e);
    return 0;
  }
}