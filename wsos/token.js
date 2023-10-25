
// Utilidad de obtención de token por entorno
// By @Joan Bosch

// EJECUCIÓN: se llama desde módulo:  let tokenResponse = await getToken('ave')

let now = new Date()
let environment = {
  nft: {
    user: "iFDW3Zczq4SLkWG2zJvpGVY2u8Qa",
    password: "q1xiBfqmzHwDSpPRKRiM6GAMmbYa",
    url:
      "https://wso2-idp.nft.eci.geci:9443/oauth2/token?grant_type=client_credentials",
  },
  uat: {
    user: "x9OiFIbN6qYa4DhpwDgi35S5MWMa",
    password: "oeFX5bOfH1FNkNj_opj8tJd1i1sa",
    url:
      "https://wso2-idp.uat.eci.geci:9443/oauth2/token?grant_type=client_credentials",
  },
  ave: {
    user: "QlmafP051Lfdm6TjUIJG2ajdYbEa",
    password: "LtHnLv6mLeMJSND7pXUAmXrQ2hYa",
    url:
      "https://wso2-idp.uat.eci.geci:9443/oauth2/token?grant_type=client_credentials",
  },
};

function getUnixTime(timeStamp) {
    return timeStamp / 1000
}

function print(token) {
    let {env} = token
    let {bearer} = token
    let {expiredDateString} = token

    console.log(`${env}: ${bearer} expires ${expiredDateString} `)
}

async function getToken(env) {
  let credentials = environment[env];

  let getCredentials = ({ user, password }) => btoa(`${user}:${password}`);

  let headers = {
    "Authorization": `Basic ${getCredentials(credentials)}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  let method = {
    method: "post",
  };

  let url = credentials.url;
  console.log(`URL: ${url}`);
  let token = await fetch(url, { headers, ...method }).then((r) => r.json());
  console.log(token);
  return {
      token, 
      bearer: token["access_token"], 
      expiredDateString: new Date(getUnixTime(token['expires_in'])),
      env,
      url
    };
}

     let tokenAVE = await getToken('ave')
     let tokenNFT = await getToken('nft')
     let tokenUAT = await getToken('uat')
     print('TOKEN AVE: ' + tokenAVE)
     print('TOKEN NFT: ' + tokenNFT)
     print('TOKEN UAT: ' + tokenUAT)

    // Only prints if we are launching ./token.js as main program
    if(import.meta.main) {
        let tokenAVE = await getToken('ave')
        let tokenNFT = await getToken('nft')
        let tokenUAT = await getToken('uat')
        print(tokenAVE)
        print(tokenNFT)
        print(tokenUAT)
    }

export default {
    getToken
}