const networkConnection = require('./networkConnection')

module.exports = class artworkHandler {

    constructor(cardname) {
        this.cardname = cardname
        this.cardname = 'admin@artbook' //For testing
    }

    /**
     * 
     * @param artworkInfo
     * artworkId: String
     * title: String
     * artist: String
     * lost: Boolean
     * ownerId: String
     */
    async createArtwork(artworkInfo) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        await conn.init(this.cardname)

        try {
            // Get Registry
            this.artworkRegistry = await conn.bizNetworkConnection.getAssetRegistry('org.acme.artbook.Artwork')
            this.userRegistry = await conn.bizNetworkConnection.getParticipantRegistry('org.acme.artbook.User')

            // Get Factory
            let factory = conn.businessNetworkDefinition.getFactory()

            // Create Artwork
            let artwork = factory.newResource('org.acme.artbook', 'Artwork', artworkInfo.artworkId)

            // Get User
            let owner = this.userRegistry.get(artworkInfo.ownerId)
            let ownerRelation = factory.newRelationship('org.acme.artbook', 'User', artworkInfo.ownerId)
            artwork.owner = ownerRelation

            let artworkRelation = factory.newRelationship('org.acme.artbook', 'Artwork', artworkInfo.artworkId)
            owner.artworks.push(artworkRelation)

            // Update Registry
            await this.artworkRegistry.add(artwork)
            await this.userRegistry.update(owner)
            console.log('New artwork added')
            return conn.bizNetworkConnection.disconnect()
        } catch (error) {
            console.log(error)
            console.log('artworkHandler:createArtwork', error)
            throw error
        }
    }

    /**
     * 
     * @param artworkId: String
     */
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

}