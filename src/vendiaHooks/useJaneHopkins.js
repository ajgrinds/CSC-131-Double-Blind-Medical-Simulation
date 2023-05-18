import { createVendiaClient } from '@vendia/client'


const client = createVendiaClient({
    apiUrl: `https://gdbauvb4g1.execute-api.us-west-2.amazonaws.com/graphql/`,
    websocketUrl: `wss://sdwpu0p7m1.execute-api.us-west-2.amazonaws.com/graphql`,
    apiKey: `CHzfHN4uyza9hc39dN1aWkH3FbzsswGJgHDGbmXDwuCq`, // <---- API key
})

const {entities} = client;

const useJaneHopkins = () =>{
    return {entities};
};

export default useJaneHopkins;

