#!/bin/sh

SCRIPT=$(readlink -f "$0")
BASEDIR=$(dirname "$SCRIPT")
cd $BASEDIR/..

docker rm theskeleton-ui-admin
docker rmi codenergic/theskeleton-ui-admin

docker build . --tag codenergic/theskeleton-ui-admin:latest
