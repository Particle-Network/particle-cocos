
/**
 * Dapp meta data
 */
 export class DappMetaData {
    url: string
    icon: string
    name: string
    description: string
    walletConnectProjectId: string
    redirect?: string
    verifyUrl?: string

    /**
     * 
     * @param url Dapp website url
     * @param icon Dapp icon url
     * @param name Dapp name
     * @param description Dapp description
     * @param walletConnectProjectId Wallet Connect project id
     * @param redirect Optional
     * @param verifyUrl Optional
     */
    constructor(url: string, icon: string, name: string, description: string, walletConnectProjectId: string, redirect?: string, verifyUrl?: string) {
            this.url = url
            this.icon = icon
            this.name = name
            this.description = description
            this.walletConnectProjectId = walletConnectProjectId
            this.redirect = redirect
            this.verifyUrl = verifyUrl
        }
} 