const networkConnection = require('./networkConnection')
const cardHandler = require('./cardHandler')

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
    async createBranch(userInfo) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        console.log(this.cardname)
        await conn.init(this.cardname)

        try {
            // Get Registry
            this.branchRegistry = await conn.bizNetworkConnection.getParticipantRegistry('org.acme.artbook.Branch')

            // Get Factory
            let factory = conn.businessNetworkDefinition.getFactory()

            // Create Authority
            let branch = factory.newResource('org.acme.artbook', 'Branch', userInfo.userId)
            branch.name = userInfo.name
            branch.address = userInfo.address

            // Update Registry
            await this.branchRegistry.add(branch)

            // Issue an identity card for this Staff. The ID Card is exported to current direcotry
            let result = await conn.bizNetworkConnection
                .issueIdentity(`org.acme.artbook.Branch#${userInfo.userId}`, userInfo.userId)
            const cardHandlerInstance = new cardHandler()
            await cardHandlerInstance.getBusinessInfoByImportedCard(result.userID, result.userSecret, 'user', 'artbook')

            console.log('New authority - branch added')
            await conn.bizNetworkConnection.disconnect()
            return result
        } catch (error) {
            console.log(error)
            console.log('authorityHandler:createBranch', error)
            throw error
        }
    }

    async getBranch(account) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        console.log(`cardname: ${this.cardname}`)
        await conn.init(this.cardname)
        try {
            // Get Registry
            this.branchRegistry = await conn.bizNetworkConnection.getParticipantRegistry('org.acme.artbook.Branch')
            let result = await this.branchRegistry.resolve(account)
            await conn.bizNetworkConnection.disconnect()
            return result
        } catch (error) {
            console.log(error)
            console.log('authorityHandler:getBranch', error)
            throw error
        }
    }

    async createPolice(userInfo) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        console.log(this.cardname)
        await conn.init(this.cardname)

        try {
            // Get Registry
            this.policeRegistry = await conn.bizNetworkConnection.getParticipantRegistry('org.acme.artbook.Police')

            // Get Factory
            let factory = conn.businessNetworkDefinition.getFactory()

            // Create Authority
            let police = factory.newResource('org.acme.artbook', 'Police', userInfo.userId)
            police.name = userInfo.name
            police.jurisdiction = userInfo.jurisdiction

            // Update Registry
            await this.policeRegistry.add(police)

            // Issue an identity card for this Staff. The ID Card is exported to current direcotry
            let result = await conn.bizNetworkConnection
                .issueIdentity(`org.acme.artbook.Police#${userInfo.userId}`, userInfo.userId)
            console.log('New authority - police added')
            await conn.bizNetworkConnection.disconnect()
            return result
        } catch (error) {
            console.log(error)
            console.log('authorityHandler:createPolice', error)
            throw error
        }
    }

    async getPolice(account) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        console.log(`cardname: ${this.cardname}`)
        await conn.init(this.cardname)
        try {
            // Get Registry
            this.policeRegistry = await conn.bizNetworkConnection.getParticipantRegistry('org.acme.artbook.Police')
            let result = await this.policeRegistry.resolve(account)
            await conn.bizNetworkConnection.disconnect()
            return result
        } catch (error) {
            console.log(error)
            console.log('authorityHandler:getPolice', error)
            throw error
        }
    }
}
module.exports = authorityHandler