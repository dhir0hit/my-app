import Account from "../model/Account";
import PasswordStrength from "../utils/PasswordStrength";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from "./config";

// TODO: CREATE DATABASE WHEN NEW ACCOUNT CREATED
export default class Accounts {
  constructor() {
    // All Accounts List
    this.List = []

    // remote data connection
    this.RemoteConnection = false;

    this.empty_filters();

    // Loading Data
    // this.load_data();
    // Calculating Strength
    this.CalculateStrength();
    // Filtering Data
    this.FilterData();
  }

  /**
   * Checking Remote Connection
   * */
  async _checkRemoteConnection() {
    try {
      let response = await fetch(Config.CheckConnection);
      let result = await response.json();
      this.RemoteConnection = true;
      return result;
    } catch (e) {
      return 0;
    }
  }

  empty_filters() {
    // Favorite Accounts List
    this.favoriteList = []
    // Recently Created Accounts
    this.recentList = []
    // Accounts with weak password
    this.weakList = []
    // Accounts with missing credentials
    this.missingCredentialsList = []

    // Json format
    this.platformList = {}

    this.OverallPasswordStrength = 0
    this.StrongPasswords = 0
    this.NormalPasswords = 0
    this.WeakPasswords = 0

    // Last account id
    this.LastAccountId = 0
  }

  /**
   *
   * Online data handling
   *
   * */

  _retrieveDataRemotely = async () => {
    // Trying to connect to remote
    try {
      const response = await fetch(Config.GetAllAccountsLink());
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }

  _removeItemRemotely = async (id) => {
    // Trying to connect to remote
    try {
      const response = await fetch(Config.DeleteAccountLink(), {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }

  _updateItemRemotely = async (newAccount) => {
    try {
      const response = await fetch(Config.UpdateAccountLink(), {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          id: newAccount.Id,
          username: newAccount.Username,
          password: newAccount.Password,
          platform: newAccount.Password,
          website: newAccount.Website,
          additionalInfo: newAccount.AdditionalInfo,
          favorite: newAccount.Favorite,
          createdOn: newAccount.CreatedOn,
          editedOn: newAccount.EditedOn
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log("[Update][Remote] response: ", data);
      return data;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }


  /**
   *
   * Local Data handling
   *
   * */
  _storeDataLocally = async (newAccount) => {
    newAccount = {
      id             : newAccount.Id,
      username       : newAccount.Username,
      password       : newAccount.Password,
      platform       : newAccount.Platform,
      website        : newAccount.Website,
      additionalInfo : newAccount.AdditionalInfo,
      favorite       : newAccount.Favorite,
      createdOn      : newAccount.CreatedOn,
      editedOn       : newAccount.EditedOn
    }
    try {
      await AsyncStorage.getItem('passwordManager', async (error, result) => {
        let data = JSON.parse(result)
        data.push(newAccount);

        // Setting Data
        await AsyncStorage.setItem(
            'passwordManager',
            JSON.stringify(data)
        );
      });
      return 1;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }

  _removeItemLocally = async (id) => {
    try {
      // console.log('[+] Request delete for account containing id: ' + id);

      await AsyncStorage.getItem(
          'passwordManager',
          async (error, result) => {
            let data = JSON.parse(result);
            data = data.filter((account) => {
              return account.id != id;
            });

            console.log(data);

            await AsyncStorage.setItem(
                'passwordManager',
                JSON.stringify(data)
            );
          }
      )
      return 1;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }

  _updateItemLocally = async (newAccount) => {
    newAccount = {
      id             : newAccount.Id,
      username       : newAccount.Username,
      password       : newAccount.Password,
      platform       : newAccount.Platform,
      website        : newAccount.Website,
      additionalInfo : newAccount.AdditionalInfo,
      favorite       : newAccount.Favorite,
      createdOn      : newAccount.CreatedOn,
      editedOn       : newAccount.EditedOn
    }
    try {
      await AsyncStorage.getItem(
          'passwordManager',
          async (error, result) => {
            let data = JSON.parse(result);
            data = data.map((account) => {
              return account.id === newAccount.id
                  ? newAccount
                  : account;
            });

            await AsyncStorage.setItem(
                'passwordManager',
                JSON.stringify(data)
            )
            return 1;
          }
      )
    } catch (e) {
      console.log(e);
      return 0;
    }
  }

  _retrieveDataLocally = async () => {
    try {
      const accounts = await AsyncStorage.getItem('passwordManager');
      if (accounts !== null) {
        return accounts;
      } else {

        // Trying to Create new database in local storage
        console.log("CREATING NEW DB")
        try {
          await AsyncStorage.setItem(
              'passwordManager',
              JSON.stringify([]), // JSON.stringify({})
          );
        } catch (e) {
          return "ERROR SAVING DATA";
        }
        return "NO ACCOUNTS";
      }
    } catch (e) {
      console.log(e);
    }
  }

  _createToken = async (token) => {
    try {
      /*
      token = {
        type: 'update', // create || update || delete
        account: '', // Account in JSON
        time: '', // datetime in  string
      }
      */

      // Send token to server

    } catch (e) {
      console.log(e)
    }
  }



  /**
   * Load data from database
   * */
  async load_data() {
    /*
    * TODO: Create Connection with database
    * */
    await this._retrieveDataLocally()
        .then( async (data) => {
          //console.log(data);
          /*
           * Getting local data
           * */
          for (const account of JSON.parse(data)) {
            let acc = new Account(
                account["username"],
                account["password"],
                account["platform"],
                account["website"],
                account["additionalInfo"],
                account["favorite"],
                account["createdOn"],
                account["editedOn"],
                account["id"]
            );
            this.List.push(acc);
          }

          this.empty_filters();
          // Calculate Strength
          this.CalculateStrength();
          // Filtering Data
          this.FilterData();

        });
  }

  async load_remote_data() {
    /**
     * Checking remote connection
     * */
    // console.log("request remote data")
    await this._checkRemoteConnection()
        .then( async (result) => {
          // console.log("remote data connection status", result)
          if (result) {
            // console.log('Connection success')

            /**
             * Getting data from remote server
             * */
            await this._retrieveDataRemotely()
                .then(async (result) => {
                  // console.log('[+] REMOTE: ', result)
                  // console.log('[+] Local: ', this.List)
                  if (!result) {
                    console.log("[-] DATA NOT LOADED!!!!")
                  }
                  /*
                   * [{"_id": "63b77562d4414ef925a1aae7", "additionalInfo": "info", "createdOn": "Fri Jan 06 2023 01:12:02 GMT+0000 (Coordinated Universal Time)", "editedOn": "Fri Jan 06 2023 01:12:02 GMT+0000 (CoordinatedUniversal Time)", "favorite": true, "id": 1, "password": "password", "platform": "google", "username": "dhir0hit", "website": "google.com"}]
                   * */
                  for (const account of result) {
                    // converting it to class object of Account
                    let acc = new Account(
                        account["username"],
                        account["password"],
                        account["platform"],
                        account["website"],
                        account["additionalInfo"],
                        account["favorite"],
                        account["createdOn"],
                        account["editedOn"],
                        account["id"]
                    );

                    // for (const _elem of this.List) {
                    //
                    //   if (_elem.Id != acc.Id) {
                    //     console.log(acc.Id != _elem.Id)

                    if (!this.List.length) {
                      // console.log("didnt match");

                      // adding new account if there is none matches from remote
                      await this.CreateAccount(acc).then(
                          () => {
                            this.empty_filters();
                            // Calculate Strength
                            this.CalculateStrength();
                            // Filtering Data
                            this.FilterData();
                          }
                      )
                    }
                    for (let elem of this.List) {
                      if (elem.Id === acc.Id) {

                      // console.log("match");
                        break;
                      }
                      if (this.List[this.List.length-1].Id === elem.Id) {
                        // console.log("didnt match")

                        // adding new account if there is none matches from remote
                        await this.CreateAccount(acc).then(
                            () => {
                              this.empty_filters();
                              // Calculate Strength
                              this.CalculateStrength();
                              // Filtering Data
                              this.FilterData();
                            }
                        )
                        break;
                      }
                    }


                          }
                      // }

                      // this.empty_filters();
                      // // Calculate Strength
                      // this.CalculateStrength();
                      // // Filtering Data
                      // this.FilterData();
                })
          } else {
            this.empty_filters();
            // Calculate Strength
            this.CalculateStrength();
            // Filtering Data
            this.FilterData();
          }
          // return result;
        })
  }

  /**
   * Add account to database
   * and add in list
   * @param account Account model
   * */
  async CreateAccount(account) {
    account.Id = ++this.LastAccountId;
    this.List.push(account);

    await this._storeDataLocally(account)
        .then((result) => {
          // If account did not store, removing it from list
          if (!result) {
            this.List = this.List.filter((acc) => {
              return acc.Id !== account.Id;
            });
          }

          // TODO: Add account to database
          this.empty_filters();
          // Calculate Strength
          this.CalculateStrength();
          // Filtering Data
          this.FilterData();
        })

  }

  /**
   * Update Account from database
   * and update from list
   * */
  async UpdateAccount(newAccount) {
    let tempAccount;
    this.List = this.List.map((account) => {
      // storing temp variable
      if (account.Id === newAccount.Id) {
        tempAccount = account;
      }
      // changing account to new account
      return account.Id === newAccount.Id
          ? newAccount
          : account;
    });

    await this._updateItemLocally(newAccount)
        .then((result) => {
          // If account did not change, changing it back to original
          this.List = this.List.map((account) => {
            return account.Id === newAccount.Id
                ? tempAccount
                : account;
          });

          // TODO: Update Account from database
          this.empty_filters();
          // Calculate Strength
          this.CalculateStrength();
          // Filtering Data
          this.FilterData();
        })

    await this._checkRemoteConnection()
        .then(async (result) => {
          if (result) {
            await this._updateItemRemotely(newAccount);
          } else {
            /*
            * Create token for update
            * */
            // new instance of Date Object
            const token = {
              type: 'update',
              account: JSON.stringify({
                id             : newAccount.Id,
                username       : newAccount.Username,
                password       : newAccount.Password,
                platform       : newAccount.Platform,
                website        : newAccount.Website,
                additionalInfo : newAccount.AdditionalInfo,
                favorite       : newAccount.Favorite,
                createdOn      : newAccount.CreatedOn,
                editedOn       : newAccount.EditedOn
              }),
            }
            //adding in storage
          }
        })
  }

  /**
   * Delete Account from database
   * and remove form list
   * */
  async DeleteAccount(id) {
    let tempAccount;
    this.List = this.List.filter((account) => {
      // storing temp variable
      if (account.Id === id) {
        tempAccount = account;
      }
      // deleting account to new account
      return account.Id !== id;
    });

    await this._removeItemLocally(id)
        .then((result) => {
          // If account did not delete, changing it back to original
          if (!result) {
            this.List.push(tempAccount);
          }
          
          // TODO: Delete account from database
          this.empty_filters();
          // Calculate Strength
          this.CalculateStrength();
          // Filtering Data
          this.FilterData();
        })

    await this._checkRemoteConnection()
        .then(async (result) => {
          if (result) {
            await this._removeItemRemotely(id);
          } else {
            /*
            * Create token for delete
            * */
            const token = {
              type: 'delete',
              account: JSON.stringify({
                id: id,
              })
            }
            // adding in storage
          }
        })
  }


  /**
   * Calculating Strength of all the accounts' password
   * */
  CalculateStrength() {
    // looping through accounts list
    for (const account of this.List) {
      // getting password strength of current account
      let passStrength = new PasswordStrength(account.Password)
      const _strength = passStrength.StrengthPercentage
      // Adding strength to overall password strength
      this.OverallPasswordStrength += _strength;

      if (_strength < 17) {
        // Weak Password
        this.WeakPasswords++;
        // Adding weak strength password to list
        this.weakList.push(account);
      } else if (_strength < 20) {
        // Normal Password
        this.NormalPasswords++;
      } else {
        // Strong Password
        this.StrongPasswords++;
      }
    }

    // dividing overall Strength by total accounts
    this.OverallPasswordStrength /= this.List.length;
  }

  /**
   * Filtering Data got from database
   * */
  FilterData() {
//    console.log("[+] filter data update");
    for (const account of this.List) {
      /*
      * Last account id
      * */
      if (this.LastAccountId < account.Id) {
        this.LastAccountId = account.Id
      }

      /*
      * Favorite Accounts
      * */
      if (account.Favorite) {
        this.favoriteList.push(account);
      }

      /*
      * Recently Created Accounts
      * */
      let accountCreationDate = new Date(account.CreatedOn);
      accountCreationDate.setDate(accountCreationDate.getDate() + 30)
      const currentDate = new Date();
      if (accountCreationDate.getDate() < currentDate.getDate() &&
          accountCreationDate.getMonth() < currentDate.getMonth() &&
          accountCreationDate.getFullYear() < currentDate.getFullYear()
      ) {
        this.recentList.push(account);
      }

      // Missing Credentials Accounts
      if (account.Username === undefined || account.Website ===  undefined) {
        this.missingCredentialsList.push(account);
      }

      // Platform list
      if (this.platformList[account.Platform] === undefined) {
        // if there is no platform already in list
        this.platformList[account.Platform] = []
      }
      // adding item to list with platform filtered
      this.platformList[account.Platform].push(account)
    }
  }
}