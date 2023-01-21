# my app

Created with EXPO GO
needs expo account


<p>Change Config.js under <strong>src/service</strong></p>

```js
api: {
        protocol: "http", // http or https
        hostname: "0.0.0.0", // xxx.xxx.xxx.xxx or www.example.domain.com
        port    : "5000", // 80 || 5000
        codeServer: "5050",
        index: {
            name: '',
            checkConnection: 'check-connection',
        },
        passwordManager: {
            name    : "pwdmanager", // Controller for password manager
            routes: {
                getAll: "get-all", // Get All Accounts Page
                getOne: "account", // Get One Accounts Page
                create: "create",  // Create  Account  Page
                update: "update",  // Update  Account  Page
                delete: "delete",   // Delete  Account  Page

                sendToken: "create-tokken"
            }
        }
    }
```
Replace hostname with your server ip address
<h3>NOTE: this will only work if you have installed Server app of dhir0hit</h3>


run 
```bash
npm install
```
```bash
npx expo install
```

to build and run
```bash
npx expo start 
```

to make apk 
```bash
npm install -g eas-cli
```
```bash
npx expo install expo-dev-client
```

if you want development build 
```bash
eas build --profile development --platform android
```

if you want simple build 
```bash
eas build --profile preview --platform android
```
OR
```bash
eas build --profile preview2 --platform android
```
OR
```bash
eas build --profile preview3 --platform android
```
run any
