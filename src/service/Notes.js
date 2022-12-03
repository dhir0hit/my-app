import Note from "../model/Note"
import Account from "../model/Account";


export default class Notes {
    constructor() {
        // All Accounts List
        this.List = [new Note()]
        // Pinned Accounts List
        this.pinnedList = []

        // Loading Data
        this.load_data();
        // Filtering Data
        this.FilterData();
    }

    load_data() {
        /*
        * TODO: Create Connection with database
        * */
    }


    /**
     * Add note to database
     * and add in list
     * @param note Note model
     * */
    CreateAccount(note) {
        this.List.push(note)

        console.log(this.List)

        // TODO: Add account to database

        // Filtering Data
        this.FilterData();
    }

    /**
     * Update note from database
     * and update from list
     * */
    UpdateAccount(newNote) {
        this.List.map((note) => {
            return note.Id === newNote.Id
                ? newNote
                : note;
        })
        // TODO: Update Account from database
    }

    /**
     * Delete Account from database
     * and remove form list
     * */
    DeleteAccount(id) {
        this.List = this.List.filter((note) => {
            return note.Id !== id;
        });
        // TODO: Delete account from database
    }

    /**
     * Filtering Data got from database
     * */
    FilterData() {
        for (const note of this.List) {
            /*
            * Pinned Accounts
            * */
            if (note.Pinned) {
                this.pinnedList.concat(note);
            }
        }
    }
}