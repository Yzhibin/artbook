const networkConnection = require('./networkConnection')
const cardHandler = require('./cardHandler')

class userHandler {

    constructor(cardname) {
        this.cardname = cardname
    }

    /**
     * 
     * @param userInfo
     * userId: String
     * name: String
     * passport: String
     * mobile: String
     */
    async createUser(userInfo) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        console.log(`cardname: ${this.cardname}`)
        await conn.init(this.cardname)
        try {
            // Get Registry
            this.userRegistry = await conn.bizNetworkConnection.getParticipantRegistry('org.acme.artbook.User')

            // Get Factory
            let factory = conn.businessNetworkDefinition.getFactory()

            // Create User
            let user = factory.newResource('org.acme.artbook', 'User', userInfo.userId)
            user.name = userInfo.name
            user.passport = userInfo.passport
            user.mobile = userInfo.mobile

            // Update Registry
            await this.userRegistry.add(user)
            // Issue an identity card for this User. The ID Card is exported to current direcotry
            let result = await conn.bizNetworkConnection
                .issueIdentity(`org.acme.artbook.User#${userInfo.userId}`, userInfo.userId)
            const cardHandlerInstance = new cardHandler()
            await cardHandlerInstance.getBusinessInfoByImportedCard(result.userID, result.userSecret, 'user', 'artbook')
            console.log('New user added')
            console.log(result)
            return conn.bizNetworkConnection.disconnect()
        } catch (error) {
            console.log(error)
            console.log('userHandler:createUser', error)
            return error
        }
    }

    async getUser(userEmail) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        console.log(`cardname: ${this.cardname}`)
        await conn.init(this.cardname)
        try {
            // Get Registry
            this.userRegistry = await conn.bizNetworkConnection.getParticipantRegistry('org.acme.artbook.User')
            let result = await this.userRegistry.resolve(userEmail)
            await conn.bizNetworkConnection.disconnect()
            console.log("getUser: " + result)
            return result
        } catch (error) {
            console.log(error)
            console.log('userHandler:getUser', error)
            return error
        }
    }
}
module.exports = userHandler