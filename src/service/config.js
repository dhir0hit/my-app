const ServerConfig =
    {
        api: {
            protocol: "http", // http or https
            hostname: "10.0.0.112", // xxx.xxx.xxx.xxx or www.example.domain.com
            port    : "5000", // 80 || 5000
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
    }

class Config {
    constructor(props) {
    }

    /**
     * Creating Link for index controller api
     * */
    static CheckConnection = `${ServerConfig.api.protocol}://${ServerConfig.api.hostname}:${ServerConfig.api.port}/${ServerConfig.api.index.checkConnection}/`;


    /**
     *  Creating Link for Password manager controller api
     *  */
    static pwdManagerBackendLink = `${ServerConfig.api.protocol}://${ServerConfig.api.hostname}:${ServerConfig.api.port}/${ServerConfig.api.passwordManager.name}/`;
    /*
    * Creating Links to other pages of api
    * */
    static GetAllAccountsLink() {
        // GET ALL ACCOUNTS
        return this.pwdManagerBackendLink + ServerConfig.api.passwordManager.routes.getAll + '/';
    }
    static GetOneAccountLink() {
        // GET ONE ACCOUNT
        return this.pwdManagerBackendLink + ServerConfig.api.passwordManager.routes.getOne + '/';
    }
    static CreateAccountLink() {
        // CREATE ACCOUNT
        return this.pwdManagerBackendLink + ServerConfig.api.passwordManager.routes.create + '/';
    }
    static UpdateAccountLink() {
        // UPDATE ACCOUNT
        return this.pwdManagerBackendLink + ServerConfig.api.passwordManager.routes.update + '/';
    }
    static DeleteAccountLink() {
        // DELETE ACCOUNT
        return this.pwdManagerBackendLink + ServerConfig.api.passwordManager.routes.delete + '/';
    }

    static SendTokenLink() {
        // DELETE ACCOUNT
        return this.pwdManagerBackendLink + ServerConfig.api.passwordManager.routes.sendToken + '/';
    }
}
export default Config;