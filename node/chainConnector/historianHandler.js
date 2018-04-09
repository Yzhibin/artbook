const networkConnection = require('./networkConnection')
var prettyoutput = require('prettyoutput');

class historianHandler {

    constructor(cardname) {
        this.cardname = cardname
    }

    async viewConsentHistory() {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        console.log(this.cardname)
        await conn.init(this.cardname)

        try {
            //get history
            //let historian = await conn.bizNetworkConnection.getHistorian();
            //let historianRecords = await historian.getAll();
            //console.log(prettyoutput(historianRecords));
            
            // let q1 = conn.bizNetworkConnection.buildQuery(
            //     `SELECT org.hyperledger.composer.system.HistorianRecord
            //         WHERE (transactionType == 'markMissingArtwork')`
            // );   
            
            // let historianRecords = await conn.bizNetworkConnection.query(q1);  

            // console.log(prettyoutput(historianRecords));

            this.consentRegistry = await conn.bizNetworkConnection.getTransactionRegistry('org.acme.artbook.consentArtworkForSale')

            let consentRecords = await this.consentRegistry.resolveAll();
            console.log(prettyoutput(consentRecords));
            //let results = await historian.resolveAll();
            await conn.bizNetworkConnection.disconnect()
            return consentRecords

            

        } catch (error) {
            console.log(error)
            console.log('historianHandler:viewAllHistory', error)
            throw error
        }

    };

    async viewTransferHistory() {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        console.log(this.cardname)
        await conn.init(this.cardname)

        try {
            //get history
            //let historian = await conn.bizNetworkConnection.getHistorian();
            //let historianRecords = await historian.getAll();
            //console.log(prettyoutput(historianRecords));
            
            // let q1 = conn.bizNetworkConnection.buildQuery(
            //     `SELECT org.hyperledger.composer.system.HistorianRecord
            //         WHERE (transactionType == 'markMissingArtwork')`
            // );   
            
            // let historianRecords = await conn.bizNetworkConnection.query(q1);  

            // console.log(prettyoutput(historianRecords));

            this.transferRegistry = await conn.bizNetworkConnection.getTransactionRegistry('org.acme.artbook.transferOwnership')

            let transferRecords = await this.transferRegistry.resolveAll();
            console.log(prettyoutput(transferRecords));
            //let results = await historian.resolveAll();
            await conn.bizNetworkConnection.disconnect()
            return transferRecords

            

        } catch (error) {
            console.log(error)
            console.log('historianHandler:viewAllHistory', error)
            throw error
        }

    }
}

module.exports = historianHandler