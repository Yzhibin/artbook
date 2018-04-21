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
            newDocument.summary = documentInfo.summary
           
            //link to artwork
            let artwork = await this.artworkRegistry.get(documentInfo.artworkId)

            let artworkRelation = factory.newRelationship('org.acme.artbook', 'Artwork', documentInfo.artworkId)
            newDocument.art = artworkRelation
            console.log('Document linked to ' + documentInfo.artworkId)

            // Update Registry
            await this.supportingDocumentRegistry.add(newDocument)
            console.log('New document added')
            let result = await this.supportingDocumentRegistry.resolve(newDocument.documentId)
            conn.bizNetworkConnection.disconnect()

            return result

        } catch (error) {
            console.log(error)
            console.log('documentHandler:addDocument', error)
            return error
        }
    }

    async getDocuments(artworkId) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        await conn.init(this.cardname)
        try {
            this.artworkRegistry = await conn.bizNetworkConnection.getAssetRegistry('org.acme.artbook.Artwork')
            this.documentRegistry = await conn.bizNetworkConnection.getAssetRegistry('org.acme.artbook.SupportingDocument')

            /********Queries******/
            let artwork = await this.artworkRegistry.get(artworkId)
            let query = await conn.bizNetworkConnection.buildQuery('SELECT org.acme.artbook.SupportingDocument WHERE (art == _$art)');
            let results = await conn.bizNetworkConnection.query(query, { art: artwork.toURI()});
            console.log("Documents: " + results.length + " results")
            let documents = []

            for (let n = 0; n < results.length; n++) {
                let doc = results[n];
                //console.log(doc)
                await documents.push(await this.documentRegistry.resolve(doc.documentId))
            }

            conn.bizNetworkConnection.disconnect()

            return documents

        } catch (error) {
            console.log(error)
            console.log('artworkHandler:Artwork', error)
            return error
        }
    }


}
module.exports = documentHandler