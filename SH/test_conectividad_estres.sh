#!bin/bash

IDP_NFT_URL="https://identity-services.nft.elcorteingles.es:9443/oauth2/token?grant_type=client_credentials"
IDP_NFT_USERNAME="EgdJuP7GY0LL3C39x7kwN8fd2iEa"
IDP_NFT_PASSWORD="xbTKvozQEyhYM_WkascMaL_TkaMa"

FILE_OUTPUT="output.txt"
FILE_ERROR="error.txt"

function clean() {
    rm -f $FILE_OUTPUT
    rm -f $FILE_ERROR
}

function process() {
    local IDP_URL=$1
    local IDP_USERNAME=$2
    local IDP_PASSWORD=$3
    local repeat=$4

    for i in `seq 0 $repeat` ; do
        (
            local URL=$(getURLWithRandom $IDP_URL)
            local command="curl -k "$URL" --basic --user "$IDP_USERNAME:$IDP_PASSWORD" --data {}"
            output=`$command 2>&1`
            error=`echo $output | grep -i error`
            err=$?
            test $err -eq 0 && echo $error >> $FILE_ERROR
            
            test $err -ne 0 && echo $output >> $FILE_OUTPUT
            echo $output
        ) &
    done

    wait
}

function getURLWithRandom() {
    local IDP_URL=$1
    echo $IDP_URL #"&scope=test-"$RANDOM$RANDOM
}

clean

# echo "Testing nft ..."
process $IDP_NFT_URL $IDP_NFT_USERNAME $IDP_NFT_PASSWORD 100
