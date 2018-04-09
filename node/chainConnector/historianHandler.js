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

    async viewTransferHistory(artworkId) {
        // Establish connection with blockchain network
        const conn = new networkConnection();
        console.log(this.cardname)
        await conn.init(this.cardname)

        try {
            //get history
            //let historian = await conn.bizNetworkConnection.getHistorian();
            //let historianRecords = await historian.getAll();
            //console.log(prettyoutput(historianRecords));
            this.artworkRegistry = await conn.bizNetworkConnection.getAssetRegistry('org.acme.artbook.Artwork')
            this.transferRegistry = await conn.bizNetworkConnection.getTransactionRegistry('org.acme.artbook.transferOwnership')

            /********Query******/
            let art = await this.artworkRegistry.get(artworkId)
            let query = await conn.bizNetworkConnection.buildQuery('SELECT org.acme.artbook.transferOwnership WHERE (art == _$art)');
            let results = await conn.bizNetworkConnection.query(query, { art: art.toURI() });
            console.log("Transfer History: " + results.length + " results")
            let records = []

            for (let n = 0; n < results.length; n++) {
                let transfer = results[n];
                //console.log(art)
                await records.push(await this.transferRegistry.resolve(transfer.transactionId))
            }

            conn.bizNetworkConnection.disconnect()

            return records
            
            // let q1 = conn.bizNetworkConnection.buildQuery(
            //     `SELECT org.hyperledger.composer.system.HistorianRecord
            //         WHERE (transactionType == 'markMissingArtwork')`
            // );   
            
            // let historianRecords = await conn.bizNetworkConnection.query(q1);  

            // // console.log(prettyoutput(historianRecords));

            
            // let transferRecords = await this.transferRegistry.resolveAll();
            // console.log(prettyoutput(transferRecords));
            // //let results = await historian.resolveAll();
            // await conn.bizNetworkConnection.disconnect()
            // return transferRecords
            

        } catch (error) {
            console.log(error)
            console.log('historianHandler:viewAllHistory', error)
            throw error
        }

    }
}

module.exports = historianHandler