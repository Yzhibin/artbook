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
 * transfer ownership of an artwork
 * @param {org.acme.artbook.transferOwnership} transfer: the transferOwnership transaction instance
 * @transaction
 */
function transferOwnership(transfer){
    //change the owner of the artwork
    transfer.art.owner = transfer.newOwner;
    transfer.art.handler = null;    

    //toggle on_sale status
    transfer.art.onSale = false; 
    
    //update the agency 
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