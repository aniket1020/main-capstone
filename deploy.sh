#!/bin/bash
trap terminate SIGINT
terminate(){
    pkill -SIGINT -P $$
    exit
}

cd ./client && npx hardhat node &
sleep 15s
cd ./client && npx hardhat run src/scripts/deploy.js --network localhost &
cd ./client && npm start &> /dev/null
cd ./server && npm start &> /dev/null

wait
