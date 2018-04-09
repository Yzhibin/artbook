const networkConnection = require('./networkConnection')

class authorityHandler {

    constructor(cardname) {
        this.cardname = cardname
    }

    /**
     * 
     * @param authorityInfo
     * userId: String
     * name: String
     */
    async createAuthority(authorityInfo) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        console.log(this.cardname)
        await conn.init(this.cardname)

        try {
            // Get Registry
            this.authorityRegistry = await conn.bizNetworkConnection.getParticipantRegistry('org.acme.artbook.Authority')

            // Get Factory
            let factory = conn.businessNetworkDefinition.getFactory()

            // Create Authority
            let authority = factory.newResource('org.acme.artbook', 'Authority', authorityInfo.userId)
            authority.name = authorityInfo.name

            // Update Registry
            await this.authorityRegistry.add(authority)

            // Issue an identity card for this Staff. The ID Card is exported to current direcotry
            let result = await bizNetworkConnection
                .issueIdentity(`org.acme.artbook.Authority#${authorityInfo.userId}`, authorityInfo.userId)
            console.log('New authority added')
            await conn.bizNetworkConnection.disconnect()
            return result
        } catch (error) {
            console.log(error)
            console.log('authorityHandler:createAuthority', error)
            throw error
        }
    }
    
    async getAuthority(account) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        console.log(`cardname: ${this.cardname}`)
        await conn.init(this.cardname)
        try {
            // Get Registry
            this.authorityRegistry = await conn.bizNetworkConnection.getParticipantRegistry('org.acme.artbook.Authority')
            let result = await this.authorityRegistry.resolve(account)
            await conn.bizNetworkConnection.disconnect()
            return result
        } catch (error) {
            console.log(error)
            console.log('authorityHandler:getAuthority', error)
            throw error
        }
    }
}
module.exports = authorityHandler