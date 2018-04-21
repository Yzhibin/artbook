# Artbook

## Overview
The ultimate blockchain solution for artwork trade industry

> ***On the Cloud***
>
> The Blockchain component and middleware are running on Azure virtual machine at address *52.187.128.189:3001*
> 
> The client app is connected to the cloud server by default. To connect the client app with a local server, please refer to the Guide for Client App Deployment.
>
> Cloud server will cease its operation on *20 May, 2018*. Please use local server after the date.

## Guide for Client App Deployment
//TODO

## Recommended Process of Testing Artbook
To take a look at how Artbook works, you can follow these steps to test all functionalities.

## Guide for Server Local Deployment
If you would like to deploy a local version of the Artbook server, instead of using the cloud server, you can follow this guide.
### Blockchain Component 
The blockchain component is developed with Hyperledger Composer.

> ***Dependencies***
>
> Hyperledger Fabric: `v1.1.0 `
>
> Hyperledger Composer: `v0.19.0`


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
> Node.js: `v8.9.4 LTS`
>
> npm: `v5.8.0`
>
> mongoDB: `v3.6.3`

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
Start middleware at localhost:3001
```
cd ~/artbook/node
npm run start
```
> To change port that the middleware runs on, change the port number at server.js Line 3.


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
