'use strict';

/**
 * Register a new artwork to the system
 * @param {org.acme.artbook.registerNewArtwork} artwork:the registerNewArtwork transaction instance
 * @transaction
 */
function registerNewArtwork (artwork){
    var factory = this.businessNetworkDefinition.getFactory();
    newArt = factory.newResource('org.acme.artbook','Artwork', artwork.artworkId);
    newArt.title = artwork.title;
    newArt.artist = artwork.artist;
    newArt.owner = artwork.owner;

    return getAssetRegistry('org.acme.artbook.Artwork')
    .then (function (artworkRegistry){
        return artworkRegistry.update(newArt);
    })
}