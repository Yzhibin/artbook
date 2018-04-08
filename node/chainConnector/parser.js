

    exports.artworkOnChain = function(artwork){
        return {
            artworkId: artwork.artworkId,
            title: artwork.title,
            artist: artwork.artist,
            createTime: artwork.createTime,
            location: artwork.location,
            description: artwork.description,
            lost: artwork.lost,
            onSale: artwork.onSale,
            pictures: artwork.pictures,
            //relations
            ownerId: artwork.owner.getIdentifier(),
            handlerId: artwork.handler.getIdentifier()
        }
    };

