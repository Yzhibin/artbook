'use strict';
/**
 * Link an artwork to an agency to show it as for_sale
 * @param {org.acme.artbook.consentArtworkForSale} consent: the consentArtworkForSale transaction instance
 * @transaction
 */
function consentArtworkForSale(consent){
    consent.art.handler = consent.agency;
    consent.art.onSale = true;
    
    return getParticipantRegistry('org.acme.artbook.Agency')
    .then (function (AgencyRegistry){
        return AgencyRegistry.update(consent.agency);
    }).then(function (){
    return getAssetRegistry('org.acme.artbook.Artwork')})
    .then (function (ArtworkRegistry){
        return ArtworkRegistry.update(consent.art);
    })
}

/**
 * initiate a trading process by informing buyer to pay deposit to third-party payment solution partner.
 * @param {org.acme.artbook.requestForDeposit} request: the requestForDeposit transaction instance
 * @transaction
 */
function requestForDeposit(request){
    //add currentTradingPrice to the artwork 
    //having a currentTradingPrice indicates that the artwork is under a trading process
    request.art.currentTradingPrice = request.price;
    
    //update the artwork
    return getAssetRegistry('org.acme.artbook.Artwork')
    .then (function (ArtworkRegistry){
        return ArtworkRegistry.update(request.art);
    })
}

/**
 * mark the status that now the buyer's deposit has been verified as paid.
 * @param {org.acme.artbook.confirmDeposit} confirm: the confirmDeposit transaction instance
 * @transaction
 */
function confirmDeposit(confirm){
    //add depositOnHold to the artwork 
    //having a depositOnHold indicates that buyer has placed his deposit
    //the artwork is ready for final step: ownership transfer 
    confirm.art.depositOnHold = true;
    
    //update the artwork
    return getAssetRegistry('org.acme.artbook.Artwork')
    .then (function (ArtworkRegistry){
        return ArtworkRegistry.update(confirm.art);
    })
}

/**
 * the owner transfers ownership of his artwork
 * @param {org.acme.artbook.transferOwnership} transfer: the transferOwnership transaction instance
 * @transaction
 */
function transferOwnership(transfer){
    //change the owner of the artwork
    transfer.art.owner = transfer.newOwner;
    
    //toggle on_sale status
    transfer.art.onSale = false; 
    //reset all indicators to normal status 
    transfer.art.handler = null;   
    transfer.art.currentTradingPrice = null;
    transfer.art.depositOnHold = false; //assume that payment allocation has been completed by third-party payment partner
    
    //update the artwork
    return getAssetRegistry('org.acme.artbook.Artwork')
    .then (function (ArtworkRegistry){
        return ArtworkRegistry.update(transfer.art);
    })
}

/**
 * transfer ownership of an artwork
 * @param {org.acme.artbook.markMissingArtwork} mark: the markMissingArtwork transaction instance
 * @transaction
 */
function markMissingArtwork(mark){
    mark.art.lost = true;
    //update the artwork
    return getAssetRegistry('org.acme.artbook.Artwork')
    .then (function (ArtworkRegistry){
        return ArtworkRegistry.update(mark.art);
    })
    
}

/**
 * transfer ownership of an artwork
 * @param {org.acme.artbook.recoverMissingArtwork} recover: the markMissingArtwork transaction instance
 * @transaction
 */
function recoverMissingArtwork(recover){
    recover.art.lost = false;
    //update the artwork
    return getAssetRegistry('org.acme.artbook.Artwork')
    .then (function (ArtworkRegistry){
        return ArtworkRegistry.update(recover.art);
    })
    
}