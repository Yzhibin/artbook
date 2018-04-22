// The only npm module required for Hyperledger Composer client application
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection

class networkConnection {

    /**
     * Need to have the mapping from bizNetwork name to the URLs to connect to.
     * bizNetwork nawme will be able to be used by Composer to get the suitable model files.
     *
     */
     constructor() {
         this.bizNetworkConnection = new BusinessNetworkConnection()
     }

    /** 
     * @description Initalizes the LandRegsitry by making a connection to the Composer runtime
     * @return {Promise} A promise whose fullfillment means the initialization has completed
     */
     async init(cardname) {
        //  For testing
        // cardname = 'admin@artbook'
        this.businessNetworkDefinition = await this.bizNetworkConnection.connect(cardname)
     	console.log('networkConnection:<init>', 'businessNetworkDefinition obtained', this.businessNetworkDefinition.getIdentifier())
     }

     /**
      * Listen for the transaction events
      */
      listen() {
      	this.bizNetworkConnection.on('event', (evt) => {
      		console.log('New Event')
      		console.log(evt)

      		let options = {
      			properties: { key:'value'}
      		}
      	})
      }
}

module.exports = networkConnection