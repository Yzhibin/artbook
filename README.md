# Artbook

## Overview
The ultimate blockchain solution for artwork trade industry

***On the Cloud***

 <s>The Artbook is hosted on Azure cloud server. You may directly access our website: [The Artbook Homepage](http://artbook.southeastasia.cloudapp.azure.com:8080)
 
 
> Artbook cloud will cease its operation on *20 May, 2018*. Please use a local deployement after that date.
>
> Client Application is running on 40.65.191.47:8080 <br>
> Blockchain and middleware server is running on 52.187.128.189:3001 <br>
> *(Powered by Microsoft Azure)*</s>

> Cloud version is no longer available

## Recommended Process of Testing Artbook
To take a look at how Artbook works, you can follow these steps to test all functionalities.

### Data Insertion
> ***Note:*** If you are using the cloud server, you may skip this step. 

Run `insertion.js` to insert necessary accounts for Branch (Artwork branch office), Police, and Agency to your local server.

``` bash
cd ~/artbook/node
node insertion.js
```

###  Play with Artbook
1. Go to [Artbook Homepage](http://artbook.southeastasia.cloudapp.azure.com:8080)
2. Scroll down to see some highlighted artworks being displayed.
3. As a user, click *Individual* at the top-right corner, a log-in window will promt. Then click *Sign up*.
4. Enter your name, email, passport number, phone number, and set a password. Please use a valid email address since the email entered will be used to receive emails at later stage. Other field can be dummy data. This user account A will be ***Seller***
5. Repeat step 3 and step 4 to create another account B, which will be used as ***Buyer***
### Use Case 1 : "Seller A approaches an Artbook branch to register his artwork to be an asset on chain"
> Branch Staff Crendentials<br>
> account: `001`<br>
> password: `123`
6.  Login as Branch staff in a new tab ([Artbook Homepage](http://artbook.southeastasia.cloudapp.azure.com:8080)) --> navigate to *All Artworks* then click *Add New Artwork* --> fill in all required fields (owner email should be A's) and remember to upload a picture of this artwork.
7. After the artwork has been created (the owner is marked as A), staff should proceed to click *add document* to upload some supporting documents to this artwork (this step can also be done anytime in the future)
8. As a branch staff, you can click *view detail* of any artwork on the system. On the artwork detail page, you will be able to inspect the supporting documents and transfer history if any (!Beware that newly created artwork does not have transfer history)
### Use Case 2 : "Seller A gives an agency consent to sell an artwork on behalf of him"
> Agency Crendentials<br>
> email: `gallery@example.com`<br>
> password: `123`
9. Login as Agency staff in aother tab ([Artbook Homepage](http://artbook.southeastasia.cloudapp.azure.com:8080)) --> search the artwork by artworkId provided by A (should be the one you just added!) --> at this step agency should check the documents and status (should be 'normal') to ensure legality and authenticity of the artwork before proceeding to the next step
10. Click *engage owner for consent* --> fill in the ownerEmail (provided by Seller A) and click on the search button, the user detail will be shown, agency staff should double-check this information with A -->  click *confirm* to send out the invitation to owner A. 
11. Open your email (as Seller A) and follow the instructions to open the consent page --> fill in email, password and the otp in the email to give consent. Now you can see the artwork status changed to 'on_sale' at all portals
### Use Case 3 : "Buyer B and Seller A has agreed to a deal. Agency initiates an art trade to transfer the artwork ownership on blockchain" 
12. Go to the Agency staff's tab, you can see all on_sale artworks under this agency --> click on the artwork to be transfered --> on the detail page click *contact buyer for payment* --> fill in the buyerEmail (provided by Buyer B) and click on the search button, the user detail will be shown, agency staff should double-check this information with Buyer B -->  click *confirm* to send out the payment request to buyer B. 
13. Open Buyer B's email and follow the instructions to open the ArtsyCoin (third-party payment partner) mockup page --> click on *pay* to make a deposit and a payment confirmation will be sent back to the system if ArtsyCoin has verified your deposit. Once the system received the confirmation message, a email will be sent to Seller A to ask him to transfer ownership of his artwork to Buyer B.
14. Open Seller A's email and follow the instructions to open the transfer page --> click on *confirm* to submit this transfer of ownership to the blockchain. Once you succeed, the artwork is marked to be owned by B now on all portals.

### Use Case 4: "Police mark an artwork as missing based on a police report"
> Police Officer Crendentials<br>
> account: `100`<br>
> password: `123`

15. Login as Plice officer in a new tab ([Artbook Homepage](http://artbook.southeastasia.cloudapp.azure.com:8080)), you can see all artworks and all missing artworks --> proceed to all artworks and choose an artwork to click on *Mark Missing* --> fill in all required fields and remember to upload a police report regarding to the loss incident. --> click *create*

16. Now you can see the status of this artwork has changed from *'In Place'* to *'Lost'*. This will block any further actions done to the missing artwork, i.e. agency handle the artwork for the owner, transfer ownership of the artwork, etc. until it is recovered. You can repeat the step 15 to *mark recovered* 

## Guide for Client App Local Deployment
If you would like to use a local version of the client application, you may follow these steps to deploy it.

>***Dependencies***
>
><b style="color:#1BBC9B;">Vue.js</b> as application framework<br/>
><b style="color:#674172;">Bootstrap</b> as styling library<br/>
><b style="color:#19B5FE;">Element UI</b> as components library<br/>
><b style="color:#DB0A5B;">Sass</b> for customized styling. sass files can be found in `artbook-client/src/assets/sass`<br/>


### Setup 

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run start
```

Now the client app is runing on localhost:8080

> The Client app is connecting to local server (localhost:3001) by default. If you want to run a local client app but connect it with cloud server, you may change the `baseUrl` configuration.
>
> 1. Find the constants file `artwork-client/src/const.js` 
> 2. Locate Line 7 and Line 8
> 3. Use Line 7 to connect local server (default); use Line 8 to connect cloud server.
> ```js
> 1 // path to be used to connect middleware running on virtual machine
> 2 export const VM_PATH = "http://52.187.128.189:3001/"
> 3 // path to be used to connect middleware running on local machine
> 4 export const LOCAL_PATH = "http://localhost:3001/"
> 5
> 6 // Select one of these two lines
> 7 export const baseUrl = LOCAL_PATH
> 8 // export const baseUrl = VM_PATH
> ```


## Guide for Server Local Deployment
If you would like to deploy a local version of the Artbook server, instead of using the cloud server, you can follow this guide.
### Blockchain Component 
The blockchain component is developed with Hyperledger Composer.

> ***Dependencies***
>
> <b>Hyperledger Fabric:</b> `v1.1.0 `<br>
> <b>Hyperledger Composer:</b> `v0.19.1`


### Pre-requisites
Please follow the instructions in [Hyperledger Composer Installing Pre-requisites](https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html) to complete this step.

### Set Enviornment
1. Install composer command line tool

``` bash
npm install -g composer-cli
```

2. Download Hyperledger Fabric toolkit. If you have downloaded this toolkit before Fabric v1.1.0 or Composer v1.19.1 was released, you are recommended to download it again to run Artbook

``` bash
mkdir ~/fabric-tools && cd ~/fabric-tools

curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
tar -xvf fabric-dev-servers.tar.gz
```

3. Start the Fabric Environment.

 ``` bash
 cd ~/fabric-tools
 ./startFabric.sh
 ./createPeerAdminCard.sh
 ```

### Run Chaincode (composer-cli v0.19.1)
``` bash
composer archive create -t dir -n .

composer network install -c PeerAdmin@hlfv1 -a artbook@1.0.0.bna

composer network start --networkName artbook --networkVersion 1.0.0 -A admin -S adminpw -c PeerAdmin@hlfv1

composer card import --file admin@artbook.card
```


## Middleware Component
The middleware component is developed using Node.js and  various Node packages. mongoDB is used to provide binary data storage.

> ***Dependencies***
>
> <b>Node.js:</b> `v8.9.4 LTS`<br>
> <b>npm:</b> `v5.8.0`<br>
> <b>mongoDB:</b> `v3.6.3`<br>

### Set Enviornment
1. Start mongoDB

2. Go to middleware directory
``` bash
cd ~/artbook/node
```

3. Install Node packages dependencies
``` bash
npm install --production
```

### Run Middleware
Start middleware at localhost:3000
``` bash
cd ~/artbook/node
npm run start
```
> To change port where the middleware runs on, change the port number at server.js Line 3.


## Shutdown

### Blockchain Component
1. To shutdown the business network:

``` bash
cd ~/fabric-tools
./stopFabric.sh
```

2. To teardown the runtime enviornment:

``` bash
cd ~/fabric-tools
./teardownFabric.sh
```
