#!/bin/bash

echo "Arret des containers"
# Liste des containers en cours
LISTIDS=$(docker ps -aqf "name=react-ingenium")
# Si la liste n'est pas vide ...
if [ ! -z $LISTIDS ] 
then
	# ... on arrete les containers
	docker container stop $(docker ps -aqf "name=react-ingenium")
fi

echo "Suppression des containers"
# Suppression du container si il existe
LISTIDS=$(docker ps -aqf "name=react-ingenium")
if [ ! -z $LISTIDS ] 
then
	docker container rm $(docker ps -aqf "name=react-ingenium")
fi

echo "Suppression de l'image"
# Suppression de l'image
LISTIDS=$(docker images -q epsi/react-ingenium)
if [ ! -z $LISTIDS ] 
then
	docker rmi $(docker images -q epsi/react-ingenium)
fi


echo "Création de l'image"
# Créer l'image Docker
docker build -t epsi/react-ingenium:dev .


echo "Démarrage du container"
docker run -p 3002:3000 --mount source=/app/node_modules --detach --mount type=bind,source=app,target=/app --restart always --name react-ingenium epsi/ingenium:dev
