import AsyncStorage from "@react-native-async-storage/async-storage";

/*
* Settings JSON format stored as
* {
*   "settings": {
*       "username": "string name",
*       "pin": "string pin",string name,
*       "fontSize": "fontsize"
*       "theme: {
*           "text": "",
*           "background": "",
*           "Primary": "",
*           "Secondary": "",
*           "Highlight": "",
*       }
*   }
* }
* */

const SettingsStorageJSONFormat = JSON.stringify(
    {
      username: '',
      pin: '',
      fontSize: 10,
      theme: {
        text: "#ede0ff",
        background: "#312244",
        primary: "",
        secondary: "#1b3a4b",
        highlight: "#4d194d",
      }
    }
)

async function Settings() {
  try {
    const settings = await AsyncStorage.getItem('settings');
    if (settings !== null) {
      return settings;
    } else {
      console.log("CREATING NEW SETTINGS JSON FILE");
      try {
        await AsyncStorage.setItem(
            'settings',
            SettingsStorageJSONFormat
        )
        return SettingsStorageJSONFormat;
      } catch (e) {
        return 0;
      }
    }
  } catch (e) {
    console.log(e)
    return 0;
  }
}

async function GetPin() {
  try {
    const settings = await AsyncStorage.getItem('settings');
    if (settings !== null) {
      return parseInt(settings['pin']);
    } else {
      // Trying to create new database in local storage
      console.log("CREATING NEW SETTINGS JSON FILE")
      try {
        await AsyncStorage.setItem(
            'settings',
            SettingsStorageJSONFormat
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

async function GetName(name) {
  try {
    const settings = await AsyncStorage.getItem('settings');
    if (settings !== null) {
      return settings['username'];
    } else {
      // Trying to create new database in local storage
      console.log("CREATING NEW SETTINGS JSON FILE");
      try {
        await AsyncStorage.setItem(
            'settings',
            SettingsStorageJSONFormat
        )
      } catch (e) {
        console.log(e)
        return 0;
      }
    }
  } catch (e) {
    console.log(e);
    return 0;
  }
}

async function SetName(name) {
  try {
    await  AsyncStorage.getItem('Name', async (error, result) => {
      // creating new variable for storing json
      let data = JSON.parse(result);
      // setting pin to data
      data['username'] = name;

      await AsyncStorage.setItem(
          'settings',
          JSON.stringify(data)
      )
    })
  } catch (e) {
    console.log(e);
    return 0;
  }
}

async function GetFontSize() {
  try {
    const settings = await AsyncStorage.getItem('settings');
    if (settings !== null) {
      return parseFloat(settings['fontSize']);
    } else {
      console.log("CREATING NEW SETTINGS JSON FILE");
      try {
        await AsyncStorage.setItem(
            'settings',
            SettingsStorageJSONFormat
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

async function SetFontSize(fontSize) {
  try {
    await AsyncStorage.getItem('settings', async (error, result) => {
      // creating new variable for storing JSON
      let data = JSON.parse(result);
      // setting FONT SIZE to data
      data['fontSize'] = `${fontSize}`;

      await AsyncStorage.setItem(
          'settings',
          JSON.stringify(data)
      );
    });
    return 1;
  } catch (e) {
    return 0;
  }
}

export default Settings;
export {SetName, GetName, SetPin, GetPin, SetFontSize, GetFontSize, SettingsStorageJSONFormat}