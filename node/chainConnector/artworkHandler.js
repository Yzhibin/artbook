const networkConnection = require('./networkConnection')
const uuidv4 = require('uuid/v4')
//const parser = require('./parser')

class artworkHandler {

    constructor(cardname) {
        this.cardname = cardname
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

            var id = uuidv4()
            console.log(id)
            // Create Artwork
            let artwork = factory.newResource('org.acme.artbook', 'Artwork', id)
            artwork.title = artworkInfo.title
            artwork.artist = artworkInfo.artist
            artwork.createTime = artworkInfo.createTime
            artwork.location = artworkInfo.location
            artwork.description = artworkInfo.description
            artwork.lost = false
            artwork.onSale = false
            artwork.pictures = []

            // Get User
            let owner = await this.userRegistry.get(artworkInfo.ownerId)

            let ownerRelation = factory.newRelationship('org.acme.artbook', 'User', artworkInfo.ownerId)
            artwork.owner = ownerRelation
            await this.artworkRegistry.add(artwork)
            console.log('New artwork added')

            let result = await this.artworkRegistry.resolve(id)
            conn.bizNetworkConnection.disconnect()
            return result
        } catch (error) {
            console.log(error)
            console.log('artworkHandler:createArtwork', error)
            throw error
        }
    }


    async addPicture(pictureInfo) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        console.log(this.cardname)
        await conn.init(this.cardname)

        try {
            //get Artwork
            this.artworkRegistry = await conn.bizNetworkConnection.getAssetRegistry('org.acme.artbook.Artwork')
            let artwork = await this.artworkRegistry.get(pictureInfo.artworkId)

            //add picture path (documentId in mongoDB) to artwork asset
            artwork.pictures.push(pictureInfo.fileId);

            //update Registry
            await this.artworkRegistry.update(artwork)
            let result = await this.artworkRegistry.resolve(pictureInfo.artworkId)
            conn.bizNetworkConnection.disconnect()

            return result

        } catch (error) {
            console.log(error)
            console.log('artworkHandler:addPicture', error)
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
            let result = await this.artworkRegistry.resolve(artworkId)
            conn.bizNetworkConnection.disconnect()
            return result
        } catch (error) {
            console.log(error)
            console.log('artworkHandler:Artwork', error)
            throw error
        }

    }

    /** 
     * 
     * @argument req
     * agencyId
     * artworkId
    */
    async consentForSale(req) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        await conn.init(this.cardname)

        try {
            // Get Registry
            this.artworkRegistry = await conn.bizNetworkConnection.getAssetRegistry('org.acme.artbook.Artwork')
            this.userRegistry = await conn.bizNetworkConnection.getParticipantRegistry('org.acme.artbook.User')
            this.consentRegistry = await conn.bizNetworkConnection.getTransactionRegistry('org.acme.artbook.consentArtworkForSale')

            // Get Factory
            let factory = await conn.businessNetworkDefinition.getFactory()

            let agencyRelation = await factory.newRelationship('org.acme.artbook', 'Agency', req.agencyId)
            let artworkRelation = await factory.newRelationship('org.acme.artbook', 'Artwork', req.artworkId)

            console.log('1')
            let consent = await factory.newTransaction('org.acme.artbook', 'consentArtworkForSale')
            consent.agency = agencyRelation
            consent.art = artworkRelation
            console.log('2')
            let result = await conn.bizNetworkConnection.submitTransaction(consent)
            console.log('3')
            conn.bizNetworkConnection.disconnect()
            return result
        } catch (error) {
            console.log(error)
            console.log('artworkHandler:consentForSale', error)
            throw error
        }
    }

}

module.exports = artworkHandler