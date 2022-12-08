import Account from "../model/Account";
import PasswordStrength from "../utils/PasswordStrength";


export default class Accounts {
    constructor() {
        // All Accounts List
        this.List = []
        this.empty_filters();

        // Loading Data
        this.load_data();
        // Calculating Strength
        this.CalculateStrength();
        // Filtering Data
        this.FilterData();
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
     * Load data from database
     * */
    load_data() {
        /*
        * TODO: Create Connection with database
        * */
    }

    /**
     * Add account to database
     * and add in list
     * @param account Account model
     * */
    CreateAccount(account) {
        account.Id = ++this.LastAccountId;
        this.List.push(account)

        // TODO: Add account to database
        this.empty_filters();
        // Calculate Strength
        this.CalculateStrength();
        // Filtering Data
        this.FilterData();
    }

    /**
     * Update Account from database
     * and update from list
     * */
    UpdateAccount(newAccount) {
        this.List.map((account) => {
            return account.Id === newAccount.Id
                ? newAccount
                : account;
        })
        // TODO: Update Account from database
        this.empty_filters();
        // Calculate Strength
        this.CalculateStrength();
        // Filtering Data
        this.FilterData();
    }

    /**
     * Delete Account from database
     * and remove form list
     * */
    DeleteAccount(id) {
        this.List = this.List.filter((account) => {
            return account.Id !== id;
        });
        // TODO: Delete account from database
        this.empty_filters();
        // Calculate Strength
        this.CalculateStrength();
        // Filtering Data
        this.FilterData();
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
        console.log("[+] filter data update")
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
            // console.log(account)

        }
        // TODO: not working
    }
}