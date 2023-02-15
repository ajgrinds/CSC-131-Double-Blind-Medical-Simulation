import { createVendiaClient } from "@vendia/client"

const client = createVendiaClient({
    apiUrl: `https://1hh3nqk3rl.execute-api.us-west-2.amazonaws.com/graphql/`,
    websocketUrl: `wss://nbrshfugid.execute-api.us-west-2.amazonaws.com/graphql`,
    apiKey: '3zNM5Csxe5K1No5TgqTSisctBp7V7gsZJrtk8oxPeo8g', 
    })

const {entities} = client;

const  UseJaneHopkins = () => {
  return {entities};
}

export default UseJaneHopkins;
