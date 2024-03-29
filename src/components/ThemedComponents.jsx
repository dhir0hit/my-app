import {Appearance, Text, StyleSheet, useColorScheme, View, Button, Pressable, TextInput} from "react-native";
import {theme} from "../utils/theme.json"
import {useEffect, useState} from "react";
import {AntDesign} from "@expo/vector-icons";


/*Todo: color='highlight' put highlight color*/
/**
 * Function returns original node with theme color on it
 * */
export function ThemedText(props) {
    // getting current color scheme
    let scheme = Appearance.getColorScheme();

    // using state to declare textColor and color scheme
    const [colorScheme, setColorScheme] = useState(scheme);
    const [textColor, setTextColor] = useState("#fff")

    /*
    * Function to change current theme according to system theme
    * Changes colorScheme and textColor
    * */
    const changeTheme = () => {
        let scheme = Appearance.getColorScheme();

        if(scheme === "dark") {
            setColorScheme(scheme)
            setTextColor(theme.dark["text-color"])
        } else {
            setColorScheme(scheme)
            setTextColor(theme.light["text-color"])
        }

        try {
            if (props.theme === "transparent") {
                setTextColor("transparent")
            } else if (props.style.color !== undefined) {
                setTextColor(props.style.color);
            }
        }
        catch (e) {
        }
        try {
            if (props.theme === "reverse") {
                if(scheme === "dark") {
                    setColorScheme(scheme)
                    setTextColor(theme.light["text-color"])
                } else {
                    setColorScheme(scheme)
                    setTextColor(theme.dark["text-color"])
                }
            }
        }
        catch (e) {
        }
    }

    // Onload on-restart or on-resume changing theme
    useEffect(() => {
        changeTheme();
    })
    // adding changeTheme function to a listener
    Appearance.addChangeListener(changeTheme)

    /*
    * Returning original node with children, styles of custom node
    * with color of theme
    * */
    return (
        <Text style={{...props.style, color: textColor}}>{props.children}</Text>
    )
}

/**
 * Function returns original node with theme color on it
 * */
/*
export function ThemedView(props) {
    // getting current color scheme
    let scheme = Appearance.getColorScheme();

    // using state to declare textColor and color scheme
    const [colorScheme, setColorScheme] = useState(scheme);
    const [backgroundColor, setBackgroundColor] = useState("#fff")

    /!*
    * Function to change current theme according to system theme
    * Changes colorScheme and backgroundColor
    * *!/
    const changeTheme = () => {
        let scheme = Appearance.getColorScheme();

        if(scheme === "dark") {
            setColorScheme(scheme)
            setBackgroundColor(theme.dark["background-color"])
        } else {
            setColorScheme(scheme)
            setBackgroundColor(theme.light["background-color"])
        }

        try {
            if (props.theme === "transparent") {
                setBackgroundColor("transparent")
            } else if (props.style.backgroundColor !== undefined) {
                setBackgroundColor(props.style.backgroundColor);
            }
        } catch (e) {
            
        }
    }

    // Onload on-restart or on-resume changing theme
    useEffect(() => {
        changeTheme();
    })
    // adding changeTheme function to a listener
    Appearance.addChangeListener(changeTheme);

    /!*
    * Returning original node with children, styles of custom node
    * with background color of theme
    * *!/
    return (
        <View style={{ ...props.style, backgroundColor: backgroundColor}} >{props.children}</View>
    )
}
*/

/*
export function ThemedView(props) {
    // getting current color scheme
    let scheme = Appearance.getColorScheme();

    // using state to declare textColor and color scheme
    const [colorScheme, setColorScheme] = useState(scheme);
    const [backgroundColor, setBackgroundColor] = useState("#fff")

    useEffect(() => {
        // console.log(props.theme);
    })

    if (props.theme !== undefined) {
        if (props.colorScheme !== undefined
            || props.colorScheme === 'background') {
            setBackgroundColor(() => props.theme['background'])
        }
    }

    /!*
    * Returning original node with children, styles of custom node
    * with background color of theme
    * *!/
    return (
        <View style={{ ...props.style, backgroundColor: backgroundColor}} >{props.children}</View>
    )
}
*/


export function ThemedButton(props) {
    // getting current color scheme
    let scheme = Appearance.getColorScheme();

    // using state to declare textColor and color scheme
    const [colorScheme, setColorScheme] = useState(scheme);
    const [backgroundColor, setBackgroundColor] = useState("#fff")
    const [textColor, setTextColor] = useState("#000")

    const [Opacity, setOpacity] = useState(1)

    /*
    * Function to change current theme according to system theme
    * Changes colorScheme and backgroundColor
    * */
    const changeTheme = () => {
        let scheme = Appearance.getColorScheme();



        if (scheme === "dark") {
            setColorScheme(scheme)
            setBackgroundColor(theme.dark["highlight-color"])
            setTextColor(theme.dark["text-color"])
        } else {
            setColorScheme(scheme)
            setBackgroundColor(theme.light["highlight-color"])
            setTextColor(theme.light["text-color"])
        }

        try {
            if (props.theme === "transparent") {
                setBackgroundColor("transparent")
            } else if (props.style.backgroundColor !== undefined) {
                setBackgroundColor(props.style.backgroundColor);
            }
        } catch (e) {
        }
    }

    // Onload on-restart or on-resume changing theme
    useEffect(() => {
        changeTheme();
    })
    // adding changeTheme function to a listener
    Appearance.addChangeListener(changeTheme);

    /*
    * Returning original node with children, styles of custom node
    * with background color of theme
    * */
    return (
        <Pressable
            style={{ ...props.style, backgroundColor: backgroundColor, opacity: Opacity}}
            onPress={props.onPress}
            onPressIn={() => {setOpacity(0.5)}}
            onPressOut={() => {setOpacity(1)}}>
            {props.children}
        </Pressable>
    )
}


export function ThemedAntDesign(props) {// getting current color scheme
    let scheme = Appearance.getColorScheme();

    // using state to declare textColor and color scheme
    const [colorScheme, setColorScheme] = useState(scheme);
    const [Color, setColor] = useState("#fff");
    const [Size, setSize] = useState(25);
    const [Name, setName] = useState("left");

    /*
    * Function to change current theme according to system theme
    * Changes colorScheme and textColor
    * */
    const changeTheme = () => {
        let scheme = Appearance.getColorScheme();

        if(scheme === "dark") {
            setColorScheme(scheme)
            setColor(theme.dark["text-color"])
        } else {
            setColorScheme(scheme)
            setColor(theme.light["text-color"])
        }

        try {
            if (props.theme === "transparent") {
                setColor("transparent")
            } else if (props.color !== undefined) {
                setColor(props.color);
            }
        }
        catch (e) {
        }

        try {
            if (props.name !== undefined) {

                const IconsName = ["google", "googleplus", "instagram", "creditcard", "mail", "laptop",
                    "home", "shoppingcart", "user", "phone", "lock", "cloud", "windows", "ie", "chrome",
                    "github", "safety", "bank", "apple1", "android1", "codepen", "amazon",
                    "dropbox", "gitlab", "skype", "youtube", "wechat", "twitter", "html",
                    "codesandbox", "dribbble", "wifi", 'star', 'copy1', 'eyeo', 'eye', 'setting',
                    'sync', 'plus', 'bars', 'clockcircleo', 'exclamationcircle', 'warning', 'left',
                    'scan1', 'staro', 'close', 'edit', 'delete', 'loading2', 'check', 'unlock',
                    'right', 'exclamationcircle'
                ];

                let accountIcon = ""

                if (IconsName.includes(props.name.toLowerCase())) {
                    accountIcon = props.name.toLowerCase();
                }
                else if (props.name.toLowerCase().replace(' ', '') === "google plus") {
                    accountIcon = "googleplus"
                } else if (props.name.toLowerCase().replace(' ', '') === "drop box") {
                    accountIcon = "dropbox"
                } else if (props.name.toLowerCase().replace(' ', '') === "linkedin") {
                    accountIcon = "linkedin-square"
                } else if (props.name.toLowerCase().replace(' ', '') === "facebook") {
                    accountIcon = "facebook-square"
                } else if (props.name.toLowerCase().replace(' ', '') === "app store") {
                    accountIcon = "appstore1"
                } else if (props.name.toLowerCase().replace(' ', '') === "message") {
                    accountIcon = "message1"
                } else if (props.name.toLowerCase().replace(' ', '') === "message") {
                    accountIcon = "message1"
                } else if (props.name.toLowerCase().replace(' ', '') === "android" || props.name.toLowerCase().replace(' ', '') === "samsung") {
                    accountIcon = "android1"
                } else if (props.name.toLowerCase().replace(' ', '') === "apple" || props.name.toLowerCase().replace(' ', '') === "iphone") {
                    accountIcon = "apple1"
                } else if (props.name.toLowerCase().replace(' ', '') === "mobile" || props.name.toLowerCase().replace(' ', '') === "tablet" || props.name.toLowerCase().replace(' ', '') === "ipad" || props.name.toLowerCase().replace(' ', '') === "i pad") {
                    accountIcon = "tablet1"
                } else if (props.name.toLowerCase().replace(' ', '') === "window") {
                    accountIcon = "windows"
                } else if (props.name.toLowerCase().replace(' ', '') === "internet explorer") {
                    accountIcon = "ie"
                } else if (props.name.toLowerCase().replace(' ', '') === "shopping" || props.name.toLowerCase().replace(' ', '') === "cart" || props.name.toLowerCase().replace(' ', '') === "shopping cart") {
                    accountIcon = "shoppingcart"
                } else if (props.name.toLowerCase().replace(' ', '') === "email" || props.name.toLowerCase().replace(' ', '') === "gmail" || props.name.toLowerCase().replace(' ', '') === "mail") {
                    accountIcon = "mail"
                } else {
                    accountIcon = "idcard"
                }
                setName(accountIcon);

            }

        }
        catch (e) {
        }

        try {
            if (props.size !== undefined) {
                setSize(props.size);
            }
        }
        catch (e) {
        }



    }

    // Onload on-restart or on-resume changing theme
    useEffect(() => {
        changeTheme();
    })
    // adding changeTheme function to a listener
    Appearance.addChangeListener(changeTheme)

    /*
    * Returning original node with children, styles of custom node
    * with color of theme
    * */
    return (
        <AntDesign name={Name} size={Size} color={Color} style={{...props.style}} />
    )
}

export function ThemedTextInput(props) {
    let scheme = Appearance.getColorScheme();

    // using state to declare textColor and color scheme
    const [colorScheme, setColorScheme] = useState(scheme);
    const [Color, setColor] = useState("#fff");
    const [autoComplete, setAutoComplete] = useState("off");
    const [keyboardType, setKeyboardType] = useState("default");
    const [secureTextEntry, setSecureTextEntry] = useState(false);

    /*
    * Function to change current theme according to system theme
    * Changes colorScheme and textColor
    * */
    const changeTheme = () => {
        let scheme = Appearance.getColorScheme();

        if(scheme === "dark") {
            setColorScheme(scheme)
            setColor(theme.dark["text-color"])
        } else {
            setColorScheme(scheme)
            setColor(theme.light["text-color"])
        }

        try {
            if (props.theme === "transparent") {
                setColor("transparent")
            } else if (props.color !== undefined) {
                setColor(props.color);
            }
        }
        catch (e) {
        }

        try {
            if (props.autoComplete !== undefined) {
                setAutoComplete(props.autoComplete);
            }
        }
        catch (e) {
        }
        try {
            if (props.keyboardType !== undefined) {
                setKeyboardType(props.keyboardType);
            }
        }
        catch (e) {
        }
        try {
            if (props.secureTextEntry !== undefined) {
                setSecureTextEntry(props.secureTextEntry);
            }
        }
        catch (e) {
        }


        try {
            if (props.style.borderColor !== undefined) {
                setColor(props.style.borderColor);
            }
        }
        catch (e) {
        }



    }

    // Onload on-restart or on-resume changing theme
    useEffect(() => {
        changeTheme();
    })
    // adding changeTheme function to a listener
    Appearance.addChangeListener(changeTheme)

    /*
    * Returning original node with children, styles of custom node
    * with color of theme
    * */
    return (
        <TextInput
            style={{...props.style, color: Color, height: 40, borderWidth: 1, padding: 10, borderColor: Color}}
            onChangeText={(text) => props.onChangeText(text)}
            onTextInput={props.onTextInput}
            value={props.value}
            autoComplete={autoComplete}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            placeholder={props.placeholder} />
    )
}
