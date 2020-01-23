#!/bin/bash

# Le répertoire de destination
DEST=/docker/configuration/ingenium_production/image/target/
# Le répertoire de build
SOURCE=/home/jeanlucbompard/Documents/Developpement/react/ingenium/build

scp -r $SOURCE root@192.168.100.7:${DEST}
