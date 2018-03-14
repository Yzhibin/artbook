# Artbook
The ultimate blockchain solution for artwork trade industry

>***Version***
>
> Last Rlease:`0.0.1`
> 
> Release Date: 14 Mar 18

## Developer Guide
### Prerequisite
1. Setup devlopment environment: follow the instructions in the [Hyperledger Composer Tutorial](https://hyperledger.github.io/composer/latest/installing/development-tools.html) 

2. Start the Fabric Environment using the following commands. Here assumes the fabric-tools folder is at root directory

 ```
 cd ~/fabric-tools
 ./startFabric.sh
 ./createPeerAdminCard.sh
 ```

### Run Chaincode
1. Create archive file (.bna) from all source code files. The archive name will be artbook@{version number}.bna by defualt. Append `--archiveName {filename}` to specify a filename for the archive file.

 ```
 composer archive create --sourceType dir --sourceName .
 ```

2. Start runtime enviornment. The PeerAdmin Card is issued at the last step of Pre-requisite section.
 
 ```
 composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName artbook
 ```
 
3. Issue Network Admin card for the artbook network. Change the --archiveFile parameter accordingly

 ```
 composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile artbook@0.0.1.bna --file networkadmin.card
 ```

4. Import network admin card to card wallet

 ```
composer card import --file networkadmin.card
 ```
### Interact with Business Network
Now the artbook netowrk is running. You can either use REST API, or use Hyperledger Composer Playground, to interact with the business netowrk

 - Start REST API by issuing `composer-rest-server` command
 - Start Hyperledger Composer Playground by issuing `composer-playground` command

### Shutdown Busienss Network
1. To shutdown REST server or Composer Playground, simply use `ctrl` + `C` to stop the respective process
2. To shutdown the business network, use the following commands

```
cd ~/fabric-tools
./stopFabric.sh
```

3. To teardown the runtime enviornment, uise the following commands after properly shutting down the business network

```
cd ~/fabric-tools
./teardownFabric.sh
```

>###***Note:***
>
> At development stage where the business network is to be feaquantly deployed and undeployed, the Fabric runtime is NOT necessarily to be tore down.
> 
> PeerAdmin card is only required to be issued again when starting the environment after it has previously been tore down


# User Guide