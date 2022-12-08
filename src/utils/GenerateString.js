class GenerateString {
    constructor() {
    }

    /**
     * @param num number how much character needed
     * */
    _String(num) {
        return Math.random().toString(36).slice(-num)
    }

    get Password() {
        // generate password and return
        return this._String(4) + "-" + this._String(4) + "-" + this._String(4) + "-" + this._String(4);
    }
}

