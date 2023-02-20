import { createVendiaClient } from '@vendia/client'


const client = createVendiaClient({
    apiUrl: `https://8ktdxtp8o0.execute-api.us-west-2.amazonaws.com/graphql/`,
    websocketUrl: `wss://3lr3852wab.execute-api.us-west-2.amazonaws.com/graphql`,
    apiKey: `4xeg5wFLXt7iMqXVay1oesRZNy9SjhvUz4oc8DohBTxZ`, // <---- API key
})

const {entities} = client;

const useJaneHopkins = () =>{
    return {entities};
};

export default useJaneHopkins;