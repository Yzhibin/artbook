const networkConnection = require('./networkConnection')

class agencyHandler {

    constructor(cardname) {
        this.cardname = cardname
    }

    /**
     * 
     * @param userInfo
     * userId: String
     * name: String
     */
    async createUser(userInfo) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        console.log(this.cardname)
        await conn.init(this.cardname)

        try {
            // Get Registry
            this.userRegistry = await conn.bizNetworkConnection.getParticipantRegistry('org.acme.artbook.Agency')

            // Get Factory
            let factory = conn.businessNetworkDefinition.getFactory()

            // Create User
            let user = factory.newResource('org.acme.artbook', 'Agency', userInfo.userId)
            user.name = userInfo.name

            // Update Registry
            await this.userRegistry.add(user)

            // Issue an identity card for this Staff. The ID Card is exported to current direcotry
            let result = await businessNetworkConnection
                .issueIdentity(`org.acme.artbook.Agency#${userInfo.email.replace('@', '*')}@artbook`, userInfo.passport)
            console.log('New user added')
            await conn.bizNetworkConnection.disconnect()
            return result
        } catch (error) {
            console.log(error)
            console.log('userHandler:createUser', error)
            throw error
        }
    }
    /*
        async viewArtwork(artworkId) {
            // Establish connection with blockchain network
            const conn = new networkConnection();
            await conn.init(this.cardname)
    
            try {
                // Get Registry
                this.artworkRegistry = await conn.bizNetworkConnection.getAssetRegistry('org.acme.artbook.Artwork')
                return this.artworkRegistry.get(artworkId)
                .then(function() {
                    return conn.bizNetworkConnection.disconnect()
                })
    
            } catch (error) {
                console.log(error)
                console.log('artworkHandler:Artwork', error)
                throw error
            }
    
        }
    */
}
module.exports = agencyHandler