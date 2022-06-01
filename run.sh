#!/bin/bash
trap terminate SIGINT
terminate(){
    pkill -SIGINT -P $$
    exit
}

cd ./client && npx hardhat node &
cd ./client && npm start &> /dev/null
cd ./server && npm start &> /dev/null

wait
