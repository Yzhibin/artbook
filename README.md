# Artbook

## Overview
The ultimate blockchain solution for artwork trade industry

> ***On the Cloud***
>
> The Blockchain component and middleware component are running on Azure virtual machine at address *52.187.128.189:3000*
> 
> The client app is connected to the cloud server by default. To connect the client app with a local server, please refer to the Guide for Client App Deployment.
>
> Cloud server will cease its operation on *20 May, 2018*. Please use a local server after that date.

## Guide for Client App Deployment
Web application 

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

### To switch from connecting to virtual machine and connecting to local machine
#### find the constants file the stores paths
the file can be find in `src/const.js` 

#### Follow the instructions given in the comment to comment and  uncomment correct lines of code
``` javascript
// path to be used to connect middleware running on virtual machine
export const VM_PATH = "http://172.25.96.201:3000/" 
// path to be used to connect middleware running on local machine
export const LOCAL_PATH = "http://localhost:3000/"
// export const baseUrl = VM_PATH
// uncomment the line above and comment the line below to use middleware running on virtual machine
export const baseUrl = LOCAL_PATH
```


## Recommended Process of Testing Artbook
To take a look at how Artbook works, you can follow these steps to test all functionalities.

### Data Insertion
> ***Note:*** If you are using the cloud server, you may skip this step. 

Run `insertion.js` to insert necessary accounts for Branch (Artwork branch office), Police, and Agency to your local server.

```
cd ~/artbook/node/insertion
node insertion.js
```

###  Play with Artbook
1. Go to [Artbook Homepage](http://localhost:8080/)
2. Scroll down to see some highlighted artworks being displayed.
3. As a user, click *Individual* at the top-right corner, a log-in window will promt. Then click *Sign up*.
4. Enter your name, email, passport number, phone number, and set a password. Please use a valid email address since the email entered will be used to receive emails at later stage. Other field can be dummy data. This user account A will be ***Seller***
5. Repeat step 3 and step 4 to create another account B, which will be used as ***Buyer***
- Use Case 1 : "Seller A approaches an Artbook branch to register his artwork to be an asset on chain"
6.  Login as a Branch staff --> navigate to *All Artworks* then click *Add New Artwork* --> fill in all required fields (owner email should be A's) and remember to upload a picture.
7. After the artwork has been created and added to A, staff should proceed to click *add document* to #TODO supporting documents on chain
8.  *view detail* #TODO
- Use Case 2 : "Seller A gives an agency to give his consent for the artwork to be on sale at agency's place"
9. Login as an agency staff, search the artwork by artworkId (with previous transaction history) provided by A (should be the one you just added!) --> *view document* --> inspect transfer history on the left.
10. *engage owner for consent*, fill in the ownerEmail and click the search button, the user detail will be shown, click *confirm* to send out the email to owner A. 
11. A open the email and follow the instructions, fill in email, password and the otp recieved from the email --> to give consent. 
12. Now you can see the artwork 


## Guide for Server Local Deployment
If you would like to deploy a local version of the Artbook server, instead of using the cloud server, you can follow this guide.
### Blockchain Component 
The blockchain component is developed with Hyperledger Composer.

> ***Dependencies***
>
> <b>Hyperledger Fabric:</b> `v1.1.0 `<br>
> <b>Hyperledger Composer:</b> `v0.19.0`


### Pre-requisites
Please follow the instructions in [Hyperledger Composer Installing Pre-requisites](https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html) to complete this step.

### Set Enviornment
1. Install composer command line tool

```
npm install -g composer-cli
```

2. Download Hyperledger Fabric toolkit. If you have downloaded this toolkit before Fabric v1.1.0 or Composer v1.19.0, you are recommended to download it again to run Artbook

```
mkdir ~/fabric-tools && cd ~/fabric-tools

curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
tar -xvf fabric-dev-servers.tar.gz
```

3. Start the Fabric Environment.

 ```
 cd ~/fabric-tools
 ./startFabric.sh
 ./createPeerAdminCard.sh
 ```

### Run Chaincode (composer-cli v0.19.0)
```
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
```
cd ~/artbook/node
```

3. Install Node packages dependencies
```
npm install --production
```

### Run Middleware
Start middleware at localhost:3000
```
cd ~/artbook/node
npm run start
```
> To change port where the middleware runs on, change the port number at server.js Line 3.


## Shutdown

### Blockchain Component
1. To shutdown the business network:

```
cd ~/fabric-tools
./stopFabric.sh
```

2. To teardown the runtime enviornment:

```
cd ~/fabric-tools
./teardownFabric.sh
```
