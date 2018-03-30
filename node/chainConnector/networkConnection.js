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
        cardname = 'admin@artbook'
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

     /** 
    * bootstrap into the resgitry a few example assets
    * @return {Promise} resolved when the assets have been created
    */
    async _bootstrap() {
    	console.log('NetworkConnection:_bootstrap', 'getting asset registry for "org.acme.jtcps.Wallet"')
    	console.log('about to get asset registry')


    	try {
    		this.walletRegistry = await this.bizNetworkConnection.getAssetRegistry('org.acme.jtcps.Wallet')
            this.staffRegistry = await this.bizNetworkConnection.getParticipantRegistry('org.acme.jtcps.Staff')

            // got the assest registry
                console.log('NetworkConnection:_bootstrap', 'got asset registry')
                console.log('NetworkConnection:_bootstrap', 'getting factory and adding assets')
                let factory = this.businessNetworkDefinition.getFactory()

                console.log('NetworkConnection:_bootstrap', 'Creating a wallet')
                let wallet = factory.newResource('org.acme.jtcps', 'Wallet', 'walletId:1')
                wallet.balance = 200
                let walletRelation = factory.newRelationship('org.acme.jtcps', 'Wallet', 'walletId:1')

                console.log('NetworkConnection:_bootstrap', 'Creating a staff')
                let staff = factory.newResource('org.acme.jtcps', 'Staff', 'staffId:yuzb')
                staff.firstName = 'Zhibin'
                staff.lastName = 'Yu'
                staff.department = 'SED'
                staff.wallet = walletRelation
                let staffRelation = factory.newRelationship('org.acme.jtcps', 'Staff', 'staffId:yuzb')
                wallet.owner = staffRelation
                console.log('NetworkConnection:_bootstrap', 'Adding these to the registry')
                
                await this.walletRegistry.add(wallet)
                await this.staffRegistry.add(staff)
            } catch(error) {
            	console.log(error)
            	LOG.error('NetworkConnection:_bootstrap', error)
            	throw error
            }


        // this.createStaffAndWalletAssets(['yuzb','Zhibin','Yu', 'SED', '1', '200'])
        // this.createStaffAndWalletAssets(['shity','Tianyuan','Shi', 'SED', '2', '200'])
    }



    // Dont know how to use
    /**
    * @description - run the add default assets command
    * @param {Object} args passed from the command line
    * @return {Promise} resolved when complete
    */
    static async addDefaultCmd(args) {
    	let conn = new networkConnection('jtcpsInstance');
    	await conn.init();
    	let results = await conn._bootstrap();
    	console.log('Default assets added');
    }
}

module.exports = networkConnection