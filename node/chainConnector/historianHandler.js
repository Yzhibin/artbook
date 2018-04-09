const networkConnection = require('./networkConnection')
var prettyoutput = require('prettyoutput');

class historianHandler {

    constructor(cardname) {
        this.cardname = cardname
    }

    async viewAllHistory() {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        console.log(this.cardname)
        await conn.init(this.cardname)

        try {
            //get history
            //let historian = await conn.bizNetworkConnection.getHistorian();
            //let historianRecords = await historian.getAll();
            //console.log(prettyoutput(historianRecords));
            
            let q1 = conn.bizNetworkConnection.buildQuery(
                `SELECT org.hyperledger.composer.system.HistorianRecord
                    WHERE (transactionType == 'markMissingArtwork')`
            );   
            
            let historianRecords = await conn.bizNetworkConnection.query(q1);  

            console.log(prettyoutput(historianRecords));

            this.missingRegistry = await conn.bizNetworkConnection.getTransactionRegistry('org.acme.artbook.markMissingArtwork')

            let missingRecords = await this.missingRegistry.resolveAll();
            console.log(prettyoutput(missingRecords));
            //let results = await historian.resolveAll();
            return conn.bizNetworkConnection.disconnect()

            

        } catch (error) {
            console.log(error)
            console.log('historianHandler:viewAllHistory', error)
            throw error
        }

    }
}

module.exports = historianHandler