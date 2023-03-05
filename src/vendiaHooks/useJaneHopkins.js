import { createVendiaClient } from '@vendia/client'


const client = createVendiaClient({
    apiUrl: `https://1hh3nqk3rl.execute-api.us-west-2.amazonaws.com/graphql/`,
    websocketUrl: `wss://nbrshfugid.execute-api.us-west-2.amazonaws.com/graphql`,
    apiKey: `HWJZgZSkdh7kWrFnqhmYDhczZkZnLC9gQBpjBqkj2qs`, // <---- API key
})

const {entities} = client;

const useJaneHopkins = () =>{
    return {entities};
};

export default useJaneHopkins;