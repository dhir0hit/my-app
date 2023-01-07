import Account from "../model/Account";
import PasswordStrength from "../utils/PasswordStrength";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from "./config";
// TODO: CREATE DATABASE WHEN NEW ACCOUNT CREATED
export default class Accounts {
  constructor() {
    // All Accounts List
    this.List = []
    this.empty_filters();

    // // Loading Data
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
    let response = await fetch(Config.CheckConnection);
    let result = await response.json()
    return result;
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
      console.log('[+] Request delete for account containing id: ' + id);

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



  /**
   * Load data from database
   * */
  async load_data() {
    /*
    * TODO: Create Connection with database
    * */
    await this._retrieveDataLocally()
        .then( async (data) => {
          console.log(data);
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
          /*
          /!**
           * Checking remote connection
           * *!/
          await this._checkRemoteConnection()
              .then( async (result) => {
                if (result === 1) {
                  console.log('Connection success')

                  /!**
                   * Getting data from remote server
                   * *!/
                  this._retrieveDataRemotely()
                      .then(async (result) => {
                        console.log('[+] REMOTE: ', result)

                        /!*
                         * [{"_id": "63b77562d4414ef925a1aae7", "additionalInfo": "info", "createdOn": "Fri Jan 06 2023 01:12:02 GMT+0000 (Coordinated Universal Time)", "editedOn": "Fri Jan 06 2023 01:12:02 GMT+0000 (CoordinatedUniversal Time)", "favorite": true, "id": 1, "password": "password", "platform": "google", "username": "dhir0hit", "website": "google.com"}]
                         * *!/
                        for (const account of result) {
                          if (!this.List.includes(account)) {
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

                            await this.CreateAccount(acc).then(
                                () => {
                                  // this.empty_filters();
                                  // // Calculate Strength
                                  // this.CalculateStrength();
                                  // // Filtering Data
                                  // this.FilterData();
                                })
                              }
                            }


                            this.empty_filters();
                            // Calculate Strength
                            this.CalculateStrength();
                            // Filtering Data
                            this.FilterData();
                      })
                }

              })*/
        });
  }

  /**
   * Add account to database
   * and add in list
   * @param account Account model
   * */
  async CreateAccount(account) {
    account.Id = ++this.LastAccountId;
    this.List.push(account);
    console.log(this.List)

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