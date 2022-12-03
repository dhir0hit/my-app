const CryptoJS = require('crypto-js');

class Note {
    constructor(heading=undefined,
                body=undefined,
                pinned = false,
                id=undefined) {
        /*
        * Encrypting data
        * */
        this._heading_ =
            heading === undefined
                ? heading
                : CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(heading));

        this._body_ =
            body === undefined
                ? body
                : CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(body));

        this._pinned_ = pinned;

        this._id_ = id;
    }

    /**
     * @return Array
     * @returns Decrypted Note Data
     * */
    get DecryptedData() {
        return Array.of(this._id_,
            CryptoJS.enc.Base64.parse(this._heading_).toString(CryptoJS.enc.Utf8),
            CryptoJS.enc.Base64.parse(this._body_).toString(CryptoJS.enc.Utf8),
            this._pinned_
        )
    }

    /**
     * @return Array
     * @returns Encrypted Note Data
     * */
    get EncryptedData() {
        return Array.of(this._id_,
            this._heading_,
            this._body_,
            this._pinned_)
    }

    /**
     * Get Id
     * @return _id_
     * @returns id mongodb id
     * */
    get Id() {return this._id_;}

    /**
     * get Heading
     * @return _heading_
     * @returns decrypted heading as string
     * */
    get Heading() {
        return CryptoJS.enc.Base64.parse(this._heading_).toString(CryptoJS.enc.Utf8);
    }

    /**
     * Sets new Heading
     * @param value new _heading_
     * */
    set Heading(value) {
        // setting new heading
        this._heading_ = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value));
    }

    /**
     * get Body
     * @return _body_
     * @returns decrypted body as string
     * */
    get Body() {
        return CryptoJS.enc.Base64.parse(this._body_).toString(CryptoJS.enc.Utf8);
    }

    /**
     * Sets new Body
     * @param value new _body_
     * */
    set Body(value) {
        // setting new body
        this._body_ = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value));
    }

    /**
     * get Pinned
     * @return _pinned_
     * @returns pinned as boolean
     * */
    get Pinned() {
        return this._pinned_;
    }

    /**
     * Sets new Pinned
     * @param value new _pinned_
     * */
    set Pinned(value) {
        this._pinned_ = value;
    }
}