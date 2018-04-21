/* eslint-disable */
// import { baseUrl } from './const';

// path to be used to connect middleware running on virtual machine
export const VM_PATH = "http://172.25.96.201:3000/" 
// path to be used to connect middleware running on local machine
export const LOCAL_PATH = "http://localhost:3000/"


// export const baseUrl = VM_PATH
// uncomment the line above and comment the line below to use middleware running on virtual machine
export const baseUrl = LOCAL_PATH

export const artworks = [
  {
    $class: "org.acme.artbook.Artwork",
    artworkId: "ef58c8ca-19ca-4980-a21c-43fc54819f2b",
    title: "A dummy painting in const.js",
    artist: "Vincent van Gogh",
    createTime: "2018-10-2",
    location: "paris",
    description: "xxx",
    lost: false,
    onSale: false,
    pictures: [],
    owner: {
      $class: "org.acme.artbook.User",
      email: "fff@gmail.com",
      name: "Yu Zhibin",
      passport: "123",
      mobile: "456"
    }
  }
];

export const allArtworks = [
  {
    artworkID: "a9f1814c-8320-4c76-80d5-85ecb9bed808",
    artworkTitle: "A World Famous Painting",
    artworkArtist: "Vincent Van Goh",
    artworkOwner: "STY",
    artworkImage: "https://d2jv9003bew7ag.cloudfront.net/uploads/Claude-Monet-Water-Lilies.-Image-via-wikimedia.com_.jpg"
  },
  {
    artworkID: "86d8ce51-192f-42f8-aa3d-f6c0474ddc25",
    artworkTitle: "A World Famous Painting",
    artworkArtist: "Vincent Van Goh",
    artworkOwner: "STY",
    artworkImage: "https://d2jv9003bew7ag.cloudfront.net/uploads/Claude-Monet-Water-Lilies.-Image-via-wikimedia.com_.jpg"
  },
  {
    artworkID: "fdaa5245-4e68-4757-9933-4afc5e9720ad",
    artworkTitle: "A World Famous Painting",
    artworkArtist: "Vincent Van Goh",
    artworkOwner: "STY",
    artworkImage: "https://d2jv9003bew7ag.cloudfront.net/uploads/Claude-Monet-Water-Lilies.-Image-via-wikimedia.com_.jpg"
  },
  {
    artworkID: '0c43dbc7-0375-4f9d-82aa-5d3118e5bdd6',
      artworkTitle: 'A World Famous Painting',
      artworkArtist: 'Vincent Van Goh',
      artworkOwner: 'STY',
      artworkImage: "https://d2jv9003bew7ag.cloudfront.net/uploads/Claude-Monet-Water-Lilies.-Image-via-wikimedia.com_.jpg"
  }
];

export const docs = [
  {
    id: 1,
    name: "Document 1",
    path:
      "https://ia.media-imdb.com/images/M/MV5BMzU1MjhlNmEtZGJlNS00ZWExLWJiNGYtMWZhMjY5OTQ4ZGZjXkEyXkFqcGdeQXRodW1ibmFpbC1pbml0aWFsaXplcg@@._V1_UX477_CR0,0,477,268_AL_.jpg"
  },
  {
    id: 2,
    name: "Document 2",
    path:
      "https://ia.media-imdb.com/images/M/MV5BMzU1MjhlNmEtZGJlNS00ZWExLWJiNGYtMWZhMjY5OTQ4ZGZjXkEyXkFqcGdeQXRodW1ibmFpbC1pbml0aWFsaXplcg@@._V1_UX477_CR0,0,477,268_AL_.jpg"
  }
];
