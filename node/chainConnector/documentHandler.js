const networkConnection = require('./networkConnection')
const uuidv4 = require('uuid/v4')

class documentHandler {

    constructor(cardname) {
        this.cardname = cardname
    }

    /**
     * 
     * @param userInfo
     * userId: String
     * name: String
     */
    async addDocument(documentInfo) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        console.log(this.cardname)
        await conn.init(this.cardname)

        try {
            // Get Registry
            this.supportingDocumentRegistry = await conn.bizNetworkConnection.getAssetRegistry('org.acme.artbook.SupportingDocument')
            this.artworkRegistry = await conn.bizNetworkConnection.getAssetRegistry('org.acme.artbook.Artwork')
            
            // Get Factory
            let factory = conn.businessNetworkDefinition.getFactory()

            // Create Document
            let newDocument = factory.newResource('org.acme.artbook', 'SupportingDocument', uuidv4())
            newDocument.title = documentInfo.title
            newDocument.fileId = documentInfo.fileId
            newDocument.issueDate = documentInfo.issueDate
            newDocument.author = documentInfo.author
           
            //link to artwork
            let artwork = await this.artworkRegistry.get(documentInfo.artworkId)

            let artworkRelation = factory.newRelationship('org.acme.artbook', 'Artwork', documentInfo.artworkId)
            newDocument.art = artworkRelation
            console.log('Document linked to ' + documentInfo.artworkId)

            // Update Registry
            await this.supportingDocumentRegistry.add(newDocument)
            console.log('New document added')
            return conn.bizNetworkConnection.disconnect()

        } catch (error) {
            console.log(error)
            console.log('documentHandler:addDocument', error)
            throw error
        }
    }

}
module.exports = documentHandler