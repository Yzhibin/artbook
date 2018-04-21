# Artbook
The ultimate blockchain solution for artwork trade industry

> ***Version***
>
> Last Rlease:`0.0.1`
> 
> Release Date: 14 Mar 18

## Developer Guide
> ### Important Notice
> 
> Users who use composer-cli version 0.16.0 and below, please go through development environment setup process again.
>
> **Major changes:**
> 
> - Lastest version of composer-cli is v0.19.0 (as of 1 April 2018). Use `composer -v` command to check composer-cli version. 
> - In composer-cli v0.19.0, `composer runtime` command has been removed.
> - Lastest version of fabric image is 1.1.0 (as of 1 April 2018). Use `docker images` command to check fabric image version.
> - Fabric-tools kit is updated. Download the lastest version from Prerequisite section;
> 
> **Troubleshooting**
> 
> If any error occurs after this update process, a few actions may solve certain problems.
> - Use `npm uninstall -g composer-cli` command to competely uninstall composer-cli module before re-install it.
> - Use `npm unintall -g` command to uninstall `composer-playground` and/or `composer-rest-server` before re-install, if "connection error" occours when using Composer Playground or Composer REST Server.
> - After download the lastest version of fabric-tools kit, run following command to clean up all environment from previous version:
> ```
> rm -rf ~/.composer   
> cd ~/composer-tools
> ./teardownFabric.sh
> ./teardownAllDocker.sh
> 2
> ```

### Prerequisite
1. Setup development environment: follow the instructions in the [Hyperledger Composer Tutorial](https://hyperledger.github.io/composer/latest/installing/development-tools.html) 

2. Start the Fabric Environment using the following commands. Here assumes the fabric-tools folder is at root directory

 ```
 cd ~/fabric-tools
 ./startFabric.sh
 ./createPeerAdminCard.sh
 ```

### Run Chaincode (composer-cli v0.19.0)
1. Go to chaincode directory. Here assumes the repository is at home direcotry.
 ```
 cd ~/artwork/chaincode
 ```

2. Create archive file (.bna) from all source code files. The archive name will be artbook@{version number}.bna by defualt. Append `--archiveName {filename}` to specify a filename for the archive file.

 ```
 composer archive create --sourceType dir --sourceName .
 ```

3. Install artbook business network The PeerAdmin Card is issued at the last step of Pre-requisite section. The arbook archive is generated from step 2. Change name of archive file (`-a {archiveFileName}`) accordingly.
 
 ```
 composer network install -c PeerAdmin@hlfv1 -a artbook@0.0.1.bna
 ```
 
4. Issue Network Admin card for the artbook network.Change network version (`--networkVersion {versionNumver}`) accordingly.

 ```
 composer network start --networkName artbook --networkVersion 0.0.1 -A admin -S adminpw -c PeerAdmin@hlfv1
 ```

5. Import network admin card to card wallet

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