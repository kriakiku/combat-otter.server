#!/bin/bash

# chmod u+x ./init-couchdb.sh

source .env

IFS=","
COORDINATOR_NODE="172.16.238.20"
ADDITIONAL_NODES="172.16.238.21,172.16.238.22"
ADDITINAL_PORTS="5901,5902"
ALL_NODES="${COORDINATOR_NODE},${ADDITIONAL_NODES}"

# COORDINATOR SETUP
docker-compose exec couchdb-main curl -X POST -H "Content-Type: application/json" "http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@172.16.238.20:5984/_cluster_setup" \
    -d '{"action": "enable_cluster", "bind_address":"0.0.0.0", "username": "'"${COUCHDB_USER}"'", "password":"'"${COUCHDB_USER}"'", "node_count":"3"}'

# ADD NODE: 172.16.238.21:5901
docker-compose exec couchdb-main curl -X POST -H "Content-Type: application/json" "http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@172.16.238.20:5984/_cluster_setup" -d '{"action": "enable_cluster", "bind_address":"0.0.0.0", "username": "'"${COUCHDB_USER}"'", "password":"'"${COUCHDB_PASSWORD}"'", "port": 5984, "node_count": "3", "remote_node": "172.16.238.21", "remote_current_user": "'"${COUCHDB_USER}"'", "remote_current_password": "'"${COUCHDB_PASSWORD}"'" }'
docker-compose exec couchdb-main curl -X POST -H "Content-Type: application/json" "http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@172.16.238.20:5984/_cluster_setup" -d '{"action": "add_node", "host":"127.0.0.1", "port": 5984, "username": "'"${COUCHDB_USER}"'", "password":"'"${COUCHDB_PASSWORD}"'"}'

# ADD NODE: 172.16.238.22:5902
docker-compose exec couchdb-main curl -X POST -H "Content-Type: application/json" "http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@172.16.238.20:5984/_cluster_setup" -d '{"action": "enable_cluster", "bind_address":"0.0.0.0", "username": "'"${COUCHDB_USER}"'", "password":"'"${COUCHDB_PASSWORD}"'", "port": 5984, "node_count": "3", "remote_node": "172.16.238.22", "remote_current_user": "'"${COUCHDB_USER}"'", "remote_current_password": "'"${COUCHDB_PASSWORD}"'" }'
docker-compose exec couchdb-main curl -X POST -H "Content-Type: application/json" "http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@172.16.238.20:5984/_cluster_setup" -d '{"action": "add_node", "host":"127.0.0.1", "port": 5984, "username": "'"${COUCHDB_USER}"'", "password":"'"${COUCHDB_PASSWORD}"'"}'

# # see https://github.com/apache/couchdb/issues/2858
docker-compose exec couchdb-main curl  "http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@172.16.238.20:5984/"

docker-compose exec couchdb-main curl  -X POST -H "Content-Type: application/json" "http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@172.16.238.20:5984/_cluster_setup" -d '{"action": "finish_cluster"}'

# docker-compose exec couchdb-main curl  "http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@172.16.238.20:${PORT_BASE}0/_cluster_setup"
# docker-compose exec couchdb-main curl  "http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@172.16.238.20:${PORT_BASE}0/_membership"
