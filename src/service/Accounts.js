import Account from "../model/Account";
import PasswordStrength from "../utils/PasswordStrength";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from "./Config";

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

  /*
   * Emptying filters
   * */
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
   * Checking Remote Connection
   * @return JSON
   * @returns Result of API
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





/**
 *
 * Online data handling
 *
 * */




  /**
   * Getting Data Remotely,
   * Using API.
   * @return JSON
   * @returns result of API
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

  /**
   * Reoving Item Remotely,
   * Using API.
   * @param id
   * @return boolean
   * @returns result of API
   * */
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

  /**
   * Updating Item Remotely,
   * Using API.
   * @param newAccount
   * @return boolean
   * @returns result of API
   * */
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
   * Creating Item Remotely,
   * Using API.
   * @param newAccount
   * @return boolean
   * @returns result of API
   * */
  _createItemRemotely = async (newAccount) => {
    try {
      /*
      * Creating fetch request and
      * assigning result to response
      * */
      const response = await fetch(Config.CreateAccountLink(), {
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
      console.log("[Create][Remote] response: ", data);
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




  /**
   * Creating Item Locally,
   * using key 'passwordManager'
   * @requires AsyncStorage
   * @return boolean
   * @returns TURE if removed item Locally, FALSE if unable to remove item locally
   * */
  _storeDataLocally = async (newAccount) => {
    /*
    * Creating account json and assigning to newAccount variable
    * */
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
    // Trying to store in Local Storage
    try {
      /*
      * Getting JSON from Local Storage
      * */
      await AsyncStorage.getItem('passwordManager', async (error, result) => {
        // creating new variable for storing returned json
        let data = JSON.parse(result); // parsing json from string to json
        // pushing account in returned json data
        data.push(newAccount);

        /*
         * Setting updated JSON to Local Storage
         * */
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

  /**
   * Removing Item Locally,
   * using key 'passwordManager'
   * @requires AsyncStorage
   * @return boolean
   * @returns TRUE if removed item locally, False if unable to remove item locally
   * */
  _removeItemLocally = async (id) => {
    try {
      /*
      * Getting JSON from Local Storage
      * */
      await AsyncStorage.getItem(
          'passwordManager',
          async (error, result) => {
            // creating new variable for storing returned json
            let data = JSON.parse(result); // parsing json from string to json
            data = data.filter((account) => {
              // returning false if account id matches with [@param] requested id
              return account.id !== id;
            });

            /*
            * Setting updated JSON to Local Storage
            * */
            await AsyncStorage.setItem(
                'passwordManager',
                JSON.stringify(data)
            )
          }
      )
      return 1;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }

  /**
   * Updating Item Locally,
   * using key 'passwordManager'
   * @requires AsyncStorage
   * @return boolean
   * @returns TRUE if updated item locally, False if unable to update item locally
   * */
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

  /**
   * Retrieve Data Locally,
   * using key 'passwordManager'
   * @requires AsyncStorage
   * @returns accounts JSON
   * */
  _retrieveDataLocally = async () => {
    try {
      const accounts = await AsyncStorage.getItem('passwordManager');
      if (accounts !== null) {
        return accounts;
      } else {
        // Trying to Create new database in local storage
        console.log("CREATING NEW PASSWORD MANAGER DB");
        try {
          await AsyncStorage.setItem(
              'passwordManager',
              JSON.stringify([]),
          );
        } catch (e) {
          console.log(e);
          return 0;
        }
        return 0;
      }
    } catch (e) {
      console.log(e);
      return 0;
    }
  }






  /**
   * Create Token for Updating in Local Storage
   *
   * @param type (String) create || update || delete
   * @param account (JSON)
   * @param time (string) Date String
   *
   * @return JSON
   * */
  _createToken = async (type, account, time) => {
    const token = {
      type: type, // create || update || delete
      account: account, // Account in JSON
      time: time, // datetime in  string
    }
    // create token in Storage
    try {
      /*
      * Getting JSON from Local Storage
      * */
      await AsyncStorage.getItem('passwordManagerToken', async (error, result) => {
        // creating new variable from storing returned JSON
        let data = JSON.parse(result); // parsing json from string to json
        // pushing account in returned json data
        data.push(token);

        /*
        * Setting updated JSON to Local Storage
        * */
        await AsyncStorage.setItem(
            'passwordManagerToken',
            JSON.stringify(data)
        )
      })
      return 1;
    } catch (e) {
      console.log(e)
      return 0;
    }
  }

  /**
   * Getting Token for reading in Local Storage
   *
   * @return JSON
   * */
  async _readToken () {
    try {
      const passwordManagerToken = await AsyncStorage.getItem('passwordManagerToken');
      if (passwordManagerToken !== null) {
        console.log('[token]', passwordManagerToken);
        return passwordManagerToken;
      } else {
        // Trying to Create new database in local Storage
        console.log("Creating New Token DB");
        try {
          await AsyncStorage.setItem(
              'passwordManagerToken',
              JSON.stringify([]),
          )
        } catch (e) {
          console.log(e);
          return 0;
        }
        return 0;
      }

    } catch (e) {
      console.log(e);
      return 0;
    }
  }

  async _sendTokens () {
    try {
      const response = await fetch(Config.SendTokenLink())
    } catch (e) {
      console.log(e)
      return 0;
    }
  }





  /**
   * Load data from database
   * */
  async load_data() {
    await this._retrieveDataLocally()
        .then( async (data) => {
          /*
           * Getting local data
           * */
          if (data) {
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
          }
        });
    await this._readToken();
  }

  async load_remote_data() {
    /**
     * Checking remote connection
     * */
    // console.log("request remote data")
    await this._checkRemoteConnection()
        .then( async (result) => {
          if (result) {
            /*
             * Getting data from remote server
             * */
            await this._retrieveDataRemotely()
                .then(async (result) => {

                  if (!result) {
                    console.log("[-] DATA NOT LOADED!!!!")
                  }

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

                    if (!this.List.length) {
                      /*
                      * TODO: Create item locally not remotely
                      * */
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
                        break;
                      }
                      if (this.List[this.List.length-1].Id === elem.Id) {
                        /*
                         * Adding new account if there is none matches from remote
                         * */
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
                });
            /*TODO: SEND TOKENS*/
            /*TODO: GET TOKENS*/

          } else {
            this.empty_filters();
            // Calculate Strength
            this.CalculateStrength();
            // Filtering Data
            this.FilterData();
          }
        })

  }





  /**
   * Add account to database and local-storage
   * and add in list
   * @param newAccount Account model
   * */
  async CreateAccount(newAccount) {
    newAccount.Id = ++this.LastAccountId;
    this.List.push(newAccount);

    /*
    * Removing Item from Local Storage
    *
    * If it fails then Updating it in List
    * */
    await this._storeDataLocally(newAccount)
        .then((result) => {
          // If account did not store, removing it from list
          if (!result) {
            this.List = this.List.filter((acc) => {
              return acc.Id !== newAccount.Id;
            });
          }

          this.empty_filters();
          // Calculate Strength
          this.CalculateStrength();
          // Filtering Data
          this.FilterData();
        })

    /*
    * Removing Item from Remote Storage
    *
    * If there is no connection to server
    * else
    * -- Create Token --
    * */
    await this._checkRemoteConnection()
        .then(async (result) => {
          if (result) {
            await this._createItemRemotely(newAccount)
          } else {
            /*
            * Create token for create
            * */
            const tokenAccount = JSON.stringify({
              id             : newAccount.Id,
              username       : newAccount.Username,
              password       : newAccount.Password,
              platform       : newAccount.Platform,
              website        : newAccount.Website,
              additionalInfo : newAccount.AdditionalInfo,
              favorite       : newAccount.Favorite,
              createdOn      : newAccount.CreatedOn,
              editedOn       : newAccount.EditedOn
            });
            const date = new Date();
            // adding it in the storage
            await this._createToken('create', tokenAccount, date.toString());
          }
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

    /*
    * Removing Item from Local Storage
    *
    * If it fails then Updating it in List
    * */
    await this._updateItemLocally(newAccount)
        .then((result) => {
          // If account did not change, changing it back to original
          this.List = this.List.map((account) => {
            return account.Id === newAccount.Id
                ? tempAccount
                : account;
          });

          this.empty_filters();
          // Calculate Strength
          this.CalculateStrength();
          // Filtering Data
          this.FilterData();
        })

    /*
    * Updating Item from Remote Storage
    *
    * If there is no connection to server
    * else
    * -- Create Token --
    * */
    await this._checkRemoteConnection()
        .then(async (result) => {
          if (result) {
            await this._updateItemRemotely(newAccount);
          } else {
            /*
            * Create token for update
            * */
            const tokenAccount = JSON.stringify({
              id             : newAccount.Id,
              username       : newAccount.Username,
              password       : newAccount.Password,
              platform       : newAccount.Platform,
              website        : newAccount.Website,
              additionalInfo : newAccount.AdditionalInfo,
              favorite       : newAccount.Favorite,
              createdOn      : newAccount.CreatedOn,
              editedOn       : newAccount.EditedOn
            });
            const date = new Date()
            //adding in storage
            await this._createToken('update', tokenAccount, date.toString());
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

    /*
    * Removing Item from Local Storage
    *
    * If it fails then Updating it in List
    * */
    await this._removeItemLocally(id)
        .then((result) => {
          // If account did not delete, changing it back to original
          if (!result) {
            this.List.push(tempAccount);
          }
          this.empty_filters();
          // Calculate Strength
          this.CalculateStrength();
          // Filtering Data
          this.FilterData();
        })

    /*
    * Removing Item from Remote Storage
    *
    * If there is no connection to server
    * else
    * -- Create Token --
    * */
    await this._checkRemoteConnection()
        .then(async (result) => {
          if (result) {
            await this._removeItemRemotely(id);
          } else {
            /*
            * Create token for delete
            * */
            const tokenAccount = JSON.stringify({
                id: id,
            })
            const date = new Date();
            // adding in storage
            await this._createToken('delete', tokenAccount, date.toString());
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