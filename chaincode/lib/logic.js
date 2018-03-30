'use strict';


/**
 * Store a new supporting document to the system and link it to an artwork
 * @param {org.acme.artbook.addSupportingDocument} doc: the addSupportingDoc transaction instance
 * @transaction
 */
function addSupportingDocument(doc){
    var factory = this.businessNetworkDefinition.getFactory();
    newDoc = factory.newResource('org.acme.artbook','SupportingDocument', doc.documentId);
    newDoc.title = doc.title;
    newDoc.hash = doc.hash;
    newDoc.author = doc.author;
    newDoc.issueDate = doc.issueDate;
    newDoc.art = doc.art;

    return getAssetRegistry('org.acme.artbook.SupportingDocument')
    .then (function (SupportingDocRegistry){
        return SupportingDocRegistry.update(newDoc);
    })
}

/**
 * Link an artwork to an agency to show it as for_sale
 * @param {org.acme.artbook.consentArtworkForSale} consent: the consentArtworkForSale transaction instance
 * @transaction
 */
function consentArtworkForSale(consent){
    consent.agency.artworks.push(consent.agency.art);
    consent.art.handler = consent.agency;
    
    return getAssetRegistry('org.acme.artbook.Agency')
    .then (function (AgencyRegistry){
        return AgencyRegistry.update(consent.agency);
    })
    return getAssetRegistry('org.acme.artbook.Artwork')
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
    //update the artwork
    return getAssetRegistry('org.acme.artbook.Artwork')
    .then (function (ArtworkRegistry){
        return ArtworkRegistry.update(transfer.art);
    })
    //remove this sold art from the artList of the agency
    var artList = transfer.agency.artworks;
    var i = artList.indexOf(transfer.art);
    if(i != -1){
        artList.splice(i,1);
    }
    //update the agency 
    transfer.art.agency.artworks = artList;
    return getAssetRegistry('org.acme.artbook.Agency')
    .then (function (AgencyRegistry){
        return AgencyRegistry.update(transfer.agency);
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
function markMissingArtwork(recover){
    recover.art.lost = false;
    //update the artwork
    return getAssetRegistry('org.acme.artbook.Artwork')
    .then (function (ArtworkRegistry){
        return ArtworkRegistry.update(recover.art);
    })
    
}