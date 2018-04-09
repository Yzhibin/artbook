const networkConnection = require('./networkConnection')
const cardHandler = require('./cardHandler')

class agencyHandler {

    constructor(cardname) {
        this.cardname = cardname
    }

    /**
     * 
     * @param agencyInfo
     * userId: String
     * name: String
     */
    async createAgency(agencyInfo) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        console.log(this.cardname)
        await conn.init(this.cardname)

        try {
            // Get Registry
            this.agencyRegistry = await conn.bizNetworkConnection.getParticipantRegistry('org.acme.artbook.Agency')

            // Get Factory
            let factory = conn.businessNetworkDefinition.getFactory()

            // Create Agency
            let agency = factory.newResource('org.acme.artbook', 'Agency', agencyInfo.userId)
            agency.name = agencyInfo.name

            // Update Registry
            await this.agencyRegistry.add(agency)

            // Issue an identity card for this Staff. The ID Card is exported to current direcotry
            let result = await conn.bizNetworkConnection
                .issueIdentity(`org.acme.artbook.Agency#${agencyInfo.userId}`, agencyInfo.userId)
            const cardHandlerInstance = new cardHandler()
            await cardHandlerInstance.getBusinessInfoByImportedCard(result.userID, result.userSecret, 'user', 'artbook')

            console.log('New agency added')
            await conn.bizNetworkConnection.disconnect()
            return result
        } catch (error) {
            console.log(error)
            console.log('agencyHandler:createAgency', error)
            throw error
        }
    }

    async getAgency(agencyEmail) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        console.log(`cardname: ${this.cardname}`)
        await conn.init(this.cardname)
        try {
            // Get Registry
            this.agencyRegistry = await conn.bizNetworkConnection.getParticipantRegistry('org.acme.artbook.Agency')
            let result = await this.agencyRegistry.resolve(agencyEmail)
            await conn.bizNetworkConnection.disconnect()
            return result
        } catch (error) {
            console.log(error)
            console.log('agencyHandler:getAgency', error)
            throw error
        }
    }
}
module.exports = agencyHandler