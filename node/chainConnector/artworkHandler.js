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
            artwork.depositOnHold = false;
            artwork.pictures = []

            // Get User
            //let owner = await this.userRegistry.get(artworkInfo.ownerId)

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
            return error
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
            return error
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
            return this.artworkRegistry.resolve(artworkId)

            conn.bizNetworkConnection.disconnect()

        } catch (error) {
            //console.log(error)
            console.log('artworkHandler:Artwork', error)
            return error
        }

    }

    async getAllArtworks() {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        await conn.init(this.cardname)

        try {
            // Get Registry
            this.artworkRegistry = await conn.bizNetworkConnection.getAssetRegistry('org.acme.artbook.Artwork')
            return this.artworkRegistry.resolveAll()

            conn.bizNetworkConnection.disconnect()

        } catch (error) {
            //console.log(error)
            console.log('artworkHandler:Artwork', error)
            return error
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
            // Get Factory
            let factory = await conn.businessNetworkDefinition.getFactory()

            console.log(req)
            let agencyRelation = await factory.newRelationship('org.acme.artbook', 'Agency', req.agencyId)
            console.log("1")
            let artworkRelation = await factory.newRelationship('org.acme.artbook', 'Artwork', req.artworkId)
            console.log("2")
            let consent = await factory.newTransaction('org.acme.artbook', 'consentArtworkForSale')
            consent.agency = agencyRelation
            consent.art = artworkRelation
            console.log("3")
            let result = await conn.bizNetworkConnection.submitTransaction(consent)

            conn.bizNetworkConnection.disconnect()
            return result
        } catch (error) {
            console.log(error)
            console.log('artworkHandler:consentForSale', error)
            return error
        }
    }

    async getOwnArtworks(ownerId) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        await conn.init(this.cardname)
        try {
            this.artworkRegistry = await conn.bizNetworkConnection.getAssetRegistry('org.acme.artbook.Artwork')
            this.userRegistry = await conn.bizNetworkConnection.getParticipantRegistry('org.acme.artbook.User')

            /********Query******/
            let owner = await this.userRegistry.get(ownerId)
            let query = await conn.bizNetworkConnection.buildQuery('SELECT org.acme.artbook.Artwork WHERE (owner == _$owner)');
            let results = await conn.bizNetworkConnection.query(query, { owner: owner.toURI() });
            console.log("Own Artworks: " + results.length + " results")
            let artworks = []

            for (let n = 0; n < results.length; n++) {
                let art = results[n];
                //console.log(art)
                await artworks.push(await this.artworkRegistry.resolve(art.artworkId))
            }

            conn.bizNetworkConnection.disconnect()

            return artworks

        } catch (error) {
            console.log(error)
            console.log('artworkHandler:Artwork', error)
            return error
        }
    }

    async requestForDeposit(requestInfo) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        await conn.init(this.cardname)

        try {
            // Get Factory
            let factory = await conn.businessNetworkDefinition.getFactory()

            let userRelation = await factory.newRelationship('org.acme.artbook', 'User', requestInfo.buyerId)
            let agencyRelation = await factory.newRelationship('org.acme.artbook', 'Agency', requestInfo.agencyId)
            let artworkRelation = await factory.newRelationship('org.acme.artbook', 'Artwork', requestInfo.artworkId)

            let request = await factory.newTransaction('org.acme.artbook', 'requestForDeposit')
            request.handler = agencyRelation
            request.art = artworkRelation
            request.buyer = userRelation
            request.price = Number.parseFloat(requestInfo.price)

            let result = await conn.bizNetworkConnection.submitTransaction(request)

            conn.bizNetworkConnection.disconnect()
            return result
        } catch (error) {
            console.log('artworkHandler:requestForDeposit', error)
            return error

        }
    }

    async confirmDeposit(confirmInfo) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        await conn.init(this.cardname)

        try {
            // Get Factory
            let factory = await conn.businessNetworkDefinition.getFactory()

            let userRelation = await factory.newRelationship('org.acme.artbook', 'User', confirmInfo.buyerId)
            let artworkRelation = await factory.newRelationship('org.acme.artbook', 'Artwork', confirmInfo.artworkId)

            let confirm = await factory.newTransaction('org.acme.artbook', 'confirmDeposit')

            confirm.art = artworkRelation
            confirm.buyer = userRelation

            let result = await conn.bizNetworkConnection.submitTransaction(confirm)

            conn.bizNetworkConnection.disconnect()
            return result
        } catch (error) {
            console.log('artworkHandler:confirmDeposit', error)
            return error

        }
    }


    /**
     * 
     * @param transferInfo 
     * artworkId
     * agencyId
     * buyerId
     * price
     */
    async transferOwnership(transferInfo) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        await conn.init(this.cardname)

        try {
            // Get Factory
            let factory = await conn.businessNetworkDefinition.getFactory()

            let userRelation = await factory.newRelationship('org.acme.artbook', 'User', transferInfo.buyerId)
            let agencyRelation = await factory.newRelationship('org.acme.artbook', 'Agency', transferInfo.agencyId)
            let artworkRelation = await factory.newRelationship('org.acme.artbook', 'Artwork', transferInfo.artworkId)

            let transfer = await factory.newTransaction('org.acme.artbook', 'transferOwnership')
            transfer.agency = agencyRelation
            transfer.art = artworkRelation
            transfer.newOwner = userRelation
            transfer.price = Number.parseFloat(transferInfo.price)

            let result = await conn.bizNetworkConnection.submitTransaction(transfer)

            conn.bizNetworkConnection.disconnect()
            return result
        } catch (error) {
            console.log('artworkHandler:transferOwnership', error)
            return error
        }
    }


    async markMissing(req) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        await conn.init(this.cardname)

        try {
            this.artworkRegistry = await conn.bizNetworkConnection.getAssetRegistry('org.acme.artbook.Artwork')

            // Get Factory
            let factory = await conn.businessNetworkDefinition.getFactory()

            let documentRelation = await factory.newRelationship('org.acme.artbook', 'SupportingDocument', req.documentId)
            let artworkRelation = await factory.newRelationship('org.acme.artbook', 'Artwork', req.artworkId)

            let missing = await factory.newTransaction('org.acme.artbook', 'markMissingArtwork')
            missing.missingDocument = documentRelation
            missing.art = artworkRelation

            await conn.bizNetworkConnection.submitTransaction(missing)
            console.log(req.artworkId + " is marked to missing")

            let result = await this.artworkRegistry.resolve(req.artworkId)
            conn.bizNetworkConnection.disconnect()
            return result

        } catch (error) {
            console.log('artworkHandler:markMissing', error)
            return error
        }

    }

    async recoverMissing(req) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        await conn.init(this.cardname)

        try {
            this.artworkRegistry = await conn.bizNetworkConnection.getAssetRegistry('org.acme.artbook.Artwork')

            // Get Factory
            let factory = await conn.businessNetworkDefinition.getFactory()

            let documentRelation = await factory.newRelationship('org.acme.artbook', 'SupportingDocument', req.documentId)
            let artworkRelation = await factory.newRelationship('org.acme.artbook', 'Artwork', req.artworkId)

            let recover = await factory.newTransaction('org.acme.artbook', 'recoverMissingArtwork')
            recover.recoveryDocument = documentRelation
            recover.art = artworkRelation

            await conn.bizNetworkConnection.submitTransaction(recover)
            console.log(req.artworkId + " is marked to recovered")

            let result = await this.artworkRegistry.resolve(req.artworkId)
            conn.bizNetworkConnection.disconnect()
            return result

        } catch (error) {
            console.log('artworkHandler:recoverMissing', error)
            return error
        }

    }

    async getAllMissing() {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        await conn.init(this.cardname)
        try {
            this.artworkRegistry = await conn.bizNetworkConnection.getAssetRegistry('org.acme.artbook.Artwork')

            /********Query******/
            let query = await conn.bizNetworkConnection.buildQuery('SELECT org.acme.artbook.Artwork WHERE (lost == true)');
            let results = await conn.bizNetworkConnection.query(query);
            console.log("Missing Artworks: " + results.length + " results")
            let artworks = []

            for (let n = 0; n < results.length; n++) {
                let art = results[n];
                //console.log(art)
                await artworks.push(await this.artworkRegistry.resolve(art.artworkId))
            }

            conn.bizNetworkConnection.disconnect()

            return artworks

        } catch (error) {
            console.log(error)
            console.log('artworkHandler:Artwork', error)
            return error
        }
    }

    async getAgencyArtworks(agencyId) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        await conn.init(this.cardname)
        try {
            this.artworkRegistry = await conn.bizNetworkConnection.getAssetRegistry('org.acme.artbook.Artwork')
            this.agencyRegistry = await conn.bizNetworkConnection.getParticipantRegistry('org.acme.artbook.Agency')

            let agency = await this.agencyRegistry.get(agencyId)

            /********Query******/
            let query = await conn.bizNetworkConnection.buildQuery('SELECT org.acme.artbook.Artwork WHERE (handler == _$agency)');
            let results = await conn.bizNetworkConnection.query(query,{agency: agency.toURI()});

            console.log("Agency OnSale Artworks: " + results.length + " results")
            let artworks = []

            for (let n = 0; n < results.length; n++) {
                let art = results[n];
                //console.log(art)
                await artworks.push(await this.artworkRegistry.resolve(art.artworkId))
            }

            conn.bizNetworkConnection.disconnect()

            return artworks

        } catch (error) {
            console.log(error)
            console.log('artworkHandler:getAgencyArtworks', error)
            return error
        }
    }


}


module.exports = artworkHandler