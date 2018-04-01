const networkConnection = require('./networkConnection')

class userHandler {

    constructor(cardname) {
        this.cardname = cardname
        this.cardname = 'admin@artbook' //For testing
    }

    /**
     * userInfo:
     * userId
     * name
     */
    async createUser(userInfo) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        console.log('LOG 1')
        console.log(this.cardname)
        await conn.init(this.cardname)
        console.log('LOG 2')

        try {
            // Get Registry
            this.userRegistry = await conn.bizNetworkConnection.getParticipantRegistry('org.acme.artbook.User')

            // Get Factory
            let factory = conn.businessNetworkDefinition.getFactory()

            // Create User
            let user = factory.newResource('org.acme.artbook', 'User', userInfo.userId)
            user.name = userInfo.name
           
            // Update Registry
            await this.userRegistry.add(user)
            console.log('New user added')
            // return conn.bizNetworkConnection.disconnect()
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
module.exports = userHandler