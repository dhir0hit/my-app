import {expectNoConsoleError} from "react-native/Libraries/Utilities/ReactNativeTestTools";

const CryptoJS = require('crypto-js');

export default class Account {
    /**
     * Setting Decrypted data
     * Usually comes from app or user or newly created account
     * most data get encrypted
     * */
    constructor(username=undefined,
                password=undefined,
                platform=undefined,
                website=undefined,
                additionalInfo=undefined,
                favorite=false,
                createdOn=undefined,
                editedOn=undefined,
                _id=undefined) {
        /*
        * Encrypting data
        * */
        this._username_ =
            username === undefined ?
                username :
                CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(username));
        this._password_ =
            password === undefined ?
                password :
                CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(password));
        this._platform_ =
            platform === undefined ?
                platform :
                CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(platform));
        this._website_ =
            website === undefined ?
                website :
                CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(website));
        this._additionalInfo_ =
            additionalInfo === undefined ?
                additionalInfo :
                CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(additionalInfo));
        this._favorite_ = favorite;
        this._id_ = _id;
        this._createdOn_ = createdOn;
        this._editedOn_ = editedOn;

        // setting creation and Edited date
        if (!this._createdOn_) {
            console.log("not empty", this._createdOn_)
            this._NewCreatedOn_();
        }
        if (!this._editedOn_){
            this._NewEditedOn_();
        }
    }

    /**
     * Setting encrypted Data
     * Usually comes from DataBase
     * @param account Json format
     * ["account_id", "username", "password", "platform", "website", "additional_info", "favorite", "created_on", "edited_on"]
     * */
    SetEncryptedData(account) {
        this._id_ = account["id"];
        this._username_ = account["username"];
        this._password_ = account["password"];
        this._platform_ = account["platform"];
        this._website_ = account["website"];
        this._additionalInfo_ = account["additionalInfo"];
        this._favorite_ = account["favorite"];
        this._createdOn_ = account["createdOn"];
        this._editedOn_ = account["editedOn"];
    }

    /**
     * @return Array
     * @returns Decrypted Account Data
     * */
    get DecryptedData() {
        return Array.of(this._id_,
            CryptoJS.enc.Base64.parse(this._username_).toString(CryptoJS.enc.Utf8),
            CryptoJS.enc.Base64.parse(this._password_).toString(CryptoJS.enc.Utf8),
            CryptoJS.enc.Base64.parse(this._platform_).toString(CryptoJS.enc.Utf8),
            CryptoJS.enc.Base64.parse(this._website_).toString(CryptoJS.enc.Utf8),
            CryptoJS.enc.Base64.parse(this._additionalInfo_).toString(CryptoJS.enc.Utf8),
            this._favorite_,
            this._createdOn_,
            this._editedOn_)
    }


    /**
     * @return Array
     * @returns Encrypted Account Data
     * */
    get EncryptedData() {
        return Array.of(this._id_,
            this._username_,
            this._password_,
            this._platform_,
            this._website_,
            this._additionalInfo_,
            this._favorite_,
            this._createdOn_,
            this._editedOn_)
    }

    /**
     * get username
     * @return _username_
     * @returns decrypted username as string
     * */
    get Username() {
        return CryptoJS.enc.Base64.parse(this._username_).toString(CryptoJS.enc.Utf8);
    }

    /**
     * Sets new username and update edit date
     * @param value New _Username_
     * */
    set Username(value) {
        // setting new username
        this._username_ = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value));
        // changing Edit date
        this._NewEditedOn_();
    }

    /**
     * get encrypted password
     * @return _password_
     * @returns encrypted password as string
     * */
    get encryptedPassword() {
        return this._password_;
    }

    /**
     * get decrypted password
     * @return _password_
     * @returns decrypted password as string
     * */
    get Password() {
        return CryptoJS.enc.Base64.parse(this._password_).toString(CryptoJS.enc.Utf8);
    }

    /**
     * Sets new password and update edit date
     * @param value new _password_
     * */
    set Password(value) {
        // setting new password
        this._password_ = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value));
        // changing Edit date
        this._NewEditedOn_();
    }

    /**
     * get platform
     * @return _platform_
     * @returns decrypted _platform_ as string
     * */
    get Platform() {
        return CryptoJS.enc.Base64.parse(this._platform_).toString(CryptoJS.enc.Utf8);
    }

    /**
     * Sets new Platform and update edit date
     * @param value New _platform_
     * */
    set Platform(value) {
        // setting new platform
        this._platform_ = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value));
        // changing Edit date
        this._NewEditedOn_();
    }

    /**
     * get website
     * @return _website_
     * @returns decrypted website as string
     * */
    get Website() {
        return CryptoJS.enc.Base64.parse(this._website_).toString(CryptoJS.enc.Utf8);
    }

    /**
     * Sets new website and update edit date
     * @param value New _website_
     * */
    set Website(value) {
        // setting new website
        this._website_ = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value));
        //changing Edit date
        this._NewEditedOn_();
    }

    /**
     * get AdditionalInfo
     * @return _additionalInfo_
     * @returns decrypted additionalInfo as string
     * */
    get AdditionalInfo() {
        return CryptoJS.enc.Base64.parse(this._additionalInfo_).toString(CryptoJS.enc.Utf8);
    }

    /**
     * Sets new additionalInfo and update edit date
     * @param value New _additionalInfo_
     * */
    set AdditionalInfo(value) {
        // setting new additional info
        this._additionalInfo_ = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value));
        // changing Edit date
        this._NewEditedOn_();
    }

    /**
     * get favorite
     * @return _favorite_
     * @returns favorite as boolean
     * */
    get Favorite() {
        return this._favorite_;
    }

    /**
     * Sets new favorite and update edit date
     * @param value New _favorite_
     * */
    set Favorite(value) {
        // setting new favorite
        this._favorite_ = value;
        // changing Edit date
        this._NewEditedOn_();
    }

    /**
     * get Id
     * @return _id_
     * @returns _id_ as uuid
     * */
    get Id() {
        return this._id_;
    }

    /**
     * sets new Id
     * @param value new id
     * */
    set Id(value) {
        this._id_ = value
    }


    /**
     * get CreatedOn
     * @return _createdOn_
     * @returns _createdOn_ as string date
     * */
    get CreatedOn() {
        return this._createdOn_;
    }

    /**
     * Sets new createdOn only when account is created
     * */
    _NewCreatedOn_() {
        // new instance of Date Object
        const date = new Date();
        // setting new date as string
        this._createdOn_ = date.toString();
    }

    /**
     * get EditedOn
     * @return _editedOn_
     * @returns _editedOn_ as string Date
     * */
    get EditedOn() {
        return this._editedOn_;
    }

    /**
     * Sets new Edited On Date
     * called everytime when field/item is set
     * */
    _NewEditedOn_() {
        // new instance of Date Object
        const date = new Date()
        // setting new edited On date
        this._editedOn_ = date.toString();
    }
}
